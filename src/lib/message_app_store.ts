import env from './env'
import { MessageApp, LineTextMessage } from '../@types'

export default class MessageAppStore {
  // mode管理対象
  static modeNames: string[] = ['ModifierGame', 'SummonFreakApp']

  static defaultApp: MessageApp = {
    name: 'default',
    check: (text: string): boolean => true,
    run: (text: string): LineTextMessage => MessageAppStore.fetchApp(env('URL/MODIFIER_GAME'), text)
  }

  static messageApps: MessageApp[] = [
    { name: 'reset',
      check: (text: string): boolean => false,
      run: (text: string): LineTextMessage => {
        return { type: 'text', text: '==　リセットしました　==' }
      }
    },
    { name: 'default',
      check: (text: string): boolean => false,
      run: (text: string): LineTextMessage => {
        return { type: 'text', text: text }
      }
    },
    { name: 'SummonFreakApp',
      check: (text: string): boolean => !!text.match(/サモフリ/g),
      run: (text: string): LineTextMessage => {
        return MessageAppStore.fetchApp(env('URL/SUMMON_FREAK'), text)
      }
    },
    { name: 'BakeryApp',
      check: (text: string): boolean => !!text.match(/パン食べたい/g),
      run: (text: string): LineTextMessage => MessageAppStore.fetchApp(env('URL/BAKERY'), text)
    },
    {
      name: 'ModifierGame',
      check: (text: string): boolean => !!text.match(/修飾ゲーム/g),
      run: (text: string): LineTextMessage => {
        if(!!text.match(/修飾ゲーム/g)) { return { type: 'text', text: '修飾ゲームをスタートします！！' } }
        return MessageAppStore.fetchApp(env('URL/MODIFIER_GAME'), text)
      }
    }
  ]

  static fetchApp = (url: string, text: string) => {
    let response = UrlFetchApp.fetch(`${url}?text=${text}`)
    return JSON.parse(response.getContentText())
  }

  static findByName = (name: string) => {
    return MessageAppStore.messageApps.find((app) => app.name === name)
  }

  static getAppByInputText = (text: string): MessageApp => {
    return MessageAppStore.messageApps.find(app => app.check(text)) || MessageAppStore.findByName('default')
  }
}