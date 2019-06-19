const mongoose = require('mongoose')
const url = 'mongodb+srv://Yomyssy:o4Vdh61H5baHPwUR@cluster0-j09qz.mongodb.net/puhelinluettelo?retryWrites=true&w=majority'
console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {    
    console.log('connected to MongoDB')  
  })  
  .catch((error) => {    
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', personSchema)