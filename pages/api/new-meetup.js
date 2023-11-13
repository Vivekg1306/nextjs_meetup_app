// /api/new-meetup
// POST /api/new-meetup
import { connectDatabase } from "../../helpers/db-utils";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
