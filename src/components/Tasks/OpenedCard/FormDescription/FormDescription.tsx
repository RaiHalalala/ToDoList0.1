import React, { FC, useState } from 'react';
import { PLACEHOLDER_TEXT_AREA } from 'constants/tests';
import { toHtml } from 'utils/helper';
//Components
import TextArea from 'ui-kit/TextArea';
import Button from 'ui-kit/Button';
import { Form } from './styled';

interface FormDescriptionProps {
  onSubmitForm: (value: string) => void;
}

const FormDescription: FC<FormDescriptionProps> = ({
  onSubmitForm,
}: FormDescriptionProps) => {
  const [value, setValue] = useState('');
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitForm(toHtml(value));
    setValue('');
  };
  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        value={value}
        placeholder={PLACEHOLDER_TEXT_AREA}
        onChange={(value) => setValue(value)}
      />
      <Button type="submit" disabled={!value} className="button">
        submit
      </Button>
    </Form>
  );
};

export default FormDescription;
