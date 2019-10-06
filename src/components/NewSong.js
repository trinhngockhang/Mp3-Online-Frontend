import React, { Component } from 'react';
import axios from '../utils/axios';
import { Row, Col } from 'react-bootstrap';

export default class NewSong extends Component{
  constructor(props){
    super(props);
    this.state = {items: []};
    this.getData();
  }
  async getData(){
    const newAxios = await axios();
    const result = await newAxios.get('/song/new');
    this.setState({items: result.data});
  }

  render(){
    return (
      <div className="section">
        <h3>Những bài hát mới</h3>
        <Row>
          <div className=""></div>
          {this.state.items.map((song, index) => {
            return(
              <Col key={index} onClick={() =>{

                }}>
                <img src={song.image}></img>
                <p>{song.nameSong}</p>
              </Col>
            )
          })}
        </Row>
      </div>
    )
  }
};