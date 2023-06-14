const data =  require("./database/fakeData.json");

const removeUser = (req, res, _next) => { 
    try {
        const { id } = req.params;
        
        // Se o id for inválido retorna o erro 400.
        if (isNaN(id)) {
            return res.status(400).json({ message: "Formato id inválido!" });
        }

        const user = data.findIndex((user) => user.id === Number(id));

        // Se não existir um usuário, retorna o erro 404.
        if (user === -1) {
            return res.status(404).json({ message: "Usuário não encontrado!" });
        }
      
        // Deleta o usuário de fakeData
        data.splice(user, 1);
        
        return res.status(204).json({ message: "usuário deletado com sucesso."})
    } catch (error) {
        return res.status(500).json({ message: "internal server error."})
    }
}

module.exports = {
    removeUser
};