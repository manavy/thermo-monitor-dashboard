<template>
  <div class="spinner-container">
    <div class="spinner-loader spinner-loader-style"></div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'loading-screen',
};
</script>

<style>
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .spinner-container {
    /*  height: 100vh; */
    height: 100%;
    position: relative;
  }

  .spinner-loader {
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    transform: translate(-50%,-50%);
    width: 50px;
    height: 50px;
    border: 2px solid #0cf;
    border-radius: 50%;
    animation: spin 0.75s infinite linear;
  }
  .spinner-loader::before,
  .spinner-loader::after {
    left: -2px;
    top: -2px;
    display: none;
    position: absolute;
    content: '';
    width: inherit;
    height: inherit;
    border: inherit;
    border-radius: inherit;
  }

  .spinner-loader-style {
    border-top-color: transparent;
  }
  .spinner-loader-style::after {
    display: block;
    border-color: transparent;
    border-top-color: #0cf;
    animation: spin 1.25s infinite linear reverse;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
