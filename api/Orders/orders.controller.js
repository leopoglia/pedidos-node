const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());


const ordersHandler = require("./orders.handler");

router.get("/", (req, res) => {
    ordersHandler.getOrders(req,res).then(dados => res.json(dados))
})

router.get("/:id", (req, res) => {
    ordersHandler.getIdOrders(req.params.id, res).then(dados => res.json(dados));
})

router.post("/", (req, res) => {
    ordersHandler.saveOrders(req, res).then(dados => res.json(dados))
})

router.put("/:id", (req, res) => {
    ordersHandler.editOrders(req, req.params.id, res).then(dados => res.json(dados));
})

router.delete("/:id", (req, res) => {
    ordersHandler.deleteOrders(req.params.id, res).then(dados => res.json(dados));
})

module.exports = router;