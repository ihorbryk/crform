import { useState } from "react";

export type Values<T> = T;

export type Errors<T> = Partial<Record<keyof Values<T>, string>>;

type FormProps<T> = {
  initialValues: Values<T>;
  onSubmit: (values: Values<T>) => void;
  initialErrors?: Errors<T>;
  validate?: (values: Values<T>) => Errors<T>;
};

export const useCRForm = <T,>(props: FormProps<T>) => {
  const [values, setValue] = useState<Values<T>>(props.initialValues);
  const [errors, setErrors] = useState<Errors<T>>(props.initialErrors || ({} as Errors<T>));

  const onChangeField = (field: keyof Values<T>, value: string, validate: boolean = false) => {
    if (validate && props.validate) {
      const errors = props.validate({ ...values, [field]: value });
      setErrors(errors);
    }
    setValue({ ...values, [field]: value });
  };

  const handleValidate = (): Errors<T> => {
    let errors = {} as Errors<T>;
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

  const setFieldValue = (field: keyof Values<T>, value: string) => {
    setValue({ ...values, [field]: value });
  };

  const setValues = (values: Values<T>) => {
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
