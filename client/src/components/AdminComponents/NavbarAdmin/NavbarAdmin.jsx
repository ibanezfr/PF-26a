import React from "react";
import { useTranslate } from 'react-i18next';

const NavbarAdmin = () => {
  const { t } = useTranslate();
  return <div>{t('navbarAdmin')}</div>;
};

export default NavbarAdmin;
