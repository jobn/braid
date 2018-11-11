const arrayRotate = (subjects, current) => {
  const position = subjects.indexOf(current);

  if (position === -1 || position === subjects.length - 1) {
    return subjects[0];
  }
  return subjects[position + 1];
};

export default arrayRotate;
