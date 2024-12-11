# GraphQL API Server

A GraphQL server for managing student data built with Express and `express-graphql`.

## Features
- Query and mutate student data.
- In-memory database.

## Quick Start
1. Clone and install:
   ```bash
   git clone https://github.com/addisudamena/graph-ql-node.git && cd graph-ql-node && npm install
   ```
2. Run the server:
   ```bash
   node index.js
   ```
3. Access at: [http://localhost:4000/](http://localhost:4000/)

## Example Query
```graphql
{
  students {
    id
    name
    courses
  }
}
```

