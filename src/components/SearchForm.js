import React from "react";
import { Col, Form } from "react-bootstrap";

const ReusableSearchForm = ({ setSearchText, searchText, placeholder }) => {
  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Control
            value={searchText}
            type="text"
            placeholder={placeholder}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default ReusableSearchForm;
