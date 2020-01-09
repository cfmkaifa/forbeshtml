let obj = 'systemcenter'
export const newsType = {
    typePage: obj + '/news-type/page',//分页查询新闻分类get
    typeAdd: obj + '/news-type/add',//添加post
    typeDelete: obj + '/news-type/delete',//删除delete
    typeEdit: obj + '/news-type/edit',//修改put
    typeBach: obj + '/news-type/delete-batch',//批量删除delete
}
// 新闻中心
export const news = {
    page: obj + '/news/page',//查get
    add: obj + '/news/add',//增post
    // delete: obj + '/news/edit',//删delete
    edit: obj + '/news/edit',//改put
    withdraw: obj + '/news/withdraw-news',//下架put	
    release: obj + '/news/release-news',//上架put	
    examine: obj + '/news/examine-news'//审核
}
export const navigation = {
    navPage: obj + '/navigation-group/page',//查get
    navAdd: obj + '/navigation-group/add',//增post
    navDelete: obj + '/navigation-group/delete',//删delete
    navEdit: obj + '/navigation-group/edit',//改put
    // withdraw: obj + '/navigation-group/withdraw-news',//下架put	
    // release: obj + '/navigation-group/release-news',//上架put	
    // examine: obj + '/navigation-group/examine-news'//审核
}