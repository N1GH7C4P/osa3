require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
var morgan = require('morgan')

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

app.post('/people', (request, response) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'Name or number missing!' })
  }

  const person = new Person ({
    name: body.name,
    number: body.number,
    id: generateId(),
  })

  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON())
  })
})

app.get('/api/people', (request, response) => {
  Person.find({}).then(people => {
    response.json(people.map(person => person.toJSON()))
  })
})

app.get('/api/people/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person.toJSON())
  })
})

app.delete('/api/people/:id', (request, response) => {
  const id = Number(request.params.id)
  people = people.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const max = 1000000;
  const randomId = Math.floor(Math.random() * Math.floor(max));
  return randomId
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})