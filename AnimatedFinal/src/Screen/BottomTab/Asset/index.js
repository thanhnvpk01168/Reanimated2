import {FontAwesome, Ionicons} from '../../../Assets/VectorIcons/Icons';
const colorRenderTabs = [
  'rgb(204, 51, 102))',
  'rgb(72, 161, 122)',
  'rgba(58, 76, 154,0.8)',
  'rgb(246, 148, 48)',
];
const dataTab = [
  {id: 1, title: 'Trang chủ', TypeIcon: FontAwesome, icon: 'home'},
  {id: 2, title: 'Tìm kiếm', TypeIcon: FontAwesome, icon: 'search'},
  {
    id: 3,
    title: 'Thông báo',
    TypeIcon: Ionicons,
    icon: 'md-notifications-sharp',
  },
  {id: 4, title: 'Cá nhân', TypeIcon: FontAwesome, icon: 'user'},
];
export {colorRenderTabs,dataTab};
