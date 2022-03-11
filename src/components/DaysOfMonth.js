import React from 'react';
import { firstDayOfMonth } from '../utilities/Date';

export default class DaysOfMonth extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      days: new Array(this.props.days).fill({habitStatus: false}),
    }
  }

  componentDidMount(){
    let newDays = this.state.days.map((day, i) => ({...day, date: i+1}));
    this.setState({days: newDays})
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.days !== this.state.days){
      this.props.updateHabit(this.state.days, this.props.month);
    }
  }

  selectDayHandler = index => {
    let updateDays = [...this.state.days];
    updateDays[index].habitStatus =!updateDays[index].habitStatus;
    this.setState({days: updateDays});
  }

  render() {
    const { days } = this.state;
    const { month, now } = this.props;
    
    // console.log('what is this.props', this.props);
    // console.log('what is this.state.days', this.state.days);
    
    const dayToBeginTheMonthFrom = firstDayOfMonth(month);
    // console.log('what is dayToBeginMonthFrom', dayToBeginTheMonthFrom);
    const currentDate = now.getDate();
    const style = { gridColumnStart: dayToBeginTheMonthFrom + 1 };
    // console.log('what is style', style);

    return days.map((day, i) => (
      <span
        key={i}
        className={`
          day ${i === 0 ? "first-day" : ""}
          ${i + 1 === currentDate && day.habitStatus === false ? "today" : ""}
          ${day.habitStatus === true ? "holiday" : "" }
          `}
        style={i === 0 ? style : {}}
        onClick={() => this.selectDayHandler(i)}
      >
        {i + 1}
      </span>
    ));
  }
}
