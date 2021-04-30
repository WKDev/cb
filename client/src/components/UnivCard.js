import React from "react";
import Card from "react-bootstrap/Card";
// import Accordion from 'react-bootstrap/Accordion'
import TitleSet from "./elements/TitleSet";

import "./UnivCard.css";

const UnivCard = (props, { children }) => {
  const defaultAdditionalContent = () => {
    return <div></div>;
  };

  UnivCard.defaultProps = {
    additionalContent: defaultAdditionalContent(),
  };

  return (
    <Card className="univ-card">
      {/* <Card.Img variant="top" src={props.image} alt="img" /> */}
      <Card.Body>
        <Card.Title>
          {
            <TitleSet
              isOn={props.ledOn}
              title={props.title}
              onSettingClick={props.onSettingClick}
            />
          }
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.mode}</Card.Subtitle>
        {props.content}
        <Card.Text></Card.Text>
      </Card.Body>
      {/* {props.accordion === true && (
                // <Accordion defaultActiveKey="0">
                //     <Card>
                //         <Card.Header>{props.additionalContent}</Card.Header>
                //         <Accordion.Toggle as={Card.Header} eventKey="1">
                //             +
                //         </Accordion.Toggle>
                //         <Accordion.Collapse eventKey="1">
                //             <Card.Body>Hello! I'm the body</Card.Body>
                //         </Accordion.Collapse>
                //     </Card>
                // </Accordion>
                // <Collapse in={true}>{props.additionalContent}</Collapse>
            )} */}
    </Card>
  );
};

export default UnivCard;
