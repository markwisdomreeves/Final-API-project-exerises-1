
const Products = require("../models/productModel");


// Product controller
const productCtrl = {   
    getAllProducts: async (req, res) => {
        const products = await Products.find()
        res.json(products)
    },
    createProduct: async (req, res) => {
        const {
            product_id,
            title,
            images,
            description,
            content,
            colors,
            sizes,
            price
        } = req.body;
        const product = await Products.findOne({ product_id: product_id })
        if (product) {
            return res.status(400).json({
                msg: "This Product already exists."
            })
        }
        const newProduct = new Products({
            product_id,
            title,
            images,
            description,
            content,
            colors,
            sizes,
            price
        })
        // res.json(newProduct);
        await newProduct.save()
        res.json({ msg: "You have successfully Created a Product" })
    },
    deleteSingleProduct: async (req, res) => {
        await Products.findByIdAndDelete(req.params.id)
        res.json({ msg: "Deleted a Single Product" })
    },
    updateSingleProduct: async (req, res) => {
        const {
            title,
            images,
            description,
            content,
            colors,
            sizes,
            price
        } = req.body;
        await Products.findOneAndUpdate({_id: req.params.id}, {
            title,
            images,
            description,
            content,
            colors,
            sizes,
            price
        })
        res.json({ msg: "Updated a Single Product" })
    },
    getSingleProduct: async (req, res) => {
        const product = await Products.findById(req.params.id)
        res.json(product)
        res.json({ msg: "Get a Single Product" })
    }

}



module.exports = productCtrl;