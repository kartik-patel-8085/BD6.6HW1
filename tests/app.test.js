const request = require('supertest');
const http = require('http');
const { getAllMovies } = require('../controllers/index');
const { app } = require('../index');

jest.mock('../controllers/index', () => ({
  ...jest.requireActual('../controllers/index'),
  getAllMovies: jest.fn(),
}));

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3000, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Controller Function tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all movies', () => {
    const MockMovie = [
      {
        movieId: 1,
        title: 'Inception',
        genre: 'Sci-Fi',
        director: 'Christopher Nolan',
      },
      {
        movieId: 2,
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        director: 'Frank Darabont',
      },
      {
        movieId: 3,
        title: 'The Godfather',
        genre: 'Crime',
        director: 'Francis Ford Coppola',
      },
    ];

    getAllMovies.mockReturnValue(MockMovie);
    const result = getAllMovies();
    expect(result).toEqual(MockMovie);
    expect(result.length).toBe(3);
  });
});

describe('API Endpoint tests', () => {
  it('GET /movies should return all movies', async () => {
    const MockMovie = {
      movies: [
        {
          director: 'Christopher Nolan',
          genre: 'Sci-Fi',
          movieId: 1,
          title: 'Inception',
        },
        {
          director: 'Frank Darabont',
          genre: 'Drama',
          movieId: 2,
          title: 'The Shawshank Redemption',
        },
        {
          director: 'Francis Ford Coppola',
          genre: 'Crime',
          movieId: 3,
          title: 'The Godfather',
        },
      ],
    };

    getAllMovies.mockReturnValue(MockMovie);

    const res = await request(server).get('/movies');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(MockMovie);
    expect(res.body.movies.length).toBe(3);
  });

  it('GET /movies/details/:id should return a movie by ID', async () => {
    const MockMovie = {
      movieId: 1,
      title: 'Inception',
      genre: 'Sci-Fi',
      director: 'Christopher Nolan',
    };

    getAllMovies.mockReturnValue([MockMovie]);

    const res = await request(server).get('/movies/details/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      movies: MockMovie,
    });
  });
});
