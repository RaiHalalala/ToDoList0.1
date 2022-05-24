import React, { FC, useEffect, useState } from 'react';
import { setFormatDate, setNextDay, toHtml } from 'utils/helper';
import { DATE_FORMAT, INITIAL_NEW_TASK } from 'constants/tests';
import { BUTTON_SAVE } from 'constants/common';
import { useScreen } from 'hooks/useScreen';
import { InitialValues } from '../type';
import { Task } from 'types/task';
//Components
import Datepicker from 'ui-kit/Datepicker';
import TextArea from 'ui-kit/TextArea';
import Button from 'ui-kit/Button';
import Search from 'ui-kit/Search';
import Input from 'ui-kit/Input';
import { LeftContent, Form, RightContent } from './styled';

interface NewCardProps {
  tags: string[];
  dataOfNewTask: InitialValues;
  categoryName?: string;
  setTask: (values: Task, isNewTask?: boolean) => void;
}

const NewCard: FC<NewCardProps> = ({
  tags,
  dataOfNewTask,
  categoryName,
  setTask,
}: NewCardProps) => {
  const { isMobile } = useScreen();
  const [values, setValues] = useState<Task>({
    ...INITIAL_NEW_TASK,
    ...dataOfNewTask,
  });

  useEffect(() => {
    const datecreated = setFormatDate(new Date(), DATE_FORMAT);
    const deadline = setFormatDate(
      new Date(setNextDay(new Date())),
      DATE_FORMAT,
    );
    setValues((prev) => ({ ...prev, datecreated, deadline }));
  }, []);

  const saveNewCard = () => {
    const descToHtml = values.descriptions.map((desc) => ({
      ...desc,
      title: toHtml(desc.title),
    }));
    setTask({ ...values, descriptions: descToHtml }, true);
  };

  const addName = (value: string) => {
    setValues((prev) => ({ ...prev, name: value || '' }));
  };

  const addDescription = (value: string) => {
    setValues((prev) => ({
      ...prev,
      descriptions: value ? [{ id: 1, title: value }] : [],
    }));
  };

  const addTag = (tag: string) => {
    setValues((prev) => ({
      ...prev,
      tags: [...prev.tags, tag],
    }));
  };
  const deleteTag = (tag: string) => {
    setValues((prev) => ({
      ...prev,
      tags: prev.tags.filter((val) => val !== tag),
    }));
  };

  const changeTimes = (datecreated: string, deadline: string) => {
    setValues((prev) => ({
      ...prev,
      datecreated,
      deadline,
    }));
  };

  const ButtonSave = (
    <Button
      type="button"
      onClick={saveNewCard}
      className="submit"
      disabled={!values.name}>
      {!values.name ? BUTTON_SAVE.disabled : BUTTON_SAVE.solve}
    </Button>
  );

  return (
    <Form>
      <LeftContent>
        <h3>New Task</h3>
        <p>Category: {categoryName}</p>
        <Input
          className="form-item"
          value={values.name}
          placeholder="add a name for the task"
          onChange={addName}
        />
        <TextArea
          className="form-item"
          value={values.descriptions[0]?.title || ''}
          placeholder="add a description for the task"
          onChange={addDescription}
        />
        {!isMobile && ButtonSave}
      </LeftContent>
      <RightContent>
        <Datepicker changeTimes={changeTimes} />
        <div>
          <h4>Tags</h4>
          <Search
            options={tags}
            tags={values.tags}
            addTag={addTag}
            deleteTag={deleteTag}
          />
        </div>
        {isMobile && ButtonSave}
      </RightContent>
    </Form>
  );
};

export default NewCard;
