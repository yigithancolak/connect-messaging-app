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

let onlineUsers: string[] = []

io.on('connection', (socket) => {
  console.log(`connected ${socket.id}`)
  onlineUsers.push(socket.id)

  io.emit('online', onlineUsers)

  socket.on('send-message', (message: string) => {
    io.emit('recieve-message', message)
  })

  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter((u) => u !== socket.id)
    io.emit('online', onlineUsers)
  })
})

server.listen(3001, () => {
  console.log('server listening on 3001')
})
