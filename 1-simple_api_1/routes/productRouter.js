
const router = require("express").Router();
const productCtrl = require("../controllers/productCtrl");


// CRUD (create, Read, Update and Delete) ===> POST, GET, PUT, DELETE
router.route('/')
    .get(productCtrl.getAllProducts)
    .post(productCtrl.createProduct)

router.route('/:id')
    .delete(productCtrl.deleteSingleProduct)
    .put(productCtrl.updateSingleProduct)
    .get(productCtrl.getSingleProduct)




module.exports = router;