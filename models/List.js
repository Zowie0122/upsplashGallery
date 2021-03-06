const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  list_name: {
    type: String,
    unique: true,
    required: [true, "Name is required"],
  },
  list_description: {
    type: String,
  },
  saved_Images: [
    {
      image_name: {
        type: String,
      },
      image_url: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.models.List || mongoose.model("List", ListSchema);
