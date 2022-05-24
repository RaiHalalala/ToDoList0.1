import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimateSharedLayout } from 'framer-motion';
import { useSelector } from 'react-redux';
import { AppState } from 'reducers/appSlice';
import { RootState } from 'store';
import { variantsForNav, variantsForLogo } from './data';
import { clearOffNumber } from 'utils/helper';
import { useScreen } from 'hooks/useScreen';
import { links } from 'data/links';
//Components
import Setting from 'components/Setting';
import Radius from 'components/Icons/Radius';
import Arrow from 'ui-kit/Arrow';
import { Main, Nav, Logo, Section, LinkStyle, LinkName } from './styles';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { isMobile } = useScreen();
  const { mode } = useSelector<RootState, AppState>(({ app }) => app);
  const [isFullNav, setIsFullNav] = useState(true);

  return (
    <Main>
      <AnimateSharedLayout>
        <Nav
          variants={variantsForNav}
          initial="show"
          animate={isFullNav ? 'show' : 'hide'}>
          {!isMobile && (
            <Logo
              variants={variantsForLogo}
              initial="show"
              animate={isFullNav ? 'show' : 'hide'}>
              {isFullNav ? 'To Do List' : ''}
            </Logo>
          )}

          {!isMobile && (
            <Arrow
              isShow={isFullNav}
              onClick={() => setIsFullNav((prev) => !prev)}
              className="arrow"
            />
          )}

          {links.map(({ to, name, iconSrc }, i) => (
            <LinkStyle key={i} to={to}>
              {clearOffNumber(location.pathname) === to ? (
                <motion.div className="active" layoutId="active-link">
                  <Radius mode={mode} className="active-decorate top" />
                  <Radius mode={mode} className="active-decorate bottom" />
                </motion.div>
              ) : null}
              <LinkName isActive={location.pathname === to}>
                <img className="icon" src={iconSrc} alt={name} />
                {isFullNav && !isMobile && <p className="name">{name}</p>}
              </LinkName>
            </LinkStyle>
          ))}
          {isFullNav && !isMobile && <Setting className="setting" />}
        </Nav>
      </AnimateSharedLayout>

      <Section isFullNav={isFullNav}>{children}</Section>
    </Main>
  );
};

export default Layout;
