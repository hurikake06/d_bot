import { InputMessage, MessageApp } from './types'

export default class MessageAppShop{
  static defaultApp: MessageApp = {
    id: 0,
    name: 'defaultApp',
    check: (text: string) => true,
    run: (text: string) => text + '!!??'
  }

  static messageApps: MessageApp[] = [
    { id: 1,
      name: 'summonFreakApp',
      check: (text: string) => !!text.match(/.+(\s召喚)$/g),
      run: (text: string) => text.replace(/(\s召喚)$/g, '') + ' サーモン食べたい'
    }
  ]

  static getAppByInputText = (text: string): MessageApp => {
    return MessageAppShop.messageApps.find(app => app.check(text)) || MessageAppShop.defaultApp
  }
}