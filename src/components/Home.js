import React from "react";
import "./Home.css";
import { Table, Card } from "react-bootstrap";

export default function HomePage({ countrydata, globaldata }) {
  // const date = new Date(parseInt(globaldata.updated));
  // const lastupdated = date.toString();
  let date = new Date(globaldata.updated);
  let lastupdated =
    parseInt(date.getMonth() + 1) +
    "-" +
    date.getDate() +
    "-" +
    date.getFullYear();

  return (
    <>
      <div className="sidenav">
        <Card style={{ width: "10rem" }}>
          <Card.Body>
            <Card.Text>Total Cases</Card.Text>
            <Card.Header>{globaldata.cases}</Card.Header>
          </Card.Body>

          <Card.Body>
            <Card.Text>Recovered</Card.Text>
            <Card.Header>{globaldata.recovered}</Card.Header>
          </Card.Body>

          <Card.Header>Deaths</Card.Header>
          <Card.Body>
            <Card.Text> {globaldata.deaths}</Card.Text>
          </Card.Body>

          <Card.Header>Critical</Card.Header>
          <Card.Body>
            <Card.Text> {globaldata.critical}</Card.Text>
          </Card.Body>

          <Card.Header>Active Cases</Card.Header>
          <Card.Body>
            <Card.Text> {globaldata.active}</Card.Text>
          </Card.Body>

          <Card.Header>New Cases</Card.Header>
          <Card.Body>
            <Card.Text> {globaldata.todayCases}</Card.Text>
          </Card.Body>

          <Card.Header>New Deaths</Card.Header>
          <Card.Body>
            <Card.Text> {globaldata.todayDeaths}</Card.Text>
          </Card.Body>

          <Card.Header variant="primary">Last updated</Card.Header>
          <Card.Body variant="'Danger'">
            <Card.Text> {lastupdated}</Card.Text>
          </Card.Body>
        </Card>
      </div>

      <div className="main">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Cases</th>
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
                <td>{country.recovered}</td>
                <td>{country.deaths}</td>
                <td>{country.todayCases}</td>
                <td>{country.todayDeaths}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

//https://www.w3schools.com/howto/howto_css_fixed_sidebar.asp
