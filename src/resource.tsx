import AdminList from "./pages/admin/AdminList";
import AdminDetail from "./pages/admin/AdminDetail";
import MemberList from "./pages/member/MemberList";
import MemberDetail from "./pages/member/MemberDetail";
import { AdminPanelSettings, Person,  Dashboard as DashboardIcon  } from "@mui/icons-material";
import Dashboard from "./pages/Dashboard";

const resources = [
    {
        name: "dashboard", // 設為首頁
        list: Dashboard,  // 讓 Refine 在 `/` 顯示 Dashboard
        meta: { icon: <DashboardIcon />, label: "首頁" }
    },
    {
        name: "admin",
        list: AdminList,
        show: AdminDetail,
        meta: { icon: <AdminPanelSettings />, label: "管理員", canDelete: false }
    },
    {
        name: "member",
        list: MemberList,
        show: MemberDetail,
        meta: { icon: <Person />, label: "會員" }
    }
];

export default resources;