import express from "express";
import data from "./data/data.json";

const app = express();
const PORT = 3000;

// This is a built-in middleware
// This is for the public folder on path /
app.use(express.static("public"));

// This is for images folder on path images/
app.use("/images", express.static("images"));

// Method to use JSON in our data
// app.use(express.json());

// Method to use URLEncoded in our data
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // If we had MongoDB connected, get data first
  res.json(data);
});

// JSON data
// {"hello": "JSON is cool"}
// URLEncoded data
// hello=URLEncoded+is+cool

app.post("/newItem", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

// Params are passed as strings
app.get(
  "/item/:id",
  (req, res, next) => {
    // This is the middleware that pulse the data
    console.log(req.params.id);
    let user = Number(req.params.id);
    console.log(user);
    console.log(data[user]);
    // Middleware that uses the req object
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    // Everything above is middleware
    res.send(data[user]);
    next();
  },
  (req, res) => {
    console.log("Right data?");
  }
);

app
  .route("/item")
  .get((req, res) => {
    //res.download("images/rocket.jpg"); // newer version of send file
    //res.redirect("http://www.google.com"); // redirecting
    //res.end(); // end the call
    res.send(`a get request with /item route on port ${PORT}`);
  })
  .put((req, res) => {
    res.send(`a put request with /newItem route on port ${PORT}`);
  })
  .delete((req, res) => {
    res.send(`a delete request with /item route on port ${PORT}`);
  });

app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
  console.log(data);
});
