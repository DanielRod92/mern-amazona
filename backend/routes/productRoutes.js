import express from 'express';
import Product from '../models/productModel.js';

const productRouter = express.Router();

// metodo GET para todos los productos
productRouter.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

// metodo GET por atributo
productRouter.get('/slug/:slug', async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug });
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ message: 'Product Not Found' })
    }
});

// metodo GET por id
productRouter.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ message: 'Product Not Found' })
    }
});

// metodo POST
productRouter.post('/', (req, res) => {
    const product = Product(req.body);
    product
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});

// metodo DELETE por id
productRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    Product.remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});

// metodo PUT por id
productRouter.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name, slug, image, brand, category, description, price, countInStock, rating, numReviews } = req.body
    Product.updateOne({ _id: id }, { $set: { name, slug, image, brand, category, description, price, countInStock, rating, numReviews } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});

export default productRouter;