const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gp7ekja.mongodb.net/?retryWrites=true&w=majority`;
// const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    const productCollection = client.db("textileShop").collection("products");
    const categoryCollection = client.db("textileShop").collection("productCategories");
    const faqsCollection = client.db("textileShop").collection("faqs");
    const blogsCollection = client.db("textileShop").collection("blogs");

    app.get('/', (req, res) => {
        res.send('textileShop server is running')
    });

    app.get('/product-categories', async(req, res) => {
        const query = {};
        const result = await categoryCollection.find(query).toArray();
        res.send(result);
    })

    app.get('/product-category/:id', async(req, res) => {
        const id = req.params.id;
        const query = {category_id: id};
        const result = await productCollection.find(query).toArray();
        console.log(id, result);
        res.send(result);
    })
    
    app.get('/products', async(req, res) => {
        const query = {};
        const result = await productCollection.find(query).toArray();
        res.send(result);
    })


    app.get('/product-details/:id', async(req, res) => {
        const id = (req.params.id);
        const query = {product_id: (id)};
        const result = await productCollection.findOne(query);
        res.send(result);
    })

    
    app.get('/faq', async(req, res) => {
        const query = {};
        const result = await faqsCollection.find(query).toArray();
        res.send(result);
    })
    
    app.get('/blog', async(req, res) => {
        const query = {};
        const result = await blogsCollection.find(query).toArray();
        res.send(result);
    })

}

run().catch(err => console.log(err))

app.listen(port, () => {
    console.log(`textileshop data is running on port ${port}`);
});