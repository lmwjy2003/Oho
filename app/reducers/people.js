import * as types from '../actions/actionTypes';

const people = [];

export default (state = people, action) => {
  switch (action.type) {
    case types.ADD_PEOPLE:
      return [...state, action.people];
    default:
      return state;
  }
};