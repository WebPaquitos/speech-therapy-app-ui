import React, { Component } from 'react';
import DPicker from 'react-datepicker';

class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: null,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            selectedDate: date,
        });
    }

    render() {
        const {
                  name,
                  dateFormat,
                  placeholderText,
                  onBlur,
                  onDragStart,
                  onDrop,
                  onFocus,
              } = this.props;
        return (
            <DPicker
                selected={this.state.selectedDate}
                value={this.state.selectedDate}
                onChange={this.handleChange}
                className="date-picker"
                name={name}
                dateFormat={dateFormat}
                placeholderText={placeholderText}
                onBlur={onBlur}
                onDragStart={onDragStart}
                onDrop={onDrop}
                onFocus={onFocus}
                isClearable
            />
        );
    }
}

export default DatePicker;
