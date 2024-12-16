import { Injectable } from '@nestjs/common';

@Injectable()
export class MemeService {
  private _getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomMessage(messages: string[]) {
    const idx = this._getRandomInt(0, messages.length - 1);
    return messages.at(idx);
  }
}
