import { LINE_TOKEN, LINE_URL } from './env'
import Thread from './thread'
import ThreadManager from './thread_manager'

const messageWithSuffix = (message: string): any => {
  return { 'type': 'text', 'text': message + '!?' }
}

const doPost = (e) => {
  let replyToken = JSON.parse(e.postData.contents).events[0].replyToken
  let userMessage = JSON.parse(e.postData.contents).events[0].message.text

  let header = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + LINE_TOKEN,
  }

  let thread: Thread = ThreadManager.getThread({ token: 'aa', text: userMessage })
  let messages = [thread.next_result()]

  UrlFetchApp.fetch(LINE_URL, {
    'headers': header,
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': messages,
    }),
  })

  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON)
}