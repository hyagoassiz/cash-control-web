import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";

export type DrawerOption = {
  label: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export type DrawerGroup = {
  title: string; // master option (not clickable)
  options: DrawerOption[];
};

type Props = {
  open: boolean;
  onClose: () => void;
  siteName: string;
  groups: DrawerGroup[];
};

const LeftDrawer: React.FC<Props> = ({ open, onClose, siteName, groups }) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const drawerWidth = isMdUp ? 280 : "80vw";

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        sx: {
          width: drawerWidth,
        },
      }}
      role="navigation"
      aria-label="main drawer"
    >
      <Box sx={{ display: "flex", alignItems: "center", px: 2, py: 1 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {siteName}
        </Typography>
        <IconButton onClick={onClose} aria-label="close drawer">
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />

      <Box sx={{ width: "100%", pt: 1 }} role="menu">
        {groups.map((group, gi) => (
          <Box key={gi} sx={{ mb: 1 }}>
            <List dense disablePadding aria-labelledby={`group-${gi}`}>
              <ListItem>
                <ListItemText
                  primary={group.title}
                  primaryTypographyProps={{
                    variant: "subtitle2",
                    color: "text.secondary",
                  }}
                />
              </ListItem>
              {group.options.map((opt, oi) => (
                <ListItem key={oi} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      if (opt.onClick) opt.onClick();
                      if (opt.href) window.location.href = opt.href;
                    }}
                    disabled={opt.disabled}
                    role="menuitem"
                  >
                    <ListItemText primary={opt.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Box>
        ))}
      </Box>
    </Drawer>
  );
};

export default LeftDrawer;
