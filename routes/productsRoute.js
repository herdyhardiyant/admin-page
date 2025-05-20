import express from 'express';

const router = express.Router();
import db from '../config/db.js';

router.get('/', async (req, res) => {
try {
    const [products, _productFields] = await db.query(
    'SELECT * FROM products' );

    res.render('products', {
      products: products,
        page: 'products'
    });

} catch (err) {
  console.log(err);
}

});

export default router;