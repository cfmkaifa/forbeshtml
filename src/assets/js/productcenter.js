let obj = 'productcenter';
export const clssify = {
    clssifyPage: obj + '/clssify/page',//分页查询新闻分类get
    clssifyAdd: obj + '/clssify/add',//添加post
    clssifyDelete: obj + '/clssify/delete',//删除delete
    clssifyEdit: obj + '/clssify/edit',//修改put
    uppate: obj + '/clssify/uppate-status',//禁用/启用商品分类状态
    // typeBach: obj + '/clssify/delete-batch',//批量删除delete
};
export const attr = {
    attrPage: obj + '/attr/page',//分页查询新闻分类get
    attrAdd: obj + '/attr/batch-add',//添加post
    // attrDelete: obj + '/attr/delete',//删除delete
    attrEdit: obj + '/attr/upd-attr',//修改put
    // uppate: obj + '/attr/uppate-status',//禁用/启用商品分类状态
    attrBach: obj + '/attr/del-attr',//批量删除delete
}