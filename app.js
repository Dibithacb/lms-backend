const express = require("express");
const userRouter = require("./routers/userRouter");
const cookieParser=require('cookie-parser')
const cors=require('cors')
const app = express();

app.use(cookieParser())
app.use(express.json());

const frontend_url=process.env.FRONTEND_URL

app.use(cors({origin:'http://localhost:5173',credentials:true}))
//to fetch values from .env file
require('dotenv').config()
const mongoose = require("mongoose");

main()
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

//courses - courseRouter
//localhost:3000

//users - userRouter
//localhost:3000/users
 app.use("/users", userRouter);

// app.get("/", (req, res) => {
//   res.send("hello");
// });
const port=process.env.PORT || 3000
console.log(port)
app.listen(port, () => {
  console.log("Server started");
});

