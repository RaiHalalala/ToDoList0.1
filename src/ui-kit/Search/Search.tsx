import React, { FC, useState } from 'react';
import Input from 'ui-kit/Input';
import BoardTags from './BoardTags';
import Submit from './Submit';
import BoardCheckTags from './BoardCheckTags';
import { Wrapper, Form } from './styled';

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
  const [isFocus, setFocus] = useState(false);

  const onAddTag = (tag: string) => {
    setFocus(false);
    tag && addTag(tag);
    newTag && setNewTag('');
  };
  const BoardTagsComponent = isFocus && !!options.length && (
    <BoardTags options={options} tags={tags} onAddTag={onAddTag} />
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTag(newTag);
    setNewTag('');
    setFocus(false);
  };

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <Input
          placeholder="write a tag"
          value={newTag}
          onFocus={() => setFocus(true)}
          onChange={(value) => setNewTag(value)}
        />
        <Submit disabled={!newTag} />
      </Form>

      {BoardTagsComponent}
      <BoardCheckTags tags={tags} deleteTag={deleteTag} />
    </Wrapper>
  );
};

export default Search;
