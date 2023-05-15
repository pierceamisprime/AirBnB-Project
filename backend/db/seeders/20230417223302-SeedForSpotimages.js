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
      url: 'https://www.24hourfitness.com/content/dam/24-hour-fitness/images/clubs/CA/moreno-valley/00925/image1.jpg',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://www.24hourfitness.com/content/dam/24-hour-fitness/images/clubs/CA/san-diego/00780/image14.jpg',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://i.imgur.com/r5AIfXN.jpg',
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
      url: "https://i.imgur.com/xKGkjkC.jpg",
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
      url: 'https://i.imgur.com/TjqvE2s.jpg',
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
    {
      spotId: 4,
      url: 'https://www.fitinteriors.com/wp-content/uploads/2020/04/Anytime_08.jpg',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://images.ctfassets.net/drib7o8rcbyf/3mBktwZgmdEZA9yfRsFlDM/9aa3c129f6dce50dbe9746e04bfd2c4e/Equinox_ClubPage_Spaces_DT_Paramus_3200x2133_____5.jpg?fl=progressive&fm=jpg&q=45&w=1800',
      preview: true
    },
    {
      spotId: 6,
      url: 'https://images.squarespace-cdn.com/content/v1/52f4133de4b08200b4da975e/1564422520488-NEOZMCU4B47VFKMQRZ9V/TMPL+GYM+-+Caprice+Johnson+-+Hi+Res-3.jpg?format=2500w',
      preview: true
    },
    {
      spotId: 7,
      url: 'https://zenergysv.com/wp-content/uploads/2020/02/Zenergy-Lobby-credit-Josh-Wells-uai-730x548.jpg',
      preview: true
    },
    {
      spotId: 8,
      url: 'https://clubsolutionsmagazine.com/wp-content/uploads/2021/02/CSFeb21-CoverStory-2.jpg',
      preview: true
    },
    {
      spotId: 9,
      url: 'https://playerstrust.blob.core.windows.net/media/web/_960x540_crop_center-center_none/Screen-Shot-2022-05-12-at-15.45.24.png',
      preview: true
    },
    {
      spotId: 10,
      url: 'https://i0.wp.com/themeccagym.com/wp-content/uploads/2022/12/The-Mecca-Gym-Bodybuiding-Boise-Idaho-54.webp?fit=1500%2C1000&ssl=1',
      preview: true
    },
    {
      spotId: 11,
      url: 'https://www.goldsgym.com/vancouver-hazel-dell-wa/wp-content/uploads/sites/569/2021/01/20210125_180455.jpg',
      preview: true
    },
    {
      spotId: 12,
      url: 'https://d3gwr21bcravq3.cloudfront.net/cache/c6b2c505b65a798b9fbf.jpg',
      preview: true
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
