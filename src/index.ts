/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import {
  ActionRowBuilder,
  Client,
  Events,
  type BaseInteraction,
  type ButtonBuilder,
} from "discord.js";
import { discord } from "./buttons/discord.js";
import { donate } from "./buttons/donate.js";
import { editNote } from "./buttons/editNote.js";
import { bookmark } from "./interactions/bookmark.js";
import { deleteCmd } from "./interactions/deleteCmd.js";
import { note } from "./modals/note.js";
import { logger } from "./utils/logger.js";

const callista = new Client({
  intents: [],
});

// eslint-disable-next-line max-statements, complexity, max-lines-per-function -- Reason: It's fine like this
const handleInteraction = async(
  interaction: BaseInteraction,
): Promise<void> => {
  if (interaction.isButton()) {
    if (!interaction.channel) {
      await callista.channels.fetch(interaction.channelId);
    }
    if (interaction.customId === "addNote") {
      await interaction.showModal(note);
      return;
    }
    if (interaction.customId === "editNote") {
      await interaction.showModal(note);
      return;
    }
  }
  if (interaction.isModalSubmit()) {
    await interaction.deferReply({ ephemeral: true });
    const { message, fields } = interaction;
    if (!message) {
      await interaction.reply({
        content:
          "Sorry, but there is not a message associated with this modal.",
        ephemeral: true,
      });
      return;
    }
    const noteInput = fields.getTextInputValue("textinput");
    await message.edit({
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          editNote,
          discord,
          donate,
        ),
      ],
      content: `${
        message.content.split("---").at(0)?.
          trim() ?? "Message link lost"
      }\n\n---\n\n${noteInput}`,
    });
    await interaction.editReply({
      content: "✅ Note set!",
    });
  }
  if (interaction.isMessageContextMenuCommand()) {
    if (interaction.commandName === "Bookmark") {
      await bookmark(interaction);
      return;
    }
    if (interaction.commandName === "Delete") {
      await deleteCmd(interaction);
    }
  }
};

callista.once("ready", () => {
  void logger.log("debug", "Callista is online!");
});

callista.on(Events.InteractionCreate, (interaction) => {
  void handleInteraction(interaction);
});

await callista.login(process.env.BOT_TOKEN);
