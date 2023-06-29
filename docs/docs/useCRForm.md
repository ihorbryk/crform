---
sidebar_label: 'useCRForm'
sidebar_position: 2
---
# useCRForm()

useCRForm is a react hook, that provides a set of methods for working with form state.

## Example

```tsx
import { useCRForm, Errors } from '@ihorbryk/crform';
import React from "react";

const App = () => {
  const initialValues: { name: "" }

  const form = useCRForm({
    initialValues: initialValues,
    onSubmit: (values) => console.log(values),
    validate: (values) => {
      const errors: Errors<typeof initialValues> = {};
      if (!values.name) {
        errors.name = "Name is required";
      }
      return errors;
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <input type="text" value={form.values.name} onChange={(e) => form.onChangeField("name", e.target.value)} />
      {form.errors.name && <div>{form.errors.name}</div>}
      <button type="submit" disabled={form.isNotValid()}>
        Submit
      </button>
    </form>
  );
};

export default App;
```

## API

### Props

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| initialValues | Values | true | - | Initial values of form |
| onSubmit | (values: Values) => void | true | - | Callback that will be called when form is submitted |
| validate | (values: Values) => Errors | false | - | Callback that will be called when form is submitted and return errors object |
| validateOnChange | boolean | false | false | If true, validate form on change. |



