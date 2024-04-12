const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: [true, "El nombre del producto es requerido"]
    },
    cantidad:{
        type: Number,
        required: [true, "La cantidad es requerida"]
    },
    vencimiento:{
        type: String
    },
    moneda:{
        type: String,
        required: [true, "El tipo de moneda es requerido"]
    },
    precio:{
        type: Number,
        required: [true, "El precio es requerido"]
    },
    clasificacion:{
        type: String,
        required: [true, "La clasificación es requerido"]
    },
    enlatados:{
        type: Boolean,
        default: false,
    },
    granos:{
        type: Boolean,
        default: false,
    },
    carnes:{
        type: Boolean,
        default: false,
    },
    lacteos:{
        type: Boolean,
        default: false,
    },
    cereales:{
        type: Boolean,
        default: false,
    },
    parva:{
        type: Boolean,
        default: false,
    },
    aseo:{
        type: Boolean,
        default: false,
    },
    

},{timestamps: true, versionKey: false})

const producto = mongoose.model("productos", ProductSchema);

module.exports = producto;