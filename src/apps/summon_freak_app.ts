import MessageApp from './message_app'

export default class SummonFreakApp extends MessageApp{
  static appCheck = (text: string): boolean => {
    const regex = /.+(\s召喚)$/g
    return !!text.match(regex)
  }

  run = (text): string => {
    return text.replace(/(\s召喚)$/g, '') + ' サーモン食べたい'
  }
}