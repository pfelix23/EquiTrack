const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Asset, Liability } = require('../../db/models');

const router = express.Router()

router.get('/', requireAuth, async (req, res) => {
    const assets = await Asset.findAll({
        where: {
            ownerId: req.user.id
        }
    });

    return res.status(200).json({
        Assets: assets
    })
});

router.get('/:assetId', requireAuth, async (req, res) => {
    const assetId = req.params.assetId;

    if(!assetId) {
        return res.status(404).json({
            message: "Asset couldn't be found"
        })
    }
    
    const asset = await Asset.findByPk(assetId);

    if(req.user.id === asset.ownerId) {
        return res.status(200).json(asset)
    }
});

router.post('/create', requireAuth, async (req, res) => {
    const { asset_name, type, amount } = req.body;
    const totalLiabilities = await Liability.sum('amount', {
        where: {
            ownerId: req.user.id
        }
    });
    const totalAssets = await Asset.sum('amount', {
        where: {
            ownerId: req.user.id
        }
    });

    if(!asset_name || !type || !amount) {
        return res.status(400).json({
            message: "Bad Request", 
            errors: {
            asset_name: "Asset name is required",
            type: "Asset type is required",
            amount: "Asset amount is required",
          }
       })
    };
    const net = (totalAssets + amount) - totalLiabilities;

    if(net >= 0) {
        const asset = await Asset.create({ownerId: req.user.id ,asset_name, type, amount, net_assets: net});

        return res.status(201).json(asset)
    } else {
        const asset = await Asset.create({ownerId: req.user.id ,asset_name, type, amount, net_deficiency: net});

        return res.status(201).json(asset)
    }

});

router.put('/:assetId/edit', requireAuth, async (req, res) => {
    const assetId = req.params.assetId;
    const asset = await Asset.findByPk(assetId);
    const { asset_name, type, amount } = req.body;

    if(!assetId) {
        return res.status(404).json({
            message: "Asset couldn't be found"
        })
    };

    if(asset.ownerId !== req.user.id) {
        return res.status(403).json({
            message: "Forbidden"
        })
    };

    if(!asset_name || !type || !amount) {
        return res.status(400).json({
            message: "Bad Request", 
            errors: {
            asset_name: "Asset name is required",
            type: "Asset type is required",
            amount: "Asset amount is required",
          }
       })
    };

    const totalLiabilities = await Liability.sum('amount', {
        where: {
            ownerId: req.user.id
        }
    });
    const totalAssets = await Asset.sum('amount', {
        where: {
            ownerId: req.user.id
        }
    });

    const newTotalAssets = totalAssets - asset.amount;

    const net = (newTotalAssets + amount) - totalLiabilities;

    if(net >= 0) {
        const asset = await Asset.update({ownerId: req.user.id ,asset_name, type, amount, net_assets: net,
            where: {
                id: assetId
            }
        });

        return res.status(201).json(asset);
    } else {
        const asset = await Asset.update({ownerId: req.user.id ,asset_name, type, amount, net_deficiency: net,
            where: {
                id: assetId
            }
        });

        return res.status(201).json(asset);
    }

});

router.delete('/:assetId/delete', requireAuth, async (req, res) => {
    const assetId = req.params.assetId;
    const asset = await Asset.findByPk(assetId)

    if(!assetId) {
        return res.status(404).json({
            message: "Asset couldn't be found"
        })
    };

    if(asset.ownerId !== req.user.id) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    await Asset.destroy({
        where: {
            id: assetId
        }
    })

    res.status(200).json({
        message: "Successfully deleted"
    })
})


module.exports = router;