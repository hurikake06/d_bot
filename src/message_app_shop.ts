import env from './env'
import { InputMessage, MessageApp } from './types'

export default class MessageAppShop {
  static defaultApp: MessageApp = {
    id: 0,
    name: 'defaultApp',
    check: (text: string) => true,
    run: (text: string) => { return { type: 'text', text: (text + '!!??') } }
  }

  static messageApps: MessageApp[] = [
    { id: 1,
      name: 'SummonFreakApp',
      check: (text: string) => !!text.match(/.+(\s召喚)$/g),
      run: (text: string) => {
        return { type: 'text', text: (text.replace(/(\s召喚)$/g, '') + ' サーモン食べたい') }
      }
    },
    { id: 2,
      name: 'BakeryApp',
      check: (text: string) => !!text.match(/パン食べたい/g),
      run: (text: string) => MessageAppShop.fetchApp(env('BAKERY_URL'), text)
    }
  ]

  static fetchApp = (url: string, text: string) => {
    let response = UrlFetchApp.fetch(`${url}?text=${text}`)
    return JSON.parse(response.getContentText())
  }

  static getAppByInputText = (text: string): MessageApp => {
    return MessageAppShop.messageApps.find(app => app.check(text)) || MessageAppShop.defaultApp
  }
}