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

const uri =
  "mongodb+srv://admin:admin@cluster0.khqp7pi.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const servicesCollection = client.db("clean_master").collection("service");

    app.get("/get-service", async (req, res) => {
      const services = await servicesCollection.find({}).toArray();
      res.send(services);
    });

    app.post("/add-service", async (req, res) => {
      const data = req.body;
      const result = await servicesCollection.insertOne(data);
      res.send(result);
    });

    app.put("/update-service/:id", async (req, res) => {
      const { id } = req.params;
      const data = req.body;

      const filter = { _id: ObjectId(id) };
      const updateDoc = { $set: data };
      const option = { upsert: true };

      const result = await servicesCollection.updateOne(
        filter,
        updateDoc,
        option
      );

      res.send(result);
    });

    app.delete("/delete-service/:id", async (req, res) => {
      const { id } = req.params;
      const query = { _id: ObjectId(id) };
      const result = await servicesCollection.deleteOne(query);

      res.send(result);
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

// --------------------------------
// --------------------------------