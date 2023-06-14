const data =  require("./database/fakeData.json");

const updateUser = (req, res, _next) => {
    try {
        const { id } =  req.params
        const { name } = req.body
        
        // Se o id for inválido retorna o erro 400.
        if (isNaN(id)) {
            return res.status(400).json({ message: "Formato id inválido!" });
        }

        // Encontra usuário no banco
        const user = data.findIndex((user) => user.id === Number(id));

        // Validação caso já exista usuário
        const alreadyExist = data.some((user) => user.name === name)
        if (alreadyExist) {
            return res.status(409).json({ message: "Nome já cadastrado." })
        }

        // Se não existir um usuário, retorna o erro 404.
        if (user === -1) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        const updatedUser = {
            ...data[user],
            ...req.body
        };

        data[user] = updatedUser;

        return res.status(200).json(updatedUser); 
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports =  {
   updateUser
};