import React, { forwardRef, useState } from 'react';
import {
  DraggableProvidedDragHandleProps,
  Droppable,
} from 'react-beautiful-dnd';
import { ChangingColumn, DropName, SortOptions, Value } from '../type';
import { useScreen } from 'hooks/useScreen';
import { Task } from 'types/task';
//Components
import Arrow from 'ui-kit/Arrow';
import Actions from '../Actions';
import Header from './Header';
import Card from '../Card';
import { ColumnWrapper, Content, NewTask, Points } from './styled';

type InitialPosition = {
  left: number;
  right: number;
};

interface ColumnProps {
  id: string;
  value: Value;
  sorting: SortOptions | null;
  isNewColumn: boolean;
  sortColumn: (options: SortOptions) => void;
  setMadeOfColumn: () => void;
  saveMadeOfColumn: (name: string) => void;
  createNewTask: () => void;
  openTask: (task: Task) => void;
  changeColumn: (value: ChangingColumn) => void;
  dragHandleProps?: DraggableProvidedDragHandleProps;
}

const Column = forwardRef<HTMLDivElement, ColumnProps>(
  (
    {
      id,
      value,
      sorting,
      isNewColumn,
      openTask,
      sortColumn,
      createNewTask,
      changeColumn,
      setMadeOfColumn,
      saveMadeOfColumn,
      dragHandleProps,
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

    const changeBeingName = () => {
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
    return (
      <ColumnWrapper ref={ref} {...params}>
        <Header
          name={value.name}
          isChangeName={isChangeName}
          onSubmitForm={onSubmitForm}
          dragHandleProps={dragHandleProps}>
          <button onClick={openPopup}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Points key={index} />
            ))}
          </button>
          {positionPopup && (
            <Actions
              position={positionPopup}
              sortingState={sorting}
              sortColumn={sortColumn}
              closePopup={() => setPositionPopup(null)}
              changeNameColumn={changeBeingName}
              createNewTask={createNewTask}
              changeColumn={changeColumn}
            />
          )}
        </Header>
        <Droppable
          droppableId={`${id}`}
          direction="vertical"
          type={DropName.subItem}>
          {(provided) => (
            <Content {...provided.droppableProps} ref={provided.innerRef}>
              {isMobile && !!value.tasks.length && (
                <Arrow
                  isShow={isShowTasks}
                  onClick={() => setIsShowTasks((prev) => !prev)}
                  className="arrow"
                />
              )}
              {isShowTasks &&
                value.tasks.map((task, index) => (
                  <Card
                    key={task.id}
                    {...task}
                    openTask={() => openTask(task)}
                    index={index}
                  />
                ))}
              <NewTask onClick={createNewTask}>
                <img
                  className="image"
                  src="/static/images/new-task.png"
                  alt="new task"
                />
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
