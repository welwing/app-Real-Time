const socket = io()
const chatform = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')

const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

socket.on('getRoom',({room}) => {
    outputRoom(room)
})

socket.emit('getUser', ({username, room}))

socket.on('message', msg => {
    console.log(msg)
    outputMessage(msg)
})

chatform.addEventListener('submit', e => {
    e.preventDefault()

    const msg = e.target.elements.msg.value

    socket.emit('chatMessage', msg)

    e.target.elements.msg.value = ''
})

function outputMessage(msg) {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta"> ${msg.username} <span>${msg.time}</span></p>
    <p class="text"> ${msg.message} </p>`
    chatMessages.appendChild(div)

}

function outputRoom(room) {
    roomName.innerText = room.room
}