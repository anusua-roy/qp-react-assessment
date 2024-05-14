import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("renders header", () => {
  render(<App />);
  const title = screen.getByText(/todo app/i);
  expect(title).toBeInTheDocument();
});

test("type text", async () => {
  render(<App />);
  const textArea = screen.getByTestId("todoDescTextArea");
  userEvent.type(textArea, "Task 1");
  await waitFor(() => {
    expect(textArea).toHaveValue("Task 1");
  });
});

test("add task", async () => {
  render(<App />);
  const textArea = screen.getByTestId("todoDescTextArea");
  const addBtn = screen.getByTestId("addTodoButton");
  userEvent.type(textArea, "Task 1");
  await waitFor(() => {
    expect(textArea).toHaveValue("Task 1");
  });
  userEvent.click(addBtn);
  await waitFor(() => {
    expect(textArea).toHaveValue("");
  });
  const taskCellDesc = screen.getByTestId("task0-desc");
  await waitFor(() => {
    expect(taskCellDesc).toHaveTextContent("Task 1");
  });
  const taskCellStatus = screen.getByTestId("task0-status");
  await waitFor(() => {
    expect(taskCellStatus).toHaveTextContent("Incomplete");
  });
});

test("mark task as complete", async () => {
  render(<App />);
  const textArea = screen.getByTestId("todoDescTextArea");
  const addBtn = screen.getByTestId("addTodoButton");
  userEvent.type(textArea, "Task 1");
  await waitFor(() => {
    expect(textArea).toHaveValue("Task 1");
  });
  userEvent.click(addBtn);
  await waitFor(() => {
    expect(textArea).toHaveValue("");
  });
  userEvent.type(textArea, "Task 2");
  await waitFor(() => {
    expect(textArea).toHaveValue("Task 2");
  });
  userEvent.click(addBtn);
  const taskCellStatus = screen.getByTestId("task0-status");
  await waitFor(() => {
    expect(taskCellStatus).toHaveTextContent("Incomplete");
  });
  screen.getAllByRole("checkbox")[0].click();
  fireEvent.change(screen.getAllByRole("checkbox")[0], {
    target: { checked: "" },
  });

  expect(screen.getAllByRole("checkbox")[0]).toHaveProperty("checked", false);

  await waitFor(() => {
    expect(taskCellStatus).toHaveTextContent("Complete");
  });
});
