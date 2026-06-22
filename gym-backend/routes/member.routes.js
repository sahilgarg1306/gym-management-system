const express = require('express');

const router = express.Router();

const {

    createMember,
    getMembers,
    updateMember,
    deleteMember,
    renewMembership

} = require('../controllers/member.controller');

router.post('/', createMember);

router.get('/', getMembers);

router.put('/:id', updateMember);

router.delete('/:id', deleteMember);

router.put('/renew/:id', renewMembership);

module.exports = router;