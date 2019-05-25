<template>
  <div class="error">
    <lottie
      :options="defaultOptions"
      :height="700"
      :width="700"
    />
  </div>
</template>

<script>
// https://github.com/chenqingspring/vue-lottie
import * as animationData from "@/assets/404/404.json"; //引入动画json
export default {
  name: "error",
  data() {
    return {
      defaultOptions: { animationData: animationData },//导出动画数据的object
    };
  }
};
</script>

<style>
.error {
  width: 100%;
  height: 100%;
}
</style>

