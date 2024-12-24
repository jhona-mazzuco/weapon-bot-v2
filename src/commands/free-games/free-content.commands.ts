import { Injectable, Logger, UseInterceptors } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { FreeContentService } from '../../services/free-content/free-content.service';
import { EmbedBuilder } from 'discord.js';
import { GiveawayDto } from '../../dto/GiveawayDto';
import { GiveawayTypeAutocompleteInterceptor } from '../../autocompletes/giveaway-type.interceptor';

@Injectable()
export class FreeContentCommands {
  private readonly logger = new Logger(FreeContentCommands.name);

  constructor(private _service: FreeContentService) {}

  @UseInterceptors(GiveawayTypeAutocompleteInterceptor)
  @SlashCommand({
    name: 'giveaways',
    description: "Lista de jogos e DLC's gratuitos",
  })
  public async onGiveaways(
    @Context() [interaction]: SlashCommandContext,
    @Options() { type }: GiveawayDto,
  ) {
    try {
      const giveaways = await this._service.getGiveways(type);
      let isFollowUp = false;
      for (const giveaway of giveaways) {
        const embed = new EmbedBuilder()
          .setTitle(giveaway.title)
          .setDescription(giveaway.description)
          .setURL(giveaway.open_giveaway_url)
          .setImage(giveaway.thumbnail)
          .addFields({ name: 'Plataformas:', value: giveaway.platforms })
          .addFields({ name: 'Publicado em:', value: giveaway.published_date })
          .addFields({ name: 'Expire em', value: giveaway.end_date });

        if (isFollowUp) {
          await interaction.followUp({ embeds: [embed], ephemeral: true });
        } else {
          await interaction.reply({ embeds: [embed], ephemeral: true });
          isFollowUp = true;
        }
      }
    } catch (error) {
      this.logger.error(error);
      await interaction.reply({
        content: 'Não consegui buscar os conteúdos gratuitos!',
      });
    }
  }
}
