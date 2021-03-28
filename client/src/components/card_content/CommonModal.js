import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LightSetting from "../modal_setting/LightSetting";
import BoilerSetting from "../modal_setting/BoilerSetting";

const CommonModal = (props) => {
  // const [show, setShow] = useState(false)

  // const handleClose = () => setShow(false)

  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>{props.cardType}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.cardType === "Light" && <LightSetting />}
        {props.cardType === "Boiler" && <BoilerSetting />}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.close}>
          Close
        </Button>
        <Button variant="primary" onClick={props.save}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommonModal;
