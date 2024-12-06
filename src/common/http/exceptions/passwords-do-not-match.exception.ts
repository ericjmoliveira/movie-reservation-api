import { UnprocessableEntityException } from '@nestjs/common';

export class PasswordsDoNotMatchException extends UnprocessableEntityException {
  constructor() {
    super('The passwords do not match.');
  }
}
