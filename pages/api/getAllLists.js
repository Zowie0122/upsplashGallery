//get all the info of all the lists
import dbConnect from "../../utils/dbConnect";
const List = require("../../models/List");

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const lists = await List.find({});

        res.status(200).json({ data: lists });
      } catch (error) {
        res.status(400).json({ message: "server error" });
      }
      break;
  }
};
