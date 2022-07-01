const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
   // For testing only, can be removed
   const query = `
    SELECT * FROM item;
   `
   pool.query(query)
    .then((results)=>{
        res.send(results.rows)
    })
    .catch((err)=>{
      console.error(`Query failed: ${err}`);
    })
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  console.log('in POST', req.body);

  const sqlQuery = `
    INSERT INTO item (description, image_url, user_id)
    VALUES ($1, $2, $3)`;
  const sqlParams = [
    req.body.description,
    req.body.image_url,
    req.user.id
  ];
  pool.query(sqlQuery, sqlParams)
  .then((results) => {
    console.log('POST is sending', results.rows);
    res.sendStatus(201);
  })
  .catch((err) => {
    console.log('error in post router', err);
    res.sendStatus(500);
  })
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  // endpoint functionality

  // Get the user as a variable
  const userId = req.user.id
  // Get the shelf item from the url
  const shelfItem = req.params.id

  // Construct the SQL Query that will delete the selected item
  // if the user has proper permissions
  const sqlQuery = `
    DELETE FROM item
    WHERE item.id = $1
    AND item.user_id = $2
    RETURNING *
  `

  const sqlParams = [
    shelfItem, // Specific shelf item
    userId,    // Specific user
  ]

  pool.query(sqlQuery, sqlParams)
  .then(response => {

    console.log(response.rows, "This was the response")

    if (response.rows.length) {
      // Send a 200 response indicating a row was deleted
      res.sendStatus(200)
      return
    }

    // Otherwise, send a 401 response indicating that the
    // incorrect permissions are missing
    res.sendStatus(401)

    
  })
  .catch(err => {
    console.log(`Error in the server DELETE route with ${err}`)
    res.sendStatus(500)
  })
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
