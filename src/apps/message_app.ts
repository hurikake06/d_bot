export default class MessageApp{
  static appCheck = (text: string): boolean => {
    throw new Error('appCheck function has not been overwritten')
  }
  run = (text): string => {
    return text + '!!??'
  }
}