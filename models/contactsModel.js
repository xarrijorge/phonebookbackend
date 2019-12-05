const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;
mongoose
  .connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to', url);
  })
  .catch(error => {
    console.log('error connecting to database', error.message);
  });

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number: { type: Number, min: 1000000, required: true }
});

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

contactSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Contact', contactSchema);
