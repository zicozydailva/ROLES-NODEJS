require('dotenv').config()
const express = require("express");
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth")
const jobRouter = require("./routes/jobs")
const auth = require("./middleware/authentication")
const app = express();

app.use(express.json());
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/jobs", auth, jobRouter)

const start = async () => {
  try {
    app.listen(3000, () => {
      console.log("Server running on port 3000")
    })
    await connectDB(process.env.MONGO_URL)
  } catch(err) {
    console.log(err)
  }
}

start()