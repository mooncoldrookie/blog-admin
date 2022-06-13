import NotFound from '@/views/NotFound.vue'
import Error from '@/views/Error'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    name: 'Main',
    component: () => import('@/layouts/index.vue'),
    meta: {
      icon: 'gauge',
      title: '首页',
    },
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '控制面板',
        },
      },
      {
        path: '/post',
        name: 'Post',
        component: () => import('@/views/post/index.vue'),
        redirect: '/post/all',
        meta: {
          icon: 'file-lines',
          title: '文章',
        },
        children: [
          {
            path: '/post/all',
            name: 'PostAll',
            component: () => import('@/views/post/all/index.vue'),
            meta: {
              title: '文章管理',
            },
          },
          {
            path: '/post/write',
            name: 'PostWrite',
            component: () => import('@/views/post/write/index.vue'),
            meta: {
              title: '写文章',
            },
          },
          {
            path: '/post/edit/:id',
            name: 'PostEdit',
            component: () => import('@/views/post/write/index.vue'),
            meta: {
              title: '编辑文章',
              hidden: true,
              excludeKeepAlive: true,
            },
            props: true,
          },
        ],
      },
      {
        path: '/category',
        name: 'Category',
        component: () => import('@/views/category/index.vue'),
        meta: {
          icon: 'grid',
          title: '分类',
        },
        children: [
          {
            path: '/category/all',
            name: 'CategoryAll',
            component: () => import('@/views/category/all/index.vue'),
            meta: {
              title: '分类管理',
            },
          },
        ],
      },
      {
        path: '/tag',
        name: 'Tag',
        component: () => import('@/views/tag/index.vue'),
        meta: {
          icon: 'tags',
          title: '标签',
        },
        children: [
          {
            path: '/tag/all',
            name: 'TagsAll',
            component: () => import('@/views/tag/all/index.vue'),
            meta: {
              title: '标签管理',
            },
          },
        ],
      },
      {
        path: '/systems',
        name: 'Systems',
        component: () => import('@/views/systems/index.vue'),
        meta: {
          icon: 'gear',
          title: '系统',
        },
        children: [
          {
            path: '/systems/blog-settings',
            name: 'BlogSettings',
            component: () => import('@/views/systems/blog-settings/index.vue'),
            meta: {
              title: '博客设置',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('@/layouts/index.vue'),
    redirect: '/account/info',
    meta: {
      title: '用户',
      icon: 'address-card',
    },
    children: [
      {
        path: '/account/info',
        name: 'AccountInfo',
        component: () => import('@/views/account/info/index.vue'),
        meta: {
          title: '用户信息',
        },
      },
      {
        path: '/account/settings',
        name: 'AccountSecurity',
        component: () => import('@/views/account/settings/index.vue'),
        meta: {
          title: '用户设置',
          icon: 'user-gear',
        },
        children: [
          {
            path: '/account/user-add',
            name: 'UserAdd',
            component: () =>
              import('@/views/account/settings/user-add/index.vue'),
            meta: {
              title: '创建用户',
            },
          },
          {
            path: '/account/security',
            name: 'UseSecurity',
            component: () =>
              import('@/views/account/settings/user-security/index.vue'),
            meta: {
              title: '修改密码',
            },
          },
        ],
      },
    ],
  },
  { path: '/error', component: Error },
  { path: '/:path(.*)', component: NotFound },
]
