import { TagContract } from '@ioc:Adonis/Core/View'

export const GuestTag: TagContract = {
  tagName: 'guest',
  block: true,
  seekable: false,
  compile(parser, buffer, token) {
    buffer.writeStatement(`if (state.auth.isGuest) {`, token.filename, token.loc.start.line)
    token.children.forEach((child) => parser.processToken(child, buffer))
    buffer.writeStatement('}', token.filename, -1)
  },
}
