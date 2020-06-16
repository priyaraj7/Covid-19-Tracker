import React from "react";
import { Card } from "react-bootstrap";
import moment from "moment";

const Sidebar = ({ globaldata }) => {
  let lastupdated = moment(globaldata.updated).startOf("hour").fromNow();

  return (
    <div className="sidebar">
      <Card style={{ width: "16rem" }}>
        <Card.Body>
          <Card.Header className="header">Global Data</Card.Header>

          <Card.Text>
            <span className="cases">Total Cases:</span> {globaldata.cases}
          </Card.Text>
          <Card.Text>
            <span className="recovered">Recovered:</span> {globaldata.recovered}
          </Card.Text>
          <Card.Text>
            <span className="deaths">Deaths:</span> {globaldata.deaths}
          </Card.Text>
          <Card.Text>
            {" "}
            <span className="critical">Critical:</span> {globaldata.critical}
          </Card.Text>
          <Card.Text>
            <span className="active">Active Cases:</span> {globaldata.active}
          </Card.Text>
          <Card.Text>
            <span className="new-cases"> New Cases:</span>{" "}
            {globaldata.todayCases}
          </Card.Text>
          <Card.Text>
            {" "}
            <span className="new-deaths">New Deaths:</span>{" "}
            {globaldata.todayDeaths}
          </Card.Text>
        </Card.Body>

        <Card.Footer>
          <Card.Header className="text-muted"> Last updated:</Card.Header>
          <Card.Text className="text-muted"> {lastupdated}</Card.Text>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Sidebar;
