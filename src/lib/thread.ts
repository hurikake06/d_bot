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
  token: string
  text: string
  currentApp: MessageApp
  createdAt: Date
  updatedAt: Date

  constructor(params: ThreadParams) {
    this.token = params.token || ''
    this.text = params.text || ''
    this.currentApp = MessageAppStore.getAppByInputText(this.text)
    this.createdAt = params.createdAt || new Date()
    this.updatedAt = params.updatedAt || new Date()
  }

  static updateOrCreate = (params: ThreadParams): Thread => {
    let thread = Thread.findByToken(params.token)
    if(thread) {
      return thread.update()
    } else {
      return Thread.create(params)
    }
  }
  static findByToken = (token: string): Thread => Thread.all().find(thread => thread.token === token)
  static indexByToken = (token: string): number => {
    let index = Thread.sheet.getRange('C:C').getValues().findIndex(value => value[0] === token)
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
      [this.createdAt, this.updatedAt, this.token, this.text, 'App' ]
    ]
    Thread.sheet.getRange(row, 1, 1, 5).setValues(values)
  }

  update = (): Thread => {
    this.updatedAt = new Date()
    let row = Thread.indexByToken(this.token)
    this.save(row)
    return this
  }


  static all = (): Thread[] => {
    const lastRow = Thread.sheet.getRange('A:A').getValues().filter(String).length
    let values = Thread.sheet.getRange(2, 1, lastRow - 1, 5).getValues()

    return values.map((value) => new Thread({token: value[2], text: value[3], createdAt: value[0], updatedAt: value[1]}))
  }

  next_result = (): LineMessage => {
    return this.currentApp.run(this.text)
  }
}