/**
 * Handlers for the mock resources
 */
import { rest } from "msw";

import { TODOS, TAGS, USERS } from "./store";
import { Resource } from "./types";
import { generateID } from "./utils";
import { applyFilter, parseFilter } from "./filter";

/**
 * For a given Resource store, build up the MOCK API handlers
 */
const buildResourceHandlers = (kind: string, store: Resource[]) => [
  // LIST / COUNT
  rest.get(`/api/${kind}`, (req, res, ctx) => {
    const search = req.url.searchParams;
    const isCount = search.get("count") === "true";

    // handle count response
    if (isCount) {
      const count = store.length;
      return res(ctx.json({ count }));
    }

    // handle filter for list
    let list = store;
    const expression = search.has("filter")
      ? decodeURIComponent(search.get("filter")!)
      : undefined;
    const filter = parseFilter(expression);
    if (filter) {
      list = applyFilter(store, filter);
    }

    return res(ctx.json({ filter, list }));
  }),
  // GET
  rest.get(`/api/${kind}/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const resource = store.find((t) => t.id === id);

    if (!resource) {
      return res(ctx.status(404, "Not Found"));
    }

    return res(ctx.json(resource));
  }),
  // CREATE
  rest.post(`/api/${kind}`, async (req, res, ctx) => {
    const data = await req.json();

    data.id = generateID();
    data.meta = {
      create_time: new Date().toISOString()
    };

    store.push(data);

    return res(ctx.json(data));
  }),
  // UPDATE
  rest.patch(`/api/${kind}/:id`, async (req, res, ctx) => {
    const data = await req.json();

    const { id } = req.params;
    const resourceIx = store.findIndex((t) => t.id === id);
    const resource = store.at(resourceIx);

    if (!resource) {
      return res(ctx.status(404, "Not Found"));
    }

    const updated: Resource = {
      id: id.toString(),
      meta: {
        ...resource.meta,
        update_time: new Date().toISOString()
      },
      spec: {
        ...resource.spec,
        ...data.spec
      }
    };

    // overwrite entry in store with given resource
    store.splice(resourceIx, 1, updated);

    return res(ctx.json(updated));
  }),
  // DELETE
  rest.delete(`/api/${kind}/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const resourceIx = store.findIndex((t) => t.id === id);
    const resource = store.at(resourceIx);

    if (!resource) {
      return res(ctx.status(404, "Not Found"));
    }

    // remove entry
    store.splice(resourceIx, 1);

    return res(ctx.json(resource));
  })
];

export const handlers = [
  ...buildResourceHandlers("tags", TAGS),
  ...buildResourceHandlers("todos", TODOS),
  ...buildResourceHandlers("users", USERS)
];
