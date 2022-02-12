const propListConfig = [
  { prop: "name", label: "商品名称", minWidth: "100", slotName: "name" },
  {
    prop: "oldPrice",
    label: "原价",
    minWidth: "100",
    slotName: "oldPrice"
  },
  {
    prop: "newPrice",
    label: "折扣价",
    minWidth: "100",
    slotName: "newPrice"
  },
  {
    prop: "desc",
    label: "商品描述",
    minWidth: "100",
    slotName: "desc"
  },
  { prop: "status", label: "状态", minWidth: "100", slotName: "status" },
  {
    prop: "imgUrl",
    label: "商品图片",
    minWidth: "100",
    slotName: "imgUrl"
  },
  {
    prop: "saleCount",
    label: "库存",
    minWidth: "100",
    slotName: "saleCount"
  },
  {
    prop: "favorCount",
    label: "销量",
    minWidth: "100",
    slotName: "favorCount"
  },
  {
    prop: "address",
    label: "地址",
    minWidth: "100",
    slotName: "address"
  },
  {
    prop: "createAt",
    label: "创建时间",
    minWidth: "180",
    slotName: "createAt"
  },
  {
    prop: "updateAt",
    label: "更新时间",
    minWidth: "180",
    slotName: "updateAt"
  },
  {
    label: "操作",
    minWidth: "180px",
    slotName: "operation"
  }
];
const showIndexColumn = true;
const showSelectColumn = true;
const title = "商品列表";
export default {
  title,
  showIndexColumn,
  showSelectColumn,
  propList: propListConfig
};
