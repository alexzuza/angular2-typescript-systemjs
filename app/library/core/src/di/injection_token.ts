

export class OpaqueToken {
  constructor(protected _desc: string) {}

  toString(): string {
    return `Token ${this._desc}`;
  }
}

export class InjectionToken<T> extends OpaqueToken{

  constructor(desc: string) {
    super(desc);
  }

  toString(): string {
    return `Injection token ${this._desc}`;
  }
}
