import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Test from "@/views/Test"
import Index from "@/views/Index";
import Admin from "@/views/Admin";
import ChangeUser from "@/views/user/ChangeUser";
import ViewUser from "@/views/user/ViewUser";
import AddArticle from "@/views/article/AddArticle";
import ViewArticle from "@/views/article/ViewArticle"
import Panel from "@/views/panel/Panel";
import ViewOption from "@/views/option/ViewOption";
import LinkResource from "@/views/resource/LinkResource";
import ViewTag from "@/views/article/ViewTag";
import ViewCategory from "@/views/article/ViewCategory";
import IndexArticle from "@/views/index/IndexArticle";
import Category from "@/views/category/Category";
import CategoryById from "@/views/category/CategoryById";
import ArticleById from "@/views/category/ArticleById";

Vue.use(VueRouter)


//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push

//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: "*",
    redirect: "/404"
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/',
    name: 'Index',
    component: Index,
    children: [
      {
        path: '/indexArticle',
        name: 'IndexArticle',
        component: IndexArticle,
      },
      {
        path: '/category',
        name: 'category',
        component: Category,
      },
      {
        path: '/category/:id',
        name: 'categoryById',
        component: CategoryById,
      },
      {
        path: '/oneArticle/:id',
        name: 'articleById',
        component: ArticleById,
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: '/panel',
        name: 'Panel',
        component: Panel,
      },
      {
        path: '/article/add',
        name: '添加文章',
        component: AddArticle,
      },
      {
        path: '/article/view',
        name: '查看所有文章',
        component: ViewArticle,
      },
      {
        path: '/article/tag',
        name: '标签管理',
        component: ViewTag,
      },
      {
        path: '/article/category',
        name: '目录管理',
        component: ViewCategory,
      },
      {
        path: '/user/change',
        name: '修改当前用户信息',
        component: ChangeUser,
      },
      {
        path: '/user/view',
        name: '查看用户',
        component: ViewUser,
      },
      {
        path: '/option/change',
        name: '设置',
        component: ViewOption
      },
      {
        path: '/resource/link',
        name: '链接管理',
        component: LinkResource
      }
    ]
  }
]

const router = new VueRouter({
  routes
})


export default router
