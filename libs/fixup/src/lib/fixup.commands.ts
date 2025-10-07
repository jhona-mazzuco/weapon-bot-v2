import { Injectable, Logger } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { FixupDto } from './fixup.dto';

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
        'xcancel.com',
        'fxtwitter.com',
        'vxtwitter.com',
        'twittpr.com',
        'twitter.com',
        'fixupx.com',
        'fixvx.com',
        'instagram.com',
        'instagramez.com',
        'bsky.app',
      ].includes(handleUrl.hostname.replace('www.', ''));
      if (!isValid) {
        throw new Error(`Invalid URL: ${url}`);
      }

      const isBlueSky = handleUrl.hostname.includes('bsky');
      if (isBlueSky) {
        return interaction.reply(`https://vxsky.app${handleUrl.pathname}`);
      }

      const isInstagram = handleUrl.hostname.includes('instagram');
      if (isInstagram) {
        return interaction.reply(
          `https://instagramez.com${handleUrl.pathname}`,
        );
      }

      return interaction.reply(
        `https://fxtwitter.com${handleUrl.pathname.replace('/pt', '')}/pt`,
      );
    } catch (error) {
      this.logger.error((error as Error).message);
      return interaction.reply({
        content:
          'Por favor insira um link válido, caso deveria funcionar avise os dos moderadores!',
      });
    }
  }
}
