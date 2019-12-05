const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('please give a password as argument');
  process.exit(1);
}

const password = process.argv[2];
const contactName = process.argv[3];
const contactNumber = process.argv[4];

const url = `mongodb+srv://rxdb:${password}@fullstack-qpshs.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const contactSchema = new mongoose.Schema({
  name: String,
  number: Number
});

const Contact = mongoose.model('Contact', contactSchema);

if (process.argv.length >= 5) {
  const contact = new Contact({
    name: contactName,
    number: contactNumber
  });

  contact.save().then(res => {
    console.log(`added ${contactName} number ${contactNumber} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Contact.find({}).then(res => {
    console.log('phonebook:');
    res.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
