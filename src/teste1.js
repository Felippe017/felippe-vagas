const data =  require("./database/fakeData.json");
const { incReqs } = require("./utils/requests");

const getUser = ( req, res, _next ) => {
    try {
        const { id } = req.params;

        // Se o id for inválido retorna o erro 400.
        if (isNaN(id)) {
            return res.status(400).json({ message: "Formato id inválido!" });
        }
        
        // Buscando usuário
        const user = data.find(({ id: databaseId }) => databaseId === Number(id))

        // Caso não encontre usuário, retorna erro com código 404.
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" })  
        }

        // Incrementa a quantidade de vezes em que houve requisição
        incReqs(id);

        return res.status(200).json({ user })    
    } catch (error) {
        return res.status(500).json({ message: "internal server error" })
    }
};

const getUsers = ( req, res, next ) => {
    
    res.send(data);
    
};

module.exports = {
    getUser,
    getUsers
};