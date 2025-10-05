import {
  ApplicationCommandType,
  ApplicationIntegrationType,
  ContextMenuCommandBuilder,
  InteractionContextType,
  InteractionType,
} from "discord.js";

const bookmark = new ContextMenuCommandBuilder()
  .setType(ApplicationCommandType.Message)
  .setName("Bookmark")
  .setContexts(
    InteractionContextType.Guild,
    InteractionContextType.PrivateChannel
  )
  .setIntegrationTypes(ApplicationIntegrationType.UserInstall);
const deleteCmd = new ContextMenuCommandBuilder()
  .setType(ApplicationCommandType.Message)
  .setName("Delete")
  .setContexts(InteractionContextType.BotDM)
  .setIntegrationTypes(ApplicationIntegrationType.UserInstall);

console.log(JSON.stringify([bookmark.toJSON(), deleteCmd.toJSON()]));
