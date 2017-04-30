
import { createPlatformFactory } from '@zuz/core';
import { platformCoreDynamic } from '@zuz/compiler';


export const platformBrowserDynamic = createPlatformFactory(platformCoreDynamic, 'platformDynamic');
