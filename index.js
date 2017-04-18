const express = require('express')
const tesseract_wrapper = require('tesseract-wrapper');
const bodyParser = require('body-parser')
const app = express()
const port = 7000
const address = '127.0.0.1'

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({limit: '10mb'}))

var api = express.Router()

api.get('/test', (req, res) => {
  res.json({ message: 'API Testing here' })
})

api.post('/ocr', (req, res) => {
  var options = req.body
  tesseract_wrapper
    .execTesseract(options)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

app.use('/api', api)

var listener = app.listen(port, address, () => {
  console.log('API running on: ' + listener.address().address+':'+listener.address().port)
})
