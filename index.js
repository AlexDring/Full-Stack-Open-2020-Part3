require('dotenv').config()
const express = require('express')
var cors = require('cors')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(logger)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
morgan.token('content', function (req, res) { return JSON.stringify(req.body) })

function logger(request, response, next) {
  console.log('---')
  console.log('Method:', request.method)
  console.log('Body:', request.body)
  console.log('Path:', request.path)
  console.log('---')
  next()
}

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(person => {
      response.json(person)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  console.log(body)
  if (body.name  === undefined || body.number  === undefined) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    date: new Date(),
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  response.send(`
    <p>Phone book has info for ${persons.length} people</p> 
    <p>${new Date()}</p>
    `)
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number
  }
  Person.findOneAndUpdate(request.params.id, person, { new:true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
})

const errorHandler = (error, request, response, next) => {
  console.error('assda', error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }  else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})