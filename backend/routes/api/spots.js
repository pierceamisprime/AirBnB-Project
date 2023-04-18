const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Spotimage} = require('../../db/models');

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




module.exports = router
