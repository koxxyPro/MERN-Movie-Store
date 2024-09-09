const port = process.env.PORT || 5000

// const mongoDBURL = "mongodb+srv://admin:admin@movie-store.avgp8.mongodb.net/Movie-Store-MERN?retryWrites=true&w=majority&appName=Movie-Store"
const mongoDBURL = "mongodb://localhost:27017/movies-db"

export { port, mongoDBURL }