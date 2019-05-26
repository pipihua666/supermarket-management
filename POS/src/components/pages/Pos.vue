<template>
  <div class="pos">
    <el-row
      type='flex'
      justify='space-between'
    >
      <!-- 左边pos栏 -->
      <el-col
        :span='7'
        id="pos-left"
      >
        <el-tabs type='card'>
          <el-tab-pane label="点餐">
            <el-table
              border
              style="width:100%"
              :data='tableData'
              show-summary
              :summary-method="getSummaries"
              height="600"
              max-height='600'
            >
              <el-table-column
                prop='goodsName'
                label='商品'
                width='120'
              ></el-table-column>
              <el-table-column
                prop='goodsCount'
                label='数量'
                width="80"
              ></el-table-column>
              <el-table-column
                prop='price'
                label='价格'
                width="80"
              ></el-table-column>
              <el-table-column
                label='操作'
                fixed="right"
                width="120"
              >
                <template v-slot:default="scope">
                  <!--踩坑--element需要传入一行的数据就是 scope.row-->
                  <!-- 这里所有的内容都会输出到相应的插槽，这里的插槽是default -->
                  <!-- 这里是作用域插槽，可以接收到来自子组件中的数据然后输出/使用 -->
                  <!-- 作用域插槽的scope对象名字是随便起的，作用是存放子组件传来值作为scope对象的属性 -->
                  <el-button
                    type="text"
                    size="small"
                    @click="reduceCount(scope.row)"
                  ><i class="iconfont icon-jianshao"></i></el-button>
                  <el-button
                    type="text"
                    size="small"
                    @click="addCount(scope.row)"
                  ><i class="iconfont icon-zengjia"></i></el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- <div class="get-summary">
                                <span>数量：{{sumCount}}</span>
                                <span>总价：{{sumPrice}}</span>
                            </div> -->
            <div class="table-btn">
              <el-button
                type='warning'
                plain
              >挂单</el-button>
              <el-button
                type='danger'
                plain
                @click.stop="cancelOrder"
              >取消</el-button>
              <el-button
                type='success'
                plain
                @click.stop="checkout"
              >结账</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="挂单"></el-tab-pane>
          <el-tab-pane label="外卖"></el-tab-pane>
        </el-tabs>
      </el-col>
      <!-- 右边菜单栏 -->
      <el-col
        :span='17'
        id='pos-right'
      >
        <div id="often-goods">
          <div class="title">常用商品</div>
          <div class="often-goods-list">
            <ul>
              <li
                v-for="item of oftenGoods"
                :key="item.goodsId"
                @click="addTableData(item)"
              >
                <span>{{item.goodsName}}</span>
                <span class="goods-price">{{item.price|filterCompany}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div id="goods-type">
          <el-tabs>
            <el-tab-pane label='套餐'>
              <ul class="type-goods-list">
                <li
                  v-for="item of setMeal"
                  :key="item.goodsId"
                  @click="addTableData(item)"
                >
                  <div class="image">
                    <img :src="item.goodsImg">
                  </div>
                  <div class="goods">
                    <span class="goods-name">{{item.goodsName}}</span>
                    <span class="goods-price">{{item.price|filterCompany}}</span>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label='小吃'>
              <ul class="type-goods-list">
                <li
                  v-for="item of snakes"
                  :key="item.goodsId"
                  @click="addTableData(item)"
                >
                  <div class="image">
                    <span class="goods-image"><img :src="item.goodsImg"></span>
                  </div>
                  <div class="goods">
                    <span class="goods-name">{{item.goodsName}}</span>
                    <span class="goods-price">{{item.price|filterCompany}}</span>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label='饮料'>
              <ul class="type-goods-list">
                <li
                  v-for="item of drinks"
                  :key="item.goodsId"
                  @click="addTableData(item)"
                >
                  <div class="image">
                    <span class="goods-image"><img :src="item.goodsImg"></span>
                  </div>
                  <div class="goods">
                    <span class="goods-name">{{item.goodsName}}</span>
                    <span class="goods-price">{{item.price|filterCompany}}</span>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label='特价'>
              <ul class="type-goods-list">
                <li
                  v-for="item of specialOffer"
                  :key="item.goodsId"
                  @click="addTableData(item)"
                >
                  <div class="image">
                    <span class="goods-image"><img :src="item.goodsImg"></span>
                  </div>
                  <div class="goods">
                    <span class="goods-name">{{item.goodsName}}</span>
                    <span class="goods-price">{{item.price|filterCompany}}</span>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "pos",
  data() {
    return {
      tableData: [], //pos数据
      oftenGoods: [], //常用商品数据
      snakes: [], //小食数据
      setMeal: [], //套餐数据
      drinks: [], //饮料数据
      specialOffer: [] //特价商品数据
    };
  },
  filters: {
    filterCompany(value) {
      if (typeof value === "number") {
        return `￥${value.toFixed(2)}元`;
      }
    }
  },
  methods: {
    addTableData(goods) {
      //点击商品添加到pos表
      let isHave = false; //判断是否存在相同商品，默认不存在
      for (let i = 0, len = this.tableData.length; i < len; i++) {
        if (this.tableData[i].goodsId === goods.goodsId) {
          isHave = true;
          break;
        }
      }
      if (isHave) {
        let arr = this.tableData.filter(item => item.goodsId === goods.goodsId);
        arr[0].goodsCount++;
      } else {
        let newGoods = {
          goodsId: goods.goodsId,
          goodsName: goods.goodsName,
          goodsCount: 1,
          price: goods.price
        };
        this.tableData.push(newGoods);
      }
    },
    addCount(goods) {
      //点击添加按钮添加商品数量
      goods.goodsCount++;
    },
    reduceCount(goods) {
      if (goods.goodsCount > 1) {
        goods.goodsCount--;
      } else {
        this.tableData = this.tableData.filter(item => {
          return item.goodsId !== goods.goodsId;
        });
      }
    },
    cancelOrder() {
      const len = this.tableData.length;
      if (len !== 0) {
        this.tableData = [];
        this.$message({
          message: "取消订单成功！",
          type: "success"
        });
      } else {
        this.$message({
          message: "你还没添加订单哦！",
          type: "warning"
        });
      }
    },
    checkout() {
      const len = this.tableData.length;
      if (len !== 0) {
        let params = new URLSearchParams();
        params.append("content", this.tableData);
        axios
          .post(
            "http://localhost:3001/postData",
            {
              data: this.tableData
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }
          )
          .then(response => {
            this.tableData = [];
            console.log(response);
            this.$message({
              message: "结账成功",
              type: "success"
            });
          })
          .catch(error => {
            this.$message.error(error);
          });
      } else {
        this.$message({
          message: "你还没添加商品呢！",
          type: "warning"
        });
      }
    },
    getSummaries(param) {
      const { columns, data } = param; //culumns是table的所有列名，data是table的所有数据
      const sums = [];
      let count = 0;
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return; //在forEach中相当于break，退出当前循环，进入下一列
        } else if (index === 1) {
          let values = data.map(item => {
            return Number(item[column.property]); //官方判断数组有没有值得方法
          });
          const isHave = values.every(item => {
            return isNaN(item);
          });
          if (!isHave) {
            sums[index] = values.reduce((prev, cur) => {
              return prev + cur;
            });
            count = sums[index];
            sums[index] += "个";
          }
          return;
        } else if (index === 2) {
          let result = data.map(item => {
            return item[column.property];
          });
          const isHave = result.some(item => {
            //我的方法
            return typeof item === "number";
          });
          if (isHave) {
            sums[index] = result.reduce((pre, cur) => {
              return pre + cur;
            });
            sums[index] *= count;
            sums[index] += "元";
          }
          return;
        }
      });
      return sums;
    }
  },
  created() {
    axios
      .get(
        "https://www.easy-mock.com/mock/5ce5183882fc6a74749c302f/pos/oftenGoods"
      )
      //   axios.get('http://localhost:3001/oftenGoods')
      .then(response => {
        this.oftenGoods = response.data;
      })
      .catch(error => {
        alert(error);
      });
    axios
      .get(
        "https://www.easy-mock.com/mock/5ce5183882fc6a74749c302f/pos/typeGoods"
      )
      //   axios.get("http://localhost:3001/typeGoods")
      .then(response => {
        this.snakes = response.data[0];
        this.setMeal = response.data[1];
        this.drinks = response.data[2];
        this.specialOffer = response.data[3];
      })
      .catch(error => {
        alert(error);
      });
  },
  mounted: function() {
    var clientHeight = document.body.clientHeight;
    document.querySelector("#pos-left").style.height = clientHeight + "px";
  }
};
</script>

<style lang="scss" scoped>
#pos-left {
  background-color: white;
}
#pos-right {
  overflow: auto;
  li {
    cursor: pointer;
  }
}
.table-btn {
  display: flex;
  flex: 1;
  justify-content: center;
  padding-top: 1rem;
}
.title {
  height: 1.5rem;
  border-bottom: 1px solid #d3dce6;
  background-color: #f9fafc;
  padding: 1rem;
}
.goods-price {
  color: #58b7ff;
  font-size: 1rem;
  padding-left: 0.625rem;
  padding-top: 10px;
}
.goods-name {
  font-size: 1.2rem;
  padding-left: 0.8rem;
  color: brown;
}
.image img{
  max-width: 14rem;
  height: 8rem;
}
.often-goods-list 
{
  height: 16rem;
  overflow: auto;
  ul{
    display: flex;
    justify-content:  center;
    flex-wrap: wrap;
    li {
      flex: 0 1 auto;
      width: 20%;
      display: block;
      list-style: none;
      border: 1px solid #e5e9f2;
      padding: 1.5rem;
      margin: 0.5rem;
      background-color: #fff;
    }
  }
}
.type-goods-list{
  display: flex;
  justify-content: flex-start;
  li{
    display: flex;
    flex:0 1 auto;
    justify-content: center;
    list-style: none;
    border: 1px solid #e5e9f2;
    background-color: #fff;
    margin: .5rem;
    flex-wrap: wrap;  //屏幕缩小的时候就会自动换行
    .goods{
      line-height: 2rem;
      margin-right: 1rem;
      flex:0 1 auto; 
    }
    span{
      display: block;
    }
  }
}
</style>


