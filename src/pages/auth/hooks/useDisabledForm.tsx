import { useForm } from "antd/lib/form/Form";
import { FormEventHandler, useState } from "react";

export const useDisabledForm = () => {
  const [form] = useForm();
  const [disabledButton, setDisabledButton] = useState(true);

  const isFormInvalid = () => {
    const fieldsError = form.getFieldsError();
    const hasErrors = fieldsError.some((field) => field.errors.length > 0);

    return hasErrors;
  };

  const handleFormChange: FormEventHandler<HTMLFormElement> = () => {
    setDisabledButton(isFormInvalid());
  };

  return { form, disabledButton, handleFormChange };
};
