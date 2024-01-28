import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoApiResponse } from "../../App";
import { Icon } from "leaflet";
import icon from "../../assets/icons/icon-location.svg";

interface MapProps {
  data: GeoApiResponse | null;
}

//this component allows to set the view on a given place on the map based on the latitude and longitude taken from the IP Geo API. I add 0.021 to the latitude, because the Map is dispayed on the whole viewport and this adjustment allows to somewhat center the marker on the map

export const MyComponent: React.FC<MapProps> = ({ data }) => {
  const map = useMap();
  if (data?.location.lat !== undefined && data?.location.lng !== undefined) {
    map.flyTo([data?.location.lat + 0.021, data?.location.lng], 13, {
      duration: 2,
    });
  }
  return null;
};

const customIcon = new Icon({
  iconUrl: icon,
  iconSize: [35, 45],
});

export const Map: React.FC<MapProps> = ({ data }) => {
  const zoom = 13;
  return (
    <div className="z-0">
      {data ? (
        <MapContainer
          center={[data?.location.lat, data?.location.lng]}
          zoom={zoom}
        >
          <MyComponent data={data} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[data.location.lat, data.location.lng]}
            icon={customIcon}
          >
            <Popup>
              {data.ip}
              <br />
              {data.location.city}
            </Popup>
          </Marker>
        </MapContainer>
      ) : null}
    </div>
  );
};
