import {
  CardDeck,
  Card,
  CardGroup,
  Container,
  Button,
  InputGroup,
  FormControl,
  Jumbotron,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import Router from "next/router";

export default function ImageCard({ data }) {
  const [isInput, setIsInput] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [error, setError] = useState(null);

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
        .catch((error) => {});
    } else {
      setError("List title can not be empty");
    }
  };

  return (
    <div>
      {data.map((list) => {
        return (
          <div>
            <Jumbotron className="listInfoContainer">
              <h2> {list.list_name}</h2>
              {isInput === list._id ? (
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>New title</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    as="textarea"
                    aria-label="With textarea"
                    onChange={(e) => {
                      setNewTitle(e.target.value);
                    }}
                  />
                </InputGroup>
              ) : null}

              <p>{list.list_description}</p>

              {isInput === list._id ? (
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>New Description</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    as="textarea"
                    aria-label="With textarea"
                    onChange={(e) => {
                      setNewDescription(e.target.value);
                    }}
                  />
                </InputGroup>
              ) : null}

              <Button
                variant="warning"
                onClick={() => {
                  setIsInput(list._id);
                }}
              >
                Edit Description
              </Button>
              {isInput === list._id ? (
                <Button
                  variant="info"
                  onClick={() => {
                    handleSave(list._id, newTitle, newDescription);
                  }}
                >
                  Save
                </Button>
              ) : null}

              {isInput === list._id ? (
                <Button
                  variant="dark"
                  onClick={() => {
                    setNewTitle(list.list_name);
                    setNewDescription(list.list_description);
                    setIsInput(false);
                  }}
                >
                  Cancel
                </Button>
              ) : null}
              {error !== null ? (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : null}
            </Jumbotron>
            <Container>
              {list.savedImages.map((image) => {
                return (
                  <CardDeck className="card">
                    <Card>
                      <Card.Img
                        variant="top"
                        src={image.image_url}
                        className="cardImage"
                      />

                      <Card.Footer>
                        <Button
                          className="btn btn-dark"
                          onClick={() => {
                            saveAs(image.image_url + ".jpeg", image._id);
                          }}
                        >
                          Download
                        </Button>
                      </Card.Footer>
                    </Card>
                  </CardDeck>
                );
              })}
            </Container>
          </div>
        );
      })}
    </div>
  );
}
