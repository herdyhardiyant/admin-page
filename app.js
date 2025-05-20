import express from 'express';
import purchasesRoute from './routes/purchasesRoute.js';
import stockRoute from './routes/stockRoute.js';
import productsRoute from './routes/productsRoute.js';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

/*

    // Navigation

    // Main page
    // Display all products

    // Stock page
    // Display all products with stock
    // Edit stock

    // Purchase Page
    // Confirm purchase
        // Send purchase to table stock
        // update stock to the product with the same id


*/

app.get('/', async (req, res) => {

    res.redirect('/purchases');
});

app.use('/stock', stockRoute)

app.use('/purchases', purchasesRoute)

app.use('/products', productsRoute)


app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});