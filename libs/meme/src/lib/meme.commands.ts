import { Injectable, Logger } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { MemeService } from './meme.service';

@Injectable()
export class MemeCommands {
  private readonly logger = new Logger(MemeCommands.name);

  constructor(private readonly service: MemeService) {}

  @SlashCommand({
    name: 'konservaroço',
    description: 'Solta uma frase do Kakaroço no dia menos conservador',
  })
  public async onKonservarocoMessage(
    @Context() [interaction]: SlashCommandContext,
  ) {
    try {
      const meme = await this.service.getKonservarocoMeme();
      const embed = this.service.buildEmbed(meme);
      return interaction
        .deferReply()
        .then(() => interaction.editReply({ embeds: [embed] }));
    } catch (e) {
      this.logger.error((e as Error).message);
      return interaction.reply({
        content: 'Desculpe mas não consegui pensar em uma frase agora.',
      });
    }
  }

  @SlashCommand({
    name: 'caishit',
    description: 'Solta uma frase que só um caishit diria.',
  })
  public async onCaishitMessage(@Context() [interaction]: SlashCommandContext) {
    try {
      const meme = await this.service.getCaishitMeme();
      const embed = this.service.buildEmbed(meme);
      return interaction
        .deferReply()
        .then(() => interaction.editReply({ embeds: [embed] }));
    } catch (e) {
      this.logger.error((e as Error).message);
      return interaction.reply({
        content: 'Desculpe mas não consegui pensar em uma frase agora.',
      });
    }
  }

  @SlashCommand({
    name: 'sonhysta',
    description: 'Solta uma frase que só um sonysta iludido diria.',
  })
  public async onSonhystaMessage(
    @Context() [interaction]: SlashCommandContext,
  ) {
    try {
      const meme = await this.service.getSonhystaMeme();
      const embed = this.service.buildEmbed(meme);
      return interaction
        .deferReply()
        .then(() => interaction.editReply({ embeds: [embed] }));
    } catch (e) {
      this.logger.error((e as Error).message);
      return interaction.reply({
        content: 'Desculpe mas não consegui pensar em uma frase agora.',
      });
    }
  }

  @SlashCommand({
    name: 'metendo',
    description: 'Solta uma frase que só um fodido pela metendo diria.',
  })
  public async onMetendistaMessage(
    @Context() [interaction]: SlashCommandContext,
  ) {
    try {
      const meme = await this.service.getMetendoMeme();
      const embed = this.service.buildEmbed(meme);
      return interaction
        .deferReply()
        .then(() => interaction.editReply({ embeds: [embed] }));
    } catch (e) {
      this.logger.error((e as Error).message);
      return interaction.reply({
        content: 'Desculpe mas não consegui pensar em uma frase agora.',
      });
    }
  }

  @SlashCommand({
    name: 'valvecuck',
    description: 'Solta uma frase que só um pczista safado diria.',
  })
  public async onValvecuckMessage(
    @Context() [interaction]: SlashCommandContext,
  ) {
    try {
      const meme = await this.service.getValvecuckMeme();
      const embed = this.service.buildEmbed(meme);
      return interaction
        .deferReply()
        .then(() => interaction.editReply({ embeds: [embed] }));
    } catch (e) {
      this.logger.error((e as Error).message);
      return interaction.reply({
        content: 'Desculpe mas não consegui pensar em uma frase agora.',
      });
    }
  }

  @SlashCommand({
    name: 'wokenaro',
    description: 'Solta uma frase que só um pczista safado diria.',
  })
  public async onWokenaroMessage(
    @Context() [interaction]: SlashCommandContext,
  ) {
    try {
      const meme = await this.service.getWokenaroMeme();
      const embed = this.service.buildEmbed(meme);
      return interaction
        .deferReply()
        .then(() => interaction.editReply({ embeds: [embed] }));
    } catch (e) {
      this.logger.error((e as Error).message);
      return interaction.reply({
        content: 'Desculpe mas não consegui pensar em uma frase agora.',
      });
    }
  }
}
