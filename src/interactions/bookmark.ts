/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import {
  ActionRowBuilder,
  type ButtonBuilder,
  type MessageContextMenuCommandInteraction,
} from "discord.js";
import { addNote } from "../buttons/addNote.js";
import { discord } from "../buttons/discord.js";
import { donate } from "../buttons/donate.js";
import { logger } from "../utils/logger.js";

/**
 * Bookmarks the target message by sending the user a DM with the message link.
 * Includes buttons for adding a note and for our Discord and donation links.
 * @param interaction - The interaction to handle.
 */
export const bookmark = async(
  interaction: MessageContextMenuCommandInteraction,
): Promise<void> => {
  await interaction.deferReply({ ephemeral: true });

  const { user, targetMessage } = interaction;

  const success = await user.
    send({
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          addNote,
          discord,
          donate,
        ),
      ],
      content: targetMessage.url,
    }).
    catch(() => {
      return null;
    });

  if (success === null) {
    await interaction.editReply({
      content: "❌ I couldn't send you a DM! Do you have DMs disabled?",
    });
    return;
  }

  await interaction.editReply({
    content: "✅ I've sent you a DM with the message link!",
  });
  await logger.metric("bookmarks", 1, { user: user.id });
};
