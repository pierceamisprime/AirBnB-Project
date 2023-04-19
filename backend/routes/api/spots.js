const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Spotimage, sequelize} = require('../../db/models');

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

    res.json(newSpot)
})






module.exports = router
