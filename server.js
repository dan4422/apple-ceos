const http = require('http')
const express = require('express')
const es6Renderer = require('express-es6-template-engine')
const {ceo} = require('./data') // the curly brackets will get the same name exported module from the data file
const data = require('./data') // gets all the exported module so you have to call the ceo array after to access it. Ex. data.ceo
// const ceo = data.ceo

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
  const name = req.query.name
  if (name) {
    const ceoDetail = ceo.find(c => c.name.toLowerCase() == name.toLowerCase())
    res.render('ceo-details', {
      partials,
      locals: {
        ceoDetail,
        title: `${ceoDetail.name}'s details page`
      }
    })
    return
  }

  res.render('home', {
    partials,
    locals: {
      ceo,
      title: "Apple CEO Homepage!",
    }
  })
}
)

app.get('/CEOs', (req,res) => {
  res.render('ceo-list', {
    partials,
    locals: {
      ceo,
      title: "CEO-List",
    }
  })
})

app.get('/ceos/:slug', (req,res) => {
  const {slug} = req.params
  const ceoDetail = ceo.find(c => c.slug == slug)
  res.render('ceo-details', {
    partials,
    locals: {
      ceoDetail,
      title: `${ceoDetail.name}'s details page`
    }
  })
})

server.listen(port,hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}/`)
})