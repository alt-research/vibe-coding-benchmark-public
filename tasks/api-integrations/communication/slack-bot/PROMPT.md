# Task: Slack Bot with Commands

## Objective
Build a Slack app with slash commands, interactive messages, and notifications.

## Requirements

1. **Slash Commands**
   - `/status` - Get system status
   - `/create-ticket` - Open modal
   - `/search` - Search and respond

2. **Interactive**
   - Button actions
   - Modal submissions
   - Select menus
   - Message updates

3. **Notifications**
   - Post to channel
   - Direct messages
   - Rich message formatting
   - Scheduled messages

4. **Authentication**
   - OAuth installation flow
   - Token storage per workspace
   - Request verification

## Files to Create
- `src/slack/app.ts` - Slack app setup
- `src/slack/commands.ts` - Slash commands
- `src/slack/interactions.ts` - Interactive handlers
- `src/slack/messages.ts` - Message sending
- `src/routes/slack.ts` - Event endpoints

## Success Criteria
- [ ] Commands respond correctly
- [ ] Modals open and submit
- [ ] Buttons trigger actions
- [ ] Messages post to channels
- [ ] Request signatures verified
