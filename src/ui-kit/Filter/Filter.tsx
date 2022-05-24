import React, { FC } from 'react';
import Button from 'ui-kit/Button';
import Input from 'ui-kit/Input';
import { CHOOSE_PARAM } from 'constants/tests';
import { Filter as FilterType } from 'components/Tasks/type';
import { Form } from './styled';

interface FilterProps {
  param: FilterType;
  changeParam: (param: FilterType) => void;
  className?: string;
}

const Filter: FC<FilterProps> = ({
  param,
  changeParam,
  className,
}: FilterProps) => {
  const findTeg = (name: string, value: string) => {
    changeParam({ ...param, [name]: { value, active: false } });
  };

  return (
    <Form className={className}>
      <Button type="button" className="choose-params">
        {CHOOSE_PARAM}
      </Button>
      <Input
        className="input"
        value={param.tags.value}
        onChange={(value) => findTeg('tags', value)}
      />
    </Form>
  );
};

export default Filter;
