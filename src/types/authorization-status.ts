import {AUTHORIZATION_STATUS} from '../const';

type AuthorizationStatusType = typeof AUTHORIZATION_STATUS[keyof typeof AUTHORIZATION_STATUS];

export type {AuthorizationStatusType};
