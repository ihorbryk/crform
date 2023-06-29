import { useState } from "react";

export type Values = Record<string, string>;

export type Errors = Record<keyof Values, string>;

type FormProps = {
  initialValues: Values;
  onSubmit: (values: Record<keyof Values, string>) => void;
  initialErrors?: Errors;
  validate?: (values: Record<keyof Values, string>) => Record<keyof Values, string>;
};

export const useCRForm = (props: FormProps) => {
  const [values, setValue] = useState<Values>(props.initialValues);
  const [errors, setErrors] = useState<Errors>(props.initialErrors || {});

  const onChangeField = (field: keyof Values, value: string, validate: boolean = false) => {
    if (validate && props.validate) {
      const errors = props.validate({ ...values, [field]: value });
      setErrors(errors);
    }
    setValue({ ...values, [field]: value });
  };

  const handleValidate = (): Errors => {
    let errors = {};
    if (props.validate) {
      errors = props.validate(values);
      setErrors(errors);
      return errors;
    }
    return errors;
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const errors = handleValidate();
    if (Object.keys(errors).length == 0) {
      props.onSubmit(values);
    }
  };

  const isValid = () => {
    return Object.keys(errors).length == 0;
  };

  const isNotValid = () => {
    return !isValid();
  };

  const setFieldValue = (field: keyof Values, value: string) => {
    setValue({ ...values, [field]: value });
  };

  const setValues = (values: Values) => {
    setValue(values);
  };

  return {
    values,
    errors,
    onChangeField,
    handleSubmit,
    handleValidate,
    isValid,
    isNotValid,
    setFieldValue,
    setValues,
  };
};
