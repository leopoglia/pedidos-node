const crud = require("../../crud");

async function getOrders(req) {
    return await crud.buscar("Orders");
}

async function getIdOrders(id) {
    return await crud.buscarPorID("Orders", id);
}

async function saveOrders(req) {
    const Users = await crud.buscar("Users");
    const id = req.body.UserId;
    const User = Users.findIndex(u => u.id == id);

    if (User == -1) {
        return { error: "002", message: "User não existe" }
    }

    const Orders = await getOrders();
    const OrderUserId = Orders.findIndex(o => o.UserId == req.body.UserId);

    if (OrderUserId != -1) {
        return { error: "003", message: "User já tem uma Order" }
    }

    const Order = {
        "Status": "open",
        ...req.body
    }

    if (req.body.Number && req.body.UserId) {
        return await crud.salvar("Orders", 0, Order);
    } else {
        return { error: "001", message: "É necessário preencher os parâmetros da requisição", camposNecessarios: ["Number, UserId"] }
    }
}

async function editOrders(req, id) {
    if(getIdOrders(id)){
        let Order = getIdOrders(id);
    }else{
        return { error: "001", message: "Ordem não existe" }
    }

    // if (req.body.nome && req.body.descricao && req.body.paginas) {
    //     return await crud.salvar("livros", id, req.body);
    // } else {
    //     return "Precisa ter os campos nome, descrição, paginas e status."
    // }
}

async function deleteOrders(id) {
    return await crud.remover("Orders", id);
}

module.exports = {
    getOrders,
    getIdOrders,
    saveOrders,
    editOrders,
    deleteOrders
}