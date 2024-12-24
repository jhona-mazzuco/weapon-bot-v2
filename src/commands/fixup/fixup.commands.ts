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
      const isValid = [
        'x.com',
        'fxtwitter.com',
        'vxtwitter.com',
        'twittpr.com',
        'twitter.com',
        'fixupx.com',
      ].includes(handleUrl.hostname);
      if (!isValid) {
        throw new Error(`Not a valid URL: ${url}`);
      }

      return interaction.reply(
        `https://fixupx.com${handleUrl.pathname.replace('/pt', '')}/pt`,
      );
    } catch (error) {
      this.logger.error(error.message);
      return interaction.reply({
        content:
          'Por favor insira um link do X válido, caso deveria funcionar avisar os administradores!',
      });
    }
  }
}
