<template>
    <nav class="left-nav">
        <ul>
            <li>
                <i class="iconfont icon-shouyin"></i>
                <div>收银</div>
            </li>
            <li>
                <i class="iconfont icon-dianpu"></i>
                <div>店铺</div>
            </li>
            <li>
                <i class="iconfont icon-shangpin"></i>
                <div>商品</div>
            </li>
            <li>
                <i class="iconfont icon-huiyuan-"></i>
                <div>会员</div>
            </li>
            <li>
                <i class="iconfont icon-gouwuche"></i>
                <div>购物车</div>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
    .left-nav{
        width: 5%;
        float: left;
        font-size: 1rem;
        background-color: skyblue;
        height: 100%;
        border-radius: 5px;
    }
    .iconfont{
        font-size: 2rem;
    }
    .left-nav > ul{
        list-style: none;
    }
    .left-nav ul li{
        text-align: center;
        padding: .5rem;
        border-bottom:1px solid #20a0ff;
        cursor: pointer;
        opacity: 0.5;
    }
    .left-nav ul li:hover{
        background-color: white;
        opacity: 1;
        transform: translate3d(1px,1px)
    }
</style>


