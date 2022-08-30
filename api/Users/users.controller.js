const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());


const usersHandler = require("./users.handler");

router.get("/", (req, res) => {
    usersHandler.getUsers(req,res).then(dados => res.json(dados));
})

router.get("/:id", (req, res) => {
    usersHandler.getIdUsers(req.params.id).then(dados => res.json(dados));
})

router.post("/", (req, res) => {
    usersHandler.saveUsers(req, res).then(dados => res.json(dados));
})

router.put("/:id", (req, res) => {
    usersHandler.editUsers(req, req.params.id).then(dados => res.json(dados));
})

router.delete("/:id", (req, res) => {
    usersHandler.deleteUsers(req.params.id).then(dados => res.json(dados));
})

module.exports = router;