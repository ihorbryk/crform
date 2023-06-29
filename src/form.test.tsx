import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { Errors, Values, useCRForm } from "./form";

const Form = (props: { values?: Values; submitFn?: () => void }) => {
  const form = useCRForm({
    initialValues: props.values ? props.values : { name: "John Doe" },
    onSubmit: props.submitFn ? props.submitFn : (values) => console.log(values),
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
      <input
        data-testid="input"
        type="text"
        value={form.values.name}
        onChange={(e) => form.onChangeField("name", e.target.value, true)}
      />
      {form.errors.name && <div>{form.errors.name}</div>}
      <button type="submit" disabled={form.isNotValid()} data-testid="submit-button">
        Submit
      </button>
    </form>
  );
};

describe("Form values", () => {
  it("should init with corect values", () => {
    render(<Form />);
    expect(screen.getByTestId("input")).toHaveValue("John Doe");
  });
  it("should change form value after change input text", () => {
    render(<Form />);
    fireEvent.change(screen.getByTestId("input"), { target: { value: "Bruse Lee" } });
    expect(screen.getByTestId("input")).toHaveValue("Bruse Lee");
  });
});

describe("Form submit", () => {
  it("should fire submit function", () => {
    const testFunction = vi.fn();
    render(<Form submitFn={testFunction} />);
    fireEvent.click(screen.getByTestId("submit-button"));
    expect(testFunction).toBeCalled();
  });
});

describe("Form validation", () => {
  it("should show error message", () => {
    render(<Form values={{ name: "" }} />);
    fireEvent.click(screen.getByTestId("submit-button"));
    expect(screen.getByText("Name is required")).toBeInTheDocument();
  });
});
