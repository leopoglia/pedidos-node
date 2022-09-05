const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());


const orderProductsHandler = require("./orderProducts.handler");

router.get("/", (req, res) => {
    orderProductsHandler.getOrderProducts().then(dados => res.json(dados))
})

router.get("/:id", (req, res) => {
    orderProductsHandler.getIdOrderProducts(req.params.id, res).then(dados => res.json(dados));
})

router.post("/", (req, res) => {
    orderProductsHandler.saveOrderProducts(req, res).then(dados => res.json(dados))
})

router.put("/", (req, res) => {
    orderProductsHandler.decreaseOrderProducts(req).then(dados => res.json(dados));
})

// router.delete("/", (req, res) => {
    // orderProductsHandler.deleteOrderProducts(req).then(dados => res.json(dados));
// })

module.exports = router;