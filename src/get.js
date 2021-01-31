function doGet() {
  return ContentService.createTextOutput(JSON.stringify({'content': 'get ok!'})).setMimeType(ContentService.MimeType.JSON);
}
