export const Instructions = () => {
  return (
    <div className="instructions">
      <h2 className="instructions-header">Instructions</h2>
      <p>Create a small "Todo list" application matching the image below.</p>
      <p>
        React is preferred, and provided here, but you can import any libraries
        or use plain TypeScript/JavaScript.
      </p>
      <p>
        Provide a text input above the lists that allows the user to add a new
        todo item to the list.
      </p>
      <p>
        Provide an additional select field that allows the user to add an
        existing Tag to the new Todo item.
      </p>
      <p>
        When a todo item is clicked, that item should be removed from the
        "Pending" list and placed in the "Completed" list.
      </p>
      <p>Next to each item, display the related Tags.</p>
      <p>
        Next to each completed item, display the date and time the item was
        completed.
      </p>
      <p>
        Styles should roughly match the image, but do not need to be
        "pixel-perfect".
      </p>
      <p>Remove these instructions when you are done.</p>

      <h2 className="instructions-header">APIs</h2>
      <p>
        A mock API is exposed locally with `msw`. Within the App, data for the
        Todos and related resources may be fetched from `/api/todos`.
      </p>
      <p>
        Additional details for the mock API can be found under
        `./data/README.md`
      </p>
      <p>
        For this challenge, use the mock API to fetch and display all current
        todos for the user "Robert Huffman".
      </p>
      <p>
        When creating a new Todo, set the user for new Todos to "Robert Huffman"
        as well.
      </p>

      <h2 className="instructions-header">Design</h2>
      <img alt="Example Application" src="/todo-example.png" width="600" />
    </div>
  );
};
