const crud = require("../../crud");

async function getProducts() {
    return await crud.buscar("Products");
}

async function getIdProducts(id) {
    return await crud.buscarPorID("Products", id);
}

async function saveProducts(req) {
    if (req.body.Name && req.body.Price) {
        return await crud.salvar("Products", 0, req.body);
    } else {
        return { error: "001", message: "É necessário preencher os parâmetros da requisição", camposNecessarios: ["Name, Price"] }
    }
}

async function editProducts(req, id) {
    if (req.body.Name && req.body.Price) {
        return await crud.salvar("Products", id, req.body);
    } else {
        return { error: "001", message: "É necessário preencher os parâmetros da requisição", camposNecessarios: ["Name, Price"] }
    }
}

async function deleteProducts(id) {
    return await crud.remover("Products", id);
}


module.exports = {
    getProducts,
    getIdProducts,
    saveProducts,
    editProducts,
    deleteProducts
}