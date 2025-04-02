const express = require('express');

const router = express.Router();

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrappers in the world!',
        location: {
            lat: 40.7484474,
            lng: -73.9871516,
        },
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u1'
    }
]


// place by pid
router.get('/:pid', (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id == placeId;
    });

    //error
    if (!place) {
        const error = new Error('Could not find a place for provided id.');
        error.code = 404;
        throw error;
    }

    res.json({ place }); // => {place} == {place: place} if name of key and value is same
});

//all places for given uid
router.get('/user/:uid', (req, res, next) => {
    const userId = req.params.uid;
    const places = DUMMY_PLACES.find(p => {
        return p.creator == userId;
    });

    //error
    if (!place) {
        const error = new Error('Could not find a place for the provided user id.');
        error.code = 404;
        return next(error);
    }


    res.json({ place: places });
});

module.exports = router;