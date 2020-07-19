import React, { useState, useEffect } from "react";
import { Button, Modal, FormControl, Form } from "react-bootstrap";

export default function Content({
  showModal,
  setShowModal,

  selectedImageURL,
}) {
  const [selectedList, setSelectedList] = useState("");
  const [description, setDescription] = useState(null);
  const [favouriteLists, setFavouriteLists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/getAllLists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((res) => {
        const listsArray = [];
        for (const list of res.data) {
          listsArray.push(list.list_name);
        }
        setFavouriteLists(listsArray);
      });
    });
  }, []);

  const saveToList = (list, description, url) => {
    if (list !== "") {
      fetch("http://localhost:3000/api/imageSaver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          list_name: list,
          list_description: description,
          image_url: url,
        }),
      })
        .then((res) => {
          res.json().then((res) => {
            setShowModal(false);
          });
        })
        .catch((error) => {});
    } else {
      setError("Please select an existing list or add a one.");
    }
  };

  return (
    <div>
      <Modal show={showModal}>
        <Modal.Header>Save to gallery</Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Select a list</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setSelectedList(e.target.value)}
              >
                <option></option>

                {favouriteLists.map((ele) => (
                  <option value={ele}>{ele}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Create a new list ?</Form.Label>
              <Form.Control
                type="text"
                placeholder="list name"
                onChange={(e) => {
                  setSelectedList(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
          {error !== null ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              saveToList(selectedList, description, selectedImageURL);
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setShowModal(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
