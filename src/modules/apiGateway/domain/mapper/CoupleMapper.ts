import BaseMapper from '../../../../../src/modules/common/domain/mapper/BaseMapper';
import CoupleDto from '../dto/CoupleDto';
import Couple from '../entity/Couple';
import PersonMapper from './PersonMapper';

export default class CoupleMapper extends BaseMapper<Couple, CoupleDto> {
  constructor() {
    super();
  }

  protected execute(entity: Couple): CoupleDto {
    return {
      principal: new PersonMapper().transform(entity.principal),
      companion: new PersonMapper().transform(entity.companion)
    }
  }
}