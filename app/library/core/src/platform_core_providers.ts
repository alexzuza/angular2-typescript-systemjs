


import { createPlatformFactory, PlatformRef, PlatformRef_ } from './application_ref';
import { Provider } from './di/provider';
import { PLATFORM_ID } from './application_tokens';
import { Reflector } from './reflection/reflector';
import { reflector } from './reflection/reflection';

function _reflector(): Reflector {
  return reflector;
}
const _CORE_PLATFORM_PROVIDERS: Provider[] = [
  { provide: PLATFORM_ID, useValue: 'unknown' },
  PlatformRef_,
  { provide: PlatformRef, useExisting: PlatformRef_ }
];
export const platformCore = createPlatformFactory(null, 'core', _CORE_PLATFORM_PROVIDERS);
