import coupleDLQConsumer from './coupleDLQConsumer';
import validCoupleConsumer from './validCoupleConsumer';
import invalidCoupleConsumer from './invalidCoupleConsumer';

export default {
  validCoupleConsumer,
  invalidCoupleConsumer,
  coupleDLQConsumer
}

// 93cf440b-b3e4-49e0-9cc6-2733ec5385b9	arn:aws:lambda:us-east-1:427784172992:function:dev-sqs-invalid-couple-consumer