import React, { Component } from "react";

import { Radar } from 'react-chartjs-2';

export default class AreaChart extends Component {
    render( ){ 
        return (
            <div className="graph">
                <Radar
                    data={this.props.data}
                    options={{ maintainAspectRatio: false }}
                    type={'radarArea'}
                />
            </div>
        )
    }
}