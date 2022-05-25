import { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { DropName } from '../type';
import { Task as TaskProps } from 'types/task';
import { Wrapper, Name, Deadline } from './styled';

interface CardProps extends TaskProps {
  index: number;
  changeOldTask: () => void;
}

const Card: FC<CardProps> = ({
  id,
  name,
  icon,
  index,
  isActive,
  deadline,
  datecreated,
  changeOldTask,
}: CardProps) => (
  <Draggable draggableId={`${DropName.subItem}-${id}`} index={index}>
    {(provided) => (
      <Wrapper
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        isActive={isActive}
        onClick={changeOldTask}>
        <Name>{name}</Name>
        <Deadline>Created: {datecreated}</Deadline>
        <Deadline>Deadline: {deadline}</Deadline>
        {icon && <div>icon</div>}
      </Wrapper>
    )}
  </Draggable>
);

export default Card;
