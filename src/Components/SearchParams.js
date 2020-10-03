import React, { useState, useEffect } from "react";
import axios from "axios";
import Results from "./Results";

const SearchParams = () => {
  const apiUrl = "http://localhost:61813";

  const [country, setCountry] = useState("");
  const [software] = useState(window.navigator.platform);

  const [packages, setPackages] = useState([]);
  const [versions, setVersions] = useState([]);

  //Selected values:
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("");

  const [updateFiles, setUpdateFiles] = useState([]);
  const [apiCallMade, setApiCallMade] = useState(false);

  async function getCountry() {
    const res = await axios.get(`https://ipapi.co/json/`);
    setCountry(res.data.country);
  }

  async function getPackages() {
    const res = await axios.get(`${apiUrl}/package`);
    const packagesArr = res.data.map((p) => {
      return {
        id: p.id,
        name: p.name,
      };
    });
    setPackages(packagesArr);
    setSelectedPackage(packagesArr.length ? packagesArr[0].id : "");
  }

  async function getVersions() {
    const body = {
      packageId: selectedPackage,
      country: country,
      software: software,
    };
    const res = await axios.post(`${apiUrl}/version`, body);
    const versionsArr = res.data.map((v) => {
      return {
        id: v.id,
        name: v.name,
      };
    });
    setVersions(versionsArr);
    setSelectedVersion(versionsArr.length ? versionsArr[0].id : "");
  }

  async function getUpdate() {
    const body = {
      packageId: selectedPackage,
      versionId: selectedVersion,
      country: country,
      software: software,
    };
    const res = await axios.post(`${apiUrl}/update`, body);
    setUpdateFiles(res.data.files || []);
    setApiCallMade(true);
  }

  useEffect(() => {
    getPackages();
    getCountry();
  }, []);

  useEffect(() => {
    setVersions([]);
    getVersions();
  }, [selectedPackage]);

  return (
    <div>
      <div className="container">
        <form
          id="searchParams"
          className="search-params-form"
          onSubmit={(e) => {
            e.preventDefault();
            getUpdate();
          }}
        >
          <h3>FDS-Client</h3>

          <div className="package-div">
            <label htmlFor="packages">Package:</label>
            <select
              id="packages"
              name="packages"
              onChange={(e) => setSelectedPackage(e.target.value)}
              onBlur={(e) => setSelectedPackage(e.target.value)}
            >
              {packages.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="version-div">
            <label htmlFor="versions">Your current version:</label>
            <select
              id="versions"
              name="versions"
              onChange={(e) => setSelectedVersion(e.target.value)}
              onBlur={(e) => setSelectedVersion(e.target.value)}
            >
              {versions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="submit-btn-div">
            <button id="submitBtn" name="submit" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
      {apiCallMade && <Results updateFiles={updateFiles} />}
    </div>
  );
};

export default SearchParams;
