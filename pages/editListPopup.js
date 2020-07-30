import React, { useState, useEffect } from "react";
import { Button, Modal, FormControl, Form } from "react-bootstrap";

export default function ListPopup({
  showModal,
  setShowModal,
  handleSave,
  list,
  error,
  setError,
}) {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  return (
    <div>
      <Modal show={showModal}>
        <Modal.Header>Edit the list</Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>New title</Form.Label>
              <Form.Control
                type="text"
                placeholder="new list name"
                onChange={(e) => {
                  setNewTitle(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="new list description"
                rows="3"
                onChange={(e) => {
                  setNewDescription(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
          {error !== null && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              handleSave(list._id, newTitle, newDescription);
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              console.log(list);
              setNewTitle(list.list_name);
              setNewDescription(list.list_description);
              setError(null);
              setShowModal(false);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
