/**
 * RSSフィードをTwitter用に加工するクラス
 *
 * @param {array} feeds フィード1行分の配列
 * @param {object}   ss 対象のスプレッドシート
 */
var Feed = function(feeds, ss) {
  this.ss = ss;

  // 記事のデータ
  this.feedTitle  = feeds[0];
  this.feedUrl    = feeds[1];
  this.postTime   = feeds[2]; // ?

  this.thumbnail    = feeds[3]; // URLの方が良いかも？
  this.entryTitle   = feeds[4];
  
  // URLの短縮化
  var entryUrl = feeds[5];
  if (entryUrl.indexOf('%') > 0) {
    var bitly = new Bitly();
    entryUrl  = bitly.shorten(entryUrl);
  }
  this.entryUrl     = entryUrl;

  // 本文の抽出
  // JavaScriptでHTMLタグを削除する正規表現 | Qiita
  // https://qiita.com/miiitaka/items/793555b4ccb0259a4cb8
  var bodyWithHtml = feeds[6]; // HTMLタグつき
  this.body        = bodyWithHtml.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,''); // HTMLタグ除去

  // [フィード]シートからカテゴリの検索
  this.feedCategory = getFeedCategory(ss, this.feedTitle);

  // ポスト本文
  this.m = this.generate();
};

/**
 * ブログ・タイトルからフィード・カテゴリーを取得する
 *
 * @param {object} spreadsheet マスターのあるスプレッドシート
 * @param {string, number} key 検索する値 
 *
 * @return 取得したカテゴリー
 */
var getFeedCategory = function(ss, key) {
  var masterSheet  = ss.getSheetByName('フィード');
  var masterValues = masterSheet.getDataRange().getValues();

  const CATEGORY_COL_INDEX = 0;
  const TITLE_COL_INDEX    = 1;
  
  return vlookup(key, masterValues, TITLE_COL_INDEX, CATEGORY_COL_INDEX);
};

/**
 * VLOOKUP関数の代替
 *
 * 外部ライブラリを使用
 * [Name]    Underscore for GAS
 * [Key]     M3i7wmUA_5n0NSEaa6NnNqOBao7QLBR4j
 * [version] 2.0
 * [note]    類似ライブラリ（※）では使えない処理があるので混同しないように注意。
 *           ※UnderscoreGS（'MiC3qjLYVUjCCUQpMqPPTWUF7jOZt2NQ8'）
 *
 * @param {string, number}    key 検索する値
 * @param {array}           arr2d 検索先の二次元配列
 * @param {number} searchColIndex 行の確認に使う列のインデックス
 * @param {number} returnColIndex 値を取得する列のインデックス
 *
 * @return 取得した値
 */
var vlookup = function(key, arr2d, rowSearchColIndex, returnColIndex) {
  var _ = Underscore.load(); // Underscore for GASライブラリの呼び出し
  var transposedValues = _.zip.apply(_, arr2d);
  var targetIndex      = transposedValues[rowSearchColIndex].indexOf(key);

  try {
    return arr2d[targetIndex][returnColIndex];

  } catch(e) {
    //  // フィード名が変わるとエラーになるので置き換え
    //  console.log(key);
    return '■■';
  }
  return arr2d[targetIndex][returnColIndex];
}

/**
 * 本文を生成する
 *
 * 生成イメージ
 * ※Tweetからリンクに飛びたいので記事URLは死守する！
 * ──────────────
 * ▼[カテゴリ] ブログタイトル
 * 記事タイトル
 * https://hogehoge.html
 * 本文…
 * ──────────────
 *
 * @param {object} feeds フィード1行分の配列
 * @param {object} ss    対象のスプレッドシート
 *
 * @return {string} 作成した文章
 */
Feed.prototype.generate = function() {
  const LF  = '\n';
  
  var header = '';
  header += `▼[${this.feedCategory}]${this.feedTitle}${LF}`;
  header += `${this.entryTitle}${LF}`;

  var body = LF + this.body;

  const TWEET_LENGTH    = 140;
  const URL_LENGTH      = 12; // 正確には11.5文字
  const REMAINED_LENGTH = TWEET_LENGTH - URL_LENGTH
  var m = '';

  // タイトルだけで超えたらタイトル+URL
  if (header.length > REMAINED_LENGTH) {
    console.info('タイトルだけで文字数超えてます。');

    // substringメソッドがうまく動かないので、substrに置き換え。
    var newHeader = header.substring(0, REMAINED_LENGTH - 1);
    console.log(newHeader);
    
    m = `${newHeader}…${LF}${this.entryUrl}`;
    return m;
  }

  var temp  = header + body;
  console.log(`タイトルをいじった後の文字数：${temp.length}`);
  
  // 本文も足して超えたら、本文だけ削る
  if (temp.length > REMAINED_LENGTH) {
    console.log('本文が長いです。');
    const REMAINED_FOR_BODY = REMAINED_LENGTH - (header.length + String(LF).length);
    var newBody = body.substring(0, REMAINED_FOR_BODY - 1);
    
    m = `${header}${this.entryUrl}${newBody}…`;
    console.log(`【本文削ったポスト】\n${m}`);
    return m;
  }

  // 何も編集しなかった場合
  m = `${header}${this.entryUrl}${body}`;
  
  console.log(`今回の文字数:${m.length}`);
  console.log(`【今回のポスト】\n${m}`);
  
  return m;
}