import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends React.Component {
  constructor(props) {
    super(props);
    const { data, status } = props;

    this.state = {

      series: [
        {
          name: "Người dùng",
          data: data.map((item) => item.numUsers),
        },
        {
          name: "Chủ sở hữu cửa hàng",
          data: data.map((item) => item.numOwners),
        },
        {
          name: "Người vận chuyển",
          data: data.map((item) => item.numShippers),
        },
      ],
      options: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          stroke: {
            width: 1, // Đặt chiều rộng của đường về 2
            curve: 'smooth', // Chọn loại đường cong là mượt mà
          },
        },
        legend: {
          tooltipHoverFormatter: function (val, opts) {
            return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
          }
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6
          }
        },

        xaxis: {
          categories: status ? data.map((item) => item.date) : data.map((item) => item._id),
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val + " (mins)"
                }
              }
            },
            {
              title: {
                formatter: function (val) {
                  return val + " per session"
                }
              }
            },
            {
              title: {
                formatter: function (val) {
                  return val;
                }
              }
            }
          ]
        },
        colors: ['#FF0000', '#FFFF00', '#00FF00'],
      },


    };
  }



  render() {
    return (
      <ReactApexChart options={this.state.options} series={this.state.series} type="line" height="100%" />
    );
  }
}

export default ApexChart;
