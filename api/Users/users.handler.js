const crud = require("../../crud");

async function getUsers() {
    return await crud.buscar("Users");
}

async function getIdUsers(id) {
    return await crud.buscarPorID("Users", id);

}

async function saveUsers(req, res) {
    const usuarios = await crud.buscar("Users");
    const cpf = req.body.CPF;
    const usuario = usuarios.findIndex(u => u.CPF == cpf);


    if (req.body.Name && req.body.Surname && req.body.CPF) {
        if (usuario == -1) {
            return await crud.salvar("Users", 0, req.body);
        } else {
            res.status(404).send("Já existe esse cpf cadastrado.");
        }
    } else {
        return { error: "001", message: "É necessário preencher os parâmetros da requisição", camposNecessarios: ["Name, Surname, CPF"] }
    }
}

async function editUsers(req, id) {
    if (req.body.nome && req.body.cpf && req.body.telefone && id) {
        return await crud.salvar("Users", id, req.body);
    } else {
        return "Precisa ter os campos nome, cpf, telefone."
    }
}

async function deleteUsers(id) {
    return await crud.remover("Users", id);
}

module.exports = {
    getUsers,
    getIdUsers,
    saveUsers,
    editUsers,
    deleteUsers
}