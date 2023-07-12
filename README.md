# Endor Labs Code Challenge

## About my solution

### State management

I opted to use a traditional top-level context and a custom `useTags` hook to hold the state for the tags data and to make it accessible. This data was relatively simple, only needed to be fetched once, is never mutated, and is needed at various points in the tree.

For the todos data, I used a top-level context provider and dispatcher pattern, supported by `useReducer` and a `useTodos` hook. The todo data is a bit more complex, is related to users, and needs to get mutated. It also needs to be accessed at various points in the tree. The need for mutation drove the decision to reach for the dispatcher approach.

### API data fetching and mutation

Initial data fetching takes place in the two contexts for tags and todos at which point it is store to state and made available for downstream consumers of the contexts.

Additionally the app is set up so that the toto UI won't render until all data is received. A simple "Loading..." indicator renders in the meantime.

### Styling

CSS Modules were used exclusively for styling. The provide multiple benefits such as styling safety via their scoped classnames, none of the performance problems that css-in-js solutions have, ease of access and application in the TSX files, and they are also supported out of the box by Vite.

Additionally PostCSS used in conjunction with CSS Modules can be quite powerful. However, it was not needed for this project.

#### TypeScript support for CSS Modules

There is one problem with CSS Modules, and that is related to the TypeScript support for them. There are few solutions out there to provide desirable functionality in this area. And the ones that do exist, are not seeing widespread use. This is assumedly a reflection of the fact that CSS Modules are not necessarily the most popular React-based styling solution at the moment.

I oped to use the [typed-css-modules](https://www.npmjs.com/package/typed-css-modules) package to provide TS support. This package worked out well and also tied in nicely with Vite's watch mode. It also provides _full_ type safety for your CSS classes, since it continuously produces `.d.ts` files for your `.module.css` files. Which means that TypeScript will not allow you to access a classname that is not defined in the `.module.css` file.

This full type safety is much better than some of the other solutions out there that provide more naive, generic `Record<string, string>` sorts of typings.

### Src inventory

#### [src/CompletedTodoList](./src/CompletedTodoList/)

A component responsible for rendering the list of completed todo items in the _Completed_ box.

#### [src/contexts](./src/contexts/)

The contexts and dispatchers for the tags and todo data


#### [src/FormElements](./src/FormElements/)

Lower level components for the form elements

#### [src/lib](./src/lib/)

A collection of string formatting utilities and a simple client collection for interacting with the API.

#### [src/TodoCard](./src/TodoCArd/)

The base card-like container component for the _Pending_ and _Completed_ boxes. It also provides a header.


#### [src/TodoComponent](./src/TodoComponent/)

Houses two components — the primary higher-level component that is responsible for laying out all of the App's major UI pieces and handing the interactions. And the other component acts as an interstitial delegate to manage the `Loading...` state.


#### [src/TodoList](./src/TodoList/)

The component responsible for rendering the list of todo items and managing the interactions.
