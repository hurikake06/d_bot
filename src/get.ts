import Thread from './thread'
import { InputMessage, OutputMessage } from './types'

const doGet = (e) => {
  e = e || { parameter: { token: 'sample_token', text: 'sample_text' }}

  let inputMessage: InputMessage = {
    token: e.parameter.token || 'sample_token',
    text: e.parameter.text || 'sample_text'
  }

  let thread: Thread = Thread.findOrCreate(inputMessage)
  let result: OutputMessage = thread.next_result()

  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON)
}