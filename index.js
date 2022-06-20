const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
  })
);


// Replace the uri string with your MongoDB deployment's connection string.

const uri = "mongodb+srv://admin:admin@cluster0.khqp7pi.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// async function run() {
//   try {
//     await client.connect();

//     const serviceCollection = client.db("Clean_master").collection("cservice");

//     app.get("/service", async (req, res) => {
//         const services =await serviceCollection.find({}).toArray();
//         console.log(services);
//         res.send(services);
//     })
//     } finally {
//   }
// }
// run().catch(console.dir);

async function run() {
    try {
      await client.connect();
      const servicesCollection = client.db("clean_master").collection("service");
  
      app.get("/service", async (req, res) => {
        const services = await servicesCollection.find({}).toArray();
        console.log(services);
        res.send(services);
      });
    } finally {
    }
  }
  run().catch(console.dir);


app.get("/", async (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on ${port} port`);
});