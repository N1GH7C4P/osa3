const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
var morgan = require('morgan')

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())

let now = new Date()
let persons = 
  [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 4
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
  ]

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.get('/api/info', (req, res) => {
    res.send(`Phonebook has info for ${persons.length} people.<br></br>${now}`)

  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const max = 1000000;
    const randomId = Math.floor(Math.random() * Math.floor(max));
    return randomId
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({ 
        error: 'Name must be unique!' 
      })
    }

    if (!body.name) {
      return response.status(400).json({ 
        error: 'Name missing!' 
      })
    }
    else if (!body.number) {
      return response.status(400).json({ 
        error: 'Number missing!' 
      })
    }
  
    const newPerson = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(newPerson)
  
    response.json(newPerson)
  })