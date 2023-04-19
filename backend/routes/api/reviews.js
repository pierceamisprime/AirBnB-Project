const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Spotimage, ReviewImage} = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })
    let reviewList = []
    reviews.forEach(review => {
        reviewList.push(review.toJSON())

    });

    for (let i = 0; i < reviewList.length; i++) {
        let spotId = reviewList[i].Spot.id;
        const spotImg = await Spotimage.findOne({
          where: {
            spotId: spotId,
            preview: true,
          },
          attributes: ["url", "preview"],
        });


        if (!spotImg) {

            reviewList[i].Spot.previewImage = "No preview images yet!";
        }

        if (spotImg) {
          let image = spotImg.toJSON();
          let spot = reviewList[i].Spot;
          spot.previewImage = image.url;
        }
      }

    res.json({Reviews: reviewList})
})





module.exports = router
