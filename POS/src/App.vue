<template>
  <div id="app">
    <!-- 左侧导航 -->
    <leftNav></leftNav>

    <!-- 主内容区域 -->
    <transition name="fade" mode="out-in">
      <main class="main">
        <router-view/>
      </main>
    </transition>


  </div>
</template>

<script>
import leftNav from '@/components/common/leftNav'
export default {
  name: 'App',
  components:{
    leftNav
  }
}
</script>

<style lang="scss">
  #app{
    height: 100vh;
    width: 100vw;
  }
  .main{
    width: 95%;
    background-color: #EFF2F7;
    height: 100%;
    float: right;
  }
</style>
