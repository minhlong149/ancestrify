# long.nguyendaominh

Nguyen Dao Minh Long - Backend Intern

## Getting Started

Install all the dependencies, build the project and run the server. *I'm using `yarn` as my package manager, but `npm` should work just fine.*

```bash
yarn
yarn build
yarn preview
```

> You can also use `yarn dev` to run the server in development mode.

## About the JSON Structure

The family tree data is stored as an `array` of all members in the family. For each member, we store the `family id` that they are `parent` and `child` of.

- Members with the same `parent's family id` are `spouses`.
- Members with the same `child's family id` are `siblings`.
- Members with their `parent's family id` the same as others member's `child's family id` are `parent` and `child`.

| Member         | Parent of Family | Child of Family |
|----------------|------------------|-----------------|
| Father         | F1               |                 |
| Mother         | F1               | F0              |
| Sister         | F2               | F1              |
| Brother-in-Law | F2               |                 |
| Nephew         |                  | F2              |
| Grandparent    | F0               |                 |

> The family tree data implementation is located in `src/services/familyTree.js`.
