import { ReactElement } from "react";

import { useToDoStore } from "../../data/store/useToDoStore";
import { InputEnter } from "../components/InputEnter";

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
        {tasks.length && (
          <p className={styles.articleSectionText}>There is no one task.</p>
        )}
      </section>
    </article>
  );
}
