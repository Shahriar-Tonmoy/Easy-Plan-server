const express = require('express')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());

//sw2WGYUCS4LW8qim
//EasyPlanMaster

app.get('/', (req, res)=>{
    res.send('easy plan server is ready');
})

app.listen(port, ()=>{
    console.log('EP SERVER IS RUNNING!!');  
})

//MongoDB

const uri = "mongodb+srv://EasyPlanMaster:sw2WGYUCS4LW8qim@cluster0.lguznlk.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const database = client.db("tasksDB");

const tasksCollection = database.collection("tasks");

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    //await client.connect();

    //api for getting data
    app.get('/tasks', async (req, res) =>{
        let query = {};
        if(req.query?.userEmail){
            query = {userEmail: req.query.userEmail};
        }
        const cursor = tasksCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      })

    //api for adding data
    app.post("/tasks", async (req, res) => {
        console.log(req.body);
        const newTask = req.body;
        const result = await tasksCollection.insertOne(newTask);
        res.send(result);
        console.log(result);  
    });


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);