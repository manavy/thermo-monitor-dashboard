<template>
  <div class="box" style="width: 300px; height: 300px;">
    <div>
      <h2 class="subtitle">Current Temperature</h2>
      <p></p>
    </div>
    <div>
      <!-- TODO fix spinner position -->
      <loading-spinner style="top: 110px" v-if="loadingStatus.isCurrentTempLoading"></loading-spinner>
      <div v-else>
        <table class="table is-striped is-fullwidth">
          <tbody>
          <tr>
            <th>Temperature</th>
            <td class="subtitle">
              {{latest.temperature | floor}}.
              {{latest.temperature | round | decimal-str}}℃
            </td>
          </tr>
          <tr>
            <th>humidity</th>
            <td class="subtitle">
              {{latest.humidity | floor}}.
              {{latest.humidity | round | decimal-str}}%
            </td>
          </tr>
          <tr>
            <th>Pressure</th>
            <td class="subtitle">
              {{latest.pressure | to-hpa | floor}} hPa
            </td>
          </tr>
          </tbody>
        </table>
        <p>Last updated at: {{latest.lastUpdatedAt | datetime}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import LoadingSpinner from './LoadingSpinner.vue';

@Component
class LatestValues extends Vue {
  public name: any;
  public props: any;
  public components: any;
  constructor() {
    super();
    this.name = 'latest-values';
    this.props = ['latest', 'loadingStatus'];
    this.components = {
      'loading-spinner': LoadingSpinner,
    };
  }
}
export default new LatestValues();
</script>

