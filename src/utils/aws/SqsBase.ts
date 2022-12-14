import SqsMessage from "src/modules/common/domain/dto/SqsMessage";

export default interface SqsBase {
  sendMessage(sqsMessage: SqsMessage): Promise<any>;
}