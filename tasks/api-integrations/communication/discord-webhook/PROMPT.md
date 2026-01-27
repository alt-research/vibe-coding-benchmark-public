# Task: Discord Webhook Notifications

## Objective
Send rich notifications to Discord channels via webhooks.

## Requirements

1. **Message Types**
   - Plain text messages
   - Rich embeds
   - Multiple embeds
   - File attachments

2. **Embed Features**
   - Title and description
   - Color coding
   - Fields (inline/block)
   - Thumbnail and image
   - Footer with timestamp

3. **API**
   - `POST /discord/send` - Send message
   - `POST /discord/embed` - Send embed
   - Webhook URL management
   - Rate limit handling

4. **Templates**
   - Alert template (red)
   - Success template (green)
   - Info template (blue)
   - Custom templates

## Files to Create
- `internal/discord/client.go` - Discord client
- `internal/discord/embeds.go` - Embed builder
- `internal/discord/templates.go` - Templates
- `internal/handlers/discord.go` - HTTP handlers

## Success Criteria
- [ ] Messages send correctly
- [ ] Embeds render properly
- [ ] Rate limits handled
- [ ] Templates work
- [ ] Attachments upload
