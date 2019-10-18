import React, { Component } from 'react';
import { axiosApi } from '../utils/axios';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class AlbumSection extends Component{
  constructor(props){
    super(props);
    this.state = {items: []};
    this.getData();
  }
  async getData(){
    const result = await axiosApi.get('/album/new');
    this.setState({items: result.data});
  }

  render(){
    return (
      <div className="section">
        <h3>Albums mới</h3>
        <Row>
          {this.state.items.map((album, index) => {
            if(index > 4 ) return <div></div>
            return(
              <Col key={index}>
              <Link to={`/album/${album.id}`}>
                <img className='album-image' src={album.img} alt={album.albumName}></img>
                <p>{album.albumName}</p>
              </Link>
              </Col>
            )
          })}
        </Row>
      </div>
    )
  }
};