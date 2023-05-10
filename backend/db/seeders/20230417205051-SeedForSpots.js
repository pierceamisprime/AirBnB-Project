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
   options.tableName = 'Spots'
   await queryInterface.bulkInsert(options, [
    {
      ownerId: 1,
      address: '1541 NE 181st Ave',
      city: 'Portland',
      state: 'Oregon',
      country: 'United States',
      lat: 522.4760827,
      lng: 543.5564378,
      name: '24 Hour Fitness',
      description: "Celebrating over 35 years as an industry leader, 24 Hour Fitness is committed to creating a healthier, happier world through fitness with nearly 300 clubs in 11 states nationwide. We know your time in the gym is critical to maintaining your physical and mental well-being, so we provide welcoming and inclusive environments, with thousands of square feet of premium strength and cardio equipment, turf zones, free weights, functional training areas and more.",
      price: 100.50
    },
    {
      ownerId: 2,
      address: '16571 Ventura Blvd',
      city: 'Encino',
      state: 'California',
      country: 'United States',
      lat: 522.4765637,
      lng: -122.5564789,
      name: 'Zoo Culture',
      description: "Since opening in 2017, Zoo culture has set the standard when it comes to creating a healthy, non judgemental workout zone. Offering top tier equipment including dumbbells 2.5-200lb, tons of powerracks, and a turf field. We offer personal training and day passes if you're just in town visiting.",
      price: 450.00
    },
    {
      ownerId: 3,
      address: '1502 Industrial Dr',
      city: 'Missouri City',
      state: 'Texas',
      country: 'United States',
      lat: 102.4723526,
      lng: 986.5554378,
      name: 'Alphaland',
      description: "Alphaland is an all-in-one fitness place where a large number of facilities are included on a 30,000+ sq. feet complex situated on 18.5 acres premise. Alphaland has gyms, basketball courts, a football court, retail stores selling fitness-related merchandise, a food court, and much more. We have covered the entire list later in this article.",
      price: 725.00
    },
    {
      ownerId: 1,
      address: '150 E 58th St',
      city: 'New York',
      state: 'New York',
      country: 'United States',
      lat: 543.4345526,
      lng: 906.3354378,
      name: 'Sitaras',
      description: 'If you are looking for hardcore strength training, while still staying true to the luxury lifestyle, Sitaras training is the perfect fit. Members can unwind after a workout on a 3,000-square-foot landscaped terrace. Locker rooms are faced in dark oak and each shower is outfitted with rain showerhead and terrazzo floor. The Sitaras philosophy also includes a full digital tracking segment that gathers data on your workout, and adjusts your workouts based on the resulting data and goals.',
      price: 150.00
    },
    {
      ownerId: 2,
      address: '747 Market St',
      city: 'San Francisco',
      state: 'California',
      country: 'United States',
      lat: 157.4325526,
      lng: 765.5456378,
      name: 'Equinox Sports Club',
      description: 'Equinox is a high-end gym with state of the art equipment. The club offers workout clothes that are laundered and folded, ready for you at your next workout. Private training is available to members, and trainers will work with you to achieve specific goals, building complete routines including workouts and diets.',
      price: 425.50
    },
    {
      ownerId: 3,
      address: '4 Astor PI',
      city: 'New York',
      state: 'New York',
      country: 'United States',
      lat: 908.4723526,
      lng: 105.3264378,
      name: 'TMPL',
      description: "David Barton's newest endeavor is TMPL, the West Side gym of 40,000 square feet that includes a saltwater pool, 20 tons of free weights, an immersive spin theater and all of the latest and greatest tech in the fitness space. Schedule a meeting with one of the many top personal trainers and they’ll walk you through your M.A.P., a metabolic assessment profile that looks at your entire health — weight, sleep, hormones and energy — to form a comprehensive training plan.",
      price: 850.75
    },
    {
      ownerId: 1,
      address: '245 Raven Rd',
      city: 'Ketchum',
      state: 'Idaho',
      country: 'United States',
      lat: 120.4723526,
      lng: 461.3214098,
      name: 'Zenergy Health Club',
      description: "Built as a full-service spa and health center, Zenergy is the perfect place for Sun Valley’s elite to stay in shape when not out on the mountain or wading into the river to fly-fish. Not only does Zenergy offer massage therapy, the 48,000-square-foot facility also offers acupuncture, reflexology, a nail salon, and Greg Hinshaw’s hair studio and tanning services (if you’re into that sort of thing). There is also a squash court, and pilates studio!",
      price: 650.00
    },
    {
      ownerId: 2,
      address: '500 N Kingsbury',
      city: 'Chicago',
      state: 'Illinois',
      country: 'United States',
      lat: 123.4724796,
      lng: 986.0537898,
      name: 'East Bank Club',
      description: "If you’re looking to tune up your golf game before your next business meeting, East Bank Club is for you. Not only does East Bank offer all of the strength and fitness training necessary to up your game, they also have an indoor golf center complete with private trainers. Your boss won’t be able to hate on your short game this time.",
      price: 195.00
    },
    {
      ownerId: 3,
      address: '2629 E Rose Garden Ln',
      city: 'Phoenix',
      state: 'Arizona',
      country: 'United States',
      lat: 234.4733520,
      lng: 375.4314379,
      name: 'EXOS',
      description: "EXOS’s Phoenix location has been known to cater to some of the top professional athletes in the world. Looking to train next to Odell Beckham Jr. and Xander Boagaerts? No problem. The facilities feature a 60-meter track, 80-yard football field and heated and cold pools. You can try intensive weekend retreats, 8-week offseason training programs or semi-private year-long packages.",
      price: 900.00
    },
    {
      ownerId: 1,
      address: '524 N Lamar Blvd Suite 300',
      city: 'Austin',
      state: 'Texas',
      country: 'United States',
      lat: 503.4726626,
      lng: 435.7554334,
      name: 'Mecca Gym',
      description: "If you’re into meditation and relaxation, this spa and gym is for you. Add a jolt to your fitness routine with a three or six-week private training program and you’ll get two one-hour sessions with a trainer, as well as a fitness assesment. Everyone’s got to start somewhere. Post-class, grab a smoothie (or wine and beer if that’s more your speed post-workout), then pop in the steam room!",
      price: 150.25
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
    options.tableName = 'Spots'
    await queryInterface.bulkDelete(options, {})
  }
};
