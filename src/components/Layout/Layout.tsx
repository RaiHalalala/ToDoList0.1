import React, { FC, useState } from 'react';
//Components
import Navbar from 'components/Navbar';
import { Main, Section } from './styles';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => {
  //full opened Navbar or not
  const [isFullNav, setFullNav] = useState(true);
  return (
    <Main>
      <Navbar
        isFullNav={isFullNav}
        setFullNav={() => setFullNav((prev) => !prev)}
      />
      <Section isFullNav={isFullNav}>{children}</Section>
    </Main>
  );
};

export default Layout;
