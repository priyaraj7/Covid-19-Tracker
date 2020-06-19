import React from "react";
import { Col, Form } from "react-bootstrap";

const ReusableSearchForm = ({ setSearchText, searchText, placeholder }) => {
  return (
    <Form>
      <Form.Row>
        <div className="mb-2 ml-auto">
          <Form.Group as={Col}>
            <Form.Control
              value={searchText}
              type="text"
              placeholder={placeholder}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </Form.Group>
        </div>
      </Form.Row>
    </Form>
  );
};

export default ReusableSearchForm;
