import React, { useEffect, useRef, useState } from "react";

import styles from "./index.module.css";

interface InputTaskProps {
  id: string;
  title: string;

  onDone: (title: string) => void;
  onEdited: (title: string, id: string) => void;
  onRemoved: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({
  id,
  title,
  onDone,
  onEdited,
  onRemoved,
}) => {
  const editTitleInputRef = useRef<HTMLInputElement>(null);

  const [isEdit, setIsEdit] = useState(false);
  const [isTitle, setIsTitle] = useState(title);

  useEffect(() => {
    isEdit ? editTitleInputRef?.current?.focus() : false;
  }, [isEdit]);

  return (
    <div className={styles.contentInput}>
      <label className={styles.labelInput}>
        <input
          type="checkbox"
          disabled={isEdit}
          className={styles.labelInputCheckbox}
          onChange={(e) => {
            setTimeout(() => (e.target.checked ? onDone(id) : false), 200);
          }}
        />
        {isEdit ? (
          <input
            value={isTitle}
            ref={editTitleInputRef}
            onChange={(e) => setIsTitle(e.target.value)}
            className={styles.labelInputTitleEdit}
            onKeyDown={(e) => (e.key === "Enter" ? onEdited(title, id) : false)}
          />
        ) : (
          <h3 className={styles.labelInputTitle}>{isTitle}</h3>
        )}
      </label>
      {isEdit ? (
        <button
          aria-label="Save"
          className={styles.contentInputButtonSave}
          onClick={() => {
            onEdited(title, id);
            setIsEdit(false);
          }}
        ></button>
      ) : (
        <button
          aria-label="Edit"
          className={styles.contentInputButtonEdit}
          onClick={() => setIsEdit(true)}
        ></button>
      )}
      <button
        aria-label="Remove"
        className={styles.contentInputButtonRemove}
        onClick={() => (confirm("Are you sure?") ? onRemoved(id) : false)}
      ></button>
    </div>
  );
};
