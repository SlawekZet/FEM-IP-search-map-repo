import "./App.css";
import { Map } from "./components/Map/Map";
import { UpperBar } from "./components/UpperBar/UpperBar";
import { useState } from "react";

export interface GeoApiResponse {
  ip: string;
  location: {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
    geonameId: number;
  };
  domains?: string[];
  as: {
    asn: number;
    name: string;
    route: string;
    domain: string;
    type: string;
  };
  isp: string;
}

const initialData = {
  ip: "192.212.174.101",
  location: {
    country: "US",
    region: "California",
    city: "South San Gabriel",
    lat: 34.04915,
    lng: -118.09462,
    postalCode: "",
    timezone: "-08:00",
    geonameId: 5397771,
  },
  as: {
    asn: 7127,
    name: "SCE",
    route: "192.212.0.0/15",
    domain: "",
    type: "",
  },
  isp: "Southern California Edison",
};

function App() {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [geoData, setGeoData] = useState<GeoApiResponse | null>(initialData);

  const handleSearchingState = (searching: boolean) => {
    setIsSearching(searching);
  };

  const getGeoData = (ipGeodata: GeoApiResponse) => {
    setGeoData(ipGeodata);
  };

  return (
    <main>
      <section className="flex flex-col items-center ">
        <UpperBar
          onSearchChange={handleSearchingState}
          onIpGeoDataChange={getGeoData}
          isSearching={isSearching}
          geoData={geoData}
        />
        <Map data={geoData} />
      </section>
    </main>
  );
}

export default App;
