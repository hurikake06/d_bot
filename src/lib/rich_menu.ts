import env from './env'

// let menuDeploy = () => {
//   let response = RichMenu.deploy
//   console.log(response)
// }

export default class RichMenu {
  // https://drive.google.com/uc?id={ID}
  static imageId :string = 'ID'

  static areas = [
    {
      bounds: {
        x: 34,
        y: 24,
        width: 169,
        height: 193
      },
      action: {
          type: 'message',
          label: 'AppStart_SummonFreakApp',
          text: 'サモフリ'
      }
    }]

  public static deploy = () => {
    UrlFetchApp.fetch('https://api.line.me/v2/bot/richmenu', {
      'headers': {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + env('TOKEN/LINE'),
      },
      'method': 'post',
      'payload': JSON.stringify({
        size: {
          "width":2500,
          "height":1686
        },
        selected: false,
        name: 'DBot_MENU',
        chatBarText: 'Tap to open',
        areas: RichMenu.areas
      }),
    })
  }

  public image_deploy(richMenuId) {
    let image = UrlFetchApp.fetch(`https://drive.google.com/uc?id=${RichMenu.imageId}`).getBlob()
    // ファイルアップロード
    UrlFetchApp.fetch(`https://api-data.line.me/v2/bot/richmenu/${richMenuId}/content`, {
      'headers': {
        'Content-Type': 'Content-Type: image/jpeg',
        'Authorization': 'Bearer ' + env('TOKEN/LINE'),
      },
      'method': 'post',
      'payload': image
    })
  }
}
