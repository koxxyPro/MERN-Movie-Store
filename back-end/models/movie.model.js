import mongoose from "mongoose";

const movieSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        director: {
            type: String,
            required: true
        },
        publishYear: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Movie = mongoose.model('Movie', movieSchema)

export default Movie;