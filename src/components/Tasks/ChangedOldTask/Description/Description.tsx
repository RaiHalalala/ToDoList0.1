import React, { FC } from 'react';
import { Description as DescriptionType } from 'types/task';
import { IMAGE_CLOSE } from 'constants/common';
import { Wrapper, ButtonDelete } from './styled';

interface DescriptionProps {
  description: DescriptionType;
  deleteDescription: () => void;
  isNewDesc: boolean;
}

const Description: FC<DescriptionProps> = ({
  description,
  deleteDescription,
  isNewDesc,
}: DescriptionProps) => (
  <Wrapper isNewDesc={isNewDesc}>
    <ButtonDelete onClick={deleteDescription}>
      <img {...IMAGE_CLOSE} />
    </ButtonDelete>
    <p dangerouslySetInnerHTML={{ __html: description.title }} />
  </Wrapper>
);

export default Description;
