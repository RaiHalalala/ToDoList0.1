import { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task as TaskProps } from 'types/task';
import { DropName } from '../type';
import { Wrapper, Name, Deadline } from './styled';

interface CardProps extends TaskProps {
  openTask: () => void;
  index: number;
}

const Card: FC<CardProps> = ({
  openTask,
  id,
  name,
  deadline,
  datecreated,
  icon,
  index,
  isActive,
}: CardProps) => (
  <Draggable draggableId={`${DropName.subItem}-${id}`} index={index}>
    {(provided) => (
      <Wrapper
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        isActive={isActive}
        onClick={openTask}>
        <Name>{name}</Name>
        <Deadline>Created: {datecreated}</Deadline>
        <Deadline>Deadline: {deadline}</Deadline>
        {icon && <div>icon</div>}
      </Wrapper>
    )}
  </Draggable>
);

export default Card;
