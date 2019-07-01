const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
var uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI || "mongodb+srv://Yomyssy:sekred@cluster0-j09qz.mongodb.net/puhelinluettelo?retryWrites=true&w=majority"
console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {    
    console.log('connected to MongoDB')  
  })  
  .catch((error) => {    
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    number: {type: String, required: true, unique: false},
})
personSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' })

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', personSchema)