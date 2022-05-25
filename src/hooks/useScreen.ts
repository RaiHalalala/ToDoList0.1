import { useMedia } from 'react-use';

//return screen variables of device
export const useScreen = () => {
  const mobile = '767px';
  const isMobile = useMedia(`(max-width: ${mobile})`);
  return { isMobile };
};
