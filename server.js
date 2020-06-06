const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

//express app
const app = express()

//parse requests of content-type - application/x-www-form-urlencoded
app.use(
    bodyParser.json({
        extended: true
    })
);

//parse requests of content-type - application/json
app.use(bodyParser.urlencoded({
    extended: true
    })
)
app.use(bodyParser.json())
app.use(cors())

//Configuring Databse
// const dbConfig = require('./config/database.config.js');
// const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

const {pool} = require('./config/database.config.js')

//Connecting to Database
// mongoose.connect(dbConfig.url, {
//     useNewUrlParser: true
// }).then(() => {
//     console.log("Successfully connected to the databse");
// }).catch(err => {
//     console.log("Could not connect to the databse", err);
//     process.exit();
// });

var router = express.Router()


const getBooks = (request, response) => {
    pool.query('SELECT * FROM books', (error, results) => {
      if (error) {
        console.log(error)
        throw error
      }
      output=results.rows
      response.status(200).json({"error":false,output})
    })
}

const addBook = (request, response) => {
    console.log("This is body: ", request.body)
    const { author, book_name } = request.body
      
    pool.query('INSERT INTO books (author, book_name) VALUES ($1, $2)', [author, book_name], error => {
      if (error) {
        console.log(error)
        throw error
      }
      response.status(201).json({ status: 'success', message: 'Book added.' })
    })
}

const home = (request, response) => {
    response.status(200).json({"error": false, "message":"Welcome to Book-Shelf Management Application"});
}

// app
//   .route('/books')
//   // GET endpoint
//   .get(getBooks)
//   // POST endpoint
//   .post(addBook)

router.get('/', home)
router.get('/books', getBooks)
router.post('/books', addBook)

app.use('/', router)
  

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server is listening on port 3002`)
})




//define a simple route
// app.get('/', (req, res) => {
//     res.json({"message":"Welcome to Book-Shelf Management Application"});
// })

// //listen for requests
// app.listen(port, () => {
//     console.log("Server is listening on port ${port}");
// });



