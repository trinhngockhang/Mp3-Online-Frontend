import React, { Component } from 'react';
import { axiosApi } from '../utils/axios';
import { Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default class CategoriesSection extends Component{
  constructor(props){
    super(props);
    this.state = {items: []};
    this.getData();
  }
  async getData(){
    const result = await axiosApi.get('/categories/popular');
    this.setState({items: result.data});
  }

  render(){
    return (
      <div className="section">
        <h3>Thể loại</h3>
        <Row>
          <div className=""></div>
          {this.state.items.map((category, index) => {
            return(
              <Col key={index} lg={2}>
                <Link to={`/category/${category.id}`}>
                <img src={category.img} className="category-image" alt={category.name}></img>
                <p>{category.name}</p>
                </Link>
              </Col>
            )
          })}
        </Row>
      </div>
    )
  }
};