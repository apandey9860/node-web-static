// tradeRouter.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const pool = require('../utils/dbConfig');
const router = express.Router();

// Add Trade Category
router.post('/addCategory', async (req, res) => {
    const { category_name, category_desc } = req.body;
    try {
        await pool.query(`CALL TRADE.add_trade_category($1, $2)`, [category_name, category_desc]);
        res.status(200).send('Trade category added successfully');
    } catch (err) {
        res.status(400).send(`Error adding trade category: ${err.message}`);
    }
});

// Update Trade Category
router.put('/updateCategory', async (req, res) => {
    const { category_id, category_name, category_desc } = req.body;
    try {
        await pool.query(`CALL TRADE.update_trade_category($1, $2, $3)`, [category_id, category_name, category_desc]);
        res.status(200).send('Trade category updated successfully');
    } catch (err) {
        res.status(400).send(`Error updating trade category: ${err.message}`);
    }
});

// Delete Trade Category
router.delete('/deleteCategory', async (req, res) => {
    const { category_id } = req.body;
    try {
        await pool.query(`CALL TRADE.delete_trade_category($1)`, [category_id]);
        res.status(200).send('Trade category deleted successfully');
    } catch (err) {
        res.status(400).send(`Error deleting trade category: ${err.message}`);
    }
});

// Add Trade Product with Picture
router.post('/addProduct', async (req, res) => {
    const { p_product_name, p_product_price,p_product_short_desc, p_product_desc, p_category_id, p_prod_pic_name, p_prod_pic_data } = req.body;
    
    try {
        await pool.query(
            `CALL TRADE.add_trade_product($1, $2, $3, $4, $5, $6, $7)`,
            [p_product_name, p_product_price,p_product_short_desc, p_product_desc, p_category_id, p_prod_pic_name, p_prod_pic_data]
        );
        res.status(200).send('Trade product added successfully');
    } catch (err) {
        res.status(400).send(`Error adding trade product: ${err.message}`);
    }
});

// Update Trade Product with Picture
router.put('/updateProduct', async (req, res) => {
    const { product_id, product_name, product_price, product_desc, category_id, prod_pic_name, prod_pic_data } = req.body;
    try {
        await pool.query(
            `CALL TRADE.update_trade_product($1, $2, $3, $4, $5, $6, $7)`,
            [product_id, product_name, product_price, product_desc, category_id, prod_pic_name, prod_pic_data]
        );
        res.status(200).send('Trade product updated successfully');
    } catch (err) {
        res.status(400).send(`Error updating trade product: ${err.message}`);
    }
});

// Delete Trade Product
router.delete('/deleteProduct', async (req, res) => {
    const { product_id } = req.body;
    try {
        await pool.query(`CALL TRADE.delete_trade_product($1)`, [product_id]);
        res.status(200).send('Trade product deleted successfully');
    } catch (err) {
        res.status(400).send(`Error deleting trade product: ${err.message}`);
    }
});

module.exports = router;
