// repairRouter.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const pool = require('../utils/dbConfig');
const router = express.Router();

// Add Repair Category
router.post('/repair/addCategory', async (req, res) => {
    const { category_name, category_desc } = req.body;
    try {
        await pool.query(`CALL REPAIR.add_repair_category($1, $2)`, [category_name, category_desc]);
        res.status(200).send('Repair category added successfully');
    } catch (err) {
        res.status(400).send(`Error adding repair category: ${err.message}`);
    }
});

// Update Repair Category
router.put('/repair/updateCategory', async (req, res) => {
    const { category_id, category_name, category_desc } = req.body;
    try {
        await pool.query(`CALL REPAIR.update_repair_category($1, $2, $3)`, [category_id, category_name, category_desc]);
        res.status(200).send('Repair category updated successfully');
    } catch (err) {
        res.status(400).send(`Error updating repair category: ${err.message}`);
    }
});

// Delete Repair Category
router.delete('/repair/deleteCategory', async (req, res) => {
    const { category_id } = req.body;
    try {
        await pool.query(`CALL REPAIR.delete_repair_category($1)`, [category_id]);
        res.status(200).send('Repair category deleted successfully');
    } catch (err) {
        res.status(400).send(`Error deleting repair category: ${err.message}`);
    }
});

// Add Repair Product with Picture
router.post('/repair/addProduct', async (req, res) => {
    const { product_name, product_price, product_desc, category_id, prod_pic_name, prod_pic_data } = req.body;
    try {
        await pool.query(
            `CALL REPAIR.add_repair_product($1, $2, $3, $4, $5, $6)`,
            [product_name, product_price, product_desc, category_id, prod_pic_name, prod_pic_data]
        );
        res.status(200).send('Repair product added successfully');
    } catch (err) {
        res.status(400).send(`Error adding repair product: ${err.message}`);
    }
});

// Update Repair Product with Picture
router.put('/repair/updateProduct', async (req, res) => {
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
router.delete('/repair/deleteProduct', async (req, res) => {
    const { product_id } = req.body;
    try {
        await pool.query(`CALL REPAIR.delete_repair_product($1)`, [product_id]);
        res.status(200).send('Repair product deleted successfully');
    } catch (err) {
        res.status(400).send(`Error deleting repair product: ${err.message}`);
    }
});

module.exports = router;
