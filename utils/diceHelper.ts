export const generateRandomDiceRoll = (sides: number) => {
  return Math.floor(Math.random() * sides) + 1;
};
