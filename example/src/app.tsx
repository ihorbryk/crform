import React from "react";
import { Errors, useCRForm } from "../../src/form";

const App = () => {
  const form = useCRForm({
    initialValues: { name: "" },
    onSubmit: (values) => alert(values.name),
    validate: (values) => {
      const errors: Errors = {};
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
