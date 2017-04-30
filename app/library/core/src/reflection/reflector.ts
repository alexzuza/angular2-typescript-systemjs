
import { ReflectorReader } from './reflector_reader';
import { PlatformReflectionCapabilities } from './platform_reflection_capabilities';
import { Type } from '../type';

export class Reflector extends ReflectorReader {
  constructor(public reflectionCapabilities: PlatformReflectionCapabilities) {  super(); }

  factory(type: Type<any>): Function {
    return this.reflectionCapabilities.factory(type);
  }

  parameters(typeOrFunc: any): any[][] {
    return this.reflectionCapabilities.parameters(typeOrFunc);
  }

  annotations(typeOrFunc: any): any[] {
    // todo
    throw new Error('Method not implemented.');
  }

  propMetadata(typeOrFunc: any): { [key: string]: any[]; } {
    // todo
    throw new Error('Method not implemented.');
  }

  importUri(typeOfFunc: any): string | null {
    // todo
    throw new Error('Method not implemented.');
  }

  resourceUri(typeOrFunc: any): string {
    // todo
    throw new Error('Method not implemented.');
  }

  resolveIdentifier(name: string, moduleUrl: string, members: string[]|null, runtime: any): any {
    return this.reflectionCapabilities.resolveIdentifier(name, moduleUrl, members, runtime);
  }

  resolveEnum(identifier: any, name: string) {
    // todo
    throw new Error('Method not implemented.');
  }


}
