<template>
  <div class="container">
    <div class="columns">
      <div class="column is-narrow">
          <latest-values ref="latest" :latest="latest" :loading-status="loadingStatus"></latest-values>
      </div>
      <div class="column">
          <charts ref="charts" :sensor-log="sensorLog" :loading-status="loadingStatus"></charts>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Charts from './components/Charts.vue';
import LatestValues from './components/LatestValues.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';

@Component
class App extends Vue {
  public name: any;
  public props: any;
  public components: any;
  constructor() {
    super();
    this.name = 'app';
    this.props = {
      latest: Object,
      sensorLog: Object,
      loadingStatus: Object,
    };
    this.components = {
      'charts': Charts,
      'latest-values': LatestValues,
      'loading-spinner': LoadingSpinner,
    };
  }
}
export default new App();
</script>

