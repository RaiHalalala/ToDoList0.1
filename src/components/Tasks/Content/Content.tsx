import { FC } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { useScreen } from 'hooks/useScreen';
import { Task } from 'types/task';
import {
  Columns,
  DropName,
  Value,
  InitialValues,
  ChangingColumn,
  SortOptions,
} from '../type';
//Components
import Column from '../Column';
import { Block } from './styled';

interface ContentProps {
  columns: Columns;
  newColumnID: number;
  sorting: SortOptions | null;
  openTask: (task: Task) => void;
  createNewTask: (values: InitialValues) => void;
  onDragEnd: (result: DropResult) => void;
  setMadeOfColumn: (id: number, name: string) => void;
  saveMadeOfColumn: (name: string) => void;
  sortColumn: (options: SortOptions, categories_id: number) => void;
  changeColumn: (value: ChangingColumn, category_id: number) => void;
}

const Content: FC<ContentProps> = ({
  columns,
  sorting,
  newColumnID,
  sortColumn,
  openTask,
  createNewTask,
  onDragEnd,
  setMadeOfColumn,
  saveMadeOfColumn,
  changeColumn,
}: ContentProps) => {
  const { isMobile } = useScreen();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId={DropName.item}
        type={DropName.item}
        direction={isMobile ? 'vertical' : 'horizontal'}>
        {(provided) => (
          <Block
            className="scroll"
            ref={provided.innerRef}
            {...provided.droppableProps}>
            {Object.entries(columns).map(
              ([id, value]: [string, Value], index) => (
                <Draggable
                  key={id}
                  draggableId={`${DropName.item}-${id}`}
                  index={index}>
                  {(provided) => (
                    <Column
                      ref={provided.innerRef}
                      id={id}
                      value={value}
                      sorting={sorting}
                      sortColumn={(option) =>
                        sortColumn(option, value.categories_id)
                      }
                      isNewColumn={id === newColumnID.toString()}
                      changeColumn={(val) =>
                        changeColumn(val, value.categories_id)
                      }
                      openTask={openTask}
                      createNewTask={() =>
                        createNewTask({
                          category_id: value.categories_id,
                          order: value.tasks.length,
                        })
                      }
                      setMadeOfColumn={() =>
                        setMadeOfColumn(Number(id), value.name)
                      }
                      saveMadeOfColumn={saveMadeOfColumn}
                      dragHandleProps={provided.dragHandleProps}
                      {...provided.draggableProps}
                    />
                  )}
                </Draggable>
              ),
            )}
            {provided.placeholder}
          </Block>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Content;
