const express = require('express');
const fs = require('fs');
const path = require('path');
const pool = require('../utils/dbConfig');
const router = express.Router();

// Example route
router.get('/test', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

// Route to create a new user
router.post('/create', async (req, res) => {
  const { user_name, user_fullname, user_password, user_phone, user_email, user_address, user_access_id } = req.body;
  try {
      const result = await pool.query(
          `CALL PERSON.create_user($1, $2, $3, $4, $5, $6, $7)`,
          [user_name, user_fullname, user_password, user_phone, user_email, user_address, user_access_id]
      );
      res.status(200).send('User created successfully');
  } catch (err) {
      res.status(400).send(`Error creating user: ${err.message}`);
  }
});

// Route to update user information
router.put('/update', async (req, res) => {
  const { user_id, user_name, user_fullname, user_password, user_phone, user_email, user_address, user_access_id } = req.body;
  try {
      const result = await pool.query(
          `CALL PERSON.update_user($1, $2, $3, $4, $5, $6, $7, $8)`,
          [user_id, user_name, user_fullname, user_password, user_phone, user_email, user_address, user_access_id]
      );
      res.status(200).send('User updated successfully');
  } catch (err) {
      res.status(400).send(`Error updating user: ${err.message}`);
  }
});

// Route to delete a user
router.delete('/delete', async (req, res) => {
  const { user_id, user_password } = req.body;
  try {
      const result = await pool.query(
          `CALL PERSON.delete_user($1, $2)`,
          [user_id, user_password]
      );
      res.status(200).send('User deleted successfully');
  } catch (err) {
      res.status(400).send(`Error deleting user: ${err.message}`);
  }
});

// Route to verify user credentials
router.post('/verify', async (req, res) => {
  const { user_name, user_password } = req.body;
  try {
      const result = await pool.query(
          `CALL PERSON.verify_user_credentials($1, $2)`,
          [user_name, user_password]
      );
      if (result.rows[0]) {
          res.status(200).send('User verified successfully');
      } else {
          res.status(401).send('Invalid credentials');
      }
  } catch (err) {
      res.status(400).send(`Error verifying user: ${err.message}`);
  }
});



module.exports = router;
