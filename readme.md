# TypeGraphQL Relay

> Relay-compliant GraphQL server using TypeGraphQL and TypeORM boilerplate.

---

## Introduction

This is a GraphQL server boilerplate that follows the [Global Object Identification](https://graphql.org/learn/global-object-identification/), [GraphQL Server Specification](https://relay.dev/docs/en/graphql-server-specification.html) and [GraphQL Cursor Connections Specification](https://relay.dev/graphql/connections.htm) specifications.

## Running

### Environment variables

You need to configure the environment variables. Just create a `.env` based on `.env.defaults`.

### Database

This boilerplate requires that you have a PostgreSQL instance running, you can either install on your operating system or use Docker instead.

> In order to change from PostgreSQL to another TypeORM [supported database](https://typeorm.io/#/undefined/installation) (MySQL, MariaDB, SQL Server, etc) you just need to change the `type` on the database loader and remove the `pg` package.

#### Using Docker

If you have Docker and Docker Compose installed you just need to run `docker-compose up -d` on your terminal.

> The `postgres` service will create automatically the dabatase specified on the `DATABASE_NAME` environment variable.

### Server

Install all the dependencies

> yarn

Then you can finally

> yarn start:dev

If you see this message on your terminal:

> ✔ The server is running at <http://127.0.0.1:8080>

Congratulations, the server is running. 🚀

> The GraphQL endpoint is based on the `GRAPHQL_PATH` environment variable.

## Improvements

The most important parts are implemented and working properly but we have room for improvements.

- [ ] Ordering
- [X] Filtering
- [ ] Custom arguments example
- [ ] Error handling
- [ ] DataLoader

Feel free to send suggestions and pull requests.

## Examples

### Mutation

```graphql
mutation {
  addProduct(
    input: {
      name: "iPhone 12 Pro"
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed dui scelerisque, lacinia ipsum vitae, placerat felis."
    }
  ) {
    product {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
}
```

### Global Object Identification

```graphql
{
  node(id: "UHJvZHVjdDoy") {
    ... on Product {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
  nodes(ids: ["UHJvZHVjdDoy"]) {
    ... on Product {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
}
```

### Cursor Connections (Pagination)

Forward

```graphql
{
  products(first: 2) {
    edges {
      node {
        id
        name
        description
        createdAt
        updatedAt
      }
      cursor
    }
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
  }
}
```

Forward with cursor

```graphql
{
  products(first: 2, after: "YXJyYXljb25uZWN0aW9uOjE=") {
    edges {
      node {
        id
        name
        description
        createdAt
        updatedAt
      }
      cursor
    }
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
  }
}
```

Backward

```graphql
{
  products(last: 2) {
    edges {
      node {
        id
        name
        description
        createdAt
        updatedAt
      }
      cursor
    }
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
  }
}
```

Backward with cursor

```graphql
{
  products(last: 2, before: "YXJyYXljb25uZWN0aW9uOjg=") {
    edges {
      node {
        id
        name
        description
        createdAt
        updatedAt
      }
      cursor
    }
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
  }
}
```

With Filter

```graphql
{
  products(last: 2, name: "Something") {
    edges {
      node {
        id
        name
        description
        createdAt
        updatedAt
      }
      cursor
    }
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
  }
}
```