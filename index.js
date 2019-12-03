require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const Contact = require("./models/contacts");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("build"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

app.options("*", cors());

morgan.token("body", function(req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res) => {
  Contact.find({}).then(contacts => {
    res.json(contacts);
  });
});

app.get("/api/persons/:id", (req, res) => {
  Contact.findById(req.params.id).then(contact => {
    res.json(contact.toJSON());
  });
});

app.delete("/api/persons/:id", (req, res) => {
  req.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  req.method("DELETE");
  const id = Number(req.params.id);
  contacts = contacts.filter(contact => contact.id !== id);
  console.log(req.method);
  res.status(204);
  res.end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "missing name or number"
    });
  }

  const contact = new Contact({
    name: body.name,
    number: body.number
  });

  contact.save();
  res.json(contact);
  res.status(200).end();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
