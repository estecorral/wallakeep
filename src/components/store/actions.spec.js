import { setUser, fetchAdds } from './actions';
import * as Types from './types';
import * as API from '../../API/api'
jest.mock('../../API/api');

describe('actions', () => {
    describe('setUser', () => {
        it('should create a SET_USER action', () => {
            const user = {name: 'Yo', surname: 'mismo'};
            const expectedAction = {
                type: Types.SET_USER,
                user,
            };
            expect(setUser(user)).toEqual(expectedAction);
        });
    });
    describe('fetchAdds', () => {
       const adds = [1, 2, 3];
       const dispatch = jest.fn();
        API.getAds
           .mockResolvedValueOnce(adds);
        it('getAdds success', async () => {
            await fetchAdds('', '', '', '')(dispatch, undefined);
            expect(dispatch).toHaveBeenNthCalledWith(1, {
                type: Types.FETCH_ADDS_REQUEST,
            });
            expect(dispatch).toHaveBeenNthCalledWith(2, {
                type: Types.FETCH_ADDS_SUCCESS,
                adds,
            });
        });
    });
});
