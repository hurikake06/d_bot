import { InputMessage } from './types'
import MessageApp from './apps/message_app'
import SummonFreakApp from './apps/summon_freak_app'

export default class Thread {
  token: string
  lastedText: string
  currentApp: MessageApp

  constructor(message: InputMessage) {
    this.token = message.token
    this.lastedText = message.text
    this.currentApp = Thread.selectApp(message.text)
  }

  static selectApp = (text: string): MessageApp => {
    let appClass = MessageApp
    if(SummonFreakApp.appCheck(text)){
      appClass = SummonFreakApp
    }

    return new appClass()
  }

  next_result = () => {
    let text: string = this.currentApp.run(this.lastedText)
    return { type: 'text', text: text }
  }
}