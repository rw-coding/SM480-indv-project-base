import React, { Component } from "react";

import { Pie } from 'react-chartjs-2';


export default class PieChart extends Component {
    render( ){ 
        return (
            <div className="graph">
                <Pie
                    data={this.props.data}
                    options={{ maintainAspectRatio: false }}
                />
            </div>
        )
    }
}