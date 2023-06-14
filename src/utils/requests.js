// Criar um objeto ou array para armazenar o número de leituras de cada usuário
const dataReqs = {};

const incReqs = (id) => {
    // Verifica se o usuário já existe no objeto de dataReqs
    return dataReqs[id] ? dataReqs[id] += 1 : dataReqs[id] = 1;
}

const getReqsUser = (id) => {
    return dataReqs[id] ? dataReqs[id] : 0
}

module.exports = {
    incReqs,
    getReqsUser
}