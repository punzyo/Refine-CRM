import { AdminPanelSettings, Dashboard as DashboardIcon, Person } from '@mui/icons-material'
import Dashboard from './pages/Dashboard'
import AdminCreate from './pages/admin/AdminCreate'
import AdminDetail from './pages/admin/AdminDetail'
import AdminEdit from './pages/admin/AdminEdit'
import AdminList from './pages/admin/AdminList'
import MemberDetail from './pages/member/MemberDetail'
import MemberList from './pages/member/MemberList'
const resources = [
  {
    name: 'dashboard',
    list: Dashboard,
    meta: { icon: <DashboardIcon />, label: '首頁' },
  },
  {
    name: 'admin',
    list: AdminList,
    show: AdminDetail,
    create: AdminCreate,
    edit: AdminEdit,
    meta: { icon: <AdminPanelSettings />, label: '管理員', canDelete: false },
  },
  {
    name: 'member',
    list: MemberList,
    show: MemberDetail,
    meta: { icon: <Person />, label: '會員' },
  },
]

export default resources
