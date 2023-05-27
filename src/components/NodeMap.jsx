import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { useEffect, useState } from "react";
import NodeInfo from "./NodeInfo";
import { isRecent } from "../js/helpers";

const Nodes = ({ google, devices, setActive, active }) => {
  const [infoData, setInfoData] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [center, setCenter] = useState(active);
  const [mapWidth, setMapWidth] = useState(window.innerWidth > 768 ? 35 : 95);

  const [activeMarker, setActiveMarker] = useState(null);

  const svgMarker = (node) => {
    const { updated_at } = node;
    const color = isRecent(updated_at) ? "green" : "red";
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
    console.log("marker selected");
    console.log(props);
    setActiveMarker(marker);
    const targetNode = devices.find((n) => n.id === props.id);
    setInfoData(targetNode);
    setActive(props.id);
    setShowInfo(true);
  };

  useEffect(() => {
    setCenter(devices.find((d) => d.id === active));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
      if (e.matches) {
        setMapWidth(40);
      } else {
        setMapWidth(100);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Map
      google={google}
      initialCenter={devices[0] || { lat: 0, lng: 0 }}
      center={center}
      zoom={9}
      style={{ width: `${mapWidth}vw`, height: "80vh" }}
    >
      {devices.map((node) => (
        <Marker
          position={{ lat: node.lat, lng: node.lng }}
          name={node.name}
          icon={svgMarker(node)}
          title={node.name}
          onClick={onSelectedMarker}
          onClose={() => setShowInfo(false)}
          key={node.id}
          id={node.id}
        />
      ))}
      <InfoWindow visible={showInfo} marker={activeMarker}>
        <>{showInfo && <NodeInfo info={infoData} />}</>
      </InfoWindow>
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBsgd5A9q-23gHy8tL6e5O0lct6JoD97xo",
})(Nodes);
