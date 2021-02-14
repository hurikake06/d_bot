import env from './env'
import { InputMessage, LineMessage, MessageApp } from '../@types'
import MessageAppStore from './message_app_store'

interface ThreadParams extends InputMessage {
  currentApp?: string,
  createdAt?: Date,
  updatedAt?: Date,
}

export default class Thread {
  private static sheet = SpreadsheetApp.openById(env('SS_ID/DB')).getSheetByName(env('SS_NAME/THREADS'))
  userId: string
  replyToken: string
  text: string
  currentApp: MessageApp
  createdAt: Date
  updatedAt: Date

  constructor(params: ThreadParams) {
    this.userId = params.userId || ''
    this.replyToken = params.replyToken || ''
    this.text = params.text || ''
    this.currentApp = MessageAppStore.getAppByInputText(this.text)
    this.createdAt = params.createdAt || new Date()
    this.updatedAt = params.updatedAt || new Date()
  }

  static all = (): Thread[] => {
    const lastRow = Thread.sheet.getRange('A:A').getValues().filter(String).length
    let values = Thread.sheet.getRange(2, 1, lastRow - 1, 6).getValues()

    return values.map((value) => new Thread({userId: value[0], replyToken: value[1], text: value[2], createdAt: value[4], updatedAt: value[5]}))
  }

  static updateOrCreate = (params: ThreadParams): Thread => {
    let thread = Thread.findByUserId(params.userId)
    if(thread) {
      thread.replyToken = params.replyToken
      thread.text = params.text
      return thread.update()
    } else {
      return Thread.create(params)
    }
  }

  static findByUserId = (userId: string): Thread => Thread.all().find(thread => thread.userId === userId)

  static indexByUserId = (userId: string): number => {
    let index = Thread.sheet.getRange('A:A').getValues().findIndex(value => value[0] === userId)
    return index ? index + 1 : undefined
  }

  static create = (params: ThreadParams): Thread => {
    let thread =  new Thread(params)
    let row = Thread.sheet.getRange('A:A').getValues().filter(String).length + 1
    thread.save(row)
    return thread
  }

  save = (row: number): void => {
    let values = [
      [this.userId, this.replyToken, this.text, 'App', this.createdAt, this.updatedAt ]
    ]
    Thread.sheet.getRange(row, 1, 1, 6).setValues(values)
  }

  update = (): Thread => {
    this.updatedAt = new Date()
    let row = Thread.indexByUserId(this.userId)
    this.save(row)
    return this
  }

  next_result = (): LineMessage => {
    return this.currentApp.run(this.text)
  }
}