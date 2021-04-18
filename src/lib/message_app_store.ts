import env from './env'
import { MessageApp, LineTextMessage } from '../@types'

export default class MessageAppStore {
  // mode管理対象
  static modeNames: string[] = ['ModifierGame', 'SummonFreakApp', 'MatchMeshi']

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
    },
    {
      name: 'MatchMeshi',
      check: (text: string): boolean => !!text.match(/まち飯/g),
      run: (text: string): LineTextMessage => {
        if(!!text.match(/まち飯/g)) { return { type: 'text', text: 'あなたの町の隠れた名店を検索！！\n検索したいキーワードを入力してね（ex: 中華, パスタ）' } }
        return MessageAppStore.fetchApp(env('URL/MATCH_MESHI'), text)
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