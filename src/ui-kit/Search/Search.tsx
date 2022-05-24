import React, { FC, useState } from 'react';
import Input from 'ui-kit/Input';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: block;
`;

const BoardTags = styled.div`
  position: absolute;
  margin-top: 10px;
  padding: 5px;
  border-radius: 15px;
  background-color: ${({ theme }) => `${theme.colors.bgLight}`};
`;

const BoardCheckTags = styled.div`
  margin-top: 10px;
  padding: 5px;
`;

const Button = styled.button`
  margin: 5px;
  min-width: 70px;
  padding: 5px 10px;
  display: inline-flex;
  align-items: center;
  border-radius: 15px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: inset 0 2px 0 rgb(106 110 161 / 20%),
    0 0 4px rgb(189 189 189 / 20%);

  &:disabled {
    opacity: 0.5;
  }
`;

const ButtonPlus = styled.img`
  margin-left: 10px;
  width: 10px;

  &.plus {
    transform: rotate(45deg);
  }
`;

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
