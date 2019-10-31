import React, { Component } from 'react';
import { axiosApi } from '../utils/axios';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Footer extends Component{
  render(){
    return (
      <div className="section footer">
        <Row className="sub-footer">
          <Col className="footer-content">
           <span style={{marginRight: "4px"}}>Một sản phẩm của </span>
           <a href='https://trinhngockhang.github.io/'> <span> Khang Khang </span></a>
          </Col>
        </Row>
        <Row style={{justifyContent:'center', marginTop: '20px'}}>
           <ul className="z-nav-footer">
             <li>
                <a className="z-link" href="https://trinhngockhang.github.io/" title="Giới thiệu">Giới thiệu</a>
            </li>
            <li>
                <div class="z-link z-link-special">•</div>
            </li>
            <li>
                <a href="/" class="z-link" title="Liên hệ" >Liên hệ</a>
            </li>
            <li>
                <div class="z-link z-link-special">•</div>
            </li>
            <li>
                <a href="https://trinhngockhang.github.io/" class="z-link" title="Quảng cáo" target="_blank">Quảng cáo</a>
            </li>
            <li>
                <div class="z-link z-link-special">•</div>
            </li>
            <li>
                <a href="https://trinhngockhang.github.io/" class="z-link" title="Góp ý" target="_blank">Góp ý</a>
            </li>
            <li>
                <div class="z-link z-link-special">•</div>
            </li>
            <li>
                <a href="https://trinhngockhang.github.io/" class="z-link" title="Thỏa thuận sử dụng" target="_blank">Thỏa thuận sử dụng</a>
            </li></ul>
        </Row>
      </div>
    )
  }
};