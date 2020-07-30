import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import Navbar from "./Navbar";
import Popup from "./Popup";

export default function Home() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageURL, setSelectedImageURL] = useState();

  const fetchImages = async (userInput, n) => {
    if (userInput !== "") {
      try {
        const rawData = await axios.get(
          `https://api.unsplash.com/search/photos?page=1&per_page=${n}&query=${userInput}s&client_id=${process.env.UNSPLASH_API_KEY}`
        );

        if (rawData.data) {
          const allImages = [];
          for (const ele of rawData.data.results) {
            allImages.push(ele);
          }
          setData(allImages);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchImages(input, 1);
  }, [input]);

  return (
    <div>
      <Head>
        <title>Find your best image</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        />
      </Head>
      <main>
        <Navbar setInput={setInput} />

        {data.length !== 0 &&
          data.map((image) => (
            <div id={image.id} className="container">
              <img src={image.urls.regular} className="image" />

              <table class="middle">
                <tr>
                  <td>
                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        saveAs(image.urls.raw + ".jpeg", image.id);
                      }}
                    >
                      Download
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        setShowModal(true);
                        setSelectedImageURL(image.urls.regular);
                      }}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          ))}
        <Popup
          showModal={showModal}
          setShowModal={setShowModal}
          selectedImageURL={selectedImageURL}
        />
      </main>
    </div>
  );
}
