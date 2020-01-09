export const roleManage = [{
  mode: "系统管理",
  item: { title: "角色管理", id: "d947aa74588c7799107658855d47fea2" },
  btncode: [{ show: false, btnname: "编辑", perms: "roleedit001" },
  { show: false, btnname: "删除", perms: "roledel001" },
  { show: false, btnname: "授权", perms: "roleperm001" },
  { show: false, btnname: "添加", perms: "roleadd001" },
  { show: false, btnname: "删除", perms: "roledelall001" } //批量删除
  ]
}]

export const personManage = {
  item: { title: "人员管理", id: "0b7ccb1c4222157789ee32e14739e695" },
  btncode: [
    { show: false, btnname: "添加", perms: "personadd" },
    { show: false, btnname: "编辑", perms: "personEdit" },
    { show: false, btnname: "删除", perms: "personDel" },
    { show: false, btnname: "删除", perms: "personDelall" } //删除所有
  ]
}

export const businessManage = {
  item: { titl: "企业管理", id: "4dc5365342bf2a1a3a82c9e949207824" },
  btncode: [
    { show: false, btnname: "添加", perms: "businessAdd" },
    { show: false, btnname: "编辑", perms: "businessEdit" },
    { show: false, btnname: "删除", perms: "businessDel" },
    { show: false, btnname: "删除", perms: "businessDelall" } //删除所有
  ]
}

export const modlManage = {
  item: { titl: "模具管理", id: "5d6f0178111d9c409697c883476a6d75" },
  btncode: [
    { show: false, btnname: "添加", perms: "mouldAdd" },
    { show: false, btnname: "编辑", perms: "mouldEdit" },
    { show: false, btnname: "删除", perms: "mouldDel" },
    { show: false, btnname: "导入", perms: "mouldImport" },
    { show: false, btnname: "删除", perms: "mouldDelall" } //删除所有
  ]
}

export const equipManage = {
  item: { titl: "设备管理", id: "a7a9f4e2b8757b765e912c7122f80415" },
  btncode: [
    { show: false, btnname: "添加", perms: "equipAdd" },
    { show: false, btnname: "编辑", perms: "equipEdit" },
    { show: false, btnname: "删除", perms: "equipDel" },
    { show: false, btnname: "导入", perms: "equipImport" },
    { show: false, btnname: "删除", perms: "equipDelall" } //删除所有
  ]
}

export const repairManage = {
  item: { titl: "设备报修", id: "42f51f2810ba005e519122456c9ce774" },
  btncode: [
    { show: false, btnname: "查看详情", perms: "RepairCheck" },
    { show: false, btnname: "删除", perms: "RepairDel" },
    { show: false, btnname: "删除", perms: "RepairDelall" } //删除所有
  ]
}

export const warnManage = {
  item: { titl: "模具预警", id: "0de27009047b0607d4104412a0133ac8" },
  btncode: [
    { show: false, btnname: "添加", perms: "warnAdd" },
    { show: false, btnname: "编辑", perms: "warnEdit" },
    { show: false, btnname: "删除", perms: "warnDel" },
    { show: false, btnname: "删除", perms: "warnDelall" } //删除所有
  ]
}



