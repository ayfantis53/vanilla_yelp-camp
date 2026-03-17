// project imports
const cities                      = require('./cities');
const { connectDB, disconnectDB } = require('../../lib/db');
const { places, descriptors }     = require('./seedHelpers');
const CampgroundSchema            = require('../campground.model');


// Connect to database.
connectDB();

// Selects a random element from the provided array.
const sample = array => array[Math.floor(Math.random() * array.length)];

/**
 * Populates a database with an initial, foundational set of data for development and testing.
 * 
 * @return {void}
 */
const seedDB = async () => {
    await CampgroundSchema.deleteMany({});

    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price      = Math.floor(Math.random() * 20) + 10;
        const camp       = new CampgroundSchema({
            author: '69b3a180522b2a7f0aa96114',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dagfkwe3t/image/upload/v1643771171/YelpCamp/w8mckp02xfgnukzt0zrn.jpg',
                    filename: 'YelpCamp/w8mckp02xfgnukzt0zrn'
                },
                /* {
                    url: 'https://res.cloudinary.com/dagfkwe3t/image/upload/v1643771171/YelpCamp/bgrpgraqwkmrlflwcyle.jpg',
                    filename: 'YelpCamp/bgrpgraqwkmrlflwcyle'
                } */
            ],
            description: 'Aorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            price
        })
       
        await camp.save();
    }
}


// Disconnect database after seeding.
seedDB().then(() => {
    disconnectDB();
});
