import React, { Component } from 'react';
import {
  Form,
  Col,
  Row,
  Container,
  Button
} from 'react-bootstrap';

import dataYaml from './data/index.yaml';

const Item = ({
  titre,
  moyenne,
  icones,
  index,
  percent
}) => (
  <Row>
    <Col style={{ position: 'absolute', top: `${index * 25}px`, left: `${percent}%` }} xs="12">
      <span>{`${icones} ${titre} ${moyenne}`}</span>
    </Col>
  </Row>
);

class Home extends Component {
  constructor() {
    super();

    this.state = {
      value: 0
    };
    // Créer une référence
    this.itemsEl = React.createRef();
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });

    // Permet de récupérer la taille total de l'écran
    console.log(this.itemsEl.current.parentElement.clientWidth);
  }

  handleClick() {
    this.setState({
      value: 0
    });
  }

  computeCo2Percent(dataAvg) {
    const { value } = this.state;
    const avg = parseInt(value, 10) * dataAvg;

    return (avg * 100) / (value * 24000);
  }

  render() {
    const { value } = this.state;

    return (
      <Container fluid>
        <Row>
          <Col xs="2">
            <Form>
              <Form.Control value={value} onChange={(e) => this.handleChange(e)} />
            </Form>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => this.handleClick()}>Reset</Button>
          </Col>
        </Row>
        <Row>
          {/* Je set la référence à l'element ue je souhaite target */}
          <Col xs="12" ref={this.itemsEl}>
            {dataYaml.extraUrbains.map((transport, index) => {
              console.log(this.computeCo2Percent(transport.moyenne));

              return (
                <Item
                  key={transport.titre}
                  index={index}
                  titre={transport.titre}
                  moyenne={transport.moyenne}
                  icones={transport.icones}
                  percent={this.computeCo2Percent(transport.moyenne)}
                />
              );
            })}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
