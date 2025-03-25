import { StringOption } from 'necord';
import { Platform } from '../models/Platform';

export class PlatformDto {
  @StringOption({
    name: 'platform',
    description: 'Escolha a plataforma do ranking',
    autocomplete: true,
    required: true,
  })
  platform: Platform;
}
