/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import {
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle,
} from "discord.js";

const row = new ActionRowBuilder<TextInputBuilder>().addComponents(
  new TextInputBuilder().
    setCustomId("textinput").
    setLabel("What would you like to note down?").
    setStyle(TextInputStyle.Paragraph).
    setMaxLength(1000).
    setMinLength(1).
    setRequired(true),
);

export const note = new ModalBuilder().
  setCustomId("note").
  setTitle("Add a note to your bookmark!").
  addComponents(row);
