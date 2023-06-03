const db = require('./connection');
const { User } = require('../models');

db.once('open', async () => {
    await User.create({
        name: 'My Bistro',
        email: 'mybistro@gmail.com',
        password: 'bybistro1',
        address: '123 Main St',
        city: 'Irvine',
        zipcode: '92618',
        phone: '949-555-5555'
    });
    
    console.log('users seeded');

    process.exit();
})