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
    let number = 0, maior = 0;

    if (User == -1) {
        return { error: "002", message: "User não existe" }
    }

    const Orders = await getOrders();
    const OrderUserId = Orders.findIndex(o => o.UserId == req.body.UserId);

    if (OrderUserId != -1) {

        for (let i = 0; i < Orders.length; i++) {
            if (Orders[i].UserId == req.body.UserId) {
                if (Orders[i].Number > maior) {
                    maior = Orders[i].Number;
                    number = maior + 1;
                }

                if (Orders[i].Status == "open") {
                    return { error: "003", message: "User já possui uma Order aberta" }
                }
            }
        }
    }

    if (number == 0) {
        number = 1;
    }

    const Order = {
        "Status": "open",
        "Number": number,
        ...req.body
    }

    if (req.body.UserId) {
        return await crud.salvar("Orders", 0, Order);
    } else {
        return { error: "001", message: "É necessário preencher os parâmetros da requisição", camposNecessarios: ["UserId"] }
    }
}

async function editOrders(req, id) {
    const Orders = await crud.buscar("Orders");
    const orderArray = Orders.findIndex(u => u.id == id);


    if (orderArray != -1) {
        let Order = await getIdOrders(id);
        if (Order.Status == "open") {
            Order.Status = 'close';
            return await crud.salvar("Orders", id, Order);
        } else {
            return { error: "002", message: "A Order já está fechada" }
        }

    } else {
        return { error: "001", message: "Ordem não existe" }
    }



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