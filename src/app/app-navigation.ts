export const navigation = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home'
  },
  {
    text: '영화',
    icon: 'folder',
    items: [
      // {
      //   text: 'Profile',
      //   path: '/profile'
      // },
      // {
      //   text: 'Tasks',
      //   path: '/tasks'
      // },
      // {
      //   text: '직원 관리',
      //   path: '/employee'
      // },
      {
        text: '상영 영화',
        path: '/movie'
      },
      {
        text: '영화예매',
        path: '/reservation'
      }
    ]
  }
];
