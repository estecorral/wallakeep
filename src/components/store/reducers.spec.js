import * as types from './types';
import * as reducers from './reducers';

describe('reducers', () => {
   it('should Setuser reducer', () => {
      const initialState = {};
      const action = {
          type: types.SET_USER,
          user: {name: 'yo', surname: 'mismo'},
      };
      const expectState = {name: 'yo', surname: 'mismo'};
      expect(reducers.user(initialState, action)).toEqual(expectState);
   });
});