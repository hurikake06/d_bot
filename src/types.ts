export interface InputMessage {
  token: string,
  text: string
}
export interface OutputMessage {
  type: string,
  text: string
}
export interface MessageApp {
  id: number,
  name: string,
  check(text: string): boolean,
  run(text: string): any,
}