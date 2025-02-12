import type { StackProps } from '@mui/material/Stack';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { textGradient } from 'src/theme/styles';

// ----------------------------------------------------------------------

export function NavUpgrade({ sx, ...other }: StackProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      sx={{ mb: 4, textAlign: 'center', ...sx }}
      {...other}
    >
      <Typography
        variant="h6"
        sx={(theme) => ({
          ...textGradient(
            `to right, ${theme.vars.palette.secondary.main}, ${theme.vars.palette.warning.main}`
          ),
        })}
      >
       Planned beauty
      </Typography>

      <Box
        component="img"
        alt="Planned Beauty"
        src="https://nypost.com/wp-content/uploads/sites/2/2022/03/Best-Products-for-Oily-Skin.png"
        sx={{ width: 200, my: 2 }}
      />
    </Box>
  );
}
