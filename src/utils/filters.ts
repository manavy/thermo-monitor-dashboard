
function zeropad(num: number) {
  return ('0' + num).slice(-2);
}

function round(num: number, point = 1) {
  const base = Math.pow(10, point);
  return Math.floor(num * base) / base;
}

function getDecimalsStr(num: number) {
  const decimals = String(num).split('.')[1];
  return decimals || '00';
}

function formatDateTime(timestamp: number) {
  if (!timestamp) { return ''; }
  const date = new Date(timestamp);
  return [
    zeropad(date.getFullYear()),
    zeropad(date.getMonth() + 1),
    zeropad(date.getDate()),
  ].join('/') + ' ' +
  [
    zeropad(date.getHours()),
    zeropad(date.getMinutes()),
    zeropad(date.getSeconds()),
  ].join(':');
}

function convertPa2hPa(Pa: number) {
  return Pa / 100;
}

export default (Vue: any) => {
  Vue.filter('datetime', formatDateTime);

  Vue.filter('decimal-str', getDecimalsStr);

  Vue.filter('round', round);

  Vue.filter('floor', Math.floor);

  Vue.filter('to-hpa', convertPa2hPa);
};

