const express = require('express');
const cors = require('cors');
const { getAllMovies, getMoviesById } = require('./controllers');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/movies', async (req, res) => {
  const movies = await getAllMovies();
  res.json(movies);
});

app.get('/movies/details/:id', async (req, res) => {
  let movies = await getMoviesById(parseInt(req.params.id));
  res.json({ movies });
});

module.exports = { app };

// app.listen(3000, () => console.log('Server is running'));
