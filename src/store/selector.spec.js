import {getAd, getUserSession} from './selectors';

const state = {
    add: {
        tags: ['mobile'],
        _id: '1',
        name: 'XBOX OneX',
        price: 230,
        description: 'Vendo XBOX One',
        type: 'buy',
        photo: 'img.jpg',
    },
    user: {
        name: 'Yo',
        surname: 'Mismo'
    }
};
describe('selectors', () => {
    it('should getAd by ID',  () => {
        const ad = {
                tags: ['mobile'],
                _id: '1',
                name: 'XBOX OneX',
                price: 230,
                description: 'Vendo XBOX One',
                type: 'buy',
                photo: 'img.jpg',
            };
        expect(getAd(state)).toEqual(ad);
    });

    it('should set session', () => {
       const session = {
           name: 'Yo',
           surname: 'Mismo'
       };
       expect(getUserSession(state)).toEqual(session);
    });
});
