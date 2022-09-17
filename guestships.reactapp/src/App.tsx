import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Hole } from './Hole';
import { ShipType } from './ShipType';
import { Board } from './Board';
import { Col, Form, Row } from 'reactstrap';

function App() {
  return (
    <div className="App">
        <Form>
        <Row>
          <Col>
          <Board />
          </Col>
        </Row> 
        </Form>
    </div>
  );
}

export default App;
