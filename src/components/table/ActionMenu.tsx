import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu, MenuItem,Box } from "@mui/material";
import React, { useState } from "react";

interface ActionMenuProps {
  row: any;
  menuItems: {
    label: string;
    onClick: (row: any) => void;
    sx?: any;
  }[];
}

const ActionMenu: React.FC<ActionMenuProps> = ({ row, menuItems }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center"}}>
      <IconButton
        size="small"
        onClick={handleOpen}
        sx={{
          width: 32,
          height: 32,
          padding: 0,
          borderRadius: "50%",
        }}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              item.onClick(row);
              handleClose();
            }}
            sx={item.sx}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ActionMenu;