/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { ButtonBuilder, ButtonStyle } from "discord.js";

export const addNote = new ButtonBuilder().
  setLabel("Add Note").
  setStyle(ButtonStyle.Success).
  setCustomId("addNote");
