import BaseEntity from 'src/modules/common/domain/entity/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity({name: 'person'})
export default class Person extends BaseEntity {
  @Column({type: 'varchar', length: 120, name: 'name'})
  private _name: string;

  @Column({type: 'number', name: 'age'})
  private _age: number;

  constructor({name, age}) {
    super();
    if (age < 0)
      throw new Error('Invalid age');
    this._name = name;
    this._age = age;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get age(): number {
    return this._age;
  }

  set age(age: number) {
    if (age < 0)
      throw new Error('Invalid age');
    this._age = age;
  }
}