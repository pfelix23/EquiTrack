const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Asset } = require('../../db/models');

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

    if(type === "Cash" || type === "Real-Estate" || type === "Savings" || type === "401K") {

        const asset = await Asset.create({ownerId: req.user.id ,asset_name, type, amount, liquid: amount});

        return res.status(201).json(asset)

    }

  
    const asset = await Asset.create({ownerId: req.user.id ,asset_name, type, amount});

    return res.status(201).json(asset)

});

router.put('/:assetId/edit', requireAuth, async (req, res) => {
    const assetId = req.params.assetId;
    const asset = await Asset.findByPk(assetId);
    const { asset_name, type, amount } = req.body;

    if(!asset) {
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

    if(type === "Cash" || type === "Real-Estate" || type === "Savings" || type === "401K") {

        await Asset.update({ownerId: req.user.id ,asset_name, type, amount, liquid: amount}, 
           { where: {
                id: assetId
            }}
        );

        const newAsset = await Asset.findByPk(assetId);

        return res.status(201).json(newAsset)

    }
   
    await Asset.update({ownerId: req.user.id ,asset_name, type, amount},
        {where: {
            id: assetId
        }}
    );

    const newAsset = await Asset.findByPk(assetId);

    return res.status(201).json(newAsset);
    
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