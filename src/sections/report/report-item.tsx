import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

export type ReportItemProps = {
  id: string;
  title: string;
  description: string;
};

export function ReportItem({
  sx,
  report,
  ...other
}: CardProps & {
  report: ReportItemProps;
}) {

  const renderTitle = (
    <Link
      color="inherit"
      variant="subtitle2"
      underline="hover"
      sx={{
        height: 44,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
      }}
    >
      {report.title}
    </Link>
  );

  const renderInfo = (
    <Box
      gap={1.5}
      display="flex"
      flexWrap="wrap"
      justifyContent="flex-end"
      sx={{
        mt: 3,
        color: 'text.disabled',
      }}
    >
    </Box>
  );


  return (
    <Card sx={sx} {...other}>

      <Box>
        {renderTitle}
        {renderInfo}
      </Box>
    </Card>
  );
}
