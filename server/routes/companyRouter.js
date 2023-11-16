const express = require('express');
const {
    createCompany,
    updateCompany,
    deleteCompany,
    getCompanyUser,
    getCompanyThis,
} = require('../controllers/companyController');

const router = express.Router();

router.route('/getCompanyUser/:id').get(getCompanyUser);
router.route('/getCompanyThis/:id').get(getCompanyThis);
// router.route('/getCompany/:id').get(getCompany);
router.route('/createCompany').post(createCompany);
router.route('/updateCompany').post(updateCompany);
router.route('/deleteCompany').delete(deleteCompany);
// router.route('/deleteCompanyPlate').delete(deleteCompanyPlate);

module.exports = router;
