const parseAmount = (amount: string) => {
  const floatAmount = parseFloat(amount);
  const roundedAmount = Math.round(floatAmount * 100) / 100;

  return roundedAmount;
};

export default parseAmount;
