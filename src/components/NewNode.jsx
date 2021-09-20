import { useRef } from "react";
import { useHistory } from "react-router";
import { createNode } from "../js/firebase";
import Input from "./Input";

const NewNode = () => {
  const history = useHistory();
  const idContainer = useRef(null);
  const descriptionContainer = useRef(null);
  const contactNameContainer = useRef(null);
  const contactPhoneContainer = useRef(null);
  const companyContainer = useRef(null);
  const addressContainer = useRef(null);
  const latContainer = useRef(null);
  const lngContainer = useRef(null);

  const onCreateNode = () => {
    const node = {
      id: idContainer.current.value,
      address: addressContainer.current.value,
      company: companyContainer.current.value,
      contactName: contactNameContainer.current.value,
      contactPhone: contactPhoneContainer.current.value,
      description: descriptionContainer.current.value,
      lat: latContainer.current.value,
      lng: lngContainer.current.value,
    };
    createNode(node).then((res) => history.push("/home/nodes"));
  };

  return (
    <div className="card animate__animated animate__fadeInUp">
      <div className="card-content">
        <div className="columns">
          <div className="column">
            <Input
              label="Id"
              placeholder="0000-0000-0000-xxxx"
              ref={idContainer}
            />
            <Input
              label="Contact name"
              placeholder="John Smith"
              ref={contactNameContainer}
            />
            <Input
              label="Latitude"
              placeholder="-13.9832"
              ref={latContainer}
              type="number"
            />
            <Input
              label="Company"
              placeholder="J.P. Morgan"
              ref={companyContainer}
            />
          </div>
          <div className="column">
            <Input
              label="Description"
              placeholder="E.g: Cleaning medical facility"
              ref={descriptionContainer}
            />
            <Input
              label="Contact phone"
              placeholder="(750) 3216544"
              ref={contactPhoneContainer}
            />
            <Input
              label="Longitude"
              placeholder="-72.9832"
              ref={lngContainer}
              type="number"
            />
            <Input
              label="Address"
              placeholder="Park St. PO 123. TX"
              ref={addressContainer}
            />
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="card-footer-item">
          <button className="button" onClick={onCreateNode}>
            Save node
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewNode;
