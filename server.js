const express = require ('express')
const http = require ('http')
const socketio = require ('socket.io')
const formatMessage = require ('./public/utils//message')
const {getUser, findUser, userLeave, getRoom} = require ('./public/utils/users')

const app  = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static('public'))

io.on('connection', socket => {

    socket.on('getUser', ({username, room}) => {
        const user = getUser(username, room, socket.id)

        socket.join(user.room)

        socket.emit('message', formatMessage('bot',`selamat bergabung`))

        socket.broadcast.to(user.room).emit('message', formatMessage('bot',`${user.username} telah bergabung`))

        socket.emit('getRoom',{
            room: getRoom(user.room)
        })
    
        socket.on('chatMessage', msg => {
            const user = findUser(socket.id)

            io.to(user.room).emit('message', formatMessage(user.username,msg))
        })

    })

    socket.on('disconnect', () => {
        const user = userLeave(socket.id)

        if(user) {
            io.emit('message', formatMessage('bot',`${user.username} telah keluar`))
        }

       
    })

})

const port = 8080

server.listen(port, () => {
    console.log(`http://localhost:${port}`)
})