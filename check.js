const request = require('request');
const cheerio = require('cheerio');

const check = (area) => {
  // 対応するエリア番号
  // 2 : 北海道
  // 3 : 東北
  // 4 : 関東
  // 5 : 中部
  // 6 : 近畿
  // 8 : 中国
  // 9 : 四国
  // 7 : 九州
  const url = `https://transit.yahoo.co.jp/traininfo/area/${area}/`;

  request(url, (e, res, body) => {
    if (e) {
      console.log(e);
    }

    try {
      const $ = cheerio.load(body);
      const data = $('tr > td > span.icnAlert').parent().parent().text();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  });
};

const num = Number(process.argv[2]);

// 引数チェック
if (typeof num !== 'number' ||
    [2, 3, 4, 5, 6, 7, 8, 9].indexOf(num) === -1) {
  const msg = `
    ******************************************
    引数には下記のエリア番号のみが入力できます
    2 : 北海道
    3 : 東北
    4 : 関東
    5 : 中部
    6 : 近畿
    8 : 中国
    9 : 四国
    7 : 九州

    例：関東地域の路線の遅延情報を調べるとき
    node check.js 4
    ******************************************
  `;
  console.log(msg);
  process.exit();
}

check(num);
