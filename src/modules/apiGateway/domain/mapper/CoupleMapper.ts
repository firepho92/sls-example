import BaseMapper from '../../../../../src/modules/common/domain/mapper/BaseMapper';
import CoupleDto from '../dto/CoupleDto';
import Couple from '../entity/Couple';
import PersonMapper from './PersonMapper';

export default class CoupleMapper extends BaseMapper<Couple, CoupleDto> {
  protected transform(entity: Couple): CoupleDto {
    console.log('CoupleMapper', entity);
    return {
      principal: new PersonMapper().execute(entity.principal),
      companion: new PersonMapper().execute(entity.companion)
    }
  }
}