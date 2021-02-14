export interface MessageApp {
  name: string,
  check(text: string): boolean,
  run(text: string): LineMessage,
}

export interface InputMessage {
  userId: string,
  replyToken: string,
  text: string
}

export type LineMessage = LineTextMessage | LineStamptMessage | LineImagetMessage

export type LineTextMessage = {
  type: string,
  text: string
}

export type LineStamptMessage = {
  type: string,
  packageId: number,
  stickerId: number
}

export type LineImagetMessage = {
  type: string,
  originalContentUrl: string,
  previewImageUrl: string
}
