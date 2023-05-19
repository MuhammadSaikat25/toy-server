const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
require('dotenv').config()
app.use(cors())
const port = process.env.PORT || 5000
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2a0jwzs.mongodb.net/?retryWrites=true&w=majority`;

app.get('/', (req, res) => {
  res.send('toy shop')
})

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful 
    const createToy = client.db('Toy-Hub').collection('add-toy')

    app.post('/AddToy', async (req, res) => {
      const body = req.body
      const result = await createToy.insertOne(body)
      res.send(result)
    })

    // get data by age
    app.get('/getToy/:age', async (req, res) => {
      const data = req.params.age
      const age = { age: data }
      const result = await createToy.find(age).toArray()
      res.send(result)

    })

    // get data by id
    app.get('/getById/:id', async (req, res) => {
      const id = req.params.id

      const data = { _id: new ObjectId(id) }
      const result = await createToy.findOne(data)
      res.send(result)
    })

    // get data by email
    app.get('/myToy', async (req, res) => {
      let query = {}
      if (req.query?.email) {
        query = { email: req.query.email }
      }
      const result = await createToy.find(query).toArray()
      res.send(result)
    })

    // get all toy
    app.get('/allToy', async (req, res) => {
      const result = await createToy.find().toArray()
      res.send(result)
    })

    // delete any data
    app.delete('/delete/:id', async (req, res) => {
      const id = req.params.id
      const data = { _id: new ObjectId(id) }
      const result = await createToy.deleteOne(data)
      res.send(result)
    })
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port)