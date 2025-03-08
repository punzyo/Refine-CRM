import { List, ShowButton } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const mockMembers = [
  { id: 1, name: "王小明", email: "xiaoming@example.com" },
  { id: 2, name: "李大華", email: "dahua@example.com" },
  { id: 3, name: "陳美麗", email: "meili@example.com" },
];

export default function MemberList() {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "姓名", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "actions",
      headerName: "操作",
      width: 120,
      renderCell: (params) => <ShowButton recordItemId={params.row.id} />,
    },
  ];

  return (
    <List title="會員列表">
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid rows={mockMembers} columns={columns} pageSizeOptions={[5]} />
      </Box>
    </List>
  );
}
