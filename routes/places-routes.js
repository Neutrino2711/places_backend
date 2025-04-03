const express = require('express');
const { check } = require('express-validator');

const placeControllers = require('../controllers/places-controllers');

const router = express.Router();




// place by pid
router.get('/:pid', placeControllers.getPlacebyId);

//all places for given uid
router.get('/user/:uid', placeControllers.getPlacesbyUserId);

//to create place
router.post('/',
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 5 }),
        check('address').not().isEmpty(),

    ],
    placeControllers.createPlace);

//to update place
router.patch('/:pid', placeControllers.updatePlace);

//to delete 
router.delete('/:pid', placeControllers.deletePlace);

module.exports = router;