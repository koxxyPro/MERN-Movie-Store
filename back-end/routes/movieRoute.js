import express from 'express'
import Movie from '../models/movie.model.js'

const router = express.Router()

// Add new movie route
router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.director || !req.body.publishYear) return res.status(400).send("Fill all required fields : title, director, publishYear")
        const newMovie = {
            title: req.body.title,
            director: req.body.director,
            publishYear: req.body.publishYear
        }

        const movie = await Movie.create(newMovie)

        res.status(200).send(movie)

    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
})

//Get all movies from db route
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find()
        res.status(200).json({
            count: movies.length,
            data: movies
        })
    } catch (error) {
        console.log(error.message)
    }
})

// Get all movie by ID from db route
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        if (!movie) return res.status(404).send("Movie with this ID is not found")
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).send("Error while fetching the movie from database")
    }
})

// Edit movie from db route
router.put('/:id', async (req, res) => {
    try {
        //validate
        if (!req.body.title || !req.body.director || !req.body.publishYear) return res.status(400).send("Fill all required fields : title, director, publishYear")
        const newMovie = {
            title: req.body.title,
            director: req.body.director,
            publishYear: req.body.publishYear
        }

        const { id } = req.params
        const result = await Movie.findByIdAndUpdate(id, req.body)

        if (!result) return res.status(404).send("Movie not found")

        res.status(200).send("Movie updated successfully")
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Delete request route
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedMovie = await Movie.findByIdAndDelete(id, req.body)

        if (!deletedMovie) return res.status(404).send("Movie not found")
        res.status(200).send("Movie deleted successfully")
    } catch (error) {
        res.status(500).send(error.message)
    }
})

export default router;