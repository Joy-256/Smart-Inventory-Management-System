import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import ImageListItem from '@mui/material/ImageListItem';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type ProductProps = {
  id: string;
  name: string;
  prices: number
  category: string;
  status: string;
  productInfo: string;
  imageUrl: string;
  stock: number;
};

type ProductTableRowProps = {
  row: ProductProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function ProductTableRow({ row, selected, onSelectRow }: ProductTableRowProps) {
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
        
        <TableCell>{row.prices}</TableCell>

        <TableCell align="center">{row.stock}</TableCell>

        <TableCell>{row.productInfo}</TableCell>

        <TableCell>{row.category}</TableCell>

        <TableCell>
          <Label color={(row.status === 'below' && 'error') || 'success'}>{row.status}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
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
            <Iconify icon="solar:pen-bold" />
            Update
          </MenuItem>

          <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
