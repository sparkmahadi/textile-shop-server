const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gp7ekja.mongodb.net/?retryWrites=true&w=majority`;
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    const productCollection = client.db("textileShop").collection("products");
    const faqsCollection = client.db("textileShop").collection("faqs");
    const blogsCollection = client.db("textileShop").collection("blogs");

    app.get('/', (req, res) => {
        res.send('textileShop server is running')
    });
    
    app.get('/products', async(req, res) => {
        const query = {};
        const result = await productCollection.find(query).toArray();
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