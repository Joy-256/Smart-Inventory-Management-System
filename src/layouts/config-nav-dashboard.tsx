import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';


// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Products',
    path: '/products',
    icon: icon('ic-cart'),
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
  {
    title:"Customer Orders",
    path:"/customerOrders",
    icon:icon('ic-cart'),
  },
  {
    title: 'User',
    path: '/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: icon('ic-barChart'),
    kind: "header", // Fix the tuple-like incorrect format
    segment: "reports",
    children: [
      {
        segment: "sales",
        title: "Sales",
        icon: icon("ic-description"),
        path: "/reports/404",
      },
      {
        segment: "traffic",
        title: "Traffic",
        icon: icon("ic-description"),
        path: "/reports/404",
      },
    ],
  },
  
];
