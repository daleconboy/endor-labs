# Mock Data API

For this code challenge, a mock API is exposed locally with [msw](https://mswjs.io). This allows for CRUD interactions, persisted in the browser session.

NOTE: because the mock API is served from a service worker, API calls must be made from within the application.

Below you'll find examples using the Fetch API to interact with the Mock API.

### Getting a Resource

```typescript
fetch("/api/users/371538")
  .then((response) => response.json())
  .then((json) => console.log(json));
```

👇 Output

```json
{
  "id": "371538",
  "meta": {
    "create_time": "2020-08-09T04:38:11Z"
  },
  "spec": {
    "name": "Carmen Irving"
  }
}
```

### Listing all Resources

```typescript
fetch("/api/users")
  .then((response) => response.json())
  .then((json) => console.log(json));
```

👇 Output

```json
{
  "list": [
    {
      "id": "371538",
      "meta": { "create_time": "2020-08-09T04:38:11Z" },
      "spec": { "name": "Carmen Irving" }
    },
    {
      "id": "468877",
      "meta": { "create_time": "2020-08-14T23:01:59Z" },
      "spec": { "name": "Robert Huffman" }
    },
    ...
  ]
}
```

### Creating a Resource

```typescript
fetch("/api/tags", {
  method: "POST",
  body: JSON.stringify({
    spec: {
      value: "My Tag"
    }
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) => response.json())
  .then((json) => console.log(json));
```

👇 Output

```json
{
  "id": "91d463.e00829",
  "meta": {
    "create_time": "2023-04-03T22:42:27Z"
  },
  "spec": {
    "value": "My Tag"
  }
}
```

### Updating a Resource

```typescript
fetch("/api/todos/91d3b6.ef8150", {
  method: "PATCH",
  body: JSON.stringify({
    spec: {
      note: "My Todo (edit)",
      tag_ids: ["91d3b6.ccf4ca"]
    }
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) => response.json())
  .then((json) => console.log(json));
```

👇 Output

```json
{
  "id": "91d3b6.ef8150",
  "meta": {
    "create_time": "2020-08-14T23:01:59Z",
    "update_time": "2023-04-03T22:42:27Z"
  },
  "spec": {
    "note": "My Todo (edit)",
    "tag_ids": ["91d3b6.ccf4ca"]
  }
}
```

### Filtering resources

Basic filtering is supported through the `filter` query parameter. A filter specifies a key, an operator, and a value to apply to the resources.

```typescript
fetch("/api/users?filter=spec.name==Lucy%20Bowen")
  .then((response) => response.json())
  .then((json) => console.log(json));
```

👇 Output

```json
{
  "list": [
    {
      "id": "823930",
      "meta": { "create_time": "2021-02-05T17:34:10Z" },
      "spec": { "name": "Lucy Bowen" }
    }
  ]
}
```
