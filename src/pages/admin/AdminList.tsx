import { List } from "@refinedev/mui";
import { usePermissions } from "@refinedev/core";
export default function AdminList() {
    console.log('admin');
    const { data, isLoading } = usePermissions();
    console.log(data, isLoading);
    
    return <List>管理員列表</List>;
}