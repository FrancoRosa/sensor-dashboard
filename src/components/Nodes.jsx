import { useStoreState } from "easy-peasy";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { useState } from "react";
import { useHistory } from "react-router";
import NodeInfo from "./NodeInfo";

const Nodes = ({ google }) => {
  const nodes = useStoreState((state) => state.nodes);
  const [infoData, setInfoData] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [activeMarker, setActiveMarker] = useState(null);
  const history = useHistory();

  const svgMarker = (lastUpdate) => {
    let color = "white";
    if (lastUpdate < Date.now() / 1000 - 10 * 60) {
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

  return (
    <div className="container map">
      <Map google={google} initialCenter={nodes[0]} zoom={9}>
        {nodes.map((node) => (
          <Marker
            position={node}
            name={node.company}
            icon={svgMarker(node.lastUpdate)}
            title={node.company}
            onClick={onSelectedMarker}
            onClose={() => setShowInfo(false)}
            key={node.id}
          />
        ))}
        <InfoWindow visible={showInfo} marker={activeMarker}>
          <>{showInfo && <NodeInfo info={infoData} />}</>
        </InfoWindow>
      </Map>
      {showInfo && (
        <button
          className="button more m-1"
          onClick={() => history.push(`/home/node/${infoData.id}`)}
        >
          More ...
        </button>
      )}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBsgd5A9q-23gHy8tL6e5O0lct6JoD97xo",
  version: "beta",
})(Nodes);
