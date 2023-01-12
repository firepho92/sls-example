import BaseEntity from 'src/modules/common/domain/entity/BaseEntity';
import { Entity, ManyToOne } from 'typeorm';
import Person from './Person';

@Entity({name: 'couple'})
export default class Couple extends BaseEntity {
  @ManyToOne(() => Person, (person) => person.principal)
  principal: Person;

  @ManyToOne(() => Person, (person) => person.companion)
  companion: Person;

  constructor(principal: Person, companion: Person) {
    super();
    if (principal?.age < 18 || companion?.age < 18)
      throw new Error('Couple participants must be adults');
    this.principal = principal;
    this.companion = companion;
  }
}