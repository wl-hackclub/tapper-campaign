const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const Storage = require('node-storage')
const cron = require('node-cron')

const store = new Storage('globalCount.json')
//store.put('globalCount', 0)

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.emit('updateCounts', store.get('globalCount'))

  cron.schedule('*/1 * * * * *', () => {
    socket.emit('updateCounts', store.get('globalCount'))
  })

  socket.on('incrementGlobalCount', () => {
    store.put('globalCount', store.get('globalCount') + 1)
    console.log(store.get('globalCount'))

    if (store.get('globalCount') === 616)
      socket.emit('winner')
  })
})

http.listen(3000)