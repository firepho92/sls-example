import BaseEntity from 'src/modules/common/domain/entity/BaseEntity';
import { Entity } from 'typeorm';
import Person from './Person';

@Entity({name: 'couple'})
export default class Couple extends BaseEntity {
  private _principal: Person;
  private _companion: Person;

  constructor(principal: Person, companion: Person) {
    super();
    if (principal.age < 18 && companion.age < 18)
      throw new Error('')
    this._principal = principal;
    this._companion = companion;
  }

  get principal(): Person {
    return this._principal;
  }

  set principal(principal: Person) {
    if (principal.age < 18)
      throw new Error('Minors not allowed');
    this._principal = principal;
  }

  get companion(): Person {
    return this._companion;
  }

  set companion(companion: Person) {
    if (companion.age < 18)
      throw new Error('Minors not allowed');
    this._companion = companion;
  }
}