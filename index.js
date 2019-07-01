require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
var morgan = require('morgan')

const generateId = () => {
  const max = 1000000;
  const randomId = Math.floor(Math.random() * Math.floor(max));
  return randomId
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())

app.post('/api/people', (request, response) => {
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
    if (person) {       
       response.json(person.toJSON())
    } 
    else {        
       response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.delete('/api/people/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/people/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)