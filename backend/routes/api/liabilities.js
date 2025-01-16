const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Asset, Liability } = require('../../db/models');

const router = express.Router()

router.get('/', requireAuth, async (req, res) => {
    const liabilities = await Liability.findAll({
        where: {
            ownerId: req.user.id
        }
    });

    return res.status(200).json({
        Liabilities: liabilities
    })
});

router.get('/:liabilityId', requireAuth, async (req, res) => {
    const liabilityId = req.params.liabilityId;

    if(!liabilityId) {
        return res.status(404).json({
            message: "Liability couldn't be found"
        })
    }
    
    const liability = await Liability.findByPk(liabilityId);

    if(req.user.id === liability.ownerId) {
        return res.status(200).json(liability)
    }
});

router.post('/create', requireAuth, async (req, res) => {
    const { liability_name, type, amount } = req.body;
    
    if(!liability_name || !type || !amount) {
        return res.status(400).json({
            message: "Bad Request", 
            errors: {
            liability_name: "Liability name is required",
            type: "Liability type is required",
            amount: "Liability amount is required",
          }
       })
    };
    

    
    const liability = await Liability.create({ownerId: req.user.id, liability_name, type, amount,
    });

    return res.status(201).json(liability)
    

});

router.put('/:liabilityId/edit', requireAuth, async (req, res) => {
    const liabilityId = req.params.liabilityId;
    const liability = await Liability.findByPk(liabilityId);
    const { liability_name, type, amount } = req.body;

    if(!liability) {
        return res.status(404).json({
            message: "Liability couldn't be found"
        })
    };

    if(liability.ownerId !== req.user.id) {
        return res.status(403).json({
            message: "Forbidden"
        })
    };

    if(!liability_name || !type || !amount) {
        return res.status(400).json({
            message: "Bad Request", 
            errors: {
            liability_name: "Liability name is required",
            type: "Liability type is required",
            amount: "Liability amount is required",
          }
       })
    };


    
    await Liability.update({ownerId: req.user.id ,liability_name, type, amount},
       { where: {
            id: liabilityId
        }}
    );

    const newLiability = Liability.findByPk(liabilityId)

    return res.status(201).json(newLiability);

});

router.delete('/:liabilityId/delete', requireAuth, async (req, res) => {
    const liabilityId = req.params.liabilityId;
    const liability = await Liability.findByPk(liabilityId)

    if(!liabilityId) {
        return res.status(404).json({
            message: "Liability couldn't be found"
        })
    };

    if(liability.ownerId !== req.user.id) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    await Liability.destroy({
        where: {
            id: liabilityId
        }
    })

    res.status(200).json({
        message: "Successfully deleted"
    })
})


module.exports = router;