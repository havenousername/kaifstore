import React, { ReactElement } from 'react';
import AppLayout from '../components/app-layout';
import { NextPageWithLayout } from '../interfaces/pages-layout';

const Settings: NextPageWithLayout = () => {
  return <div>Settings</div>;
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Settings;
