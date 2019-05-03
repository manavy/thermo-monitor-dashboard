import Chart from 'chart.js';
const chartColors = {
  red: 'rgb(255, 99, 132)',
  blue: 'rgb(54, 162, 235)',
};
const timeFormat = 'mm/DD HH:mm';
const tempChartConfig: Chart.ChartConfiguration = {
  type: 'line',
  data: {
    datasets: [{
      label: 'Temperature',
      backgroundColor: chartColors.red,
      borderColor: chartColors.red,
      data: [],
      yAxisID: 'y-axis-1',
      fill: false,
    }, {
      label: 'Humidity',
      backgroundColor: chartColors.blue,
      borderColor: chartColors.blue,
      data: [],
      yAxisID: 'y-axis-2',
      fill: false,
    }],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Temperature & Humidity',
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
          labelString: 'Temperature',
        },
        id: 'y-axis-1',
      }, {
        type: 'linear',
        position: 'left',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Humidity',
        },
        id: 'y-axis-2',
      },
      ],
    },
  },
};

export {tempChartConfig as default};
