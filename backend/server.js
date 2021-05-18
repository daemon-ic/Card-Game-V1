// FOR CORS
const express = require("express");
const app = express();
const cors = require("cors");

const port = 5000;

var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://daemon:alvin392@cluster0.ndudi.mongodb.net/card_game?retryWrites=true&w=majority";

let client;

async function main() {
  client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    console.log("SUCCESSFULLY CONNECTED TO MONGO DB");
  } catch (e) {
    console.log("ERROR CONNECTING TO CLIENT: ", e);
  }
}

main();

app.use(cors());

app.use(express.json());

// READ -------------------------------------------------------------------------------------

app.get("/read_all", async (req, res) => {
  const database = await client.db("card_game");
  const collections = await database.collection("first_collection");

  const parsedCollection = await collections.find().toArray();

  const specificInfo = parsedCollection;

  console.log(specificInfo);
  res.send({ specificInfo });
});

app.get("/read", async (req, res) => {
  const database = await client.db("card_game");
  const collections = await database.collection("first_collection");

  const filter = { room: req.query.roomCheck };

  const parsedCollection = await collections.findOne(filter);
  const specificInfo = parsedCollection;

  res.send({ specificInfo });
});

// READ All-------------------------------------------------------------------------------------

// CREATE -------------------------------------------------------------------------------------

app.post("/create", async (req, res) => {
  const database = await client.db("card_game");
  const collections = await database.collection("first_collection");

  collections.insertOne(req.body);

  console.log(req.body);
  res.send("this is the server response");
});

app.get("/ping", async (req, res) => {
  res.send("OK");
});

app.get("/leave-room", async (req, res) => {
  const { query } = req;
  const { roomId, playerKey, player2 } = query;

  console.log(
    "Player: ",
    playerKey,
    " has left the room: ",
    roomId,
    "player 2: ",
    player2
  );

  const database = await client.db("card_game");
  const collections = await database.collection("first_collection");

  if (playerKey === "player2") {
    collections.updateOne({ room: roomId }, { $set: { player2: null } });
  } else {
    collections.updateOne(
      { room: roomId },
      { $set: { player1: player2, player2: null } }
    );
  }

  res.send("OK");
});

// UPDATE -------------------------------------------------------------------------------------

app.post("/update", async (req, res) => {
  console.log("req: ");
  const database = await client.db("card_game");
  const collections = await database.collection("first_collection");

  collections.updateOne({ room: req.query.roomCheck }, { $set: req.body });

  // after the update we are going to run the stuff thats found within "read" call

  const filter = { room: req.query.roomCheck };

  const parsedCollection = await collections.findOne(filter);
  const specificInfo = parsedCollection;
  res.send({ specificInfo });
});

// COUNT -------------------------------------------------------------------------------------

app.get("/no_docs", async (req, res) => {
  const database = await client.db("card_game");
  const collections = await database.collection("first_collection");

  const noDocs = await collections.countDocuments({}, { limit: 1 });

  console.log(noDocs);
  res.send({ noDocs });
});
//-------------------------------------------------------------------------------------

app.delete("/delete", async (req, res) => {
  const database = await client.db("card_game");
  const collections = await database.collection("first_collection");

  const filter = {
    room: req.query.value,
  };

  collections.deleteOne(filter);

  res.send("Deleted");
});

//

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
