export default (heightInInches) => {
  if (!heightInInches) return null;
  const feet = Math.floor(heightInInches / 12);
  const inches = heightInInches % 12;
  return `${feet}'${inches}`;
}
