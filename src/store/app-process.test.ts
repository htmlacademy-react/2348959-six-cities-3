import {CITY_NAME} from '../const';
import {changeCity} from './action';
import {appProcess} from './app-process';

describe('AppProcess reducer', () => {
  it('should return initial state with Paris city', () => {
    const state = appProcess(undefined, {type: ''});

    expect(state.city).toBe(CITY_NAME.Paris);
  });

  it('should change city', () => {
    const state = appProcess(undefined, changeCity(CITY_NAME.Amsterdam));

    expect(state.city).toBe(CITY_NAME.Amsterdam);
  });
});
