import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { saveProduct } from "../App/app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Produit() {
  //Modal
  const [show, setShow] = useState(false); 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //Post
  const [Nom, setName] = useState("");
  const [Prix, setPrix] = useState(0);
  const [Quantité, setQuantité] = useState(0);
  const [checked, setCheked] = useState(false);

  const handleSaveProduct = (event) => {
    event.preventDefault();
    let product = { Nom, Prix, Quantité, checked };
    saveProduct(product).then((resp) => {
      console.log(JSON.stringify(resp.data));
    });
    setShow(false);
    refrech();
    alert("Enregistrement effectué avec succès!");
  };
  //Actualiser
  const refrech = () => {
    window.location.reload();
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSaveProduct}>
            <div className="md-3">
              <label className="Form-Label">Nom</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={Nom}
                className="form-control"
              ></input>
            </div>
            <div className="md-3">
              <label className="Form-Label">Prix unitaire</label>
              <input
                onChange={(e) => setPrix(e.target.value)}
                value={Prix}
                className="form-control"
              ></input>
            </div>
            <div className="md-3">
              <label className="Form-Label">Quantité</label>
              <input
                onChange={(e) => setQuantité(e.target.value)}
                value={Quantité}
                className="form-control"
              ></input>
            </div>
            <div className="form-check">
              <input
                onChange={(e) => setCheked(e.target.value)}
                checked={checked}
                className="form-check-input"
                type="checkbox"
              />
              <label className="form-check-label" for="flexCheckCheked">
                Checked
              </label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button className="primary" onClick={handleSaveProduct}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Produit;
