import Chart from 'chart.js';

const chartColors = {
  blue: 'rgb(54, 162, 235)',
};
const timeFormat = 'mm/DD HH:mm';
const pressureChartConfig: Chart.ChartConfiguration = {
  type: 'line',
  data: {
    datasets: [{
      label: 'Air Pressure',
      backgroundColor: chartColors.blue,
      borderColor: chartColors.blue,
      data: [],
      fill: false,
    },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Air Pressure',
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          parser: timeFormat,
          tooltipFormat: 'll HH:mm',
        },
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'DateTime',
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 5,
        },
      }],
      yAxes: [{
        type: 'linear',
        position: 'right',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Air Pressure',
        },
      },
      ],
    },
  },
};

export {pressureChartConfig as default};
