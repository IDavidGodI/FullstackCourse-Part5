const express = require("express")
const app = express()
require("express-async-errors")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const cors = require("cors")
const config = require("./utils/config")
const logger = require("./utils/logger")
const mongoose = require("mongoose")

const { unknown, errorHandler, tokenExtractor } = require("./utils/middleware")

mongoose.set("strictQuery", false)

logger.info("connecting to", config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to mongoDB")
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB", error.message)
  })

app.use(cors())
app.use(express.json())
app.use("/api/blogs", tokenExtractor, blogsRouter)
app.use("/users", usersRouter)
app.use("/api/login", loginRouter)

if (process.env.NODE_ENV === "test"){
  const testingRouter = require("./controllers/testing")
  app.use("/api/testing", testingRouter)
}


app.use(unknown)
app.use(errorHandler)

module.exports = app