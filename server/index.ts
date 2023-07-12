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

io.on('connection', (socket) => {
  socket.on('entered-app', (newUser: UserType) => {
    const isExist = onlineUsers.some((u) => u.email === newUser.email)

    if (isExist) {
      io.emit('online-users', onlineUsers)
      return
    } else {
      onlineUsers.push(newUser)
      io.emit('online-users', onlineUsers)
    }
  })

  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter((u) => u.socketId !== socket.id)
    io.emit('online-users', onlineUsers)
  })
})

server.listen(3002, () => {
  console.log('server listening on 3002')
})
