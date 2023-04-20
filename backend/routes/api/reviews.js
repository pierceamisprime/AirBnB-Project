const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Spotimage, ReviewImage} = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

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

router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { url } = req.body

    const review = await Review.findByPk(req.params.reviewId, {
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: ReviewImage
            }
        ]
    })
    if (!review) {
        return res.status(404).json({message: "Review couldn't be found"})
    }
    if (review.userId !== req.user.id) {
        return res.status(403).json({message: "Forbidden"})
    }

        const reviewCheckTen = review.toJSON()
        // console.log(reviewCheckTen)

    if (reviewCheckTen.ReviewImages.length >= 10) {
        return res.status(403).json({message: "Maximum number of images for this resource was reached"})

    }

    const reviewImage = await ReviewImage.create({
        reviewId: review.id,
        url: url
    })
    const newReviewImage = reviewImage.toJSON()


    delete newReviewImage.reviewId
    delete newReviewImage.updatedAt
    delete newReviewImage.createdAt

    res.json(newReviewImage)

})

router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const { review, stars } = req.body

    const reviewToEdit = await Review.findByPk(req.params.reviewId)

    if (!reviewToEdit) {
        return res.status(404).json({message: "Review couldn't be found"})
    }
    if (reviewToEdit.userId !== req.user.id) {
        return res.status(403).json({message: "Forbidden"})
    }

    await reviewToEdit.update({
        review,
        stars
    })
    await reviewToEdit.save()

    res.json(reviewToEdit)
})

router.delete('/:reviewId', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId)

    if (!review) {
        return res.status(404).json({message: "Review couldn't be found"})
    }
    if (review.userId !== req.user.id) {
        return res.status(403).json({message: "Forbidden"})
    }

     review.destroy()

    res.json({message: "Successfully deleted"})

})



module.exports = router
