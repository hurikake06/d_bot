import Thread from './thread'
import ThreadManager from './thread_manager'

const doGet = (e) => {
  e = e || { parameter: { token: 'sample_token', text: 'sample_text' }}
  let token = e.parameter.token || 'sample_token'
  let text = e.parameter.text || 'sample_text'

  let thread: Thread = ThreadManager.getThread({ token: token, text: text })
  let result = thread.next_result()

  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON)
}