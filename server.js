require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const http = require('http').Server(app)
const io = require('socket.io')(http)
const Storage = require('node-storage')
const cron = require('node-cron')
const nodemailer = require('nodemailer')
const Airtable = require('airtable')

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appy4tKao5f5Pelcv')

const store = new Storage('globalCount.json')
// store.put('globalCount', 0)

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.post('/submission', (req, res) => {
  console.log(`received email ${req.body.email}`)

  const transporter = nodemailer.createTransport({
    service: `gmail`,
    auth: {
      user: `mattbstanciu@gmail.com`,
      pass: process.env.GMAIL_PASS
    }
  })
  const mailOptions = {
    from: `mattbstanciu@gmail.com`,
    to: `mattbstanciu@gmail.com`,
    subject: `SOMEBODY WON`,
    text: `${req.body.email} WON A PRIZE!!! At the time, the global count was ${store.get('globalCount')}`
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) return console.log(err)
    console.log(`Email sent: ${data.response}`)
    return res.redirect('/')
  })
})

app.post('/signup', (req, res) => {
  base('Table 1').create({ 'Phone number': req.body.tel },
    (err, record) => {
      if (err) {
        console.error(err)
        return
      }
      console.log(`New phone number added! ${record.getId()}`)
    }
  )
})

io.on('connection', socket => {
  console.log('a user connected')
  socket.emit('updateCounts', store.get('globalCount'))

  cron.schedule('*/1 * * * * *', () => {
    socket.emit('updateCounts', store.get('globalCount'))
  })

  socket.on('incrementGlobalCount', () => {
    store.put('globalCount', store.get('globalCount') + 1)
    // console.log(store.get('globalCount'))

    switch (store.get('globalCount')) {
      case 1000:
        socket.emit('winner', 'a 10,400mAh portable charger')
        break
      case 4000:
        socket.emit('winner', 'a $25 Amazon gift card')
        break
      case 10000:
        socket.emit('winner', 'a Google Home Mini')
        break
      default:
        break
    }
  })
})

http.listen(3000)
