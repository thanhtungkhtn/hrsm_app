export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      title: false,
      name: 'Quản lý Nhân viên',
      icon: 'icon-people',
      url:'/hrme',
      class: '',
      wrapper: {
        element: '',
        attributes: {
          // disabled: true
        }
      },
      children: [
        {
          name: 'Nhân Viên',
          url: '/hrme/employees',
          icon: 'fa fa-user-plus'
        },
        {
          name: 'Hợp Đồng',
          url: '/hrme/labourcontracts',
          icon: 'fa fa-vcard-o'
        },
        {
          name: 'Phòng Ban',
          url: '/hrme/offices',
          icon: 'fa fa-object-group'
        },
        {
          name: 'Chức Vụ',
          url: '/hrme/positions',
          icon: 'fa fa-street-view'
        },
        {
          name: 'Trình Độ',
          url: '/hrme/literacies',
          icon: 'fa fa-graduation-cap'
        },
        {
          name: 'Thân Nhân',
          url: '/hrme/relations',
          icon: 'fa fa-users'
        },
        {
          name: 'Bảo Hiểm',
          url: '/hrme/insurrances',
          icon: 'fa fa-child'
        },
        {
          name: 'Khen Thưởng',
          url: '/hrme/raps',
          icon: 'fa fa-trophy'
        },
        {
          name: 'Phụ Cấp',
          url: '/hrme/allowances',
          icon: 'fa fa-plus-square-o'
        },
        {
          name: 'Permission',
          url: '/hrme/permissions',
          icon: 'fa fa-key'
        },
      ]
    },
    {
      title: false,
      name: 'Quản lý Công',
      class: '',
      url:'/users',
      icon: 'icon-calculator',
      wrapper: {
        element: '',
        attributes: {}
      },
      children: [
        {
          name: 'Dữ liệu chấm công',
          url: '/hrme/timesheets',
          icon: 'icon-puzzle'
        },
        {
          name: 'Dữ liệu bảng công',
          url: '/hrme/eftable',
          icon: 'icon-puzzle'
        },
      ]
    },
    {
      title: false,
      name: 'Quản lý Lương',
      class: '',
      url:'/users',
      icon: 'icon-wallet',
      wrapper: {
        element: '',
        attributes: {}
      },
      children: [
        {
          name: 'Dữ liệu bảng lương',
          url: '/hrme/saltable',
          icon: 'fa fa-money'
        },
      ]
    },
    {
      // title: false,
      // name: 'Hướng dẫn sử dụng',
      // class: '',
      // url:'/users',
      // icon: 'icon-wallet',
      // wrapper: {
      //   element: '',
      //   attributes: {}
      // },
      // children: [
      //   {
          name: 'Trợ giúp',
          url: '/help',
          icon: 'fa fa-user-md'
        // },
      // ]
    },
    // {
    //   title: false,
    //   name: 'Báo Cáo - Thống Kê',
    //   class: '',
    //   url:'/users',
    //   icon: 'icon-graph',
    //   wrapper: {
    //     element: '',
    //     attributes: {}
    //   },
    //   children: [
    //     {
    //       name: 'Lương',
    //       url: '',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Công',
    //       url: '',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Lịch sử làm',
    //       url: '',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Trong ngày',
    //       url: '',
    //       icon: 'icon-puzzle'
    //     },
    //   ]
    // },
  ]
}
