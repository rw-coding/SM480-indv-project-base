import React, { Component } from "react";
import TwitterSeach from "../pages/TwitterSearch"

import { Pie } from 'react-chartjs-2';

const data = {
    labels: ['Tweet'],
    datasets: [
        {
          label: '# of Retweets',
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(50, 136, 237, 1)',
          data: [60, 40, 20, 0]
        }
    ]
};

export default class PieChart extends Component {
    render( ){ 
        return (
            <div>
          <Pie
              data={data}
              options={{ maintainAspectRatio: false }}
          />
          </div>
        )
    }
}