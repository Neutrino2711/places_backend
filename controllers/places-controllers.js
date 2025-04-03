const uuid = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

let DUMMY_PLACES = [
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

const getPlacebyId = (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id == placeId;
    });

    //error
    if (!place) {

        throw new HttpError('Could not find a place for provided id.', 404);
    }

    res.json({ place }); // => {place} == {place: place} if name of key and value is same
}

const getPlacesbyUserId = (req, res, next) => {
    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter(p => {
        return p.creator == userId;
    });

    //error
    if (!places || places.length === 0) {

        return next(new HttpError('Could not find a place for provided user id.', 404));
    }


    res.json({ place: places });
}

const createPlace = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs.', 422);
    }

    const { title, description, coordinates, address, creator } = req.body;
    //const title = req.body.title;



    const createdPlace = {
        title,
        description,
        location: coordinates,
        address,
        creator
    };

    DUMMY_PLACES.push(createdPlace);

    res.status(201).json({ place: createdPlace });
}

const updatePlace = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw (new HttpError('Added values are invalid.'), 422);
    }

    const placeId = req.params.pid;
    const { title, description } = req.body;

    const updatedPlace = { ...DUMMY_PLACES.find(p => p.id == placeId) };
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id == placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({ place: updatedPlace });
}

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;

    if (!DUMMY_PLACES.find(p => p.id === placeId)) {
        throw new HttpError('Could not find place with provided id.', 422);
    }
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
    res.status(200).json({ message: 'Deleted place' });
}

exports.getPlacebyId = getPlacebyId;
exports.getPlacesbyUserId = getPlacesbyUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;