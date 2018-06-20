// const superScore = {
//   QB: ecr => parseFloat((0.0162 * Math.pow(ecr, 1.66) - 0.69).toFixed(2)),
//   RB: ecr => parseFloat((1.6912 * Math.pow(ecr, 0.9441) - 0.69).toFixed(2)),
//   WR: ecr => parseFloat((1.6912 * Math.pow(ecr, 0.9441) - 0.69).toFixed(2)),
//   TE: ecr => parseFloat((1.6912 * Math.pow(ecr, 0.9441) - 0.69).toFixed(2)),
// };

export default ({ pos, pick }) => {
  const newValue = pos === 'QB'
    ? Math.ceil((0.0162 * Math.pow(pick, 1.66) - 0.69))
    : Math.ceil((1.6912 * Math.pow(pick, 0.9441) - 0.69));
  return newValue < 1 ? 1 : newValue;
}

