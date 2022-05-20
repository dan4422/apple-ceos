const http = require('http')
const express = require('express')
const es6Renderer = require('express-es6-template-engine')
const ceo = require('./data')

const hostname = 'localhost'
const port = 3000

const app = express()
const server = http.createServer(app)

app.engine('html', es6Renderer) // register es6Renderer as the html engine
app.set('views', 'templates') // set 'views' setting to look in 'templates' folder
app.set('view engine', 'html') // set default 'view engine' to the one registered for html
const partials = {
  head: 'partials/head',
  foot: 'partials/foot'
}

app.use(express.static('./public'))

// routes
app.get('/', (req,res) => {
  res.render('home', {
    partials,
  })
})

server.listen(port,hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}/`)
})