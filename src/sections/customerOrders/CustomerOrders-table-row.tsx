import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import ImageListItem from '@mui/material/ImageListItem';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type CustomerOrdersProps = {
  id: string;
  name: string;
  quantity: number;
  prices: number;
  deliveryStaff: string;
  status: string;
  destination: string;
  imageUrl: string;
  stock: number;
};

type CustomerOrdersTableRowProps = {
  row: CustomerOrdersProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function CustomerOrdersTableRow({ row, selected, onSelectRow }: CustomerOrdersTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  return (
    <>
        <TableRow>
        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <ImageListItem>
              <img alt={row.name} src={row.imageUrl} style={{ width: "100px", height: "auto", borderRadius: "5px" }} />
            </ImageListItem> 
            {row.name}
          </Box>
        </TableCell>

        <TableCell>{row.quantity}</TableCell>
        
        <TableCell>{row.prices}</TableCell>

        <TableCell align="center">{row.stock}</TableCell>

        <TableCell>{row.destination}</TableCell>

        <TableCell>{row.deliveryStaff}</TableCell>

        <TableCell>
        <Box gap={2} display="flex" alignItems="center">
          <Label color={(row.status === 'below' && 'error') || 'success'}>{row.status}</Label>
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
          </Box>
        </TableCell>

      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleClosePopover}>
            In-progress
          </MenuItem>

          <MenuItem onClick={handleClosePopover}>
            Delivered
          </MenuItem>

          <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
            Cancelled
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
