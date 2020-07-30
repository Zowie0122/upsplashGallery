import { Container, Button, Jumbotron } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import Router from "next/router";
import ListPopup from "./editListPopup";

export default function ImageCard({ data }) {
  const [isInput, setIsInput] = useState();
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSave = (id, listname, description) => {
    if (listname !== "") {
      fetch("http://localhost:3000/api/listSaver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          list_id: id,
          listname: listname,
          list_description: description,
        }),
      })
        .then((res) => {
          res.json().then((res) => {
            setIsInput(false);
            Router.reload(window.location.pathname);
          });
        })
        .catch(() => {
          setError("Opps, server error ");
        });
    } else {
      setError("List title can not be empty");
    }
  };

  const handleRemove = (listId, imageId) => {
    fetch("http://localhost:3000/api/removeImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        list_id: listId,
        image_id: imageId,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) setShowModal(false);
        Router.reload(window.location.pathname);
      })
      .catch(() => {
        setError("Opps, server error ");
      });
  };

  return (
    <div>
      {data.map((list) => {
        return (
          <div>
            <Jumbotron className="listInfoContainer">
              <h2>{list.list_name}</h2>
              <p>{list.list_description}</p>
              <div class="list-edit-button">
                {" "}
                <Button
                  variant="warning"
                  onClick={() => {
                    setIsInput(list._id);
                    setShowModal(true);
                  }}
                >
                  Edit Description
                </Button>
              </div>

              {isInput === list._id && showModal && (
                <ListPopup
                  showModal={showModal}
                  setShowModal={setShowModal}
                  handleSave={handleSave}
                  list={list}
                  error={error}
                  setError={setError}
                />
              )}
            </Jumbotron>
            <Container>
              <div className="gallery-container">
                {list.saved_Images.map((image) => {
                  return (
                    <div id={image.id} className="image-container">
                      <img class="gallery-image" src={image.image_url} />
                      <table class="gallery-table">
                        <tr>
                          <td>
                            <button
                              className="btn btn-dark"
                              onClick={() => {
                                saveAs(image.image_url + ".jpeg", image.id);
                              }}
                            >
                              Download
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-warning"
                              onClick={() => {
                                handleRemove(list._id, image._id);
                              }}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      </table>
                    </div>
                  );
                })}
              </div>
            </Container>
          </div>
        );
      })}
    </div>
  );
}
