import { useStoreActions, useStoreState } from "easy-peasy";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { useEffect, useState } from "react";
import { deleteNode, getNodes } from "../js/firebase";
import NodeDetails from "./NodeDetails";
import NodeInfo from "./NodeInfo";
import NodeList from "./NodeList";
import { getDevices } from "../js/api";

const Nodes = ({ google }) => {
  const nodes = useStoreState((state) => state.nodes);
  const setNode = useStoreActions((actions) => actions.setNode);
  const setNodes = useStoreActions((actions) => actions.setNodes);
  const [infoData, setInfoData] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showList, setShowList] = useState(false);
  const [active, setActive] = useState({ id: 1 });
  const [center, setCenter] = useState({});

  const showNodeDetails = useStoreState((state) => state.showNodeDetails);
  const setShowNodeDetails = useStoreActions(
    (actions) => actions.setShowNodeDetails
  );
  const [activeMarker, setActiveMarker] = useState(null);

  const svgMarker = (node) => {
    const timestamp = 1684271934;
    let color;
    if (timestamp > Date.now() / 1000 - 24 * 60 * 60) {
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
    setActive(props.position);
    setShowInfo(true);
  };

  const handleListClick = (node) => {
    setCenter(node);
    setInfoData(node);
    setShowInfo(true);
    setActive(node);
  };

  const handleDeleteNode = (node) => {
    let result;
    if (nodes.length > 1) {
      result = window.confirm(
        `This action is not reversible\nDelete ${node.info.company} node?`
      );
      if (result) {
        deleteNode(node).then(() => {
          const newNodes = nodes.filter((n) => n.id != node.id);
          setNode(newNodes[0]);
          setShowNodeDetails(false);
          setNodes(newNodes);
        });
      }
    } else {
      window.alert("There should be at least one node");
    }
  };

  useEffect(() => {
    getDevices().then(({ data }) => {
      console.log(data);
      setNodes(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fadeOut = () => {
    document.querySelector(".card").classList.add("animate__fadeOutRight");
    setTimeout(() => {
      setShowNodeDetails(false);
    }, 1000);
  };

  return (
    <div className="container map animate__animated animate__fadeInDown">
      {nodes.length > 0 && (
        <Map
          google={google}
          initialCenter={nodes[0].info}
          center={center}
          zoom={9}
        >
          {nodes.map((node) => (
            <Marker
              position={{ lat: node.lat, lng: node.lng }}
              name={node.name}
              icon={svgMarker(node)}
              title={node.name}
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
            setNode(nodes.find((node) => node.id === infoData.id));
            setShowNodeDetails(true);
          }}
        >
          More ...
        </button>
      )}
      <button
        className="button m-1 is-outlined list-button"
        onClick={() => setShowList(!showList)}
      >
        {showList ? "Hide List" : "Devices"}
      </button>
      {showNodeDetails && (
        <div className={`modal ${showNodeDetails && "is-active"}`}>
          <div className="modal-background"></div>
          <NodeDetails handleDeleteNode={handleDeleteNode} />
          <button
            onClick={fadeOut}
            className="modal-close is-large"
            aria-label="close"
          ></button>
        </div>
      )}
      {showList && (
        <NodeList
          nodes={nodes}
          handleListClick={handleListClick}
          active={active}
          setActive={setActive}
        />
      )}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBsgd5A9q-23gHy8tL6e5O0lct6JoD97xo",
  version: "beta",
})(Nodes);
