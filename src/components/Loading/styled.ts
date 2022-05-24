import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: absolute;
  width: fit-content;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`;

export const LoadingStyle = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  & > .item {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid ${({ theme }) => theme.colors.secondary};
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${({ theme }) => theme.colors.secondary} transparent
      transparent transparent;

    @keyframes lds-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    &:nth-of-type(1) {
      animation-delay: -0.45s;
    }
    &:nth-of-type(2) {
      animation-delay: -0.3s;
    }
    &:nth-of-type(3) {
      animation-delay: -0.15s;
    }
  }
`;
