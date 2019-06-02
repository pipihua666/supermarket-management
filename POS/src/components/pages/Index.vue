<template>
    <div id='index'>
        <template>
            <el-carousel height='300px' type='card' trigger='click'>
                <el-carousel-item v-for="(item,index) in imgArr" :key='index'>
                    <img :src="item" alt="图片" class="imgClass">
                </el-carousel-item>
            </el-carousel>
        </template>
    </div>
</template>

<script>
export default {
    name:'Index',
    data(){
        return {
            imgArr:[
                'http://img2.imgtn.bdimg.com/it/u=3230740943,2194698121&fm=26&gp=0.jpg',
                'http://img2.imgtn.bdimg.com/it/u=310867335,47017775&fm=26&gp=0.jpg',
                'http://img2.imgtn.bdimg.com/it/u=1963661110,1685480926&fm=26&gp=0.jpg',
                'http://img0.imgtn.bdimg.com/it/u=2134567228,656831138&fm=26&gp=0.jpg'
            ]
        };
    },
    created(){

    }
}
</script>

<style lang="scss" scoped>
.el-carousel__item:nth-child(2n){
    background-color:  #99a9bf;
}
.el-carousel__item:nth-child(2n+1){
    background-color: #d3dce6;
}
.imgClass{
    width: 100%;
}
</style>


