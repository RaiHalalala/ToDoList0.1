import React, { FC, useState } from 'react';
import Input from 'ui-kit/Input';
import {
  Wrapper,
  BoardTags,
  BoardCheckTags,
  Button,
  ButtonPlus,
} from './styled';

interface SearchProps {
  options: string[];
  tags: string[];
  addTag: (tag: string) => void;
  deleteTag: (tag: string) => void;
}

const Search: FC<SearchProps> = ({
  options,
  tags,
  addTag,
  deleteTag,
}: SearchProps) => {
  const [newTag, setNewTag] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const setDisabled = (label: string) => tags.some((el) => el === label);

  const onAddTag = (tag: string) => {
    setIsFocus(false);
    tag && addTag(tag);
    newTag && setNewTag('');
  };
  return (
    <Wrapper>
      <Input
        placeholder="write a tag"
        value={newTag}
        onFocus={() => setIsFocus(true)}
        onChange={(value) => setNewTag(value)}
        setIcon={() => (
          <ButtonPlus
            className="close-input"
            src={
              newTag
                ? '/static/images/arrow-light.png'
                : '/static/images/close.png'
            }
            alt="delete"
          />
        )}
        onClickIcon={() => onAddTag(newTag)}
      />
      {isFocus && (
        <BoardTags>
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
        </BoardTags>
      )}
      <BoardCheckTags>
        {tags.map((label, index) => (
          <Button key={index} type="button" onClick={() => deleteTag(label)}>
            #{label}
            <ButtonPlus src="/static/images/close.png" alt="delete" />
          </Button>
        ))}
      </BoardCheckTags>
    </Wrapper>
  );
};

export default Search;
