import * as types from './actionTypes';

export const addPeople = (people) => {
  return {
    type: types.ADD_PEOPLE,
    people
  };
}