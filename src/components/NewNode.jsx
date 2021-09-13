import { useRef } from "react";
import Input from "./Input";

const NewNode = () => {
  const idContainer = useRef(null);
  const descriptionContainer = useRef(null);
  const contactNameContainer = useRef(null);
  const contactPhoneContainer = useRef(null);
  const companyContainer = useRef(null);
  const addressContainer = useRef(null);
  const latContainer = useRef(null);
  const lngContainer = useRef(null);

  const saveNode = () => {
    console.log("... save node");
    console.log(latContainer.current.value);
    console.log(idContainer.current.value);
  };

  return (
    <div className="card">
      <div className="card-content">
        <div className="columns">
          <div className="column">
            <Input
              label="Id"
              placeholder="0000-0000-0000-xxxx"
              ref={idContainer}
            />
            <Input
              label="Contact Name"
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
              label="Park St. PO 123. TX"
              placeholder="J.P. Morgan"
              ref={addressContainer}
            />
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="card-footer-item">
          <button className="button" onClick={saveNode}>
            Save node
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewNode;
