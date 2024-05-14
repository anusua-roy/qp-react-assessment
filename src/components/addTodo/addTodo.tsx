import { useContext, useState } from "react";
import "../../App.css";
import { Grid, Button } from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { TodoContext } from "../../App";
import { ITodo, TodoContextType } from "../../interface/todo";

const AddTodo = () => {
  const [val, setVal] = useState<ITodo>({
    id: 0,
    isComplete: false,
    description: "",
  });
  const { saveTodo } = useContext<TodoContextType>(TodoContext);

  return (
    <Grid item container spacing={2}>
      <Grid item sm={4} xs={6}>
        <BaseTextareaAutosize
          data-testid="todoDescTextArea"
          className="todoDescTextArea"
          minRows={4}
          maxRows={4}
          placeholder="Enter Task Description"
          value={val.description}
          onChange={(e) => {
            setVal({ ...val, description: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={4} alignSelf={"center"}>
        <Button
          data-testid="addTodoButton"
          className="addTodoButton"
          variant="contained"
          color="success"
          onClick={() => {
            saveTodo(val);
            setVal({ ...val, description: "" });
          }}
        >
          {"Add Todo"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddTodo;
