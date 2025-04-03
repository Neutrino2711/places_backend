const express = require('express');

const placeControllers = require('../controllers/places-controllers');

const router = express.Router();




// place by pid
router.get('/:pid', placeControllers.getPlacebyId);

//all places for given uid
router.get('/user/:uid', placeControllers.getPlacebyUserId);

//to create place
router.post('/', placeControllers.createPlace);

//to update place
router.patch('/:pid', placeControllers.updatePlace);

//to delete 
router.delete('/:pid', placeControllers.deletePlace);

module.exports = router;