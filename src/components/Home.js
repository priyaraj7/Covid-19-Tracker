import React from "react";
import "./Home.css";
import { Table, Card, Form, Col } from "react-bootstrap";

export default function HomePage({
  countrydata,
  globaldata,
  usadata,
  searchCountry,
  setSearchCountry,
  searchUsaState,
  setSearchUsaState,
}) {
  const date = new Date(parseInt(globaldata.updated));
  const lastupdated = date.toString();

  // console.log(` Number of countries: ${countrydata.length}`);
  const filterCountry = countrydata.filter((item) =>
    item.country.includes(searchCountry)
  );

  const filterUsaState = usadata.filter((item) =>
    item.state.includes(searchUsaState)
  );

  return (
    <>
      <div className="sidenav">
        <Card
          style={{ width: "16rem", backgroundColor: "#343a40", color: "white" }}
        >
          <Card.Body>
            <Card.Header className="header">Global Data</Card.Header>
            <Card.Text>Total Cases: {globaldata.cases}</Card.Text>
            <Card.Text>Recovered: {globaldata.recovered}</Card.Text>
            <Card.Text>Deaths: {globaldata.deaths}</Card.Text>
            <Card.Text> Critical: {globaldata.critical}</Card.Text>
            <Card.Text>Active Cases: {globaldata.active}</Card.Text>
            <Card.Text> New Cases: {globaldata.todayCases}</Card.Text>
            <Card.Text> New Deaths: {globaldata.todayDeaths}</Card.Text>
          </Card.Body>

          <Card.Footer>
            <Card.Header className="text-muted"> Last updated:</Card.Header>
            <Card.Text className="text-muted"> {lastupdated}</Card.Text>
          </Card.Footer>
        </Card>
      </div>
      {/* Main page */}
      <div className="main">
        {/* CountryWise data */}
        <div className="data">
          <h1>World COVID-19 Stats</h1>
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  placeholder="Search a Country"
                  onChange={(event) => setSearchCountry(event.target.value)}
                />
              </Form.Group>
            </Form.Row>
          </Form>
          <br />

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Cases</th>
                <th>Active</th>

                <th>Recovered</th>
                <th>Deaths</th>
                <th>New Cases</th>
                <th>New Deaths</th>
              </tr>
            </thead>
            <tbody>
              {(searchCountry === "" ? countrydata : filterCountry).map(
                (country, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{country.country}</td>
                    <td>{country.cases}</td>
                    <td>{country.active}</td>
                    <td>{country.recovered}</td>
                    <td>{country.deaths}</td>

                    <td>{country.todayCases}</td>
                    <td>{country.todayDeaths}</td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </div>
        {/* USA API */}
        <div className="data">
          <h1>USA COVID-19 Stats</h1>
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  placeholder="Search State"
                  onChange={(event) => setSearchUsaState(event.target.value)}
                />
              </Form.Group>
            </Form.Row>
          </Form>
          <br />
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Cases</th>
                <th>Active</th>

                <th>Recovered</th>
                <th>Deaths</th>
                <th>New Cases</th>
                <th>New Deaths</th>
              </tr>
            </thead>

            <tbody>
              {(searchUsaState === "" ? usadata : filterUsaState).map(
                (usaState, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{usaState.state}</td>
                    <td>{usaState.cases}</td>
                    <td>{usaState.active}</td>
                    <td>{usaState.cases - usaState.active}</td>
                    <td>{usaState.deaths}</td>

                    <td>{usaState.todayCases}</td>
                    <td>{usaState.todayDeaths}</td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
