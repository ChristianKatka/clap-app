export const removeLastThreeDigitsOfaNumber = (number: number) => {
  return (number - (number % 1000)) / 1000;
};
