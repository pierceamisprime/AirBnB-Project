const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Spotimage, ReviewImage, Booking } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { query } = require('express');

const router = express.Router();


const validateGetSpotsQuery = [
    check('page')
       .optional()
      .isInt({min: 1})
      .withMessage("Page must be greater than or equal to 1"),
    check('size')
      .optional()
      .isInt({min:1})
      .withMessage("Size must be greater than or equal to 1"),
    check('minLat')
      .optional(true)
      .isDecimal()
      .withMessage("Minimum latitude is invalid"),
    check('maxLat')
      .optional(true)
      .isDecimal()
      .withMessage("Maximum latitude is invalid"),
    check('minLng')
      .optional(true)
      .isDecimal()
      .withMessage("Minimum longitude is invalid"),
    check('maxLng')
      .optional(true)
      .isDecimal()
      .withMessage("Maximum longitude is invalid"),
    check('minPrice')
      .optional(true)
      .isFloat({min: 0})
      .withMessage("Minimum price must be greater than or equal to 0"),
    check('maxPrice')
      .optional(true)
      .isFloat({min: 0})
      .withMessage("Maximum price must be greater than or equal to 0"),
      handleValidationErrors
]

router.get('/', validateGetSpotsQuery, async (req, res) => {
    let query = {
        where: {},
        include: []

    }
    query.include.push({
        model: Review
    })
    query.include.push({
        model: Spotimage
    })
    const { minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query

    let page = req.query.page === undefined ? 1 : parseInt(req.query.page);
    let size = req.query.size === undefined ? 20 : parseInt(req.query.size);
    if (page >= 1 && size >= 1) {
        query.limit = size;
        query.offset = size * (page - 1);
    }
    if (page > 10) page = 10;
    if (size > 20) size = 20

    if (minLat) {
        query.where.lat = {[Op.gte]: minLat}
    }
    if (maxLat) {
        query.where.lat = {[Op.lte]: maxLat}
    }
    if (minLat && maxLat) {
        query.where.lat = {[Op.between]: [minLat, maxLat]}
    }
    if (minLng) {
        query.where.lng = {[Op.gte]: minLng}
    }
    if (maxLng) {
        query.where.lng = {[Op.lte]: maxLng}
    }
    if (minLng && maxLng) {
        query.where.lng = {[Op.between]: [minLng, maxLng]}
    }
    if (minPrice) {
        query.where.price = {[Op.gte]: minPrice}
    }
    if (maxPrice) {
        query.where.price = {[Op.lte]: maxPrice}
    }
    // [Op.lte]: 10,   // <= 10
    if (minPrice && maxPrice) {
        query.where.price = {[Op.between]: [minPrice, maxPrice]}
    }


    const Spots = await Spot.findAndCountAll(query, {
        include: [ {
            model: Review,

        },
       {
            model: Spotimage,

        }
    ],

    });
    let SpotsList = []


    Spots.rows.forEach(spot => {
        SpotsList.push(spot.toJSON())
    });


    SpotsList.forEach(spot => {
        let count = 0
        let rating = 0
        spot.Reviews.forEach(review => {
            if (review) {
                count++
                rating+= review.stars
                let avgRating = rating / count
                spot.avgRating = avgRating
            } else {
                spot.avgRating = 'No reviews yet!'
            }
        })
        spot.Spotimages.forEach(image => {
            if (image.preview === true) {
                spot.previewImage = image.url

            }


        })
        delete spot.Spotimages
        delete spot.Reviews

    })
    const Allspots = {}
    Allspots.Spots = SpotsList

    let pageNum = Number(page)
    let sizeNum = Number(size)

    Allspots.page = pageNum
    Allspots.size = sizeNum

    res.json(Allspots);
})

router.get('/current', requireAuth, async (req, res) => {
    const Spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [ {
            model: Review,

        },
       {
            model: Spotimage,

        }
    ],
    })
    let SpotsList = []
    Spots.forEach(spot => {
        SpotsList.push(spot.toJSON())
    });

    SpotsList.forEach(spot => {
        let count = 0
        let rating = 0
        spot.Reviews.forEach(review => {
            if (review) {
                count++
                rating+= review.stars
                let avgRating = rating / count
                spot.avgRating = avgRating
            } else {
                spot.avgRating = 'No reviews yet!'
            }
        })
        spot.Spotimages.forEach(image => {
            if (image.preview === true) {
                spot.previewImage = image.url
            }

        })
        delete spot.Spotimages
        delete spot.Reviews
    })

    res.json({Spots: SpotsList});

})

router.get('/:spotId', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: Review
            },
            {
                model: Spotimage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                As: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
            }

        ]
    })

    if (!spot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        next(err)
      }

    let spotDetails = []
     spotDetails.push(spot.toJSON())


    spotDetails.forEach(spot => {
        let count = 0
        let rating = 0
        spot.Reviews.forEach(review => {
            if (review) {
                count++
                rating+= review.stars
                let avgRating = rating / count
                spot.numReviews = count
                spot.avgStarRating = avgRating
            } else {
                spot.avgStarRating = 'No reviews yet!'
            }
        })
        delete spot.Reviews
        spot['Owner'] = spot['User'];
        delete spot['User'];
    })

    res.json(...spotDetails)
})

const validateNewSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Street address is required"),
    check('city')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("City is required"),
    check('state')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("State is required"),
    check('country')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Country is required"),
    check('lat')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Latitude is not valid"),
    check('lng')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Longitude is not valid"),
    check('name')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isLength({ max: 49 })
      .withMessage("Name must be less than 50 characters"),
    check('description')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Description is required"),
    check('price')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Price per day is required"),

    handleValidationErrors
  ];

router.post('/', requireAuth, validateNewSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price
    })

    res.status(201).json(newSpot)
})

router.post('/:spotid/images', requireAuth, async (req, res, next) => {
    const { url, preview } = req.body
    const spot = await Spot.findByPk(req.params.spotid, {
        attributes: ['ownerId']
    })
    if (!spot) {
        const err = new Error()
        err.status = 404
        err.message = "Spot couldn't be found"
        next(err)
        return;
    }
    if (spot.ownerId !== req.user.id) {
        const err = new Error()
        err.status = 403
        err.message = "Forbidden"
        next(err)
        return;
    }


    const newSpotImage = await Spotimage.create({
        spotId: req.params.spotid,
        url: url,
        preview: preview
    })
    const newImage = newSpotImage.toJSON()
    delete newImage.spotId
    delete newImage.updatedAt
    delete newImage.createdAt

    res.json(newImage)
})

router.put('/:spotId', requireAuth, validateNewSpot, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        return res.status(404).json({message: "Spot couldn't be found"})
    }
    if (spot.ownerId !== req.user.id) {
        return res.status(403).json({message: "Forbidden"})
    }


        await spot.update({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })

        await spot.save()


    res.json(spot)

})

router.delete('/:spotId', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        return res.status(404).json({message: "Spot couldn't be found"})
    }
    if (spot.ownerId !== req.user.id) {
        return res.status(403).json({message: "Forbidden"})
    }

    spot.destroy()

    res.json({message: "Successfully deleted"})


})

router.get('/:spotId/reviews', async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
    })
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        return res.status(404).json({message: "Spot couldn't be found"})
    }

    res.json({Reviews: reviews})
})

const validateReview = [
    check('review')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Review text is required"),
    check('stars')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isInt({min:1,max:5})
      .withMessage("Stars must be an integer from 1 to 5"),
      handleValidationErrors
]

router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    const { review, stars } = req.body

    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        return res.status(404).json({message: "Spot couldn't be found"})
    }
    const reviewsForSpot = await Review.findOne({
        where: {
            userId: req.user.id,
            spotId: spot.id
        }
    })
    if (reviewsForSpot) {
        return res.status(500).json({message: "User already has a review for this spot"})
    }


    const newReview = await Review.create({
        userId: req.user.id,
        spotId: spot.id,
        review: review,
        stars: stars
    })


    res.status(201).json(newReview)

})

router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const ownerOfSpot = await Spot.findByPk(req.params.spotId)

    if (!ownerOfSpot) {
        return res.status(404).json({message: "Spot couldn't be found"})
    }

    const bookingsOwner = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
    })

    const bookingsNotOwner = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        attributes: ['spotId', 'startDate', 'endDate']
    })
    const owner = ownerOfSpot.toJSON()

    if (req.user.id !== owner.ownerId) {
        console.log(req.user.id)
        console.log(owner.ownerId)
       return res.json({Bookings: bookingsNotOwner})

    }


    return res.json({Bookings: bookingsOwner})



})

router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { startDate, endDate } = req.body

    const newStartDate = new Date(startDate)
    const newEndDate = new Date(endDate)

    const spot = await Spot.findByPk(req.params.spotId)

    const bookingStartDate = await Booking.findOne({
        where: {
            spotId: Number(req.params.spotId),
            startDate: {
                [Op.between]: [newStartDate, newEndDate]
            }
        }
    })

    const bookingEndDate = await Booking.findOne({
        where: {
            spotId: Number(req.params.spotId),
            endDate: {
                [Op.between]: [newStartDate, newEndDate]
            }
        }
    })
    if (!spot) {
        return res.status(404).json({message: "Spot couldn't be found"})
    }
    if (spot.ownerId === req.user.id) {
        return res.status(403).json({message: "Forbidden"})
    }
    if (newStartDate.getTime() >= newEndDate.getTime()) {
        return res.status(400).json({message: "Bad Request", errors: { endDate: "endDate cannot be on or before startDate"}})
    }

        if (bookingStartDate || bookingEndDate) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                  startDate: "Start date conflicts with an existing booking",
                  endDate: "End date conflicts with an existing booking"
                }
            })
    }


    const newBooking = await Booking.create({
        spotId: req.params.spotId,
        userId: req.user.id,
        startDate: startDate,
        endDate: endDate
    })

   return res.json(newBooking)
})





module.exports = router
