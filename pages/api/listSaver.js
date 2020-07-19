import dbConnect from "../../utils/dbConnect";
const List = require("../../models/List");

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const list = await List.findById(req.body.list_id);
        list.list_name = req.body.listname;
        list.list_description = req.body.list_description;
        await list.save();
        res.status(200).json({ data: list });
      } catch (error) {
        res.status(400).json({ message: "server error" });
      }
      break;
  }
};
