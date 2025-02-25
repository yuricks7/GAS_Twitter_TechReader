function myFunction() {
  try {
    let ss     = SpreadsheetApp.getActiveSpreadsheet();
    let sheet  = ss.getSheetByName('記事');
    let values = sheet.getDataRange().getValues();
    Logger.log(values);
    
    // 1週間前の日付を検索
    
    // それ以前のものは削除
    
  } catch (e) {
    
    let occuredTime = new Date();
    let errorLog    = new ErrorLog(e, occuredTime);
    let ssForLog    = SpreadsheetApp.getActiveSpreadsheet();
    errorLog.output(ssForLog, 'エラーログ');
    
  }
}
