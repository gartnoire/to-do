import { ReactElement } from "react";

import styles from "./index.module.css";

export function App(): ReactElement {
  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>To-Do List</h1>
      <section className={styles.articleSection}></section>
      <section className={styles.articleSection}></section>
    </article>
  );
}
