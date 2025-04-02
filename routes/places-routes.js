const express = require('express');

const HttpError = require('../models/http-error');

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

        throw new HttpError('Could not find a place for provided id.', 404);
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
    if (!places) {

        return next(new HttpError('Could not find a place for provided user id.', 404));
    }


    res.json({ place: places });
});

module.exports = router;