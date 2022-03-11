import React from 'react';

export default class WeekDays extends React.Component {
  render() {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="weekrow">
        {weekdays.map(weekday => {
          return (
            <span key={weekday} className="weekday">
              {weekday}
            </span>
          );
        })}
      </div>
    );
  }
}