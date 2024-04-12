const productController = require("../controllers/product.controller");
const UserController = require("../controllers/user.controller");
const {authenticate} = require("../config/jwt.config"); 

module.exports = app =>{
    app.get("/api/products", authenticate, productController.get_all);
    app.post("/api/product", productController.create_product);
    app.get("/api/product/:id", authenticate, productController.get_product);
    app.put("/api/product/:id", productController.update_product);
    app.delete("/api/product/:id", productController.delete_product)

    app.post('/api/register', UserController.register);
    app.post('/api/login', UserController.login);
    app.get('/api/logout', UserController.logout);
}