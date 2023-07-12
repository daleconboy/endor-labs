import { TodoComponent } from "./TodoComponent";
import { TagsProvider } from "./contexts/TagsContext";
import { TodosProvider } from "./contexts/TodosContext";
import styles from "./App.module.css";

// Robert Huffman
const TODO_USER_ID = "468877";

export const App = () => {
  return (
    <div
      style={{ border: "1px dashed #ccc", padding: "16px" }}
    >
      <TodosProvider USER_ID={TODO_USER_ID}>
        <TagsProvider>
          <h2 className={styles.appHeading}>Todo App</h2>
          <TodoComponent userId={TODO_USER_ID} />
        </TagsProvider>
      </TodosProvider>
    </div>
  );
}
