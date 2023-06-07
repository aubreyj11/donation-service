const connection = require('../config/connection');
const { User } = require('../models');
const userData = require('./userData.json');

// Creates a connection to the database
connection.once('open', async () => {
    try{
        // Deletes all users from the database
        await User.deleteMany({});

        // Inserts all users from the userData.json file
        await User.insertMany(userData);

        // Closes the database connection
        connection.close();
        console.log('Data successfully seeded!');
    } catch (err) {
        //Throw an error if something goes wrong
        console.log('Error seeding database', err);
        connection.close();
    }
});
    