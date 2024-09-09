// repairRouter.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const pool = require('../utils/dbConfig');
const router = express.Router();

// Add Repair Category
router.post('/addCategory', async (req, res) => {
    const { category_name, category_desc } = req.body;
    try {
        await pool.query(`CALL REPAIR.add_repair_category($1, $2)`, [category_name, category_desc]);
        res.status(200).send('Repair category added successfully');
    } catch (err) {
        res.status(400).send(`Error adding repair category: ${err.message}`);
    }
});

// Update Repair Category
router.put('/updateCategory', async (req, res) => {
    const { category_id, category_name, category_desc } = req.body;
    try {
        await pool.query(`CALL REPAIR.update_repair_category($1, $2, $3)`, [category_id, category_name, category_desc]);
        res.status(200).send('Repair category updated successfully');
    } catch (err) {
        res.status(400).send(`Error updating repair category: ${err.message}`);
    }
});

// Delete Repair Category
router.delete('/deleteCategory', async (req, res) => {
    const { category_id } = req.body;
    try {
        await pool.query(`CALL REPAIR.delete_repair_category($1)`, [category_id]);
        res.status(200).send('Repair category deleted successfully');
    } catch (err) {
        res.status(400).send(`Error deleting repair category: ${err.message}`);
    }
});

// Add Repair Product with Picture
router.post('/addProduct', async (req, res) => {
    const { p_product_name, p_product_price,p_product_short_desc, p_product_desc, p_category_id, p_prod_pic_name, p_prod_pic_data,p_user_id,p_prod_tline_interval  } = req.body;
    console.log(  p_product_name, p_product_price,p_product_short_desc, p_product_desc, p_category_id, p_prod_pic_name, p_prod_pic_data,p_user_id,p_prod_tline_interval );
    
    try {
        await pool.query(
            `CALL REPAIR.add_repair_product($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [ p_product_name, p_product_price,p_product_short_desc, p_product_desc, p_category_id, p_prod_pic_name, p_prod_pic_data,p_user_id,p_prod_tline_interval ]
        );
        res.status(200).send('Repair product added successfully');
    } catch (err) {
        res.status(400).send(`Error adding repair product: ${err.message}`);
    }
});

// Update Repair Product with Picture
router.put('/updateProduct', async (req, res) => {
    const { product_id, product_name, product_price, product_desc, category_id, prod_pic_name, prod_pic_data } = req.body;
    try {
        await pool.query(
            `CALL REPAIR.update_repair_product($1, $2, $3, $4, $5, $6, $7)`,
            [product_id, product_name, product_price, product_desc, category_id, prod_pic_name, prod_pic_data]
        );
        res.status(200).send('Repair product updated successfully');
    } catch (err) {
        res.status(400).send(`Error updating repair product: ${err.message}`);
    }
});

// Delete Repair Product
router.delete('/deleteProduct', async (req, res) => {
    const { product_id } = req.body;
    try {
        await pool.query(`CALL REPAIR.delete_repair_product($1)`, [product_id]);
        res.status(200).send('Repair product deleted successfully');
    } catch (err) {
        res.status(400).send(`Error deleting repair product: ${err.message}`);
    }
});

//Route to fetch all Repair details
router.get('/getAllProductDetails', async (req, res) => {
    try {
        // Query the PostgreSQL function
        const result = await pool.query('SELECT * FROM REPAIR.GetAllProductDetails()');
        // Send the result as JSON response
        res.status(200).json(result.rows);
    } catch (err) {
        // Handle errors
        res.status(400).send(`Error fetching repair product details: ${err.message}`);
    }
});

//Route to fetch product detail by id
router.get('/getProductById', async (req, res) => {
    const { product_id } = req.query;
    try {
        // Query the PostgreSQL function
        const result = await pool.query(`SELECT * FROM REPAIR.GetProductDetailsById($1)`, [product_id]);
        // Send the result as JSON response
        // Check if the product exists
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]); // Send the first result as JSON response
        } else {
            res.status(404).send('Product not found');
        }
    } catch (err) {
        // Handle errors
        res.status(400).send(`Error fetching product details: ${err.message}`);
    }
});



module.exports = router;
