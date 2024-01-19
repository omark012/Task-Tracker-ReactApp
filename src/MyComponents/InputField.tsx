import React, { useRef } from 'react';
import './Styles.css';

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleSubmit }) => {

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form className="input_form" onSubmit={(e) => {
      handleSubmit(e)
      inputRef.current?.blur();
    }}>
      <input
        ref={inputRef}
        type="text"
        value={todo}
        onChange={(event) => setTodo(event.target.value)}
        className="input_box"
        placeholder="Enter Your Task Here"
      />
      <button className="input_btn">Go</button>
    </form>
  )
}

export default InputField