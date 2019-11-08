import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store/index'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

// const Colors = () => import('@/views/theme/Colors')
// const Typography = () => import('@/views/theme/Typography')

// const Charts = () => import('@/views/Charts')
// const Widgets = () => import('@/views/Widgets')

// // Views - Components
// const Cards = () => import('@/views/base/Cards')
// const Forms = () => import('@/views/base/Forms')
// const Switches = () => import('@/views/base/Switches')
// const Tables = () => import('@/views/base/Tables')
// const Tabs = () => import('@/views/base/Tabs')
// const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
// const Carousels = () => import('@/views/base/Carousels')
// const Collapses = () => import('@/views/base/Collapses')
// const Jumbotrons = () => import('@/views/base/Jumbotrons')
// const ListGroups = () => import('@/views/base/ListGroups')
// const Navs = () => import('@/views/base/Navs')
// const Navbars = () => import('@/views/base/Navbars')
// const Paginations = () => import('@/views/base/Paginations')
// const Popovers = () => import('@/views/base/Popovers')
// const ProgressBars = () => import('@/views/base/ProgressBars')
// const Tooltips = () => import('@/views/base/Tooltips')

// // Views - Buttons
// const StandardButtons = () => import('@/views/buttons/StandardButtons')
// const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
// const Dropdowns = () => import('@/views/buttons/Dropdowns')
// const BrandButtons = () => import('@/views/buttons/BrandButtons')

// // Views - Icons
// const Flags = () => import('@/views/icons/Flags')
// const FontAwesome = () => import('@/views/icons/FontAwesome')
// const SimpleLineIcons = () => import('@/views/icons/SimpleLineIcons')
// const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')

// // Views - Notifications
// const Alerts = () => import('@/views/notifications/Alerts')
// const Badges = () => import('@/views/notifications/Badges')
// const Modals = () => import('@/views/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

// Employees  management
const Employees = () => import('@/views/admin/employee/nhanvien/Employees')
const Offices = () => import('@/views/admin/employee/office/Offices')
const Positions = () => import('@/views/admin/employee/position/Positions')
const Literacies = () => import('@/views/admin/employee/literacy/Literacies')
const LabourContracts = () => import('@/views/admin/employee/hopdong/LabourContracts')

const Permissions = () => import('@/views/admin/employee/permission/Permissions')
const OnePermission = () => import('@/views/admin/employee/permission/PermissionDetail')

const Insurrances = () => import('@/views/admin/employee/insurrance/Insurrances')
const Relations = () => import('@/views/admin/employee/relation/Relations')
const RewardAndPunishments = () => import('@/views/admin/employee/khenthuong/RewardAndPunishments')
const Allowances = () => import('@/views/admin/employee/phucap/Allowances')


// const User = () => import('@/views/users/User')

// Profile
const Profile = () => import('@/views/profile/Profile')

// ChatRoom
const ChatRoom = () => import('@/components/ChatRoom.vue')
const Messenger = () => import('@/views/chat')

// Calendar
const Calendar = () => import('@/components/Calendar')

// Permission
const Permission = () => import('@/views/permission/Permission')

// Relation
const Relation = () => import('@/views/relation/Relation')

// LabourContract
const LabourContract = () => import('@/views/labour-contract/LabourContract')

Vue.use(Router)

let router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'chat',
          name: '',
          component: Messenger
        },
        {
          path: 'messenger',
          name: 'ChatRom',
          component: ChatRoom
        },
        {
          path: 'calendar',
          name: 'Calendar',
          component: Calendar
        },
        {
          path: 'account',
          redirect: '/account/profile',
          name: 'Account',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'profile',
              meta: { label: 'User Profile'},
              name: 'Profile',
              component: Profile
            },
            {
              path: 'per',
              meta: { label: 'User Permissions'},
              name: 'User Permission',
              component: Permission
            },
            {
              path: 'rel',
              meta: { label: 'User Relation'},
              name: 'Relation',
              component: Relation
            },
            {
              path: 'lc',
              meta: { label: 'User Labour Contract'},
              name: 'Labour Contract',
              component: LabourContract
            }
          ]
        },
        {
          path: 'hrme',
          redirect: '/hrme/employees',
          meta: { label: 'Employee Management'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'employees',
              component: Employees,
            },
            {
              path: 'offices',
              meta: { label: 'Offices Management'},
              name: 'Offices',
              component: Offices,
            },
            {
              path: 'positions',
              meta: { label: 'Positions Management'},
              name: 'Positions',
              component: Positions,
            },
            {
              path: 'literacies',
              meta: { label: 'Literacies Management'},
              name: 'Literacies',
              component: Literacies,
            },
            {
              path: 'labourcontracts',
              meta: { label: 'Labour Contracts Management'},
              name: 'Labour Contracts',
              component: LabourContracts,
            },
            {
              path: 'permissions',
              meta: { label: 'Permissions Management'},
              redirect: '/hrme/permissions',
              name: 'Permissions',
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  path: '',
                  component: Permissions,
                },
                {
                  path: ':id',
                  meta: { label: 'Permission Details'},
                  name: 'Permission',
                  component: OnePermission,
                },
              ]
              // component: Permissions,
            },
            {
              path: 'insurrances',
              meta: { label: 'Insurrances Management'},
              name: 'Insurrances',
              component: Insurrances,
            },
            {
              path: 'relations',
              meta: { label: 'Relations Management'},
              name: 'Relations',
              component: Relations,
            },
            {
              path: 'raps',
              meta: { label: 'Reward And Punishments Management'},
              name: 'Reward And Punishments',
              component: RewardAndPunishments,
            },
            {
              path: 'allowances',
              meta: { label: 'Allowances Management'},
              name: 'Allowances',
              component: Allowances,
            },
            // {
            //   path: ':id',
            //   meta: { label: 'User Details'},
            //   name: 'User',
            //   component: User,
            // },

          ]
        },
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('token') == null) {
          next({
              name: 'Login',
              params: { nextUrl: to.fullPath }
          })
      } else {
          let user = JSON.parse(localStorage.getItem('user'))
          if(to.matched.some(record => record.meta.is_admin)) {
              if(user.is_admin == 1){
                  next()
              }
              else{
                  next({ name: 'userboard'})
              }
          }else {
              next()
          }
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('jwt') == null){
          next()
      }
      else{
          next({ name: 'userboard'})
      }
  }else {
      next()
  }
})

export default router



// routes: [
//   {
//     path: '/',
//     redirect: '/dashboard',
//     name: 'Home',
//     component: DefaultContainer,
//     children: [
//       {
//         path: 'dashboard',
//         name: 'Dashboard',
//         component: Dashboard
//       },
//       {
//         path: 'theme',
//         redirect: '/theme/colors',
//         name: 'Theme',
//         component: {
//           render (c) { return c('router-view') }
//         },
//         children: [
//           {
//             path: 'colors',
//             name: 'Colors',
//             component: Colors
//           },
//           {
//             path: 'typography',
//             name: 'Typography',
//             component: Typography
//           }
//         ]
//       },
//       {
//         path: 'charts',
//         name: 'Charts',
//         component: Charts
//       },
//       {
//         path: 'widgets',
//         name: 'Widgets',
//         component: Widgets
//       },
//       {
//         path: 'users',
//         meta: { label: 'Users'},
//         component: {
//           render (c) { return c('router-view') }
//         },
//         children: [
//           {
//             path: '',
//             component: Users,
//           },
//           {
//             path: ':id',
//             meta: { label: 'User Details'},
//             name: 'User',
//             component: User,
//           },
//         ]
//       },
//       {
//         path: 'base',
//         redirect: '/base/cards',
//         name: 'Base',
//         component: {
//           render (c) { return c('router-view') }
//         },
//         children: [
//           {
//             path: 'cards',
//             name: 'Cards',
//             component: Cards
//           },
//           {
//             path: 'forms',
//             name: 'Forms',
//             component: Forms
//           },
//           {
//             path: 'switches',
//             name: 'Switches',
//             component: Switches
//           },
//           {
//             path: 'tables',
//             name: 'Tables',
//             component: Tables
//           },
//           {
//             path: 'tabs',
//             name: 'Tabs',
//             component: Tabs
//           },
//           {
//             path: 'breadcrumbs',
//             name: 'Breadcrumbs',
//             component: Breadcrumbs
//           },
//           {
//             path: 'carousels',
//             name: 'Carousels',
//             component: Carousels
//           },
//           {
//             path: 'collapses',
//             name: 'Collapses',
//             component: Collapses
//           },
//           {
//             path: 'jumbotrons',
//             name: 'Jumbotrons',
//             component: Jumbotrons
//           },
//           {
//             path: 'list-groups',
//             name: 'List Groups',
//             component: ListGroups
//           },
//           {
//             path: 'navs',
//             name: 'Navs',
//             component: Navs
//           },
//           {
//             path: 'navbars',
//             name: 'Navbars',
//             component: Navbars
//           },
//           {
//             path: 'paginations',
//             name: 'Paginations',
//             component: Paginations
//           },
//           {
//             path: 'popovers',
//             name: 'Popovers',
//             component: Popovers
//           },
//           {
//             path: 'progress-bars',
//             name: 'Progress Bars',
//             component: ProgressBars
//           },
//           {
//             path: 'tooltips',
//             name: 'Tooltips',
//             component: Tooltips
//           }
//         ]
//       },
//       {
//         path: 'buttons',
//         redirect: '/buttons/standard-buttons',
//         name: 'Buttons',
//         component: {
//           render (c) { return c('router-view') }
//         },
//         children: [
//           {
//             path: 'standard-buttons',
//             name: 'Standard Buttons',
//             component: StandardButtons
//           },
//           {
//             path: 'button-groups',
//             name: 'Button Groups',
//             component: ButtonGroups
//           },
//           {
//             path: 'dropdowns',
//             name: 'Dropdowns',
//             component: Dropdowns
//           },
//           {
//             path: 'brand-buttons',
//             name: 'Brand Buttons',
//             component: BrandButtons
//           }
//         ]
//       },
//       {
//         path: 'icons',
//         redirect: '/icons/font-awesome',
//         name: 'Icons',
//         component: {
//           render (c) { return c('router-view') }
//         },
//         children: [
//           {
//             path: 'coreui-icons',
//             name: 'CoreUI Icons',
//             component: CoreUIIcons
//           },
//           {
//             path: 'flags',
//             name: 'Flags',
//             component: Flags
//           },
//           {
//             path: 'font-awesome',
//             name: 'Font Awesome',
//             component: FontAwesome
//           },
//           {
//             path: 'simple-line-icons',
//             name: 'Simple Line Icons',
//             component: SimpleLineIcons
//           }
//         ]
//       },
//       {
//         path: 'notifications',
//         redirect: '/notifications/alerts',
//         name: 'Notifications',
//         component: {
//           render (c) { return c('router-view') }
//         },
//         children: [
//           {
//             path: 'alerts',
//             name: 'Alerts',
//             component: Alerts
//           },
//           {
//             path: 'badges',
//             name: 'Badges',
//             component: Badges
//           },
//           {
//             path: 'modals',
//             name: 'Modals',
//             component: Modals
//           }
//         ]
//       }
//     ]
//   },
//   {
//     path: '/pages',
//     redirect: '/pages/404',
//     name: 'Pages',
//     component: {
//       render (c) { return c('router-view') }
//     },
//     children: [
//       {
//         path: '404',
//         name: 'Page404',
//         component: Page404
//       },
//       {
//         path: '500',
//         name: 'Page500',
//         component: Page500
//       },
//       {
//         path: 'login',
//         name: 'Login',
//         component: Login
//       },
//       {
//         path: 'register',
//         name: 'Register',
//         component: Register
//       }
//     ]
//   }
// ]
// })
