import BaseMapper from 'src/modules/common/domain/mapper/BaseMapper';
import PersonDto from '../dto/PersonDto';
import Person from '../entity/Person';

export default class PersonMapper extends BaseMapper<Person, PersonDto> {
  protected transform(entity: Person): PersonDto {
    console.log('PersonMapper', entity)
    return {
      name: entity.name,
      age: entity.age
    }
  }
}