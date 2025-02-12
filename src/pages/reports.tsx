import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ReportView } from 'src/sections/report/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Blog - ${CONFIG.appName}`}</title>
      </Helmet>

      <ReportView />
    </>
  );
}
