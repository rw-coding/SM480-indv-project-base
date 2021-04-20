import React, { Component } from "react";

import { Bar } from 'react-chartjs-2';

export default class VerticalChart extends Component {
    render () {
        return (
            <div className="graph">
                <Bar
                    data={this.props.data}
                    options={{ maintainAspectRatio: false }}
                />
            </div>
        )
    }
}