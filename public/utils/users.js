const users = []

function getUser (username, room, id) {
    const user = {
        username: username,
        room: room,
        id: id
    }

    users.push(user)
    //console.log(users)

    return user
}

function findUser(id) {
    return users.find((user) => user.id == id)

    
}

function userLeave(id) {
    const find = users.findIndex((user) => user.id === id)

    //console.log( users.splice(find)[0])
    return users.splice(find,1)[0]
}

function getRoom(room) {
    return users.find((user) => user.room === room)
}

module.exports = {getUser, findUser, userLeave, getRoom}