import React, { FC } from 'react';
import { Container, Button, ButtonPlus } from './styled';

interface BoardTagsProps {
  options: string[];
  tags: string[];
  onAddTag: (label: string) => void;
}

const BoardTags: FC<BoardTagsProps> = ({
  options,
  tags,
  onAddTag,
}: BoardTagsProps) => {
  const setDisabled = (label: string) => tags.some((el) => el === label);
  return (
    <Container>
      {options.map((label, index) => (
        <Button
          key={index}
          type="button"
          onClick={() => onAddTag(label)}
          disabled={setDisabled(label)}>
          #{label}
          {!setDisabled(label) && (
            <ButtonPlus
              src="/static/images/close.png"
              alt="plus"
              className="plus"
            />
          )}
        </Button>
      ))}
    </Container>
  );
};

export default BoardTags;
