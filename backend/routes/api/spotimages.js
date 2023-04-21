const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Spotimage, ReviewImage, Booking} = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.delete('/:imageId', requireAuth, async (req, res) => {
    const image = await Spotimage.findByPk(req.params.imageId, {
        include: [
            {
                model: Spot
            }
        ]
    })

    if (!image) {
        return res.status(404).json({message: "Spot Image couldn't be found"})
    }
    if (image.Spot.ownerId !== req.user.id) {
        return res.status(403).json({message: "Forbidden"})
    }

    image.destroy()

    res.json({message: "Successfully deleted"})
})

module.exports = router
