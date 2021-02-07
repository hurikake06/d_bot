import Thread from './thread'
import { InputMessage } from './types'

export default class ThreadManager {
  static getThread = (message: InputMessage) => {
    let thread = ThreadManager.findThread(message)
    if(thread){
      return thread
    } else {
      return ThreadManager.createThread(message)
    }
  }
  static findThread = (message: InputMessage): Thread => null
  static createThread(message: InputMessage) {
    return new Thread(message)
  }
}
