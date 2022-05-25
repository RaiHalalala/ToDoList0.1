import React, { FC } from 'react';
import { AnimateSharedLayout } from 'framer-motion';
import { variantsForNav, variantsForLogo } from './data';
import { useScreen } from 'hooks/useScreen';
import { links } from 'data/links';
//Components
import Setting from 'components/Setting';
import Arrow from 'ui-kit/Arrow';
import NavLink from './NavLink';
import { Nav, Logo } from './styles';

interface NavbarProps {
  isFullNav: boolean;
  setFullNav: () => void;
}

const Navbar: FC<NavbarProps> = ({ isFullNav, setFullNav }: NavbarProps) => {
  const { isMobile } = useScreen();

  const LogoComponent = !isMobile && (
    <Logo
      variants={variantsForLogo}
      initial="show"
      animate={isFullNav ? 'show' : 'hide'}>
      {isFullNav ? 'To Do List' : ''}
    </Logo>
  );
  const ArrowComponent = !isMobile && (
    <Arrow isShow={isFullNav} onClick={setFullNav} className="arrow" />
  );

  return (
    <AnimateSharedLayout>
      <Nav
        variants={variantsForNav}
        initial="show"
        animate={isFullNav ? 'show' : 'hide'}>
        {LogoComponent}
        {ArrowComponent}
        {links.map((params, index) => (
          <NavLink key={index} isFullNav={isFullNav} {...params} />
        ))}
        {isFullNav && !isMobile && <Setting className="setting" />}
      </Nav>
    </AnimateSharedLayout>
  );
};

export default Navbar;
