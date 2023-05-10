'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   options.tableName = 'Spotimages'
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      url: 'https://www.24hourfitness.com/images/clubs/club_slideshows/411/album1/large/image1.jpg',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://www.24hourfitness.com/content/dam/24-hour-fitness/images/clubs/CA/san-diego/00780/image14.jpg',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://www.24hourfitness.com/content/dam/24-hour-fitness/images/clubs/CA/san-diego/00780/image6.jpg',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://www.24hourfitness.com/content/dam/24-hour-fitness/images/clubs/WA/vancouver/00411/preview/image9.jpg',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://www.24hourfitness.com/content/dam/24-hour-fitness/images/clubs/WA/vancouver/00960/preview/image13.jpg',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://i.ytimg.com/vi/rbgIBq7oJ9o/maxresdefault.jpg',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://im.vsco.co/aws-us-west-2/a3b83a/18954669/5a8521741975575a0c3b0d88/vsco5a85217576f33.jpg?w=480',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://www.thezooculture.com/wp-content/uploads/2018/10/IMG_4702ss.jpg',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://lh5.googleusercontent.com/p/AF1QipPUo9lTJOJJJ_RnI0uNCO3BpgvNgeQjWTTGuGuD=w500-h500-k-no',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://us.gymfluencers.com/wp-content/uploads/sites/3/2023/02/Screenshot-2023-02-28-at-10.46.30-1024x570.png',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://cdn.shopify.com/s/files/1/0552/3383/9311/files/DSC06141.jpg?crop=center&v=1642132027&width=1400',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://cdn.shopify.com/s/files/1/0552/3383/9311/files/DJI_0585.jpg?crop=center&v=1642134601&width=1400',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://img.texasmonthly.com/2022/07/alphaland-gym.jpg?auto=compress&crop=faces&fit=scale&fm=pjpg&h=640&ixlib=php-3.3.1&q=45&w=1024&wpsize=large',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://us.gymfluencers.com/wp-content/uploads/sites/3/2022/10/DJI_0589_2500x-1-1024x576.webp',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://s3-media0.fl.yelpcdn.com/bphoto/jcXJz0jCf0ZvLfjS0jFv_Q/l.jpg',
      preview: false
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spotimages'
    await queryInterface.bulkDelete(options, {})
  }
};
