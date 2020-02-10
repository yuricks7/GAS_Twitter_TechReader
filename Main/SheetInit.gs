function myFunction() {
  try {
    var ss     = SpreadsheetApp.getActiveSpreadsheet();
    var sheet  = ss.getSheetByName('記事');
    var values = sheet.getDataRange().getValues();
    Logger.log(values);
    
    // 1週間前の日付を検索
    
    // それ以前のものは削除
    
  } catch (e) {
    
    var occuredTime = new Date();
    var errorLog    = new ErrorLog(e, occuredTime);
    var ssForLog    = SpreadsheetApp.getActiveSpreadsheet();
    errorLog.output(ssForLog, 'エラーログ');
    
  }
}
