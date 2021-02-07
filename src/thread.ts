import { InputMessage, OutputMessage } from './types'
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

  static findOrCreate = (message: InputMessage): Thread => Thread.findBy(message) || Thread.create(message)
  static findBy = (message: InputMessage): Thread => null
  static create = (message: InputMessage): Thread => new Thread(message)

  static selectApp = (text: string): MessageApp => {
    let appClass = MessageApp
    if(SummonFreakApp.appCheck(text)){
      appClass = SummonFreakApp
    }

    return new appClass()
  }

  next_result = (): OutputMessage => {
    let text: string = this.currentApp.run(this.lastedText)
    return { type: 'text', text: text }
  }
}