import React from "react";
import "./Sidebar.css";
import { Card } from "react-bootstrap";
import moment from "moment";

const Sidebar = ({ globaldata }) => {
  let lastupdated = moment(globaldata.updated).startOf("hour").fromNow();

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Header style={{ fontSize: "25px" }}>Global Data</Card.Header>
          <div style={{ fontSize: "20px" }}>
            <Card.Text>
              Total Cases: <span className="cases">{globaldata.cases}</span>
            </Card.Text>
            <Card.Text>
              Recovered:{" "}
              <span className="recovered">{globaldata.recovered}</span>{" "}
            </Card.Text>
            <Card.Text>
              Deaths: <span className="deaths">{globaldata.deaths}</span>
            </Card.Text>
            <Card.Text>
              {" "}
              Critical: <span className="critical">{globaldata.critical}</span>
            </Card.Text>
            <Card.Text>
              Active Cases: <span className="active"> {globaldata.active}</span>
            </Card.Text>
            <Card.Text>
              New Cases:{" "}
              <span className="new-cases">{globaldata.todayCases}</span>{" "}
            </Card.Text>
            <Card.Text>
              {" "}
              New Deaths:
              <span className="new-deaths">{globaldata.todayDeaths}</span>
            </Card.Text>
          </div>
        </Card.Body>
        <Card.Footer>
          <Card.Header className="text-muted">
            {" "}
            Last updated: {lastupdated}
          </Card.Header>
          {/* <Card.Text className="text-muted"> {lastupdated}</Card.Text> */}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Sidebar;
