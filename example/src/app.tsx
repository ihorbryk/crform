import React from "react";
import { Errors, useCRForm } from "../../index";

const App = () => {
  const initialValues = { name: "" };

  const form = useCRForm({
    initialValues: initialValues,
    onSubmit: (values) => alert(values.name),
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
      <input type="text" value={form.values.name} onChange={(e) => form.onChangeField("name", e.target.value, true)} />
      {form.errors.name && <div>{form.errors.name}</div>}
      <button type="submit" disabled={form.isNotValid()}>
        Submit
      </button>
    </form>
  );
};

export default App;
