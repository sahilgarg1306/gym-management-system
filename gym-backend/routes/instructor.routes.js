const express = require('express');

const router = express.Router();

const {

    createInstructor,
    getInstructors,
    updateInstructor,
    deleteInstructor

} = require('../controllers/instructor.controller');

router.post('/', createInstructor);

router.get('/', getInstructors);

router.put('/:id', updateInstructor);

router.delete('/:id', deleteInstructor);

module.exports = router;