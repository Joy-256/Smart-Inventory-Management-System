import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CustomerOrdersView } from 'src/sections/customerOrders/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>

      <CustomerOrdersView />
    </>
  );
}
