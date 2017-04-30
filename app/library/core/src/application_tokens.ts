

import { InjectionToken } from './di/injection_token';

export const PLATFORM_INITIALIZER = new InjectionToken<Array<() => void>>('Platform Initializer');


export const PLATFORM_ID = new InjectionToken<Object>('Platform ID');
