const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Spotimage, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/', async (req, res) => {
    const Spots = await Spot.findAll({
        include: [ {
            model: Review,

        },
       {
            model: Spotimage,

        }
    ],

    });
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
            } else {
                spot.previewImage = 'No images provided'
            }

        })
        delete spot.Spotimages
        delete spot.Reviews
    })

    res.json({Spots: SpotsList});
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
            } else {
                spot.previewImage = 'No images provided'
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
        spot['Owner'] = spot['User']; // Assign new key
        delete spot['User']; // Delete old key
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
    if (spot.ownerId !== req.user.id) {
        const err = new Error()
        err.status = 403
        err.message = "Forbidden"
        next(err)
    }

    if (!spot) {
        const err = new Error()
        err.status = 404
        err.message = "Spot couldn't be found"
        next(err)
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

    const reviewsForSpot = await Review.findOne({
        where: {
            userId: req.user.id,
            spotId: spot.id
        }
    })
    if (reviewsForSpot) {
        return res.status(500).json({message: "User already has a review for this spot"})
    }

    if (!spot) {
        return res.status(404).json({message: "Spot couldn't be found"})
    }

    const newReview = await Review.create({
        userId: req.user.id,
        spotId: spot.id,
        review: review,
        stars: stars
    })


    res.status(201).json(newReview)

})





module.exports = router
