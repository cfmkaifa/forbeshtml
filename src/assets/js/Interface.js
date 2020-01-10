export const homeRouter = {
    path: '/home',
    component: resolve => require(['../../components/common/Home.vue'], resolve),
    meta: { title: '福布斯云商' },
    children:[
       {
       }
    ]
  };

let obj = 'usercenter'
export const role = {
    rolePage:obj + '/role/page',//分页查询角色 
    roleAdd:obj + '/role/add',//添加角色
    edit:obj + '/role/edit',//编辑角色
    delete:obj + '/role/delete',//删除角色
    deleteBatch:obj + '/role/delete-batch',//批量删除
    permissions:obj + '/role/role-permissions-role-id',// 	根据角色ID获取授权
    tree:obj + '/permission/query-tree-list',// 获取所有资源权限树形
    grant:obj + '/role/grant-role',// 角色授权
    roleList: obj +'/role/list',//查询所有角色
    roleCodes: obj + '/role/role-codes',//角色编码get
}
export const user = {
    userPage:obj + '/user/page',//分页查询用户 
    userAdd:obj + '/user/add',//添加用户
    userEdit:obj + '/user/edit',//编辑用户
    userDelete:obj + '/user/delete',//删除用户
    // deleteBatch:obj + '/user/delete-batch',//批量删除
    adminFlags:obj +'/user/admin-flags',//	获取管理员标识
}
// 资源
export const permissions = {
    permissionsPage: obj + '/permission/page',//分页查询 
    permissionsAdd: obj + '/permission/add',//添加
    permissionsEdit: obj + '/permission/edit',//编辑
    permissionsDelete: obj + '/permission/delete',//删除
    deleteBatch:obj + '	/permission/delete-batch',//批量删除
}
export function getCode(mod,total) {
    //自动编码
    if(mod){
        var time = new Date();
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        if (m > 0 && m < 10) {m = "0" + m;}
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        var num = (total+1);
        var len = num.toString().length;
            while(len < 4) {
            num = "0" + num;
            len++;
        }
        var Numbers = mod + y + "" + m + "" + d + "" + h + "" + mm + "" + s + num;
        return Numbers;
    }
}
export function pad(num, n) {
    
  }

//获取元素的宽度,高度
export function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }else {
        return document.defaultView.getComputedStyle(obj, null)[attr];
    }
}

//全屏点击事件
export const screen = (val) => {
    let element = document.documentElement;
    if (val) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();

        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();

        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();

        }
    } else {
        if (element.requestFullscreen) {
            element.requestFullscreen();

        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();

        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();

        } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen();
        }
    }
    val = !val;
}

//企业管理接口
export const business={
    pagelist:"/mould/org/list",
    add:"/mould/org/add",
    del:"/mould/org/delete",
    edit:"/mould/org/edit",
    delall:"/mould/org/delete-batch",
    cheakCode:"/mould/org/check-enter-code" //检查编码是否唯一
}

//加载数据分页
export function getData(that,url,uid) {
    let TsURL = getUrl(url,"pagelist");
    if(uid){
      TsURL = TsURL+'/'+uid;
    }
    that.loading = true;
    setTimeout(() => {
        this.axios.get(TsURL, { params: that.Parm }).then(res => {
            if (res.data.code == 0) {
                that.loading = false;
                let { result } = res.data;
                that.tabValue = result.records;
                that.Parm.total = result.total;
                that.loading = false;
            }
      });
    }, 700);
}

//添加更新
export function requst(that, method, url) { //添加更新 
    let urls = url
    that.axios[method](urls, that.ruleForm).then((res) => {
        if (res.data.code == 200) {
            that.$message.success(res.data.message)
            that.redata();
            that.cleardata();
            that.showdiag = false;
        }
        else if (res.data.code == 500) {
            that.$message.error(res.data.message);
        }
    })
}

//删除全部
export function delall(url) {
    if (this.multipleSelection.length > 0) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const delallData = () => {

                    return new Promise((reslove, reject) => {
                        let temp = [];
                        this.multipleSelection.map((val) => {
                            temp.push(val.id);
                        });
                        let parms = temp.join(",");
                        let urls = `${url}?ids=${parms}`
                        this.axios.delete(urls).then((res) => {
                            res.data.code == 200 ? reslove(res) : reject(res.data.message);
                        })
                    })
                }
                const ASYNS = async () => {
                    let result = await delallData();
                    this.$message.success(result.data.message);
                    this.rload();
                }
                ASYNS()
            }).catch(() => {
                that.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

    }
    else {
        that.$message({
            message: '至少选择一条数据!',
            type: 'warning'
        });
    }
}
//单个删除
export function deletes(url, val) {
    this.$confirm('此操作将永久删除, 是否继续?', '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            let urls = `${url}?id=${val.id}`
            this.axios.delete(urls).then(res => {
                if (res.data.code == 0) {
                    this.$message.success(res.data.message)
                    this.rload();
                }
            })
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        });

}
//验证按钮权限
export function btnPerms(that, val) {
    const permbtn = () => {
        return new Promise((resolve, reject) => {
            let url = `/sys/permission/query-button-by-user?permissionId=${val.item.id}`;
            that.axios.get(url).then(res => {
                if (res.data.code == 200) {
                    resolve(res)
                }
                else {
                    reject(res.data.message)
                }
            }).catch(errors => {
                console.log(errors)
            })
        })
    }
    const Async = async () => {
        let res = await permbtn();
        if (res.data.code == 200) {
            val.btncode.map((value) => {
                value.show = res.data.result.some((val) => {
                    return val.perms == value.perms
                })
            });
            val.btncode.map((val, index) => {
                that.$set(that.pageBtn, index, val);
            })
        }
    }
    Async();

}

//日期转换
export function getDates(value) {
    let date = new Date(value);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
}


