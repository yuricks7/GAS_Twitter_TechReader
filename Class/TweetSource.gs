var TweetSource = function(feeds, ss) {
  this.feedTitle   = feeds[0];
  this.feedUrl     = feeds[1];
  this.postTime    = feeds[2];
  this.postTimeJst = getJstString();
  this.thumnail    = feeds[3]; // URLの方が良いかも？
  this.entryTitle  = feeds[4];
  this.entryUrl    = feeds[5];
  this.body        = feeds[6];

  /* フィードシートからカテゴリの検索 */
  var feedSheet  = ss.getSheetByName('フィード');
  var feedValues = feedSheet.getDataRange().getValues();

  this.feedCategory = getFeedCategory(this.feedTitle, feedValues, 2, 1);

  Logger.log(this.feedTitle);
  Logger.log(this.postTime);
  Logger.log(this.entryTitle);
  Logger.log(this.entryUrl);

};
/**
 * 時刻を読みやすいように変換する
 *
 * Moment.jsライブラリを使用
 * ライブラリ・キー：MHMchiX6c1bwSqGM1PZiW_PxhMjh3Sh48
 */
var getJstString = function() {

  Logger.log(Moment.moment(this.postTime).format('YYYY/MM/DD (ddd) hh:mm:ss'));

  var date = Moment.moment(this.postTime).format('YYYY/MM/DD');
  var time = Moment.moment(this.postTime).format('hh:mm:ss');

  var momentDay = Moment.moment(this.postTime).format('ddd');
  Logger.log(momentDay);

  var days = [
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    ['日',  '月',   '火',  '水',   '木',  '金',  '土']
  ];
  var dayIndex = days[0].indexOf(momentDay);
  var day = days[1][dayIndex];
  
  Logger.log(Moment.moment(this.postTime).format('YYYY/MM/DD (ddd) hh:mm:ss'));
  Logger.log(day + '曜日');
  
  
  return Moment.moment(this.postTime).format('YYYY/MM/DD (ddd) hh:mm:ss') + ' - JST'    
}


////日付情報を作る
//function getDay(date) {
//  
//  var date = new Date();
//  var month = date.getMonth() + 1;//月
//  var day = date.getDate();//日付
//  
//  var arrDay = ['日','月','火','水','木','金','土'];
//  var dayNum = date.getDay();//曜日を0~6の数字で取得
//  var dayStr = arrDay[dayNum];
//  
//  var dateInfo = month + '月' + day + '日(' + dayStr + ')';
//  
//  return dateInfo;// ex)3月6日(水)
//}


/**
 * フィードシートからブログのカテゴリを取得する
 *
 * Underscore for GAS ライブラリを使用
 * ライブラリ・キー：M3i7wmUA_5n0NSEaa6NnNqOBao7QLBR4j
 *
 * ※UnderscoreGS（'MiC3qjLYVUjCCUQpMqPPTWUF7jOZt2NQ8'）では使えない処理があるので注意。
 */
var getFeedCategory = function(key, arr2d, masterCol, searchCol) {
  // 二次元配列内でVLOOKUP
  var _ = Underscore.load(); // Underscore for GASライブラリの呼び出し
  var transposedValues = _.zip.apply(_, arr2d);
  var targetIndex      = transposedValues[masterCol -1].indexOf(key);
  var ret              = arr2d[targetIndex][searchCol - 1];
  
  return ret
}