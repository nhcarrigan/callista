/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { ButtonBuilder, ButtonStyle } from "discord.js";

export const discord = new ButtonBuilder().
  setLabel("Join our Discord").
  setStyle(ButtonStyle.Link).
  setURL("https://chat.nhcarrigan.com");
