import React, { FC } from 'react';
import { Container, Button, ButtonPlus } from './styled';

interface BoardCheckTagsProps {
  tags: string[];
  deleteTag: (tag: string) => void;
}

const BoardCheckTags: FC<BoardCheckTagsProps> = ({
  tags,
  deleteTag,
}: BoardCheckTagsProps) => (
  <Container>
    {tags.map((label, index) => (
      <Button key={index} type="button" onClick={() => deleteTag(label)}>
        #{label}
        <ButtonPlus src="/static/images/close.png" alt="delete" />
      </Button>
    ))}
  </Container>
);

export default BoardCheckTags;
