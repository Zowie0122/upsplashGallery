// to add a new image to a list

import dbConnect from "../../utils/dbConnect";
const List = require("../../models/List");

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const newImage = {
          image_url: req.body.image_url,
        };
        const list = await List.findOne({ list_name: req.body.list_name });
        if (list === null) {
          list = await List.create({
            list_name: req.body.list_name,
            list_description: req.body.list_description,
            savedImages: newImage,
          });
        } else {
          list.savedImages.push(newImage);
        }
        await list.save();
        res.status(200).json({ data: list });
      } catch (error) {
        res.status(400).json({ message: "server error" });
      }
      break;
  }
};
