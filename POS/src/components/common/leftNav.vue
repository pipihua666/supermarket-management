<template>
  <nav class="left-nav">
    <ul>
      <li>
        <router-link to='/'>
          <i class="iconfont icon-shouye"></i>
          <div>首页</div>
        </router-link>
      </li>
      <li>
        <router-link to='/pos'>
          <i class="iconfont icon-shouyintai"></i>
          <div>收银</div>
        </router-link>
      </li>
      <li>
        <router-link to='/goods'>
          <i class="iconfont icon-shangpin"></i>
          <div>商品</div>
        </router-link>
      </li>
      <li>
        <router-link to='/user'>
          <i class="iconfont icon-yonghu"></i>
          <div>用户</div>
        </router-link>
      </li>
      <li>
        <router-link to='/help'>
          <i class="iconfont icon-kefu"></i>
          <div>客服</div>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss">
.iconfont {
  font-size: 2rem;
}
.left-nav {
  width: 5%;
  float: left;
  font-size: 1rem;
  background-color: rgba(0, 120, 215, 0.5);
  height: 100%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  ul {
    li {
      list-style: none;
      text-align: center;
      padding: 0.5rem;
      border-bottom: 1px solid #20a0ff;
      cursor: pointer;
      opacity: 0.5;
      transition: all 0.1s linear;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      &:hover {
        font-size: 2rem;
        background-color: rgba(0, 120, 215, 0.7);
        opacity: 1;
      }
      a {
        text-decoration: none;
        color: black;
      }
    }
  }
}
</style>


