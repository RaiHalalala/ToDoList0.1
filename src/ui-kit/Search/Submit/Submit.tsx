import React, { FC } from 'react';
import { BUTTON_SAVE_TAG } from 'constants/tests';
import { SubmitStyle } from './styled';

interface SubmitProps {
  disabled: boolean;
}

const Submit: FC<SubmitProps> = ({ disabled }: SubmitProps) => {
  return (
    <SubmitStyle type="submit" disabled={disabled}>
      {BUTTON_SAVE_TAG}
    </SubmitStyle>
  );
};
export default Submit;
