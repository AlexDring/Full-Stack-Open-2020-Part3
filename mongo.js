// const mongoose = require('mongoose');

// if (process.argv.length < 3) {
//   console.log('Please provide the password as an argument: node mongo.js <password>')
//   process.exit(1)
// }

// const password = process.argv[2]

// const url = `mongodb+srv://phonebookadmin:${password}@cluster0.knkvy.mongodb.net/persons?retryWrites=true&w=majority`

// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String,
//   date: Date
// })

// const Person = mongoose.model('Person', personSchema)

// if (process.argv.length > 3) {
//   const person = new Person({
//     name: process.argv[3],
//     number: process.argv[4],
//     date: new Date()
//   })

//   person.save().then(result => {
//   console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
//   mongoose.connection.close()
// })
// } else if (process.argv.length === 3) {
//   console.log('phonebook:')
//   Person.find({}).then(result => {
//     result.forEach(person => {
//       console.log(person.name, person.number)
//     })
//     mongoose.connection.close()
//   })
// }