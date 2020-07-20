import express from "express"
import bp from "body-parser"


let server = express()

server.use(bp.urlencoded({ extended: true }))
server.use(bp.json())

const port = 3000

// server.use("/", (req, res, next) => {
//     res.send("You found a server")
// })

server.use("/api/hello", (req, res, next) => {
    res.send("Hello")
})

import BurgerController from "./controllers/BurgersController";
server.use("/api/burgers", new BurgerController().router)

server.use((req, res, next) => {
    res.status(404).send("Route not found")
})

server.listen(port, () => {
    console.log(`Hey your server is running on port ${port}, you better go catch it!`)
})