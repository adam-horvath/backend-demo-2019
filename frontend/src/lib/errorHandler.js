export default ({ dispatch }) => next => action => {
  return Promise.resolve(next(action)).catch(err => {
    throw err;
  });
};
