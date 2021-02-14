import env from './lib/env'
import { InputMessage, LineMessage } from './@types'
import Thread from './lib/thread'

const doPost = (e) => {
  let replyToken: string = JSON.parse(e.postData.contents).events[0].replyToken
  let userMessage: string = JSON.parse(e.postData.contents).events[0].message.text
  let inputMessage: InputMessage = { token: replyToken, text: userMessage }
  let thread: Thread = Thread.updateOrCreate(inputMessage)
  let messages: LineMessage[] = [thread.next_result()]

  UrlFetchApp.fetch(env('URL/LINE'), {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + env('TOKEN/LINE'),
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': messages,
    }),
  })

  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON)
}