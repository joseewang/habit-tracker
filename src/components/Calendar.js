import React from "react";
import "../App.css";
import { daysInMonth } from "../utilities/Date";
import Header from "./Header";
import WeekDays from "./WeekDays";
import DaysOfMonth from "./DaysOfMonth";
import MonthSelector from "./MonthSelector";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    const habit = this.props.habit;
    const now = new Date();
    this.state = {
      month: now.getMonth(),
      now: now,
      displayMonthSelector: false,
      habit: habit || [],
    };
  }

  setMonth = newMonth => {
    this.setState(prevState => {
      const newNow = new Date(prevState.now);
      newNow.setMonth(newMonth);
      return {
        month: newMonth,
        now: newNow
      };
    });
  };

  monthHandler = () => {
    this.setState(prevState => ({ displayMonthSelector: true }));
  };

  selectMonthHandler = month => {
    this.setState(
      prevState => ({ displayMonthSelector: false }),
      () => this.setMonth(month)
    );
  };

  // updateHabit = (data) => {
  //   this.setState({habit: data})
  // }

  render() {
    const { updateHabit } = this.props;
    const days = daysInMonth(this.state.month);
    // console.log('this.state.habit', this.state.habit);

    return (
      <div className="calendar">
        <Header
          month={this.state.month}
          year={this.state.now.getFullYear()}
          // setMonth={this.setMonth}
          monthHandler={this.monthHandler}
        />
        <WeekDays />
        <DaysOfMonth
          days={days}
          month={this.state.month}
          now={this.state.now}
          updateHabit={updateHabit}
        />
        {this.state.displayMonthSelector && (
          <MonthSelector
            month={this.state.month}
            selectMonthHandler={this.selectMonthHandler}
          />
        )}
      </div>
    );
  }
}
