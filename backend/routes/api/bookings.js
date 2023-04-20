const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Spotimage, ReviewImage, Booking} = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Spot,
                attributes: {exclude: ['description', 'createdAt','updatedAt']}
            }
        ]

    })
    let bookingList = []
    bookings.forEach(booking => {
        bookingList.push(booking.toJSON())

    });
    for (let i = 0; i < bookingList.length; i++) {
        let spotId = bookingList[i].Spot.id;
        const spotImg = await Spotimage.findOne({
            where: {
                spotId: spotId,
                preview: true
            },
            attributes: ['url', 'preview']
        });

        if (!spotImg) {
            bookingList[i].Spot.previewImage = "No images yet!"
        }
        if (spotImg) {
            let image = spotImg.toJSON()
            let spot = bookingList[i].Spot
            spot.previewImage = image.url
        }
    }

    res.json({Bookings: bookingList})
})




module.exports = router
