const express = require('express')
var cors = require('cors')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
morgan.token('content', function (req, res) { return JSON.stringify(req.body) })

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: "07986789899"
  },
  {
    id: 2,
    name: 'Tim Hellas',
    number: "0791234567"
  },
  {
    id: 3,
    name: 'June Hellas',
    number: "0123456539"
  },
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
}) 

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if(person) {
    response.json(person)
  } else {
    response.status(404)
    .end()
  }
}) 

app.get('/info', (request, response) => {
  response.send(`
    <p>Phone book has info for ${persons.length} people</p> 
    <p>${new Date()}</p>
    `)
}) 

const randomId = () => {
  const totalPeople = persons.length // to set id
  return Math.random() * (totalPeople + 1  - totalPeople) + totalPeople; // generate random number between totalPeople & totalePeople + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  } else if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  } else if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: `${body.name} already exists in the phonebook!`
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id: randomId()
  }

  persons = persons.concat(person) // concats to persons array
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})