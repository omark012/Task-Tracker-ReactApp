import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../Model';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import './Styles.css';
import { Draggable } from 'react-beautiful-dnd';


type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
}

const TodoItem: React.FC<Props> = ({ todo, todos, setTodos, index }) => {

  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);


  const handleDone = (id: number) => {
    setTodos((prevTodos) => prevTodos.map((item) => (
      item.id === id ? { ...item, isDone: !item.isDone }
        :
        item
    )
    ))
  }

  const handleDelete = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id))
  }

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    if (editTodo) {
      setTodos((prevTodos) => prevTodos.map((item) => (
        item.id === id ? { ...item, todo: editTodo } : item
      )))
    }

    setEdit(false)
  }

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit])




  return (
    <Draggable draggableId={todo.id.toString()} index={index} >
      {
        (provided, snapshot) => (
          <form
            className={`todos_Item ${snapshot.isDragging ? "drag" : ""}`}
            onSubmit={(e) => handleEdit(e, todo.id)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {edit ?
              (<input
                type="text"
                ref={inputRef}
                className="todos_Item--text"
                value={editTodo}
                onChange={(event) => setEditTodo(event.target.value)}
              />)
              :
              (<span className="todos_Item--text" style={{ textDecoration: `${todo.isDone ? "line-through" : "none"}` }}>{todo.todo}</span>)
            }

            <div className="todos_icon">
              <span className="icon">
                <FaEdit onClick={() => {
                  if (!edit && !todo.isDone) {
                    setEdit((prevEdit) => !prevEdit);
                  }
                  else if (!edit && todo.isDone)
                    alert("Task That are Completed Cannot be Edited")
                }
                } />
              </span>
              <span className="icon">
                <FaTrashAlt onClick={() => handleDelete(todo.id)} />
              </span>
              <span className="icon">
                <MdDone onClick={() => handleDone(todo.id)} />
              </span>
            </div>

          </form>

        )
      }
    </Draggable>

  )
}

export default TodoItem;