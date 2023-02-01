// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const user = JSON.parse(localStorage.getItem('auth'));

const navConfig =
  user?.role === 'admin'
    ? [
        {
          title: 'dashboard',
          path: '/dashboard',
          icon: icon('ic_analytics'),
        },
        {
          title: 'users',
          path: '/user',
          icon: icon('ic_user'),
        },
      ]
    : user?.role === 'client'
    ? [
        {
          title: 'dashboard',
          path: '/dashboard',
          icon: icon('ic_analytics'),
        },
        {
          title: 'Task List',
          path: '/task-list',
          icon: icon('ic_task'),
        },
      ]
    : [
        {
          title: 'dashboard',
          path: '/dashboard',
          icon: icon('ic_analytics'),
        },
        {
          title: 'Task List',
          path: '/task-list',
          icon: icon('ic_task'),
        },
      ];

export default navConfig;
