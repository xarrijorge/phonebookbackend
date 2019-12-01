const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("please give a password as argument");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://rxdb:${password}@fullstack-qpshs.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const contactSchema = new mongoose.Schema({
  name: String,
  number: Number
});

const Person = mongoose.model("Contact", contactSchema);

const contact = new Person({
  name: "Victor Von Doom",
  number: +2390888948989
});

contact.save().then(res => {
  console.log("contact saved");
  mongoose.connection.close();
});
