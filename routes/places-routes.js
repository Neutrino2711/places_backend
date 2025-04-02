const express = require('express');

const placeControllers = require('../controllers/places-controllers');

const router = express.Router();




// place by pid
router.get('/:pid', placeControllers.getPlacebyId);

//all places for given uid
router.get('/user/:uid', placeControllers.getPlacebyUserId);

module.exports = router;