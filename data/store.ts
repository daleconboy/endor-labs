import { Tag, Todo, User } from "./types";
import { buildTag, buildTodo } from "./utils";

// NOTE: setting stable ID values for users
export const USERS: User[] = [
  {
    id: "371538",
    meta: { create_time: "2020-08-09T04:38:11Z" },
    spec: { name: "Carmen Irving" }
  },
  {
    id: "468877",
    meta: { create_time: "2020-08-14T23:01:59Z" },
    spec: { name: "Robert Huffman" }
  },
  {
    id: "823930",
    meta: { create_time: "2021-02-05T17:34:10Z" },
    spec: { name: "Lucy Bowen" }
  }
];

export const TAGS: Tag[] = [
  buildTag("2021-12-10T14:08:42Z", "Personal"),
  buildTag("2022-03-13T17:39:14Z", "Work"),
  buildTag("2022-04-26T10:14:57Z", "Pending"),
  buildTag("2022-09-19T17:53:01Z", "Other")
];

// NOTE: tags at index by name, for use in building TODO references
const [TAG_PERSONAL, TAG_WORK, TAG_PENDING] = TAGS;

export const TODOS: Todo[] = [
  buildTodo(
    "2022-08-03T11:58:37Z",
    "Pick up Groceries",
    USERS.at(0)!,
    [TAG_PERSONAL],
    "2022-08-07T15:03:26Z"
  ),
  buildTodo("2023-04-15T16:46:11Z", "File Taxes", USERS.at(0)!, [
    TAG_PERSONAL,
    TAG_PENDING
  ]),
  buildTodo("2022-12-25T09:19:54Z", "RFC Review", USERS.at(1)!, [TAG_WORK]),
  buildTodo("2023-01-12T17:01:23Z", "Re-order Widgets", USERS.at(1)!),
  buildTodo("2023-02-15T15:03:48Z", "Submit TPS Report", USERS.at(1)!, [
    TAG_WORK,
    TAG_PENDING
  ])
];
