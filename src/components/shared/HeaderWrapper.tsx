'use client';

import { useAppContext } from '@/context/AppContext';
import { Fragment } from 'react';

import Navbar from './navbar/Navbar';
import TopNavHeading from './TopNavHeading';

const HeaderWrapper = () => {
  const { showTopNav } = useAppContext();

  return (
    <Fragment>
      <TopNavHeading />
      <Navbar showTopNav={showTopNav} />
    </Fragment>
  );
};

HeaderWrapper.displayName = 'HeaderWrapper';
export default HeaderWrapper;
