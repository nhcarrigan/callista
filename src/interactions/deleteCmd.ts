/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { logger } from "../utils/logger.js";
import type { MessageContextMenuCommandInteraction } from "discord.js";

/**
 * Deletes the target message of the interaction.
 * @param interaction - The interaction to handle.
 */
export const deleteCmd = async(
  interaction: MessageContextMenuCommandInteraction,
): Promise<void> => {
  await interaction.deferReply({ ephemeral: true });

  await interaction.targetMessage.delete();

  await interaction.editReply({
    content: "✅ I've deleted the target message!",
  });
  await logger.metric("bookmark", -1, { user: interaction.user.id });
};
