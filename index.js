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
  res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, OPTIONS");
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

app.get("/info", (req, res, next) => {
  Contact.countDocuments({}).then(count => {
    res.send(`<h4>Phonebook has ${count} people</h4><h4>${new Date()}</h4>`);
  });
});

app.get("/api/persons", (req, res, next) => {
  Contact.find({})
    .then(contacts => {
      res.json(contacts);
    })
    .catch(error => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  Contact.findById(req.params.id)
    .then(contact => {
      if (contact) {
        res.json(contact.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
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

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  const contact = {
    number: body.number
  };

  Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
    .then(updatedContact => {
      res.json(updatedContact.toJSON());
    })
    .catch(error => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
