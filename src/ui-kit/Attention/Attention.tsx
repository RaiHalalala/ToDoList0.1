import React, { FC } from 'react';
import styled from '@emotion/styled';
import Button, { ThemeButton } from 'ui-kit/Button';
import Close from 'ui-kit/Close';

const Wrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  backdrop-filter: blur(2px);
`;

const Popup = styled.div`
  position: relative;
  z-index: 2;
  margin: 200px auto;
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  height: 200px;
  background: ${({ theme }) => theme.colors.bgLight};
  padding: 20px;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadows.dark};

  & > .close {
    position: absolute;
    right: 15px;
    top: 15px;
  }
`;

const Title = styled.p`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fonts.l};
  font-weight: bold;
  white-space: pre-line;
  text-align: center;
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-around;
`;

interface AttentionProps {
  onAgree: () => void;
  onDisagree: () => void;
  children: React.ReactNode;
}

const Attention: FC<AttentionProps> = ({
  onAgree,
  onDisagree,
  children,
}: AttentionProps) => {
  return (
    <Wrapper>
      <Popup>
        <Close onClick={onDisagree} className="close" />
        <Title>{children}</Title>
        <ButtonContainer>
          <Button onClick={onAgree}>Agree</Button>
          <Button onClick={onDisagree} themeButton={ThemeButton.secondary}>
            Close
          </Button>
        </ButtonContainer>
      </Popup>
    </Wrapper>
  );
};

export default Attention;
