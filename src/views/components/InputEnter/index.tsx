import React, { useCallback, useState } from "react";

import styles from "./index.module.css";

interface InputEnterProps {
  onAdd: (title: string) => void;
}

const placeholder: string = "Some words...";

export const InputEnter: React.FC<InputEnterProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState("");

  const addTask = useCallback(() => {
    onAdd(inputValue);
    setInputValue("");
  }, [inputValue]);

  return (
    <div className={styles.contentInput}>
      <input
        type="text"
        name="input"
        value={inputValue}
        className={styles.contentInputValue}
        placeholder={placeholder}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? addTask() : false)}
      />
      <button
        className={styles.contentInputButton}
        onClick={addTask}
        aria-label="Add"
        type="submit"
      ></button>
    </div>
  );
};
