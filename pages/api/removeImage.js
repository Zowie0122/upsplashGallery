import dbConnect from "../../utils/dbConnect";
const List = require("../../models/List");

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        await List.update(
          {
            _id: req.body.list_id,
          },
          {
            $pull: { saved_Images: { _id: req.body.image_id } },
          }
        );

        res.status(200).json({ messsage: "removed" });
      } catch (error) {
        res.status(400).json({ message: "server error" });
      }
      break;
  }
};
