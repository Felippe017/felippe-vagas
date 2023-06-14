const data =  require("./database/fakeData.json");
const { getReqsUser } = require("./utils/requests")

const countAcess = (req, res, _next) => {
    try {
        const { id } = req.params;
        const { name } = req.query;

        // Se o id for inválido retorna o erro 400.
        if (isNaN(id)) {
            return res.status(400).json({ message: "Formato id inválido!" });
        }

        // Encontra o usuário no banco.
        const user = data.find((user) => user.id === Number(id));

        // Se não existir um usuário, retorna o erro 404.
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        const counterReqs = getReqsUser(id);

        return res.status(200).json({ message: `Usuário ${user.name} foi lido ${counterReqs} vezes.` })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    countAcess
}
