const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());


const productsHandler = require("./products.handler");

router.get("/", (req, res) => {
    productsHandler.getProducts(req, res).then(dados => res.json(dados))
})

router.get("/:id", (req, res) => {
    productsHandler.getIdProducts(req.params.id, res).then(dados => res.json(dados));
})

router.post("/", (req, res) => {
    productsHandler.saveProducts(req, res).then(dados => res.json(dados))
})

router.put("/:id", (req, res) => {
    productsHandler.editProducts(req, req.params.id, res).then(dados => res.json(dados));
})

router.delete("/:id", (req, res) => {
    productsHandler.deleteProducts(req.params.id, res).then(dados => res.json(dados));
})

module.exports = router;