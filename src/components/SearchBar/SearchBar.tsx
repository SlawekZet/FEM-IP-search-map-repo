import { useEffect, useState } from "react";
import { GeoApiResponse } from "../../App";
import arrow from "../../assets/icons/icon-arrow.svg";

interface SearchBarProps {
  onSearchChange: (isSearching: boolean) => void;
  onIpGeoDataChange: (geoData: GeoApiResponse) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearchChange,
  onIpGeoDataChange,
}) => {
  const [input, setInput] = useState<string>("");
  const [searchItem, setSearchItem] = useState<string>("192.212.174.101");
  const [error, setError] = useState<string>("");
  const [inputType, setInputType] = useState<string>("");

  //this function checks if the input provided by the user is either and ipv4, ipv6 or a domain. Then it updates the inputType state that later on determine the exact URL to fetch in ipDomainFetch. It also provides error if the provided input is incorrect.

  const inputChecker = () => {
    const ipv4Regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4})$/;
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (ipv4Regex.test(input) || ipv6Regex.test(input)) {
      setInputType("ip");
      return false;
    } else if (domainRegex.test(input)) {
      setInputType("domain");
      return false;
    } else {
      setError("Please provide valid ipv4, ipv6 or domain");
      return true;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    !inputChecker() ? setSearchItem(input) : null;
  };

  //this function sends the GET reuqest to https://geo.ipify.org/ in order to get the ip geo data used to generate the map center and marker in the Map component

  const ipDomainFetch = async () => {
    try {
      const response = await fetch(
        inputType === "ip"
          ? `https://geo.ipify.org/api/v2/country,city?apiKey=${
              import.meta.env.VITE_IP_GEO_API_KEY
            }&ipAddress=${searchItem}`
          : `https://geo.ipify.org/api/v2/country,city?apiKey=${
              import.meta.env.VITE_IP_GEO_API_KEY
            }&domain=${searchItem}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = (await response.json()) as GeoApiResponse;
      onIpGeoDataChange(data);
      return data;
    } catch (error) {
      setError("An error ocurred while fetching data. Check console");
      if (error instanceof Error) {
        console.error("Error fetching data:", error.message);
      } else {
        console.error("Unknown error occurred");
      }
    }
  };

  //this useEffect cleans the error message if the input changes

  useEffect(() => {
    setError("");
  }, [input]);

  //this useEffect calls the ipDomainFetch function and clears the input and searchItem state

  useEffect(() => {
    if (searchItem !== "") {
      onSearchChange(true);
      ipDomainFetch().finally(() => {
        onSearchChange(false);
        setInput("");
        setSearchItem("");
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchItem]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex w-2/3 max-w-2xl overflow-hidden rounded-xl shadow-xl"
      >
        <input
          className="h-12 md:md:h-16 w-full px-6 py-5 text-lg placeholder:text-base"
          type="text"
          value={input}
          placeholder="Enter IP or domain"
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="hover:bg-very-dark-gray h-12 md:md:h-16 md:md:w-16 w-14 bg-black md:md:pl-6 pl-4"
        >
          <img src={arrow} alt="arrow" className="size-3.5" />
        </button>
      </form>
      {error ? (
        <p className="text-red-500 font-bold h-12 pt-2 md:md:pt-4 md:md:text-xl ">
          {error}
        </p>
      ) : null}
    </>
  );
};
