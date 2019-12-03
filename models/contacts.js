const mongoose = require("mongoose");

const url = String(process.env.MONGODB_URI);
mongoose
  .connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log("connected to", url);
  })
  .catch(error => {
    console.log("error connecting to database", error.message);
  });

const contactSchema = new mongoose.Schema({
  name: String,
  number: Number
});

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
  }
});

module.exports = mongoose.model("Contact", contactSchema);
