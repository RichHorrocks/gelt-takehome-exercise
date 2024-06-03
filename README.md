### Problem Statement

Create a web app of the children's game "MASH”.

- Implement an interactive front end
- The player is prompted with the initial MASH questions
- Selection (elimination) algorithm works
- The sequencing steps of the selection are shown in a slow visual representation to add suspense/fun
- The final results are presented to the player.

### Approach

- State is represented as an array of objects
- Each object is a game category, comprising a title and array of user-chosen items
- The algorithm iteratively builds a `deletedArray` array, and uses this to conditionally render the items in each category as crossed-out. (More details on the algorithm in the code comments.)

### Tech

- ReactJS on NextJS
- Typescript
- Tailwind
- (Deliberately no additional libraries)

### Instructions

- Clone the repo
- Install packages:

```script
yarn install
```

- Run:

```script
yarn run dev
```

### Known Limitations

- There are some horrible O(n<sup>2</sup>) list comparisons...
- Doesn't handle multiple identical entries
- Can't change or add new categories
- Really annoying `animate-ping` effects... 😎

### Alternative Ideas

- State layout:

  - Could possibly avoid some of the said horrible O(n<sup>2</sup>) list comparisons by changing the state structure for each option. Instead of just a string array, define a type (e.g. `string` + `boolean`) that is able to mark the items as inactive. Requires more thought...

- State machine:
  - Use a gameplay state machine to track the stages of the game
