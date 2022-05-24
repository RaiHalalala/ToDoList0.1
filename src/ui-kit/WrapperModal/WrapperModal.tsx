import React, { FC } from 'react';
import Close from 'ui-kit/Close';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  backdrop-filter: blur(2px);
`;

const WrapperContent = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.dark};
  margin: 100px auto 0;
  width: 90%;
  max-width: 800px;
  height: 500px;
  border-radius: 20px;
  padding: 10px;
  display: flex;

  & > .close {
    position: absolute;
    right: 15px;
    top: 15px;
  }
  @media (${({ theme }) => theme.breakpoints.xs}) {
    margin-top: 50px;
    padding: 5px 5px 10px;
    flex-direction: column;
    overflow-y: scroll;
  }
`;

interface WrapperModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const WrapperModal: FC<WrapperModalProps> = ({
  onClose,
  children,
}: WrapperModalProps) => (
  <Wrapper>
    <WrapperContent>
      <Close onClick={onClose} className="close" />
      {children}
    </WrapperContent>
  </Wrapper>
);
export default WrapperModal;
