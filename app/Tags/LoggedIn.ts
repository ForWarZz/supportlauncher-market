import { TagContract } from '@ioc:Adonis/Core/View'

export const LoggedInTag: TagContract = {
  tagName: 'loggedIn',
  block: true,
  seekable: false,
  compile(parser, buffer, token) {
    buffer.writeStatement(`if (state.auth.isLoggedIn) {`, token.filename, token.loc.start.line)
    token.children.forEach((child) => parser.processToken(child, buffer))
    buffer.writeStatement('}', token.filename, -1)
  },
}
