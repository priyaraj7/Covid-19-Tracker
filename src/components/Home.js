import React from "react";
import "./Home.css";
import { Table, Card, Form } from "react-bootstrap";

export default function HomePage({ countrydata, globaldata, usadata }) {
  const date = new Date(parseInt(globaldata.updated));
  const lastupdated = date.toString();
  // let date = new Date(globaldata.updated);
  // let lastupdated =
  //   parseInt(date.getMonth() + 1) +
  //   "-" +
  //   date.getDate() +
  //   "-" +
  //   date.getFullYear();
  console.log({ usadata });

  return (
    <>
      <div className="sidenav">
        <Card
          style={{ width: "16rem", backgroundColor: "#343a40", color: "white" }}
        >
          <Card.Body>
            <Card.Header>Global Data</Card.Header>
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

      <div className="main">
        {/* CountryWise data */}
        <h1>countrydata</h1>
        <div className="data">
          <Form.Group>
            <Form.Control as="select" size="lg">
              {countrydata.map((country, index) => (
                <option key={index}>{country.country}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
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
              {countrydata.map((country, index) => (
                <tr key={index}>
                  <td>{country.country}</td>
                  <td>{country.cases}</td>
                  <td>{country.active}</td>
                  <td>{country.recovered}</td>
                  <td>{country.deaths}</td>

                  <td>{country.todayCases}</td>
                  <td>{country.todayDeaths}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {/* USA API */}
        <h1>usadata</h1>
        <div className="data">
          <Form.Group>
            <Form.Control as="select" size="lg">
              {usadata.map((country, index) => (
                <option key={index}>{country.country}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
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
              {usadata.map((usaState, index) => (
                <tr key={index}>
                  <td>{usaState.state}</td>
                  <td>{usaState.cases}</td>
                  <td>{usaState.active}</td>
                  <td>{usaState.cases - usaState.active}</td>
                  <td>{usaState.deaths}</td>

                  <td>{usaState.todayCases}</td>
                  <td>{usaState.todayDeaths}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

//https://www.w3schools.com/howto/howto_css_fixed_sidebar.asp
