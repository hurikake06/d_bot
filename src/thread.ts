import { InputMessage, OutputMessage, MessageApp } from './@types'
import MessageAppStore from './message_app_store'

export default class Thread {
  token: string
  lastedText: string
  currentApp: MessageApp

  constructor(message: InputMessage) {
    this.token = message.token
    this.lastedText = message.text
    this.currentApp = MessageAppStore.getAppByInputText(message.text)
  }

  static findOrCreate = (message: InputMessage): Thread => Thread.findBy(message) || Thread.create(message)
  static findBy = (message: InputMessage): Thread => null
  static create = (message: InputMessage): Thread => new Thread(message)

  next_result = (): OutputMessage => {
    return this.currentApp.run(this.lastedText)
  }
}