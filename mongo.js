const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument, then name & number')
  process.exit(1)
}

const password = process.argv[2]
const url =
  `mongodb+srv://Yomyssy:${password}@cluster0-j09qz.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })


if(process.argv.length > 3){  
  const name = process.argv[3]
  const number = process.argv[4]
  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  const Person = mongoose.model('Person', personSchema)
  const person = new Person({
    name: name,
    number: number
  })
  person.save().then(response => {
    console.log('Contact saved!');
    mongoose.connection.close();
  })
}else{
  Person.find({}).then(result => {
  result.forEach(person => {
    console.log(person)
  })
  mongoose.connection.close()
})
}





