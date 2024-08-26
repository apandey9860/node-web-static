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

module.exports = router;
