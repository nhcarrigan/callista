/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { ButtonBuilder, ButtonStyle } from "discord.js";

export const editNote = new ButtonBuilder().
  setLabel("Edit Note").
  setStyle(ButtonStyle.Success).
  setCustomId("editNote");
