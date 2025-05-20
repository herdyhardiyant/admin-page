import express from 'express';

const router = express.Router();
import db from '../config/db.js';

router.get('/', async (req, res) => {
try {
    const [products, _productFields] = await db.query(
    `
  SELECT 
    s.id,
    p.name,
    s.quantity
  FROM 
    Stock s
  JOIN 
    Products p ON s.product_id = p.id
    ` );

    res.render('stock', {
      products: products,
        page: 'stock'
    });

} catch (err) {
  console.log(err);
}

});

export default router;