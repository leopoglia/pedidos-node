const crud = require("../../crud");

async function getOrderProducts() {
    return await crud.buscar("OrderProducts");
}

async function getIdOrderProducts(id) {
    return await crud.buscarPorID("OrderProducts", id);
}

async function searchOrder(req) {
    const Orders = await crud.buscar("Orders");
    const orderId = req.body.OrderId;
    return Orders.findIndex(u => u.id == orderId);
}

async function searchProduct(req) {
    const Products = await crud.buscar("Products");
    const productId = req.body.ProductId;
    return Products.findIndex(p => p.id == productId);
}

async function saveOrderProducts(req) {

    if (req.body.ProductId && req.body.Quantity && req.body.OrderId) {
        const OrdersProducts = await getOrderProducts();
        const orderArray = await searchOrder(req);
        const productArray = await searchProduct(req);

        if (productArray == -1) {
            return { error: "002", message: "O Product não existe" }
        }

        if (orderArray == -1) {
            return { error: "002", message: "A Order não existe" }
        }

        const Orders = await crud.buscarPorID("Orders", req.body.OrderId);

        if (Orders.Status != "open") {
            return { error: "003", message: "A Order não pode estar fechada" }
        }

        if (orderArray != -1) {
            let Order = OrdersProducts[orderArray];
            for (Order of OrdersProducts) {

                if (Order.OrderId == req.body.OrderId && Order.ProductId == req.body.ProductId) {
                    req.body.Quantity += Order.Quantity;
                    return await crud.salvar("OrderProducts", Order.id, req.body);
                }
            }
            return await crud.salvar("OrderProducts", 0, req.body);
        }

    } else {
        return { error: "001", message: "É necessário preencher os parâmetros da requisição", camposNecessarios: ["ProductId, Quantity, OrderId"] }
    }
}

async function editOrderProducts(req, id) {
    if (req.body.nome) {
        return await crud.salvar("OrderProducts", id, req.body);
    } else {
        return "Precisa ter o campos nome."
    }
}

async function decreaseOrderProducts(req) {
    if (req.body.ProductId && req.body.Quantity && req.body.OrderId) {
        const OrdersProducts = await getOrderProducts();
        const orderArray = await searchOrder(req);
        const productArray = await searchProduct(req);

        if (productArray == -1) {
            return { error: "002", message: "O Product não existe" }
        }

        if (orderArray == -1) {
            return { error: "002", message: "A Order não existe" }
        }

        const Orders = await crud.buscarPorID("Orders", req.body.OrderId);

        if (Orders.Status != "open") {
            return { error: "003", message: "A Order não pode estar fechada" }
        }

        if (orderArray != -1) {
            let Order = OrdersProducts[orderArray];
            for (Order of OrdersProducts) {
                if (Order.OrderId == req.body.OrderId && Order.ProductId == req.body.ProductId) {
                    req.body.Quantity = Order.Quantity - req.body.Quantity;

                    if (req.body.Quantity > 0) {
                        return await crud.salvar("OrderProducts", Order.id, req.body);
                    } else {
                        return await crud.remover("OrderProducts", Order.id);
                    }

                }
            }
        }
        return { error: "004", message: "A ordem não possui esse produto" };
    } else {
        return { error: "001", message: "É necessário preencher os parâmetros da requisição", camposNecessarios: ["ProductId, Quantity, OrderId"] }
    }
}

module.exports = {
    getOrderProducts,
    getIdOrderProducts,
    saveOrderProducts,
    decreaseOrderProducts
}