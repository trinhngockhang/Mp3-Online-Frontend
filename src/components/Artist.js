import React, { Component } from 'react';
import axios from '../utils/axios';
import { Row, Col } from 'react-bootstrap';

export default class Artist extends Component{
  constructor(props){
    super(props);
    this.state = {items: []};
    this.getData();
  }
  async getData(){
    const newAxios = await axios();
    const result = await newAxios.get('/artist/suggest');
    this.setState({items: result.data});
  }

  render(){
    return (
      <div className="section">
        <h3>Nghệ sĩ</h3>
        <Row>
          <div className=""></div>
          {this.state.items.map((singer, index) => {
            return(
              <Col key={index}>
                <img src={singer.avatar} className="artist-image" alt={singer.name}></img>
                <p>{singer.name}</p>
              </Col>
            )
          })}
        </Row>
      </div>
    )
  }
};