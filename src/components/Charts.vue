
<template>
  <div class="box">
    <h2 class="subtitle">Chart</h2>
    <div class="chart-container">
      <loading-spinner v-if="loadingStatus.isChartLoading"></loading-spinner>
      <canvas style="display:none;" id='chart-temphumid'></canvas>
    </div>
    <div class="chart-container">
      <loading-spinner v-if="loadingStatus.isChartLoading"></loading-spinner>
      <canvas style="display:none;" id='chart-pressure'></canvas>
    </div>
  </div>
</template>

<script lang="ts">
// import Chart from 'chart.js/dist/Chart.bundle.min.js'
import Vue from 'vue';
import Component from 'vue-class-component';
import tempChartConfig from '../config/temp-chart-config';
import pressureChartConfig from '../config/pressure-chart-config';
import LoadingSpinner from './LoadingSpinner.vue';
import Chart from 'chart.js';

@Component
class Charts extends Vue {
  public name: any;
  public props: any;
  public data: any;
  public created: any;
  public mounted: any;
  public watch: any;
  public tempChart: any;
  public pressureChart: any;
  public noDataFound: any;
  public components: any;

  constructor() {
    super();
    this.name = 'charts';
    this.props = {
      sensorLog: Object,
      loadingStatus: Object,
    };
    this.data = function() {
      return {
        noDataFound: false,
      };
    };
    this.mounted = this._mounted.bind(this);
    this.watch = {
      sensorLog: {
        handler: this._onNewData.bind(this),
        deep: true,
      },
    };
    this.components = {
      'loading-spinner': LoadingSpinner,
    };
  }

  public _mounted() {
    const tempHumidElement = document.getElementById('chart-temphumid') as HTMLCanvasElement;
    this.tempChart = new Chart(tempHumidElement, tempChartConfig);
    const pressureElement = document.getElementById('chart-pressure') as HTMLCanvasElement;
    this.pressureChart = new Chart(pressureElement, pressureChartConfig);
  }

  public _onNewData(val: any, oldVal: any) {
    const data = val.value;
    if (!data || Object.keys(data).length === 0) {
      this.noDataFound = true;
      console.warn('no data for chart found');
      return;
    }
    const tempData: Chart.ChartPoint[] = [];
    const pressureData: Chart.ChartPoint[] = [];
    const humidityData: Chart.ChartPoint[] = [];

    Object.keys(data).forEach((key) => {
      const value = data[key];
      const time = new Date(value.created_at);
      tempData.push({
        x: time,
        y: value.temperature,
      });
      humidityData.push({
        x: time,
        y: value.humidity,
      });
      pressureData.push({
        x: time,
        y: value.pressure / 100,
      });
    });
    this.tempChart.data.datasets[0].data = tempData;
    this.tempChart.data.datasets[1].data = humidityData;
    this.pressureChart.data.datasets[0].data = pressureData;

    const tempHumidElement = document.getElementById('chart-temphumid')!;
    tempHumidElement.style.display = 'block';
    const pressureElement = document.getElementById('chart-pressure')!;
    pressureElement.style.display = 'block';
    if (this.tempChart) { this.tempChart.update(); }
    if (this.pressureChart) { this.pressureChart.update(); }
  }
}
export default new Charts();
</script>

<style>
  .chart-container {
    position: relative;
    width: 100%;
    height: 300px;
  }

</style>

