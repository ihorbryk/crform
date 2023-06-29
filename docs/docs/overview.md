---
sidebar_label: 'Overview'
sidebar_position: 1
---
# Overview

This package provide simple tool for working with forms in modern react + typescript stacks.
All code written in typescript and has a lot of type definitions and naturaly integrate with you typescript project.

## Installation

### NPM
```bash
npm install @ihorbryk/crform
```

or

### Yarn
```bash
yarn add @ihoorbryk/crform
```

SRForm compatible with react 18.2.0 and higher.

## Usage

SRForm is a simple wrapper around react hooks. It provides a simple way to work with forms in react.
Basicaly, SRForm is a react hook, that provides a set of methods for working with form state.

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

