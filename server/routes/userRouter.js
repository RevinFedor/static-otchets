const express = require('express');
const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/usersController');

const router = express.Router();

router.route('/getAllUsers').get(getAllUsers);
router.route('/createUser').post(createUser);
router.route('/updateUser').patch(updateUser);
router.route('/deleteUser').delete(deleteUser);

module.exports = router;
