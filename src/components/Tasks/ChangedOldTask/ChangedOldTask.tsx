import React, { FC, useState } from 'react';
import { HEADER_DESCRIPTION, HEADER_TEXTAREA } from 'constants/tests';
import { BUTTON_SAVE } from 'constants/common';
import { useScreen } from 'hooks/useScreen';
import { deepEqual } from 'utils/helper';
import { Task } from 'types/task';
//Components
import DeadlineProgress from 'ui-kit/DeadlineProgress';
import FormDescription from './FormDescription';
import WrapperModal from 'ui-kit/WrapperModal';
import Description from './Description';
import Search from 'ui-kit/Search';
import Button from 'ui-kit/Button';
import {
  HeaderDescription,
  RightContent,
  LeftContent,
  EmptyList,
  Info,
  Name,
  List,
} from './styled';

interface ChangedOldTaskProps {
  task: Task;
  tags: string[];
  onClose: () => void;
  setTask: (values: Task) => void;
}

const ChangedOldTask: FC<ChangedOldTaskProps> = ({
  task,
  tags,
  setTask,
  onClose,
}: ChangedOldTaskProps) => {
  const { isMobile } = useScreen();
  const [values, setValues] = useState<Task>(task);
  const onSubmitForm = (value: string) => {
    setValues((prev) => ({
      ...prev,
      descriptions: [
        ...prev.descriptions,
        { id: prev.descriptions.length + 1, title: value },
      ],
    }));
  };
  const saveChanged = () => setTask(values);
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
  const deleteDescription = (DescID: number) => {
    setValues((prev) => ({
      ...prev,
      descriptions: prev.descriptions.filter(({ id }) => id !== DescID),
    }));
  };

  const changeDate = (datecreated: string, deadline: string) => {
    setValues((prev) => ({
      ...prev,
      datecreated,
      deadline,
    }));
  };

  const ButtonSave = (
    <Button
      type="button"
      onClick={saveChanged}
      className="submit"
      disabled={deepEqual(task, values)}>
      {deepEqual(task, values) ? BUTTON_SAVE.disabled : BUTTON_SAVE.solve}
    </Button>
  );

  return (
    <WrapperModal onClose={onClose}>
      <LeftContent>
        <HeaderDescription>{HEADER_TEXTAREA}</HeaderDescription>
        <FormDescription onSubmitForm={onSubmitForm} />
        <HeaderDescription>{HEADER_DESCRIPTION}</HeaderDescription>
        <List className="scroll">
          {!values.descriptions.length && <EmptyList>empty</EmptyList>}
          {values.descriptions
            .map((description, index) => (
              <Description
                key={index}
                isNewDesc={
                  !task.descriptions.find(({ id }) => id === description.id)
                }
                description={description}
                deleteDescription={() => deleteDescription(description.id)}
              />
            ))
            .reverse()}
        </List>
        {!isMobile && ButtonSave}
      </LeftContent>
      <RightContent>
        <Name>Name: {values.name}</Name>
        <Info className="scroll">
          <div>
            <h3>Deadline</h3>
            <DeadlineProgress
              datecreated={values.datecreated}
              deadline={values.deadline}
              changeDate={changeDate}
            />
          </div>
          <div>
            <h3>Tags</h3>
            <Search
              options={tags}
              tags={values.tags}
              addTag={addTag}
              deleteTag={deleteTag}
            />
          </div>
          {isMobile && ButtonSave}
        </Info>
      </RightContent>
    </WrapperModal>
  );
};

export default ChangedOldTask;
