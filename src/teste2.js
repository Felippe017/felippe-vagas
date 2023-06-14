const data =  require("./database/fakeData.json");

const createUser = (req, res, _next) => {
    try {
        const { name, job } = req.body;

        // Validação caso não aja name ou job na requisição.
        if (!name || !job) {
            return res.status(400).json({
                message: "Nome e profissão são obrigatórios."
            })
        }
        
        // Validação caso já exista usuário
        const alreadyExist = data.find((user) => user.name === name)
        if (alreadyExist) {
            return res.status(409).json({ message: "Usuário já cadastrado" })
        }

        // No id, cria lógica para que na criação do usuário, o id não se repita.
        const newUser = {
            id: Math.max(...data.map(user => user.id)) + 1,
            name,
            job
        }
        
        // Cria usuário normalmente
        data.push(newUser);

        return res.status(201).json({ 
            message: "Usuário criado com sucesso",
            newUser
        })

    } catch (error) {
        return res.status(500).json({ message: "internal server error" })
    }

}

module.exports = {
    createUser
}