import express from 'express';

const router = express.Router();
import db from '../config/db.js';

router.get('/', async (req, res) => {
try {
    const [products, _productFields] = await db.query(
    'SELECT * FROM products' );

    const [purchases, _purchasesFields] = await db.query(
    `
  SELECT 
    p.id,
    pr.name AS product_name,
    pr.price,
    p.quantity
    
  FROM 
    Purchases p
  JOIN 
    Products pr ON p.product_id = pr.id
    ` );

    res.render('purchases', {
      products: products,
      purchases: purchases,
      page: 'home'
    });

} catch (err) {
  console.log(err);
}

});

router.post('/', async (req, res) => {
  const { product_id, quantity } = req.body;
  
  try {
    await db.query('INSERT INTO purchases (product_id, quantity, purchase_date) VALUES (?, ?, NOW())', [product_id, quantity]);
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error processing purchase');
  }
})

router.post('/:id/delete', async (req, res) => {
  const purchaseId = req.params.id;

  try {
    await db.query('DELETE FROM purchases WHERE id = ?', [purchaseId]);
    res.redirect('/purchases');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error deleting purchase');
  }
})

router.post('/confirm', async (req, res) => {  
  try {
    // 1. Get all purchases
    const [purchases] = await db.query(
      'SELECT product_id, SUM(quantity) as total_quantity FROM Purchases GROUP BY product_id'
    );

    // 2. Update stock for each product
    for (const purchase of purchases) {
      await db.query(
        `INSERT INTO Stock (product_id, quantity)
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE quantity = quantity + ?`,
        [purchase.product_id, purchase.total_quantity, purchase.total_quantity]
      );
    }

    // 3. Clear purchases
    await db.query('DELETE FROM Purchases');

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error confirming purchases.');
  }
})

export default router;