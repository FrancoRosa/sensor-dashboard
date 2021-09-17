import { useStoreActions, useStoreState } from "easy-peasy";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNodes } from "../js/firebase";
import NodeDetails from "./NodeDetails";
import NodeInfo from "./NodeInfo";

const Nodes = ({ google }) => {
  const nodes = useStoreState((state) => state.nodes);
  const setNode = useStoreActions((actions) => actions.setNode);
  const setNodes = useStoreActions((actions) => actions.setNodes);
  const [infoData, setInfoData] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const showNodeDetails = useStoreState((state) => state.showNodeDetails);
  const setShowNodeDetails = useStoreActions(
    (actions) => actions.setShowNodeDetails
  );
  const [activeMarker, setActiveMarker] = useState(null);

  const svgMarker = (lastUpdate) => {
    let color = "white";
    if (lastUpdate > Date.now() / 1000 - 10 * 60) {
      color = "green";
    } else {
      color = "red";
    }
    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: color,
      fillOpacity: 0.6,
      strokeWeight: 0,
      rotation: 0,
      scale: 10,
    };
  };

  const onSelectedMarker = (props, marker, e) => {
    setActiveMarker(marker);
    setInfoData(props.position);
    setShowInfo(true);
  };

  useEffect(() => {
    getNodes().then((res) => {
      setNodes(res);
      console.log(res);
    });
  }, []);

  return (
    <div className="container map">
      {nodes.length > 0 && (
        <Map google={google} initialCenter={nodes[0].info} zoom={9}>
          {nodes.map((node) => (
            <Marker
              position={node.info}
              name={node.info.company}
              icon={svgMarker(node.info.lastUpdate)}
              title={node.info.company}
              onClick={onSelectedMarker}
              onClose={() => setShowInfo(false)}
              key={node.id}
            />
          ))}
          <InfoWindow visible={showInfo} marker={activeMarker}>
            <>{showInfo && <NodeInfo info={infoData} />}</>
          </InfoWindow>
        </Map>
      )}
      {showInfo && (
        <button
          className="button more m-1 is-outlined"
          onClick={() => {
            setNode(infoData);
            setShowNodeDetails(true);
          }}
        >
          More ...
        </button>
      )}
      {showNodeDetails && (
        <div className={`modal ${showNodeDetails && "is-active"}`}>
          <div className="modal-background"></div>
          <div className="modal-content">
            <NodeDetails />
          </div>
          <button
            onClick={() => setShowNodeDetails(false)}
            className="modal-close is-large"
            aria-label="close"
          ></button>
        </div>
      )}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBsgd5A9q-23gHy8tL6e5O0lct6JoD97xo",
  version: "beta",
})(Nodes);
