import React, { Component } from "react";
import "./App.css";
import OverallCompletionChart from "./components/OverallCompletionChart";
import BarChart from "./components/BarChart";
import GaugeChart from "./components/GaugeChart";
// import SingleHabitTracker from "./components/SingleHabitTracker";
import Calendar from "./components/Calendar";

// const data = [25, 30, 45, 60, 20, 65, 75];
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      habit: [],
      month: 0,
    }
  }

  updateHabit = (data, month) => {
    this.setState({habit: data, month: month})
  }
  
  render() {
    const {habit} = this.state;
    // console.log('this.state.habit', this.state.habit);

    const newData = habit.reduce((accum, currElem) => {
      if(currElem.habitStatus === true) accum++;
      return accum;
    }, 0)
    const completionStatus = newData/habit.length;
    const gaugeInput = [completionStatus, 1-completionStatus];

    return (
      <div className="container">
        {/* <OverallCompletionChart data={data} /> */}
        {/* <BarChart data={habit} month={this.state.month} /> */}
        <GaugeChart data={gaugeInput} />
        {/* <OverallCompletionChart data={habit} /> */}
        <Calendar habitData={habit} updateHabit={this.updateHabit}/>
        {/* <button onClick={() => setData(data.map(value => value + 5))}>
          Update data
        </button>
        <button onClick={() => setData(data.filter(value => value < 35))}>
          Filter data
        </button>
        <button
          onClick={() => setData([...data, Math.round(Math.random() * 100)])}
        >
          Add data
        </button> */}
      </div>
    );
  }
};
