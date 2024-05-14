import { useContext } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Switch,
  Box,
  Typography,
} from "@mui/material";
import { TodoContext } from "../../App";
import AddTodo from "../addTodo/addTodo";

const TodoApp = () => {
  const { todos, updateTodo } = useContext(TodoContext);
  return (
    <Box m={2}>
      <Typography variant={"h4"} gutterBottom>
        {"Todo App"}
      </Typography>
      <AddTodo />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Task Description</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo, index) => (
              <TableRow
                key={todo.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell data-testid={`task${index}-desc`} scope="row">
                  {todo.description}
                </TableCell>
                <TableCell data-testid={`task${index}-status`} align="center">
                  {todo.isComplete ? "Complete" : "Incomplete"}
                </TableCell>
                <TableCell align="center">
                  <Switch
                    data-testid={`task${index}-switch`}
                    edge="end"
                    onChange={() => {
                      updateTodo(todo.id);
                    }}
                    checked={todo.isComplete}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TodoApp;
