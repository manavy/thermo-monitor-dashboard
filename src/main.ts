'use strict';
/* tslint:disable no-new */
/* tslint:disable no-unused-expression */

declare function require(x: string): any;

import Vue from 'vue';
import App from './App.vue';
import {FirebaseData} from './datatypes';
import getFirebaseConfig from './config/firebase-config';

import registerFilters from './utils/filters';
registerFilters(Vue);

Vue.config.productionTip = false;

function loadFirebase() {
  return import(/* webpackChunkName: "firebase" */ 'firebase/app').then( (firebase) => {
    return import(/* webpackChunkName: 'firebase' */ 'firebase/database').then(() => {
      return firebase;
    });
  });
}

const firebaseData: FirebaseData = {
  loadingStatus: {
    isCurrentTempLoading: true,
    isChartLoading: true,
  },
  latest: {
    temperature: 0,
    humidity: 0,
    pressure: 0,
    lastUpdatedAt: 0,
  },
  sensorLog: {
    value: {},
  },
};


loadFirebase().then((firebase) => {
  firebase.initializeApp(getFirebaseConfig());

  const latestRef = firebase.database().ref('latest');
  latestRef.on('value', (data) => {
    if (!data) { return; }
    const value = data.val();
    firebaseData.latest.temperature = value.temperature;
    firebaseData.latest.humidity = value.humidity;
    firebaseData.latest.pressure = value.pressure;
    firebaseData.latest.lastUpdatedAt = value.created_at;
    firebaseData.loadingStatus.isCurrentTempLoading = false;
  });

  const sensorLogRef = firebase.database()
    .ref('sensor_log')
    .orderByChild('created_at')
    .startAt(Date.now() - 6 * 60 * 60 * 1000);

  sensorLogRef.on('value', (data) => {
    if (!data) { return; }
    firebaseData.sensorLog.value = data.val();
    firebaseData.loadingStatus.isChartLoading = false;
  });
});

new Vue({
  el: '#app',
  template: '<App :latest="latest" :sensor-log="sensorLog" :loading-status="loadingStatus" ref="app"/>',
  components: { App },
  data: () => {
    return {
      latest: firebaseData.latest,
      sensorLog: firebaseData.sensorLog,
      loadingStatus: firebaseData.loadingStatus,
    };
  },
});
