const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());

const orders = require("./api/Orders/orders.controller");
router.use("/orders", orders);

const users = require("./api/Users/users.controller");
router.use("/users", users);

const orderProducts = require("./api/OrderProducts/orderProducts.controller");
router.use("/orderProducts", orderProducts);

const products = require("./api/Products/products.controller");
router.use("/products", products);

module.exports = router;