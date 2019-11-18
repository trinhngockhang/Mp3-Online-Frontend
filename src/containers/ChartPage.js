import React, { Component } from 'react';
import Chart from '../components/Chart';

export default class ChartPage extends Component{
  render(){
    return (
      <Chart limit={15}></Chart>
    )
  }
};
