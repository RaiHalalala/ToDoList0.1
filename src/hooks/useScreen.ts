import { useMedia } from 'react-use';

export const useScreen = () => {
  const mobile = '767px';
  const isMobile = useMedia(`(max-width: ${mobile})`);
  return { isMobile };
};
