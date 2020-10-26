import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from "../page/login"
import layout from "../page/layout"
//菜单导航
import MenuAdd from "../components/main/add"
import Menu from "../components/main/Index"
import MenuEdit from "../components/main/edit"
//角色菜单
import Role from "../components/role/index"
import RoleAdd from "../components/role/add"
import RoleEdit from "../components/role/edit"
//管理员管理
import Admit from "../components/admin/index"
import admitAdd from "../components/admin/add"
import admitEdit from "../components/admin/edit"
//商城管理
//商城分类
import category from "../components/category/index"
import categoryAdd from "../components/category/add"
import categoryEdit from "../components/category/edit"
//商城规格
import specs from "../components/specs/index"
import specsAdd from "../components/specs/add"
import specsEdit from "../components/specs/edit"
//商品管理
import goodsList from "../components/goodList/index"
import goodsAdd from "../components/goodList/add"
import goodsEdit from "../components/goodList/edit"
//会员管理
import huiIndex from "../components/huiyuan/index"
import huiEdit from "../components/huiyuan/edit"
//轮播图
import lunboIndex from "../components/lunbo/index"
import lunboadd from "../components/lunbo/add"
import lunboedit from "../components/lunbo/edit"
//秒杀活动
import miaoIndex from "../components/miaosha/index"
import miaoAdd from "../components/miaosha/add"
import miaoEdit from "../components/miaosha/edit"
// 图标库
import charts from "../page/home"
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      meta:{
        title:"管理员登录"
      }
    },
    {
      path: '/',
      name: 'layout',
      redirect:"/home",
      component: layout,
      children: [
        {
          path: '/menu',
          component: Menu,
          meta:{
            title:"菜单管理"
          }
        },
        {
          path: '/menu/add',
          name: 'add',
          component: MenuAdd,
          meta:{
            title:"菜单添加"
          }
        },
        {
          path: '/menu/:id',
          component: MenuEdit,
          meta:{
            title:"菜单编辑"
          }
        },
        {
          path: '/role',
          component: Role,
          meta:{
            title:"角色管理"
          }
        },
        {
          path: '/role/add',
          component: RoleAdd,
          meta:{
            title:"角色添加"
          }
        },
        {
          path: '/role/:id',
          component: RoleEdit,
          meta:{
            title:"角色编辑"
          }
        },
        {
          path: "/admin",
          component: Admit,
          meta:{
            title:"管理员管理"
          }
        },
        {
          path: "/admin/add",
          component: admitAdd,
          meta:{
            title:"管理员添加"
          }
        },
        {
          path: "/admin/:id",
          component: admitEdit,
          meta:{
            title:"管理员编辑"
          }
        },
        {
          path: "/category",
          component: category,
          meta:{
            title:"商品分类"
          }
        },
        {
          path: "/category/add",
          component: categoryAdd,
          meta:{
            title:"商品添加"
          }
        },
        {
          path: "/category/:id",
          component: categoryEdit,
          meta:{
            title:"商品编辑"
          }
        },
        {
          path: "/specs",
          component: specs,
          meta:{
            title:"商品规格"
          }
        },
        {
          path: "/specs/add",
          component: specsAdd,
          meta:{
            title:"规格添加 "
          }
        },
        {
          path: "/specs/:id",
          component: specsEdit,
          meta:{
            title:"规格编辑"
          }
        },
        {
          path: "/goods",
          component: goodsList,
          meta:{
            title:"商品列表"
          }
        },
        {
          path: "/goods/add",
          component: goodsAdd,
          meta:{
            title:"商品添加"
          }
        },
        {
          path: "/goods/:id",
          component: goodsEdit,
          meta:{
            title:"商品编辑"
          }
        },
        {
          path:"/huiIndex",
          component:huiIndex,
          meta:{
            title:"会员管理"
          }
        },
        {
          path:"/huiIndex/:id",
          component:huiEdit,
          meta:{
            title:"会员编辑"
          }
        },
        {
          path:"/lunboIndex",
          component:lunboIndex,
          meta:{
            title:"轮播图管理"
          }
        },
        {
          path:"/lunboIndex/add",
          component:lunboadd,
          meta:{
            title:"轮播图添加"
          }
        },
        {
          path:"/lunboIndex/:id",
          component:lunboedit,
          meta:{
            title:"轮播图编辑"
          }
        },
        {
          path:"/miaoIndex",
          component:miaoIndex,
          meta:{
            title:"秒杀活动"
          }
        },
        {
          path:"/miaoIndex/add",
          component:miaoAdd,
          meta:{
            title:"秒杀活动添加"
          }
        },
        {
          path:"/miaoIndex/:id",
          component:miaoEdit,
          meta:{
            title:"秒杀活动编辑"
          }
        },
        {
          path: "/home",
          component: charts,
          meta:{
            title:"销售业绩统计"
          }
        },

      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  // 如果to.path!='/login'; 
  if (to.path != "/login") {
    // 判断登录状态  JSON.parse('{}')  null
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '{}');
    //没有登录
    if (!userInfo.token) {
      // 重定向到login
      return next('/login')
    }
    // 登录状态
    return next();
  }
  next();
})
export default router;
