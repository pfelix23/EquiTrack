// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const investmentsRouter = require('./investments.js');
const assetsRouter = require('./assets.js');
const liabilitiesRouter = require('./liabilities.js')
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/investments', investmentsRouter);

router.use('/assets', assetsRouter);

router.use('/liabilities', liabilitiesRouter);

// backend/routes/api/index.js
// ...

// GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth.js');

const { User } = require('../../db/models');

const { requireAuth } = require('../../utils/auth.js');

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

// ...

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

module.exports = router;