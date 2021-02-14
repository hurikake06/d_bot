import Thread from './lib/thread'
import { InputMessage, LineMessage } from './@types'

const doGet = (e) => {
  e = e || { parameter: { userId: 'sample_user_id', replyToken: 'sample_token', text: 'sample_text' }}

  let inputMessage: InputMessage = {
    userId: e.parameter.userId || 'sample_user_id',
    replyToken: e.parameter.replyToken || 'sample_token',
    text: e.parameter.text || 'sample_text'
  }

  let thread: Thread = Thread.updateOrCreate(inputMessage)
  let result: LineMessage = thread.next_result()

  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON)
}