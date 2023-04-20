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

router.put('/:bookingId', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body

    const newStartDate = new Date(startDate)
    const newEndDate = new Date(endDate)

    const booking = await Booking.findByPk(req.params.bookingId)


    if (!booking) {
        return res.status(404).json({message: "Booking couldn't be found"})
    }
    if (booking.userId !== req.user.id) {
        return res.status(403).json({message: "Forbidden"})
    }
    if (newStartDate.getTime() >= newEndDate.getTime()) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                endDate: "endDate cannot come before startDate"
            }
        })
    }
    if (newEndDate.getTime() > Date.now()) {
        return res.status(403).json({message: "Past bookings can't be modified"})
    }
    const spotId = booking.spotId

    const spot = await Spot.findByPk(spotId, {
        include: [
            {
                model: Booking
            }
        ]
    })
    const spotBooking = spot.toJSON()
    const bookingArray = spotBooking.Bookings


    for (let i = 0; i < bookingArray.length; i++) {

        if ((newStartDate.getTime() <= bookingArray[i].startDate.getTime() && bookingArray[i].endDate <= newEndDate.getTime()) || (newEndDate.getTime() <= bookingArray[i].endDate.getTime() && newEndDate.getTime() >= bookingArray[i].startDate.getTime())) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                  startDate: "Start date conflicts with an existing booking",
                  endDate: "End date conflicts with an existing booking"
                }
            })
    }
}

    await booking.update({
        startDate: startDate,
        endDate: endDate
    })
    await booking.save()

    return res.json(booking)
})

router.delete('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId)

    if (!booking) {
        return res.status(404).json({message: "Booking couldn't be found"})
    }
    if (booking.userId !== req.user.id) {
        return res.status(403).json({message: "Forbidden"})
    }

    const bookingStarted = booking.toJSON()

    if (bookingStarted.startDate.getTime() <= Date.now()) {
        return res.status(403).json({message: "Bookings that have been started can't be deleted"})
    }

    booking.destroy()

    res.json({message: "Successfully deleted"})

})



module.exports = router
