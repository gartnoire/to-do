import { ReactElement } from "react";

import { useToDoStore } from "../../data/store/useToDoStore";
import { InputEnter } from "../components/InputEnter";
import { InputTask } from "../components/InputTask";

import styles from "./index.module.css";

export function App(): ReactElement {
  const [tasks, createTask, updateTask, removeTask] = useToDoStore((state) => [
    state.tasks,
    state.createTask,
    state.updateTask,
    state.removeTask,
  ]);

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>To-Do List</h1>
      <section className={styles.articleSection}>
        <InputEnter onAdd={(title) => (title ? createTask(title) : false)} />
      </section>
      <section className={styles.articleSection}>
        {!tasks.length && (
          <p className={styles.articleSectionText}>There is no one task.</p>
        )}
        {tasks.map((task) => (
          <InputTask
            key={task.id}
            id={task.id}
            title={task.title}
            onDone={removeTask}
            onEdited={updateTask}
            onRemoved={removeTask}
          />
        ))}
      </section>
    </article>
  );
}
