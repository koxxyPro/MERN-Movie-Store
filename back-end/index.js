import express from 'express'
import { port, mongoDBURL } from './config.js'
import mongoose from 'mongoose'
import Movie from './models/movie.model.js'
import movieRoute from './routes/movieRoute.js'
import cors from 'cors'

const app = express()

// Middleware for parsing req body
app.use(express.json())

// Middleware for using CORS Policy
app.use(
    cors({
        origin: "http://localhost:5000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"]
    })
)

// Home Route
app.get('/', (req, res) => {
    res.send("Now running")
})

app.use('/movies', movieRoute)

mongoose.connect(mongoDBURL)
    .then(() => {
        app.listen(port, () => {
            console.log(`Application is now running on ${port}`)
        })

        console.log("Connected to DB")
    })
    .catch(error => {
        console.log(error)
    })