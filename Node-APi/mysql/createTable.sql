-- 注：只向商品入库表和商品出库信息表中插入数据，不能直接向商品信息表中插入数据，
-- 触发器会自动完成向商品信息表中插入数据的操作
-- 商品入库表：向商品入库表中插入数据，同时会自动向商品信息表中插入相同数据，从而实现商品入库功能；
-- 	        那么查询商品入库表可以实现查询入库历史纪录的操作；
-- 商品出库表：向商品出库表中插入数据，同时会自动从商品信息表中删除相同数据，从而实现商品出库功能；
--	        查询商品出库表可以实现查询出库历史剧记录的操作；

create database my_goodsdb;

use my_goodsdb;

create table goodsData(-- 商品信息表
	goodsId char(20) primary key,-- 商品编号
	goodsName char(20),-- 商品名称
	goodsCategory char(20),-- 商品类别
	goodsTime char(20),-- 保质期
    goodsPrice char(20), -- 价格
	goodsCount int-- 商品数量
);