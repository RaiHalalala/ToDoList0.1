import React, { forwardRef, useState } from 'react';
import {
  DraggableProvidedDragHandleProps as DragHandleType,
  Droppable,
} from 'react-beautiful-dnd';
import { Task } from 'types/task';
import { useScreen } from 'hooks/useScreen';
import { IMAGE_NEW_TASK } from 'constants/common';
import { ChangingColumn, DropName, SortOptions, Value } from '../type';
//Components
import Card from '../Card';
import Header from './Header';
import Actions from '../Actions';
import Arrow from 'ui-kit/Arrow';
import ButtonSetting from './ButtonSetting';
import { ColumnWrapper, Content, NewTask } from './styled';

type InitialPosition = {
  left: number;
  right: number;
};

interface ColumnProps {
  id: string;
  value: Value;
  isNewColumn: boolean;
  sorting: SortOptions | null;
  dragHandleProps?: DragHandleType;
  createNewTask: () => void;
  setMadeOfColumn: () => void;
  changeOldTask: (task: Task) => void;
  saveMadeOfColumn: (name: string) => void;
  sortColumn: (options: SortOptions) => void;
  changeColumn: (value: ChangingColumn) => void;
}

const Column = forwardRef<HTMLDivElement, ColumnProps>(
  (
    {
      id,
      value,
      sorting,
      sortColumn,
      isNewColumn,
      changeColumn,
      changeOldTask,
      createNewTask,
      setMadeOfColumn,
      dragHandleProps,
      saveMadeOfColumn,
      ...params
    }: ColumnProps,
    ref,
  ) => {
    const { isMobile } = useScreen();
    const [isShowTasks, setIsShowTasks] = useState(!isMobile);
    const [isChangeName, setIsChangeName] = useState(isNewColumn);
    const [positionPopup, setPositionPopup] = useState<InitialPosition | null>(
      null,
    );

    const changeNameColumn = () => {
      setMadeOfColumn();
      setIsChangeName(true);
    };
    const openPopup = (e: React.MouseEvent<HTMLElement>) => {
      const left = e.currentTarget.getBoundingClientRect().left;
      const right = e.currentTarget.getBoundingClientRect().right;
      setPositionPopup({ left, right });
    };
    const onSubmitForm = (name: string) => {
      saveMadeOfColumn(name);
      setIsChangeName(false);
    };

    const ButtonArrow = isMobile && !!value.tasks.length && (
      <Arrow
        isShow={isShowTasks}
        onClick={() => setIsShowTasks((prev) => !prev)}
        className="arrow"
      />
    );
    return (
      <ColumnWrapper ref={ref} {...params}>
        <Header
          name={value.name}
          isChangeName={isChangeName}
          onSubmitForm={onSubmitForm}
          dragHandleProps={dragHandleProps}>
          <ButtonSetting onClick={openPopup} />
          {positionPopup && (
            <Actions
              sortingState={sorting}
              sortColumn={sortColumn}
              position={positionPopup}
              changeColumn={changeColumn}
              createNewTask={createNewTask}
              changeNameColumn={changeNameColumn}
              closePopup={() => setPositionPopup(null)}
            />
          )}
        </Header>
        <Droppable
          droppableId={`${id}`}
          direction="vertical"
          type={DropName.subItem}>
          {(provided) => (
            <Content {...provided.droppableProps} ref={provided.innerRef}>
              {ButtonArrow}
              {isShowTasks &&
                value.tasks.map((task, index) => (
                  <Card
                    {...task}
                    key={task.id}
                    index={index}
                    changeOldTask={() => changeOldTask(task)}
                  />
                ))}
              <NewTask onClick={createNewTask}>
                <img {...IMAGE_NEW_TASK} />
              </NewTask>
              {provided.placeholder}
            </Content>
          )}
        </Droppable>
      </ColumnWrapper>
    );
  },
);

Column.displayName = 'Column';

export default Column;
