require('dotenv').config();
const express = require('express')
const { query, validationResult  } = require('express-validator');
const bodyParser = require('body-parser')
const app = express()
const port = process.env.NODE_DOCKER_PORT
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: '1.0.0',
            title: 'Data API',
            description: 'Data API Information',
            contact: {
            name: 'Amazing Developer'
            },
            servers: ['http://localhost:'+ String(port)]
        }
    },
    // ['.routes/*.js']
    apis: ['app.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions)
// Check connection
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// MySQL connection
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10
})
connection.connect(error => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

// App uses
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
/**
 * @swagger
 * /treasures:
 *   get:
 *     description: Retrieve treasures data
 *     parameters:
 *       - name: latitude
 *         description: Latitude on the map.
 *         in: query
 *         required: True
 *         type: string
 *       - name: longitude
 *         description: Longitude on the map.
 *         in: query
 *         required: true
 *         type: string
 *       - name: distance
 *         description: Distance from the latitude and longitude.
 *         in: query
 *         required: true
 *         type: string
 *       - name: prize_value
 *         description: Value of the treasure.
 *         in: query
 *         required: false
 *         type: int
 *     responses:
 *      200:
 *        description: A successful response
 */
app.get(
  '/treasures',
  query('latitude')
    .notEmpty()
    .isNumeric()
    .withMessage('Must be numeric'),
  query('longitude')
    .notEmpty()
    .isNumeric()
    .withMessage('Must be numeric'),
  query('distance')
    .notEmpty()
    .isNumeric()
    .withMessage('Must be numeric')
    .isIn([1, 10])
    .withMessage('Distance must be 1 or 10 kilometers only'),
  query('prize_value')
    .optional({ checkFalsy: true })
    .isInt({ min: 10, max: 30})
    .withMessage('Prize value must be between 10 to 30 and no decimal values'),
  (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  getTreasures(req.query, function (err, content) {
    if (err) {
      res.send(err);
    } else {
      let treasures = content.filter((treasure) => {
        let distance = getDistance(req.query.latitude, req.query.longitude, treasure.latitude, treasure.longitude)

        return distance < req.query.distance;
      });

      if (req.query.prize_value) {
        treasures = treasures.filter((treasure) => {
          return req.query.prize_value <= treasure.amount;
        });
      }

      res.send({treasures});
    }
  })
})

function getTreasures (requestQueries, callback) {
  let query = 'SELECT * FROM treasures;'

  // Check if prize value is empty
  if (requestQueries && requestQueries.prize_value) {
    query = 'SELECT * FROM treasures JOIN money_values ON treasures.id = money_values.treasure_id;'
  }

  connection.query(query, function(err, rows) {
    if (err) {
        callback(err, null);
    } else {
        callback(null, rows);
    }
  });
}

function getDistance (lat1, lon1, lat2, lon2) {
  lat1 = Number(lat1)
  lat2 = Number(lat2)
  lon1 = Number(lon1)
  lon2 = Number(lon2)
  let R = 6371 // Radius of the earth in km
  let dLat = getRadius(lat2 - lat1)  // getRadius below
  let dLon = getRadius(lon2 - lon1)
  let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(getRadius(lat1)) * Math.cos(getRadius(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  let d = R * c // Distance in km

  return d
}

function getRadius (deg) {
  return deg * (Math.PI/180)
}
