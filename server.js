const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const http = require('http').Server(app)
const io = require('socket.io')(http)
const Storage = require('node-storage')
const cron = require('node-cron')
const nodemailer = require('nodemailer')

const store = new Storage('globalCount.json')
//store.put('globalCount', 0)

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.post('/submission', (req, res) => {
  console.log(`received email ${req.body.email}`)

  var transporter = nodemailer.createTransport({
    service: `gmail`,
    auth: {
      user: `mattbstanciu@gmail.com`,
      pass: process.env.GMAIL_PASS
    }
  })

  var mailOptions = {
    from: `mattbstanciu@gmail.com`,
    to: `mattbstanciu@gmail.com`,
    subject: `SOMEBODY WON`,
    text: `${req.body.email} WON A PRIZE!!!`
  }
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) return console.log(err)
    console.log(`Email sent: ${data.response}`)
    return res.redirect('/')
  })
})

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.emit('updateCounts', store.get('globalCount'))

  cron.schedule('*/1 * * * * *', () => {
    socket.emit('updateCounts', store.get('globalCount'))
  })

  socket.on('incrementGlobalCount', () => {
    store.put('globalCount', store.get('globalCount') + 1)
    //console.log(store.get('globalCount'))

    switch (store.get('globalCount')) {
      case 1000:
        socket.emit('winner', 'a $20 Amazon gift card')
        break;
      case 4000:
        socket.emit('winner', 'a Google Home Mini')
        break;
      case 10000:
        socket.emit('winner', 'an exclusive GitHub plushie')
        break;
      default:
        break;
    }
  })
})

http.listen(3000)
