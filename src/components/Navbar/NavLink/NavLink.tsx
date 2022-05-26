import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { AppState } from 'reducers/appSlice';
import { RootState } from 'store';
import { useScreen } from 'hooks/useScreen';
import { LinkType } from 'data/links';
//Components
import Radius from 'components/Icons/Radius';
import { LinkStyle, LinkName } from './styles';

interface NavLinkProps extends LinkType {
  isFullNav: boolean;
}

const NavLink: FC<NavLinkProps> = ({
  isFullNav,
  to,
  iconSrc,
  name,
}: NavLinkProps) => {
  const location = useLocation();
  const { isMobile } = useScreen();
  const { mode } = useSelector<RootState, AppState>(({ app }) => app);

  return (
    <LinkStyle to={to}>
      {location.pathname.includes(to) ? (
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
  );
};

export default NavLink;
