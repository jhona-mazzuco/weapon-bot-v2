import { Injectable, Logger } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { FixupDto } from '../../dto/FixupDto';

@Injectable()
export class FixupCommands {
  private readonly logger = new Logger(FixupCommands.name);

  @SlashCommand({
    name: 'fx',
    description: 'Altera a URL do tweet para melhor visualização no Discord',
  })
  public async onFixupURL(
    @Context() [interaction]: SlashCommandContext,
    @Options() { url }: FixupDto,
  ) {
    try {
      const handleUrl = new URL(url);
      const isValid = ['x.com', 'fxtwitter.com'].includes(handleUrl.hostname);
      if (!isValid) {
        throw new Error('Not a valid URL');
      }

      return interaction.reply(`https://fxtwitter.com${handleUrl.pathname}/pt`);
    } catch (error) {
      this.logger.error(error.message);
      return interaction.reply({ content: 'Link inválido!' });
    }
  }
}
