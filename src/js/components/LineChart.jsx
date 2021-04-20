import React, { Component } from "react";

import {Line } from 'react-chartjs-2';

export default class LineChart extends Component {
    render( ){ 
        return (
            <div className="graph">
                <Line
                    data={this.props.data}
                    options={{ maintainAspectRatio: false }}
                />
            </div>
        )
    }
}