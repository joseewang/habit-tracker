import React from 'react';
import '../App.css';
// import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material';
import { months } from '../utilities/Date';

export default class Header extends React.Component {
  // decreaseMonth = () => {
  //   this.props.setMonth(Math.abs((this.props.month + 12 - 1) % 12));
  // };

  // increaseMonth = () => {
  //   this.props.setMonth(Math.abs((this.props.month + 1) % 12));
  // };

  render() {
    return (
      <div className="header">
        <div className="header--info">
          <span className="header--month" onClick={this.props.monthHandler}>
            {months[this.props.month]}
          </span>
          <span className="header--year">{this.props.year}</span>
        </div>
        {/* <div className="header-icons">
          <span onClick={this.decreaseMonth}>
            <ChevronLeftOutlined />
          </span>
          <span onClick={this.increaseMonth}>
            <ChevronRightOutlined />
          </span>
        </div> */}
      </div>
    );
  }
}