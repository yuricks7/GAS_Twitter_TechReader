function myFunction() {
  var ss     = SpreadsheetApp.getActiveSpreadsheet();
  var sheet  = ss.getSheetByName('シート1');
  var values = sheet.getDataRange().getValues();

  var feeds = values[1];
  
  var tweetSource = new TweetSource(feeds, ss);
  
//  const LF  = '\n';
//  var tweet = '';
//  tweet += '━━━━━━━━━━━━━━━━━━' + LF;
//  tweet += '【' + tweetSource.feedCategory + '】' + tweetSource.feedTitle + LF;
//  tweet += tweetSource.postTimeJst + LF;
//  tweet += LF;
//  tweet += tweetSource.entryTitle + LF;
//  tweet += tweetSource.entryUrl + LF;
//  tweet += '━━━━━━━━━━━━━━━━━━' + LF;
//  tweet += tweetSource.body + LF;
//  tweet += '━━━━━━━━━━━━━━━━━━' + LF;
  
//  Logger.log(tweet);
  
}


//function test() {
//  var ss     = SpreadsheetApp.getActiveSpreadsheet();
//  var sheet  = ss.getSheetByName('シート1');
//  var values = sheet.getDataRange().getValues();
//
////  Logger.log(values[1][6]);
//  
//  var elem = parser.getElementsByTagName(values[1][6], 'p');
//  Logger.log(elem);
//  
//}