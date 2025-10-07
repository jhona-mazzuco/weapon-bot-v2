import { StringOption } from 'necord';

export class FixupDto {
  @StringOption({
    name: 'url',
    description: 'Insira o URL do tweet para transformar!',
    required: true,
  })
  url!: string;
}
