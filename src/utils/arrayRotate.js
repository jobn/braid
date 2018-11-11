const arrayRotateForward = (subjects, current) => {
  const position = subjects.indexOf(current);

  if (position === -1 || position === subjects.length - 1) {
    return subjects[0];
  }
  return subjects[position + 1];
};

const arrayRotateBackward = (subjects, current) => {
  const position = subjects.indexOf(current);

  if (position === -1 || position === 0) {
    return subjects[subjects.length - 1];
  }
  return subjects[position - 1];
};

export { arrayRotateForward, arrayRotateBackward };
