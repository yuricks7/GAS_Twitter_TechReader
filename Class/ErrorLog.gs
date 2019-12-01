/**
 * エラーオブジェクトを扱うクラス
 *
 * @param {object} errorObject 発生したエラーオブジェクト
 * @param {object} time        発生時刻のDateオブジェクト
 *
 */
var ErrorLog = function (errorObject, time) {
  this.time   = time;

  this.Object = errorObject;
  this.stack  = errorObject.stack;

  // 例） at [fileName] :[lineNum] ([functionName])
  var stack  = String(this.stack);

  var functionNameStart = stack.lastIndexOf('(') + 1;
  var functionNameEnd   = stack.length - 2;
  this.funciton = stack.slice(functionNameStart, functionNameEnd);

  var fileNameStart = stack.indexOf(' ') + 1;
  var fileNameEnd   = stack.indexOf(':');
  this.scriptFile = stack.slice(fileNameStart, fileNameEnd);

  this.line        = errorObject.lineNumber;
  this.type        = errorObject.name;
  this.description = errorObject.message;
};

/**
 * エラーを記録する
 *
 * @param {object} spreadsheet ログを行うspreadsheetオブジェクト
 * @param {string} sheetName   シート名
 *
 */
ErrorLog.prototype.output = function(spreadsheet, sheetName) {
  if (!spreadsheet) {
    var PROPS = PropertiesService.getScriptProperties();
    var ssId = PROPS.getProperties('SS_ID');
    spreadsheet = SpreadsheetApp.openById(ssId);
  }

  var logs = [
    this.time,
    this.scriptFile,
    this.funciton,
    this.line,
    this.type,
    this.description
  ];

  var logSheet = spreadsheet.getSheetByName(sheetName);
  var lastRow  = logSheet.getLastRow();
  for (var iLog = 0; iLog < logs.length; iLog++) {
    logSheet.getRange(lastRow + 1, iLog + 1).setValue(logs[iLog]);
  }
}