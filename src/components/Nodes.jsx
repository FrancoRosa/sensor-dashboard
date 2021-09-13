import { useStoreState } from "easy-peasy";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { useState } from "react";

const Nodes = ({ google }) => {
  const nodes = useStoreState((state) => state.nodes);
  const [hovered, setHovered] = useState(null);
  const [clicked, setClicked] = useState(null);
  const svgMarker = (color) => ({
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: color,
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  });

  return (
    <div className="container map">
      <Map google={google} initialCenter={nodes[0]} zoom={9}>
        {nodes.map((node) => (
          <Marker
            position={node}
            name={node.company}
            icon={svgMarker("green")}
            label={hovered === node.id ? node.company : null}
            title="title"
            onMouseover={() => setHovered(node.id)}
          >
            <InfoWindow visible={true}>
              <div className="card">
                <p>
                  Click on the map or drag the marker to select location where
                  the incident occurred
                </p>
              </div>
            </InfoWindow>
          </Marker>
        ))}
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBsgd5A9q-23gHy8tL6e5O0lct6JoD97xo",
  version: "beta",
})(Nodes);
