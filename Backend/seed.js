const { Genre } = require("./models/genre");
const { Movie } = require("./models/movie");
const { Customer } = require("./models/customer");
const { Rental } = require("./models/rental");
const mongoose = require("mongoose");
const config = require("config");

const customers = [
  { name: "John Doe", phone: "12345", isGold: true },
  { name: "Jane Smith", phone: "54321", isGold: false },
  { name: "Mike Johnson", phone: "98765", isGold: true },
];

const data = [
  {
    name: "Comedy",
    movies: [
      { title: "Airplane", numberInStock: 5, dailyRentalRate: 2 },
      { title: "The Hangover", numberInStock: 10, dailyRentalRate: 2 },
      { title: "Wedding Crashers", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
  {
    name: "Action",
    movies: [
      { title: "Die Hard", numberInStock: 5, dailyRentalRate: 2 },
      { title: "Terminator", numberInStock: 10, dailyRentalRate: 2 },
      { title: "The Avengers", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
  {
    name: "Romance",
    movies: [
      { title: "The Notebook", numberInStock: 5, dailyRentalRate: 2 },
      { title: "When Harry Met Sally", numberInStock: 10, dailyRentalRate: 2 },
      { title: "Pretty Woman", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
  {
    name: "Thriller",
    movies: [
      { title: "The Sixth Sense", numberInStock: 5, dailyRentalRate: 2 },
      { title: "Gone Girl", numberInStock: 10, dailyRentalRate: 2 },
      { title: "The Others", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
];

async function seed() {
  await mongoose.connect(config.get("db"));

  // Clear existing data
  await Movie.deleteMany({});
  await Genre.deleteMany({});
  await Customer.deleteMany({});
  await Rental.deleteMany({});

  // Insert genres & movies
  for (let genre of data) {
    const { _id: genreId } = await new Genre({ name: genre.name }).save();
    const movies = genre.movies.map((movie) => ({
      ...movie,
      genre: { _id: genreId, name: genre.name },
    }));
    await Movie.insertMany(movies);
  }

  // Insert customers
  await Customer.insertMany(customers);

  // Insert rentals
  const savedCustomers = await Customer.find();
  const savedMovies = await Movie.find();

  const rentals = [
    new Rental({
      customer: {
        _id: savedCustomers[0]._id,
        name: savedCustomers[0].name,
        phone: savedCustomers[0].phone,
        isGold: savedCustomers[0].isGold,
      },
      movie: {
        _id: savedMovies[0]._id,
        title: savedMovies[0].title,
        dailyRentalRate: savedMovies[0].dailyRentalRate,
      },
    }),
    new Rental({
      customer: {
        _id: savedCustomers[1]._id,
        name: savedCustomers[1].name,
        phone: savedCustomers[1].phone,
        isGold: savedCustomers[1].isGold,
      },
      movie: {
        _id: savedMovies[3]._id,
        title: savedMovies[3].title,
        dailyRentalRate: savedMovies[3].dailyRentalRate,
      },
    }),
  ];

  await Rental.insertMany(rentals);

  mongoose.disconnect();
  console.info("Seeding completed with Rentals!");
}

seed();
