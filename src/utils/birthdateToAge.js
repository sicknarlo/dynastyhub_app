export default (birthdate) => {
  if (!birthdate) return null;
  const today = new Date();
  const date = new Date(birthdate);
  let age = today.getFullYear() - date.getFullYear();
  const m = today.getMonth() - date.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < date.getDate()))
  {
    age--;
  }
  return age;
}
