export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          { name: '登录', path: '/user/login', component: './user/login' },
          {
            name: '注册',
            path: '/user/register',
            component: './user/register',
          },
        ],
      },
    ],
  },

  // { path: '/dashboard/main', name: '仪表盘', icon: 'smile', component: './dashboard/Main' ,layout: false},
  {
    path: '/dashboard',
    name: '控制面板',
    icon: 'dashboard', layout: false,

    routes: [
      { path: '/dashboard/main', name: '总览', component: './dashboard/Main',layout: false},
      { path: '/dashboard/livingroom', name: '客厅', component: './dashboard/livingroom',layout: false},
      { path: '/dashboard/bedroom', name: '厨房', component: './dashboard/bedroom',layout: false},
    ],
  },

  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },

  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
    ],
  },
  { name: '查询表格', icon: 'table', path: '/list', component: './table-list' },
  { path: '/', redirect: '/dashboard/main' },
  { path: '*', layout: false, component: './404' },
];
