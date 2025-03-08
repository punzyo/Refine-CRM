import AdminList from "./pages/admin/AdminList";
import AdminDetail from "./pages/admin/AdminDetail";
import MemberList from "./pages/member/MemberList";
import MemberDetail from "./pages/member/MemberDetail";
import { AdminPanelSettings, Person } from "@mui/icons-material";

const resources = [
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