const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

app.use(cors());
app.use(bodyParser.json());

morgan.token("body", function(req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let contacts = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    important: true,
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    important: true,
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    important: false,
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    important: false,
    id: 4
  },
  {
    name: "big man ",
    number: "+334294-332",
    important: false,
    id: 5
  },
  {
    name: "Another Big man",
    number: "+01223-4532",
    important: false,
    id: 6
  },
  {
    name: "a little lil man",
    number: "09985439389",
    important: true,
    id: 7
  },
  {
    name: "Poor young dave",
    number: "00123",
    important: true,
    id: 8
  },
  {
    name: "Eric badio",
    number: "+334291808",
    important: false,
    id: 11
  },
  {
    name: "General Sackie",
    number: "+233998675998",
    important: false,
    id: 13
  },
  {
    name: "Ayo Babe",
    number: "+231886991644",
    important: false,
    id: 14
  },
  {
    name: "Son Goku",
    number: "+9000",
    important: true,
    id: 15
  }
];
let totalContacts = contacts.length;

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/info", (req, res) => {
  res.send(`<p>Phonebook has info for ${totalContacts} people</p>
  <ps>${new Date()}</ps>`);
});

app.get("/api/persons", (req, res) => {
  res.json(contacts);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const contact = contacts.find(contact => contact.id === id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  contacts = contacts.filter(contact => contact.id !== id);

  res.status(204);
  res.end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const duplicate = contacts.find(contact => contact.name === body.name);

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "missing name or number"
    });
  }

  if (duplicate) {
    return res.status(400).json({
      error: "Name already exists in phonebook"
    });
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    important: body.important || false,
    date: new Date(),
    id: parseInt(Math.random() * 10000)
  };

  // console.log(newPerson);

  contacts = contacts.concat(newPerson);

  res.json(newPerson);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
