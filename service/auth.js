const sessionIdToUserMap = new Map();

function setUser(id, email) {
    sessionIdToUserMap.set(id, email);
}

function getUser(id) {
    return sessionIdToUserMap.get(id);

}

module.exports = {
    setUser,
    getUser,
}