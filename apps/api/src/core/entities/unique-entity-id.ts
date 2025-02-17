import { randomUUID } from 'node:crypto';

class UniqueEntityId {
  private value: string;

  toString() {
    return this.value;
  }

  toValue() {
    return this.value;
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID();
  }

  equals(id: UniqueEntityId): boolean {
    return id.toValue() === this.value;
  }
}

export { UniqueEntityId };
