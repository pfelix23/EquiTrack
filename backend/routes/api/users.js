// backend/routes/api/users.js
const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// backend/routes/api/users.js
// ...

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
    '/', 
    validateSignup,
    async (req, res) => {
      const { email, password, username, firstName, lastName } = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ email, username, firstName, lastName, hashedPassword });
  
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.json({
        user: safeUser
      });
    }
  );

router.get('/:userId', requireAuth, async (req, res) => {
    const user = await User.findByPk(req.user.id)
    const token = req.cookies

    if(!user) {
      res.status(404).json({
        message: "User couldn't be found"
      })
    };

    if(!token) {
      return res.json({
        user: null
      })
    };

    res.json({
      user: user
    })

});

router.put('/:userId/edit', requireAuth, async (req, res) => {
    const { email, username, firstName, lastName } = req.body;

    try {
    if(!email || !username || !firstName || !lastName) {
      return res.status(400).json({
        message: "Bad Request",
        errors: {
            email: "User email is required",
            username: "User username is required",
            firstName: "User firstName is required",
            lastName: "User lastName is required"
        }
    })
  };

    await User.update({email, username, firstName, lastName}, {
    where: {
      id: req.user.id
    }

  });

  const updatedUser = await User.findByPk(req.user.id);

  return res.status(200).json(updatedUser);
} catch (err) {
  return res.status(500).json({
    message: 'Error updating user', err
  })
}

})

router.delete('/:userId/delete', requireAuth, async (req, res) => {
  const user = await User.findByPk(req.user.id);

  try{
  if(!user) {
    return res.status(404).json({
        message: "User couldn't be found"
    })
  };

  User.destroy({
    where: {
      id: user.id
    }
  })

  return res.status(200).json({
    message: 'Successfully deleted'
  })
} catch(err) {
  res.status(500).json({message: 'Error deleting user', err})
}

})

module.exports = router;