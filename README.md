# Family Tree JSON

A small Family Tree Management System with the focus on the rendering and implementation of the family tree in JSON format. *This is part of the Technical Test for Backend Frontend-oriented Developer Intern.*

## Features

- [x] Allow to copy/paste a family JSON files and see display of Family Tree in real time.
- [x] Propose the "front Family Tree editing" on the diagram display directly.
- [ ] Showing only the Family Tree for user that has birthed in a specific year.

## JSON Data Structure

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

## References

- Bharath Raja - [Building My Family Tree](https://bigomega.medium.com/building-my-family-tree-ef0be1fba775)
