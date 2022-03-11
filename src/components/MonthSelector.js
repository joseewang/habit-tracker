import React from 'react';
import { months } from '../utilities/Date';

export default class MonthSelector extends React.Component {
  render() {
    return (
      <div className="month-selector">
        {months.map((month, i) => {
          return (
            <span
              key={month}
              onClick={() => this.props.selectMonthHandler(i)}
              className={`selectable-month ${
                i === this.props.month ? "selected-month" : ""
              }`}
            >
              {month}
            </span>
          );
        })}
      </div>
    );
  }
}