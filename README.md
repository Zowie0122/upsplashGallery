<p align="center">
  <img src="./public/search.gif" width="750" title="Share your fire">
</p>

<p align="center">
  <img src="./public/favpage.gif" width="750" title="Share your fire">
</p>

## Getting Started

Git clone https://github.com/Zowie0122/upsplashGallery.git

Create a file under the root folder named next.config.js

Inside of the next.config.js,add the followings with your own Unsplash client key and MongoDB key.

module.exports = {
env: {
MONGO_URI:
"mongodb+srv://<your user name>:<your password>@<your cluster name>.xq62e.mongodb.net/<your db name>?retryWrites=true&w=majority",
UNSPLASH_API_KEY: <your client key>,
},
};

If you want to limit how many photos you fetch from Unsplash, you can replace "1" with the number you prefer in index.js line 36.

Save the file run command yarn and yarn Dev

Go to localhost:3000
