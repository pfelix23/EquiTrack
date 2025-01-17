const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Investment } = require('../../db/models')

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
    const investments = await Investment.findAll({
        where: {
            ownerId: req.user.id
        }
    });

    return res.status(200).json({
        Investments: investments
    });
})

router.get('/:investmentId', requireAuth, async (req, res) => {
    const investmentId = req.params.investmentId;

    if(!investmentId) {
        return res.status(404).json({
            message: "Investment couldn't be found"
        })
    }
    
    const investment = await Investment.findByPk(investmentId);

    if(req.user.id === investment.ownerId) {
        return res.status(200).json(investment)
    }
})

router.post('/create', requireAuth, async (req, res) => {
    const { investment_name, type, amount, length } = req.body;

    if(!investment_name || !type || !amount || !length) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                investment_name: "Investment name is required",
                type: "Investment type is required",
                amount: "Investment amount is required",
                length: "Investment length is required"
            }
        })
    };

    let investment;
    
    
    if(type === 'S&P 500')
        investment = await Investment.create({ownerId: parseInt(req.user.id), investment_name, type, amount, length, risk_percentage: 17.5, projection: ((amount*(.118 / 12)) * parseInt(length)).toFixed(2), ROR: parseFloat((.118 / 12).toFixed(5))});
        
    else if (type ==='US Small-Cap')
        investment = await Investment.create({ownerId: parseInt(req.user.id), investment_name, type, amount, length, risk_percentage: 17, projection: ((amount*(.094 / 12)) * parseInt(length)).toFixed(2) , ROR: parseFloat((.094 / 12).toFixed(5))});
        
    else if (type ==='Real-Estate')
        investment = await Investment.create({ownerId: parseInt(req.user.id), investment_name, type, amount, length, risk_percentage: 7.5, projection: ((amount*(.10 / 12)) * parseInt(length)).toFixed(2) , ROR: parseFloat((.10 / 12).toFixed(5))});
        
    else if (type ==='Bond')
        investment = await Investment.create({ownerId: parseInt(req.user.id), investment_name, type, amount, length, risk_percentage: 4, projection: ((amount*(.03 / 12)) * parseInt(length)).toFixed(2) , ROR: parseFloat((.03 / 12).toFixed(5))});
            
    return res.status(201).json(investment)
})

router.put('/:investmentId/edit', requireAuth, async (req, res) => {
    const investmentId = req.params.investmentId;
    const investment = await Investment.findByPk(investmentId);
    const { investment_name, type, amount, length } = req.body;

    if(!investment) {
        return res.status(404).json({
            message: "Investment couldn't be found"
        })
    };

    if(investment.ownerId !== req.user.id) {
        return res.status(403).json({
            message: "Forbidden"
        })
    };

    if(!investment_name || !type || !amount || !length) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                investment_name: "Investment name is required",
                type: "Investment type is required",
                amount: "Investment amount is required",
                length: "Investment length is required"
            }
        })
    };

    let risk_percentage, projection, ROR;
    
    if(type === 'S&P 500') {
        risk_percentage = 17.5;
        projection = ((amount*(.118 / 12)) * parseInt(length)).toFixed(2);
        ROR = parseFloat((.118 / 12).toFixed(5));
    } else if (type ==='US Small-Cap') {
        risk_percentage = 17; 
        projection = ((amount*(.094 / 12)) * parseInt(length)).toFixed(2);
        ROR = parseFloat((.094 / 12).toFixed(5));
    } else if (type ==='Real-Estate') {
        risk_percentage = 7.5; 
        projection = ((amount*(.10 / 12)) * parseInt(length)).toFixed(2);
        ROR = parseFloat((.10 / 12).toFixed(5));
    } else if (type ==='Bond') {
        risk_percentage = 4; 
        projection = ((amount*(.03 / 12)) * parseInt(length)).toFixed(2);
        ROR = parseFloat((.03 / 12).toFixed(5))
    } else {
        return res.status(400).json({
            message: 'Bad Request',
            errors: {
                type: "Investment type is required"
            }
        })
    }
    
    await Investment.update({ownerId: req.user.id, investment_name, type, amount, length, risk_percentage, projection, ROR },
    {where: {
        id: investmentId
    }})

    const newInvestment = await Investment.findByPk(investmentId)

    return res.status(200).json(newInvestment)
})


router.delete('/:investmentId/delete', requireAuth, async (req, res) => {
    const investmentId = req.params.investmentId;
    const investment = await Investment.findByPk(investmentId)

    if(!investmentId) {
        return res.status(404).json({
            message: "Investment couldn't be found"
        })
    };

    if(investment.ownerId !== req.user.id) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    await Investment.destroy({
        where: {
            id: investmentId
        }
    })

    res.status(200).json({
        message: "Successfully deleted"
    })
})


module.exports = router;