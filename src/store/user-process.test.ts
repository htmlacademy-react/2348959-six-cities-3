import {AUTHORIZATION_STATUS} from '../const';
import {requireAuthorization} from './action';
import {userProcess} from './user-process';

describe('UserProcess reducer', () => {
  it('should return initial authorization status', () => {
    const state = userProcess(undefined, {type: ''});

    expect(state.authorizationStatus).toBe(AUTHORIZATION_STATUS.Unknown);
  });

  it('should set authorization status', () => {
    const state = userProcess(undefined, requireAuthorization(AUTHORIZATION_STATUS.Auth));

    expect(state.authorizationStatus).toBe(AUTHORIZATION_STATUS.Auth);
  });
});
