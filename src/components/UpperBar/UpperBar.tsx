import { GeoApiResponse } from "../../App";
import { DataBar } from "../DataBar/DataBar";
import { SearchBar } from "../SearchBar/SearchBar";

interface UpperBarProps {
  onSearchChange: (isSearching: boolean) => void;
  onIpGeoDataChange: (geoData: GeoApiResponse) => void;
  isSearching: boolean;
  geoData: GeoApiResponse | null;
}

export const UpperBar: React.FC<UpperBarProps> = ({
  onSearchChange,
  onIpGeoDataChange,
  isSearching,
  geoData,
}) => {
  const handleSearchingState = (searching: boolean) => {
    onSearchChange(searching);
  };

  const getGeoData = (ipGeodata: GeoApiResponse) => {
    onIpGeoDataChange(ipGeodata);
  };
  return (
    <section className="absolute flex w-full h-[300px] md:md:h-[280px] max-w-screen-xl flex-col items-center bg-[url('assets/backgrounds/pattern-bg-mobile.png')] md:md:bg-[url('assets/backgrounds/pattern-bg-desktop.png')] bg-no-repeat bg-center z-10 md:md:rounded-b">
      <h1 className="py-6 font-medium text-[26px] text-white md:md:text-3xl md:lg:text-4xl">
        IP Address Tracker
      </h1>
      <SearchBar
        onSearchChange={handleSearchingState}
        onIpGeoDataChange={getGeoData}
      />
      <DataBar searching={isSearching} geoData={geoData} />
    </section>
  );
};
