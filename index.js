const { MongoClient, ServerApiVersion } = require('mongodb');
const express=require('express')
const cors=require('cors')
const app=express()
require('dotenv').config()
app.use(cors())
const port=process.env.PORT || 5000
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2a0jwzs.mongodb.net/?retryWrites=true&w=majority`;

app.get('/',(req,res)=>{
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
    await client.connect();
    // Send a ping to confirm a successful 
    const createToy=client.db('Toy-Hub').collection('add-toy')
    app.post('/createToy',async(req,res)=>{
        const body=req.body
        console.log(body)
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