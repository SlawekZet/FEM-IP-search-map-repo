import { GeoApiResponse } from "../../App";
import { DataBarElement } from "../DataBarElement/DataBarElement";

interface DataBarPorps {
  searching: boolean;
  geoData: GeoApiResponse | null;
}

export const DataBar: React.FC<DataBarPorps> = ({ searching, geoData }) => {
  return (
    <>
      <div
        className={
          searching
            ? "flex w-2/3 p-8 h-40 rounded-xl bg-white absolute top-52 justify-center items-center shadow-xl"
            : geoData
              ? "w-10/12 py-2 md:md:py-0 md:md:items-start md:md:w-auto md:md:grid flex flex-col items-center md:xl:grid-cols-4 md:lg:grid-cols-4 md:md:grid-cols-4 rounded-xl bg-white absolute top-44 md:md:top-56 shadow-xl"
              : "flex w-2/3 p-8 h-40 rounded-xl bg-white absolute top-52 justify-center items-center shadow-xl"
        }
      >
        {searching ? (
          <p className="text-xl">Searching... </p>
        ) : geoData ? (
          <>
            <DataBarElement header="ip address" data={geoData.ip} />
            <DataBarElement header="location" data={geoData.location.city} />
            <DataBarElement
              header="timezone"
              data={`UTC ${geoData.location.timezone}`}
            />
            <DataBarElement header="isp" data={geoData.isp} />
          </>
        ) : (
          <p className="text-xl">No data found</p>
        )}
      </div>
    </>
  );
};
