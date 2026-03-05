// Import express
const express = require('express');   // TODO

// Create app
const app = express();       // TODO

// Middleware to parse JSON
app.use(express.json());          // TODO

// In-memory array
let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];


// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// const getUsers_test=(()=>{
//     return JSON.parse(users)
// })

// READ ALL USERS
app.get("/users", (req, res) => {
  // TODO: return users array
  const users=getUsers_test()
  res.status(200).JSON.parse(users)
  console.log(JSON.parse(users))
});


// CREATE USER
app.post("/users", (req, res) => {
  // TODO:
  // 1. Get name from req.body
  // 2. Create new user object
  // 3. Push to users array
  // 4. Send response
  const newUser={
    id:users.length+1,
    name:req.body.name
  }
  users.push(newUser)
  res.send.Status(201).json(newUser)
});


// UPDATE USER
app.put("/users/:id", (req, res) => {
  // TODO:
  // 1. Get id from params
  // 2. Find user in array
  // 3. Update name from req.body
  // 4. Send updated user
});


// DELETE USER
app.delete("/users/:id", (req, res) => {
  // TODO:
  // 1. Get id
  // 2. Remove user from array
  // 3. Send success message
});


// START SERVER
app.listen(___________, () => {
  console.log("Server started on port 3000");
});