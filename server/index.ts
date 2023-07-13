import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
const app = express()
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

type UserType = {
  email: string
  name: string
  socketId: string
}

let onlineUsers: UserType[] = []
let userSocketIds: { [email: string]: string } = {}

io.on('connection', (socket) => {
  socket.on('entered-app', (newUser: UserType) => {
    const isExist = onlineUsers.some((u) => u.email === newUser.email)

    if (!isExist) {
      onlineUsers.push(newUser)
    }
    // Associate the user's email with their socket id
    userSocketIds[newUser.email] = socket.id

    io.emit('online-users', onlineUsers)
  })

  socket.on('send-message', (messageDetails) => {
    io.emit('recieve-message', messageDetails)
  })

  socket.on('disconnect', () => {
    // Find the user associated with the disconnected socket id
    const user = onlineUsers.find((u) => userSocketIds[u.email] === socket.id)

    if (user) {
      // Remove the user from onlineUsers
      onlineUsers = onlineUsers.filter((u) => u.email !== user.email)
      // Remove the user's socket id from the map
      delete userSocketIds[user.email]
    }

    io.emit('online-users', onlineUsers)
  })
})

server.listen(3002, () => {
  console.log('server listening on 3002')
})
