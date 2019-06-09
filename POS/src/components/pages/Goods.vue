<template>
    <div id='goods'>
        <div class="goods-search">
            <label for="#">货品名字：</label>
            <el-input v-model='inputName' placeholder="请输入货品的名字"></el-input>
            <label for="#">货品类别：</label>
            <el-select v-model='inputCategory'>
                <el-option v-for="item of inputCategories" :key='item' :value='item'></el-option>
            </el-select>
            <label for="#">
                <el-button type='primary' icon="el-icon-search" round @click="search">查询</el-button>
            </label>
            <label for="#">
                <el-button type='warning' icon="el-icon-delete" round @click='clear'>清空</el-button>
            </label>
            <label for="#" class="labelRight">
                <el-button type='primary' icon="el-icon-circle-plus-outline" @click='showAddForm'>入库</el-button>
            </label>
        </div>

        <!-- goodsData -->
        <el-table :data='goodsData'  style="width:95%;margin:1rem auto;color:" stripe size='small' row-class-name='column-class' empty-text="亲，暂时没有数据哦" element-loading-text="拼命加载中">
            <el-table-column prop='goodsId' label="货品编号" width='200' align='center'></el-table-column>
            <el-table-column prop='goodsName' label='货品名字' width='200' align='center'></el-table-column>
            <el-table-column prop='goodsCount' label='货品数量' width='200' align='center'></el-table-column>
            <el-table-column prop='goodsPrice' label='货品价格' width='200' align='center'></el-table-column>
            <el-table-column prop='goodsTime' label='过期时间' width='200' align='center'>
                <template #default='scope'>
                    <i class="el-icon-time"></i>
                    <span>{{scope.row.goodsTime}}</span>
                </template>
            </el-table-column>
            <el-table-column prop='goodsCategory' label='货品类别' width='200' align='center'>
                <template #default='scope'>
                    <el-tag type='primary' width='100'>
                        {{scope.row.goodsCategory}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label='操作' fixed='right' size='small' align='center'>
                <template #default='scope'>
                    <el-button type='primary' plain size='small' @click="showModifyForm(scope.row)">编辑</el-button>
                    <el-button type='danger' plain size='small' @click="deleteRow(scope.row['goodsId'])">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
             <el-pagination
                layout="total,sizes,prev, pager, next, jumper"
                background
                :total='totalCount'
                @size-change='handleSizeChange'
                @current-change='handleCurrentChange'
                :current-page='currentPage'
                :page-size='pageSize'
                :page-sizes='pageSizes'
               >
             </el-pagination>
        </div>

        <!-- addForm -->
        <el-dialog title="入库" :visible.sync='addFormVisible'   @close="resetForm('addForm')" width='42%'>
            <el-form :model="addForm" :rules="rules" ref='addForm'>
                <el-form-item label='货品编号：' prop='goodsId' label-width='6rem'>
                    <el-input v-model="addForm.goodsId" placeholder="请输入货品编号"></el-input>
                </el-form-item>
                <el-form-item label='货品名称：' prop='goodsName' label-width='6rem'>
                    <el-input v-model='addForm.goodsName' placeholder="请输入货品名称"></el-input>
                </el-form-item>
                <el-form-item label='货品数量：' prop='goodsCount' label-width='6rem'>
                    <el-input v-model.number="addForm.goodsCount" placeholder="请输入货品数量"></el-input>
                </el-form-item>
                <el-form-item label='货品价格：' prop='goodsPrice' label-width='6rem'>
                    <el-input v-model.number="addForm.goodsPrice" placeholder="请输入货品价格"></el-input>
                </el-form-item>
                <el-form-item label='货品类别：' prop='goodsCategory' label-width='6rem'>
                    <el-select v-model="addForm.goodsCategory" placeholder="请选择货品的类别">
                        <el-option  v-for='item of inputCategories' :key='item' :label='item' :value='item'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='过期时间： ' prop='goodsTime' label-width='6rem'>
                     <el-date-picker type="date" placeholder="选择日期" v-model="addForm.goodsTime"></el-date-picker>
                </el-form-item>
            </el-form>
            <div class="form-button">
                <el-button type='danger' @click='addFormVisible = false'>取消</el-button>
                <el-button type='success' @click="addFormData">添加</el-button>
            </div>
        </el-dialog>

        <!-- reduceForm -->
        <!-- <el-dialog title="出库" :visible.sync='reduceFormVisible'   @close="resetForm('reduceForm')" width='25%' >
            <el-form :model="reduceForm" :rules="rules" ref='reduceForm'>
                <el-form-item label='货品编号：' prop='goodsId' label-width='6rem'>
                    <el-input v-model="reduceForm.goodsId" placeholder="请输入货品编号"></el-input>
                </el-form-item>
                <el-form-item label='货品名称：' prop='goodsName' label-width='6rem'>
                    <el-input v-model='reduceForm.goodsName' placeholder="请输入货品名称"></el-input>
                </el-form-item>
                <el-form-item label='货品数量：' prop='goodsCount' label-width='6rem'>
                    <el-input v-model.number="reduceForm.goodsCount" placeholder="请输入货品数量"></el-input>
                </el-form-item>
            </el-form>
            <div class="form-button">
                <el-button type='danger' @click='reduceFormVisible = false'>取消</el-button>
                <el-button type='success' @click="reduceFormData">添加</el-button>
            </div>
        </el-dialog> -->

        <!-- 编辑货品 -->
        <el-dialog title="编辑商品" :visible.sync=' modifyFormVisible'  @close="resetForm('modifyForm')" width='42%'>
                      <el-form :model="modifyForm" :rules="rules" ref='modifyForm'>
                <el-form-item label='货品编号：' prop='goodsId' label-width='6rem'>
                    <el-input v-model="modifyForm.goodsId" placeholder="请输入货品编号"></el-input>
                </el-form-item>
                <el-form-item label='货品名称：' prop='goodsName' label-width='6rem'>
                    <el-input v-model='modifyForm.goodsName' placeholder="请输入货品名称"></el-input>
                </el-form-item>
                <el-form-item label='货品数量：' prop='goodsCount' label-width='6rem'>
                    <el-input v-model.number="modifyForm.goodsCount" placeholder="请输入货品数量"></el-input>
                </el-form-item>
                <el-form-item label='货品价格：' prop='goodsPrice' label-width='6rem'>
                    <el-input v-model.number="modifyForm.goodsPrice" placeholder="请输入货品价格"></el-input>
                </el-form-item>
                <el-form-item label='货品类别：' prop='goodsCategory' label-width='6rem'>
                    <el-select v-model="modifyForm.goodsCategory" placeholder="请选择货品的类别">
                        <el-option  v-for='item of inputCategories' :key='item' :label='item' :value='item'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='过期时间： ' prop='goodsTime' label-width='6rem'>
                     <el-date-picker  placeholder="选择日期" v-model="modifyForm.goodsTime"></el-date-picker>
                </el-form-item>
            </el-form>
            <div class="form-button">
                <el-button type='danger' @click='modifyFormVisible = false'>取消</el-button>
                <el-button type='success' @click="modifyFormData">确定</el-button>
            </div>
        </el-dialog>

        <!-- 删除一行数据dialog -->
        <!-- <el-dialog title="提示" :visible.sync='deleteRowVisible' center='true' width='25%' custom-class="deleteRow">
            <span>你确认需要删除此行数据吗？</span>
            <span slot='footer'>
                <el-button type='danger' @click="deleteRowVisible = false">取消</el-button>
                <el-button type='success' @click="deleteRowData">确定</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>

<script>
export default {
    name:'Goods',
    data(){
        return{
            goodsData:[],//table数据
            //
            inputName:'',//搜索框
            inputCategory:'',//搜索框
            inputCategories:['生活用品','零食','饮料','特价','其他'],//搜索框
            //
            addFormVisible:false,  //添加数据dialog
            modifyFormVisible:false, //修改数据dialog
            reduceFormVisible:false, //删除数据的dialog
            deleteRowVisible:false, //删除一行数据的dialog
            //
            addForm:{ //addForm的数据
                goodsId:'',
                goodsName:'',
                goodsCount:'',
                goodsPrice:'',
                goodsCategory:'',
                goodsTime:''
            },
            modifyForm:{  //modifyForm数据
                goodsId:'',
                goodsName:'',
                goodsCount:'',
                goodsPrice:'',
                goodsCategory:'',
                goodsTime:''
            },
            reduceForm:{ //redecueForm数据
                goodsId:'',
                goodsName:'',
                goodsCount:''
            },
            //
            rules:{ //form表单的规则
                goodsId:[
                    { required: true, message: '请填入编号', trigger: 'blur' },
                ],
                goodsName:[
                    {required:true,message:'请填入名称',trigger:'blur'},
                ],
                goodsCount:[
                    { required: true, message: '请填入数量', trigger: 'blur' },
                    {type:'number',message:'请填入数字',trigger:'blur'}
                ],
                goodsPrice:[
                    { required: true, message: '请填入价格', trigger: 'blur' },
                    {type:'number',message:'请填入数字',trigger:'blur'}
                ],
                goodsCategory:[
                    {required: true, message: '请选择类别', trigger: 'change' }
                ],
                goodsTime:[
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ]
            },
            //分页数据
            currentPage:1,//当前显示第几页
            totalCount:9,//根据数据获取总长度
            pageSize:8,//默认每页显示的条数
            pageSizes:[6,8],
            prePage:0,

            //文件上传
            fileList:[],
        };
    },
    methods:{
        search(){
            if(!this.inputName==''||!this.inputCategory==''){
                this.$ajax.get('/api/search',{
                    params:{
                        inputName:this.inputName,
                        inputCategory:this.inputCategory
                    },
                    timeout:1000
                })
                .then((response)=>{
                    let arr = Object.keys(response.data);
                    if((response.status == 200)&&(arr.length>0)){
                        this.goodsData = response.data;
                        this.$message({
                            type:'success',
                            message:'查询数据成功'
                        });
                    }
                    else{
                        this.goodsData = [];
                        this.$message({
                            type:'warning',
                            message:'查询数据不存在'
                        });
                    }
                })
                .catch((error)=>{
                    this.$message.error(error.message);
                })
            }else{
                this.getData(this.currentPage-1,this.pageSize);
                this.$message({
                    type:'error',
                    message:'请输入你需要查询的商品'
                })
            }
        },
        clear(){  //清空查询的内容
            this.inputName='';
            this.inputCategory='';
        },
        showAddForm(){  //显示添加数据的dialog
            this.addFormVisible=true
        },
        showModifyForm(row){//显示修改一行数据dialog
            this.modifyFormVisible=true;
            this.modifyForm = Object.assign({}, row); //row属性会覆盖modifyForm的相关属性
            console.log(this.modifyForm);
        },
        showReduceForm(){
            this.reduceFormVisible = true;
        },
        deleteRow(id){//删除一行数据dialog
            const deleteId=id;
            this.$confirm('是否确定删除','提示',{
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type:'warning',
            })
            .then(()=>{
                this.$ajax.delete('/api/deleteRow',{
                    params:{
                        id:deleteId
                    }
                })
                .then(()=>{
                    this.getData(this.currentPage-1,this.pageSize);
                    this.$message({
                        message:'删除成功',
                        type:'success'
                    });
                })
                .catch((error)=>{
                    this.$message.error(`删除失败，失败原因是：${error.message}`);
                })
                
            })
        },
        resetForm(formRef){ //after cancel重置 form
            this.$refs[formRef].resetFields();
        },
        addFormData(){
            const addFormParams=this.addForm;
            this.$ajax.post('/api/addForm',{
                data:addFormParams,
                timeout:1000
            })
            .then((response)=>{
                this.goodsData=response.data;
                this.addFormVisible==true;
                this.getData(this.currentPage-1,this.pageSize);
            })
            .catch((error)=>{
                this.$message.error(error.message);
            })
            this.addFormVisible=false;
        this.$message({
            message:'添加数据成功',
            type:'success'
        })
        },
        modifyFormData(){
            const modifyFormParams=this.modifyForm;
            this.$ajax.put('/api/modifyForm',{
                data:modifyFormParams,
                timeout:1000
            })
            .then((response)=>{
                this.goodsData=response.data;
                this.modifyFormVisible=true;
                this.getData(this.currentPage-1,this.pageSize);
                this.$message({
                    message:'更改数据成功',
                    type:'success'
                });
                this.modifyFormVisible=false;
            })
            .catch((error)=>{
                this.$message.error(error.message);
            })
        },
        // reduceFormData(){
        //     const reduceFormParams=this.reduceForm;
        //     this.$ajax.put('reduceForm',{
        //         params:reduceFormParams,
        //         timeout:1000
        //     })
        //     .then((response)=>{
        //         this.goodsData=response.data;
        //         this.$message({
        //             message:'出库成功'
        //         })
        //     })
        //     .catch((error)=>{
        //         this.$message.error(`出库失败，原因是：${error.message}`);
        //     })
        // },
        //分页
        handleSizeChange(value){//pagesize页数改变时的回调
            this.pageSize = value;
            this.getData(0,value);
            this.currentPage = 1;
        },
        handleCurrentChange(value){ //currentPage当前页改变时的回调
            this.currentPage=value;
            this.getData(this.pageSize*(value-1),(value)*(this.pageSize));
        },
        getData(pageSize,currentPage){
            this.$ajax.post('/api/goodsData',{
                data:{
                    // 每页显示的条数
                    pageSize:pageSize,
                    // 显示第几页
                    currentPage:currentPage
                }
            })
            .then((response)=>{
                this.goodsData=response.data;
            })
            .catch((error)=>{
                this.$message({
                    type:'error',
                    message:error
                })
            })
        },
    },
    created(){
        this.getData(this.prePage,this.pageSize);
    },
    updated(){
        this.$ajax.get('/api/getCount').then((res)=>{
            this.totalCount = res.data.length;
        }).catch((err)=>{
            this.$message({
                type:"error",
                message:err
            });
        })
    }
}
</script>

<style lang="scss">
#goods{
    width: 100%;
    background-color: white;
    height: 100%;
}
.goods-search{
    padding: 2rem;
    border-bottom: 1px dotted black;
    label{
        margin-left: 2rem;
    }
    .el-input{
        width: 12rem;
    }
    .labelRight{
        float: right;
    }
}
.block{
    float: right;
    margin-right:2rem;
}
.el-dialog{
    overflow: hidden;
    height: 25rem;
    .el-input{
        width: 12rem;
    }
    .el-form-item{
        padding: 5px;
        float: left;
    }
    .form-button{
        float: right;
    }
}
.column-class{
 font:14px/1.5 'Microsoft YaHei',arial,tahoma,\5b8b\4f53,sans-serif;
}
.deleteRow{
    height: 29%;
    text-align: center;
}
</style>


