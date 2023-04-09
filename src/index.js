import dotenv from "dotenv"
import server from "./server.js"
import routes from "./routes/index.js"

const config = dotenv.config()

server(
  routes, 
  config
)
