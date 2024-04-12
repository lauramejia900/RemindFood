const product = require("../models/product.model");

module.exports.get_all = (req, res) =>{
    product.find()
    .then(products => res.json(products))
    .catch(err => {
        console.log(err)
        res.status(400).json(err)
    });
}

module.exports.create_product = (req, res) =>{
    product.create(req.body)
    .then(product=>res.json(product))
    .catch(err => {
        console.log(err)
        res.status(400).json(err)
    });
}

module.exports.get_product = (req, res) =>{
    product.findOne({_id: req.params.id})
    .then(product=>res.json(product))
    .catch(err => {
        console.log(err)
        res.status(400).json(err)
    });
}

module.exports.update_product = (req, res) =>{
    product.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true})
    .then(product=>res.json(product))
    .catch(err => {
        console.log(err)
        res.status(400).json(err)
    });
}


module.exports.delete_product = (req, res) =>{
    product.deleteOne({_id:req.params.id})
    .then(result=>res.json(result))
    .catch(err => {
        console.log(err)
        res.status(400).json(err)
    });
}