import React from "react";
import "./Home.css";
import Sidebar from "./Sidebar";
import DataTable from "./Table";
import SearchForm from "./SearchForm";

export default function HomePage({
  countrydata,
  globaldata,
  usadata,
  searchCountry,
  setSearchCountry,
  searchUsaState,
  setSearchUsaState,
}) {
  const modifiedUsaData = usadata.map((row) => ({
    ...row,
    recovered: row.cases - row.active,
  }));

  return (
    <>
      <Sidebar globaldata={globaldata} />

      {/* Main page */}
      <div className="main">
        {/* CountryWise data */}
        <div className="data">
          <div className="sticky">
            <h1>World COVID-19 Stats</h1>
            <SearchForm
              setSearchText={setSearchCountry}
              searchText={searchCountry}
              placeholder="Search a country"
            />
          </div>
          <DataTable
            rows={countrydata}
            searchTerm={searchCountry}
            searchColumn="country"
            columns={[
              "country",
              "cases",
              "active",
              "recovered",
              "deaths",
              "todayCases",
              "todayDeaths",
            ]}
          />
        </div>

        {/* USA API */}

        <div className="data">
          <div className="sticky">
            <h1>USA COVID-19 Stats</h1>
            <SearchForm
              setSearchText={setSearchUsaState}
              searchText={searchUsaState}
              placeholder="Search State"
            />
          </div>

          <DataTable
            rows={modifiedUsaData}
            searchTerm={searchUsaState}
            searchColumn="state"
            columns={[
              "state",
              "cases",
              "active",
              "recovered",
              "deaths",
              "todayCases",
              "todayDeaths",
            ]}
          />
        </div>
      </div>
    </>
  );
}
