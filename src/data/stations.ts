import type { Station } from './types';

// Station positions mapped to approximate locations on the game map
// Coordinate system: x: 0-1400, y: 0-950
// Station types: local (各停), express (快速/blue circle), limited_express (特急/pink outline)
export const stations: Station[] = [
  // === 北部エリア ===
  { id: 'akabane_iwabuchi', name: '赤羽岩淵', x: 490, y: 50, type: 'local' },
  { id: 'shimo', name: '志茂', x: 545, y: 50, type: 'local' },
  { id: 'oji_kamiya', name: '王子神谷', x: 600, y: 50, type: 'local' },
  { id: 'oji', name: '王子', x: 645, y: 60, type: 'local' },
  { id: 'nishi_ga_hara', name: '西ヶ原', x: 600, y: 105, type: 'local' },
  { id: 'komagome', name: '駒込', x: 555, y: 125, type: 'limited_express' },
  { id: 'sugamo', name: '巣鴨', x: 495, y: 130, type: 'local' },
  { id: 'hon_komagome', name: '本駒込', x: 665, y: 120, type: 'local' },
  { id: 'sendagi', name: '千駄木', x: 725, y: 120, type: 'local' },
  { id: 'nishi_nippori', name: '西日暮里', x: 795, y: 105, type: 'limited_express' },
  { id: 'nippori', name: '日暮里', x: 850, y: 105, type: 'local' },
  { id: 'kita_senju', name: '北千住', x: 895, y: 75, type: 'local' },
  { id: 'ayase', name: '綾瀬', x: 955, y: 75, type: 'local' },
  { id: 'kita_ayase', name: '北綾瀬', x: 1010, y: 75, type: 'local' },
  { id: 'minami_senju', name: '南千住', x: 945, y: 115, type: 'local' },
  { id: 'minowa', name: '三ノ輪', x: 935, y: 140, type: 'local' },

  // === 池袋〜上野エリア ===
  { id: 'ikebukuro', name: '池袋', x: 430, y: 170, type: 'limited_express' },
  { id: 'shin_otsuka', name: '新大塚', x: 495, y: 185, type: 'local' },
  { id: 'sengoku', name: '千石', x: 555, y: 185, type: 'local' },
  { id: 'higashi_otsuka', name: '東池袋', x: 465, y: 200, type: 'local' },
  { id: 'gokokuji', name: '護国寺', x: 480, y: 240, type: 'local' },
  { id: 'edogawabashi', name: '江戸川橋', x: 510, y: 265, type: 'local' },
  { id: 'todaimae', name: '東大前', x: 610, y: 195, type: 'local' },
  { id: 'hakusan', name: '白山', x: 570, y: 210, type: 'local' },
  { id: 'myogadani', name: '茗荷谷', x: 520, y: 210, type: 'local' },
  { id: 'kasuga', name: '春日', x: 595, y: 230, type: 'local' },
  { id: 'nezu', name: '根津', x: 710, y: 200, type: 'local' },
  { id: 'ueno', name: '上野', x: 835, y: 170, type: 'limited_express' },
  { id: 'ueno_okachimachi', name: '上野御徒町', x: 835, y: 200, type: 'local' },
  { id: 'ueno_hirokoji', name: '上野広小路', x: 835, y: 225, type: 'local' },
  { id: 'inaricho', name: '稲荷町', x: 895, y: 175, type: 'local' },
  { id: 'tawaramachi', name: '田原町', x: 940, y: 175, type: 'local' },
  { id: 'asakusa', name: '浅草', x: 990, y: 155, type: 'local' },
  { id: 'oshiage', name: '押上', x: 1020, y: 195, type: 'local' },
  { id: 'honjo_azumabashi', name: '本所吾妻橋', x: 1045, y: 165, type: 'local' },

  // === 中野〜新宿〜飯田橋エリア ===
  { id: 'nakano', name: '中野', x: 210, y: 290, type: 'express' },
  { id: 'ochiai', name: '落合', x: 275, y: 310, type: 'local' },
  { id: 'nakai', name: '中井', x: 260, y: 290, type: 'local' },
  { id: 'takadanobaba', name: '高田馬場', x: 325, y: 285, type: 'express' },
  { id: 'nishi_waseda', name: '西早稲田', x: 315, y: 330, type: 'local' },
  { id: 'waseda', name: '早稲田', x: 410, y: 270, type: 'local' },
  { id: 'kagurazaka', name: '神楽坂', x: 490, y: 270, type: 'local' },
  { id: 'iidabashi', name: '飯田橋', x: 545, y: 285, type: 'express' },
  { id: 'suidobashi', name: '水道橋', x: 585, y: 295, type: 'local' },
  { id: 'korakuen', name: '後楽園', x: 555, y: 252, type: 'local' },
  { id: 'hongosanchome', name: '本郷三丁目', x: 640, y: 260, type: 'local' },
  { id: 'yushima', name: '湯島', x: 730, y: 265, type: 'local' },
  { id: 'ochanomizu', name: '御茶ノ水', x: 660, y: 320, type: 'local' },
  { id: 'shin_ochanomizu', name: '新御茶ノ水', x: 660, y: 335, type: 'local' },
  { id: 'awajicho', name: '淡路町', x: 730, y: 365, type: 'local' },

  // === 中野坂上〜新宿エリア ===
  { id: 'nakano_sakaue', name: '中野坂上', x: 240, y: 375, type: 'local' },
  { id: 'nishi_shinjuku_5', name: '西新宿五丁目', x: 230, y: 420, type: 'local' },
  { id: 'nishi_shinjuku', name: '西新宿', x: 280, y: 385, type: 'local' },
  { id: 'higashi_shinjuku', name: '東新宿', x: 330, y: 375, type: 'local' },
  { id: 'wakamatsu_kawada', name: '若松河田', x: 370, y: 375, type: 'local' },
  { id: 'ushigome_yanagicho', name: '牛込柳町', x: 420, y: 310, type: 'local' },
  { id: 'ushigome_kagurazaka', name: '牛込神楽坂', x: 465, y: 310, type: 'local' },
  { id: 'shinjuku_nishiguchi', name: '新宿西口', x: 295, y: 440, type: 'local' },
  { id: 'tochomae', name: '都庁前', x: 255, y: 460, type: 'local' },
  { id: 'shinjuku', name: '新宿', x: 305, y: 465, type: 'limited_express' },
  { id: 'shinjuku_gyoenmae', name: '新宿御苑前', x: 380, y: 450, type: 'local' },
  { id: 'shinjuku_sanchome', name: '新宿三丁目', x: 370, y: 470, type: 'local' },
  { id: 'yotsuya_sanchome', name: '四谷三丁目', x: 425, y: 470, type: 'local' },
  { id: 'yoyogi', name: '代々木', x: 295, y: 490, type: 'local' },

  // === 四ツ谷〜大手町エリア ===
  { id: 'yotsuya', name: '四ツ谷', x: 435, y: 440, type: 'limited_express' },
  { id: 'ichigaya', name: '市ヶ谷', x: 505, y: 380, type: 'express' },
  { id: 'akebonobashi', name: '曙橋', x: 450, y: 395, type: 'local' },
  { id: 'kudanshita', name: '九段下', x: 590, y: 375, type: 'express' },
  { id: 'jimbocho', name: '神保町', x: 610, y: 390, type: 'local' },
  { id: 'takebashi', name: '竹橋', x: 650, y: 395, type: 'local' },
  { id: 'kojimachi', name: '麹町', x: 535, y: 460, type: 'local' },
  { id: 'hanzomon', name: '半蔵門', x: 585, y: 460, type: 'local' },
  { id: 'ogawamachi', name: '小川町', x: 715, y: 355, type: 'local' },
  { id: 'iwamotocho', name: '岩本町', x: 790, y: 330, type: 'local' },

  // === 秋葉原〜錦糸町エリア ===
  { id: 'akihabara', name: '秋葉原', x: 810, y: 275, type: 'limited_express' },
  { id: 'suehirocho', name: '末広町', x: 780, y: 280, type: 'local' },
  { id: 'naka_okachimachi', name: '仲御徒町', x: 870, y: 210, type: 'local' },
  { id: 'bakurocho', name: '馬喰町', x: 845, y: 310, type: 'local' },
  { id: 'bakuroyokoyama', name: '馬喰横山', x: 855, y: 325, type: 'local' },
  { id: 'asakusabashi', name: '浅草橋', x: 915, y: 250, type: 'local' },
  { id: 'ryogoku', name: '両国', x: 960, y: 250, type: 'local' },
  { id: 'higashi_nihombashi', name: '東日本橋', x: 920, y: 320, type: 'local' },
  { id: 'kinshicho', name: '錦糸町', x: 1035, y: 265, type: 'local' },
  { id: 'sumiyoshi', name: '住吉', x: 1045, y: 310, type: 'local' },
  { id: 'kikukawa', name: '菊川', x: 1030, y: 345, type: 'local' },
  { id: 'morishita', name: '森下', x: 980, y: 320, type: 'local' },
  { id: 'hamachou', name: '浜町', x: 950, y: 340, type: 'local' },
  { id: 'kanda', name: '神田', x: 795, y: 365, type: 'local' },

  // === 大手町〜東京エリア ===
  { id: 'otemachi', name: '大手町', x: 725, y: 415, type: 'express' },
  { id: 'mitsukoshimae', name: '三越前', x: 750, y: 385, type: 'local' },
  { id: 'nihombashi', name: '日本橋', x: 810, y: 430, type: 'local' },
  { id: 'ningyocho', name: '人形町', x: 840, y: 380, type: 'local' },
  { id: 'kodenmacho', name: '小伝馬町', x: 870, y: 365, type: 'local' },
  { id: 'kayabacho', name: '茅場町', x: 875, y: 445, type: 'local' },
  { id: 'suitengumae', name: '水天宮前', x: 875, y: 415, type: 'local' },
  { id: 'tokyo', name: '東京', x: 790, y: 500, type: 'limited_express' },
  { id: 'kyobashi', name: '京橋', x: 825, y: 490, type: 'local' },
  { id: 'nijubashimae', name: '二重橋前', x: 715, y: 480, type: 'local' },
  { id: 'sakuradamon', name: '桜田門', x: 635, y: 490, type: 'local' },

  // === 有楽町〜銀座エリア ===
  { id: 'yurakucho', name: '有楽町', x: 730, y: 520, type: 'local' },
  { id: 'hibiya', name: '日比谷', x: 690, y: 545, type: 'express' },
  { id: 'ginza', name: '銀座', x: 770, y: 570, type: 'express' },
  { id: 'ginza_itchome', name: '銀座一丁目', x: 810, y: 555, type: 'local' },
  { id: 'higashi_ginza', name: '東銀座', x: 820, y: 580, type: 'local' },
  { id: 'tsukiji', name: '築地', x: 845, y: 590, type: 'local' },
  { id: 'shintomicho', name: '新富町', x: 855, y: 555, type: 'local' },
  { id: 'tsukijishijo', name: '築地市場', x: 845, y: 620, type: 'local' },
  { id: 'takaracho', name: '宝町', x: 870, y: 510, type: 'local' },
  { id: 'hacchobori', name: '八丁堀', x: 885, y: 530, type: 'local' },

  // === 永田町〜赤坂エリア ===
  { id: 'nagatacho', name: '永田町', x: 530, y: 510, type: 'express' },
  { id: 'akasaka_mitsuke', name: '赤坂見附', x: 480, y: 530, type: 'express' },
  { id: 'aoyama_itchome', name: '青山一丁目', x: 425, y: 540, type: 'local' },
  { id: 'tameike_sanno', name: '溜池山王', x: 500, y: 575, type: 'local' },
  { id: 'akasaka', name: '赤坂', x: 530, y: 590, type: 'local' },
  { id: 'kokkai_gijidomae', name: '国会議事堂前', x: 610, y: 565, type: 'local' },
  { id: 'kasumigaseki', name: '霞ケ関', x: 625, y: 580, type: 'express' },
  { id: 'toranomon', name: '虎ノ門', x: 650, y: 605, type: 'local' },
  { id: 'onarimon', name: '御成門', x: 695, y: 580, type: 'local' },

  // === 新橋〜浜松町エリア ===
  { id: 'shimbashi', name: '新橋', x: 755, y: 610, type: 'limited_express' },
  { id: 'shiodome', name: '汐留', x: 785, y: 630, type: 'local' },
  { id: 'daimon', name: '大門', x: 730, y: 640, type: 'local' },
  { id: 'shiba_koen', name: '芝公園', x: 690, y: 625, type: 'local' },
  { id: 'kamiyacho', name: '神谷町', x: 640, y: 625, type: 'local' },
  { id: 'katsudoki', name: '勝どき', x: 855, y: 615, type: 'local' },

  // === 渋谷〜表参道エリア ===
  { id: 'shibuya', name: '渋谷', x: 310, y: 590, type: 'limited_express' },
  { id: 'omote_sando', name: '表参道', x: 370, y: 575, type: 'express' },
  { id: 'gaienmae', name: '外苑前', x: 400, y: 560, type: 'local' },
  { id: 'meiji_jingumae', name: '明治神宮前', x: 330, y: 555, type: 'local' },
  { id: 'kita_sando', name: '北参道', x: 310, y: 530, type: 'local' },
  { id: 'kokuritsu_kyogijo', name: '国立競技場', x: 360, y: 505, type: 'local' },
  { id: 'nogizaka', name: '乃木坂', x: 425, y: 590, type: 'local' },
  { id: 'roppongi', name: '六本木', x: 445, y: 610, type: 'express' },

  // === 目黒〜恵比寿エリア ===
  { id: 'meguro', name: '目黒', x: 310, y: 660, type: 'limited_express' },
  { id: 'naka_meguro', name: '中目黒', x: 315, y: 630, type: 'local' },
  { id: 'ebisu', name: '恵比寿', x: 350, y: 630, type: 'local' },
  { id: 'hiroo', name: '広尾', x: 400, y: 630, type: 'local' },
  { id: 'azabu_juban', name: '麻布十番', x: 530, y: 635, type: 'local' },
  { id: 'shirokane_takanawa', name: '白金高輪', x: 480, y: 665, type: 'local' },
  { id: 'shirokanedai', name: '白金台', x: 420, y: 670, type: 'local' },
  { id: 'mita', name: '三田', x: 600, y: 665, type: 'local' },
  { id: 'akabane_bashi', name: '赤羽橋', x: 590, y: 640, type: 'local' },
  { id: 'sengakuji', name: '泉岳寺', x: 570, y: 700, type: 'local' },
  { id: 'takanawadai', name: '高輪台', x: 530, y: 700, type: 'local' },
  { id: 'gotanda', name: '五反田', x: 380, y: 700, type: 'local' },
  { id: 'takanawa_gateway', name: '高輪ゲートウェイ', x: 545, y: 685, type: 'local' },

  // === 代々木上原〜中野エリア ===
  { id: 'yoyogi_uehara', name: '代々木上原', x: 215, y: 510, type: 'local' },
  { id: 'yoyogi_koen', name: '代々木公園', x: 260, y: 520, type: 'local' },

  // === 門前仲町〜豊洲エリア ===
  { id: 'monzen_nakacho', name: '門前仲町', x: 905, y: 480, type: 'local' },
  { id: 'kiyosumi_shirakawa', name: '清澄白河', x: 960, y: 430, type: 'local' },
  { id: 'tsukishima', name: '月島', x: 895, y: 570, type: 'local' },
  { id: 'toyosu', name: '豊洲', x: 935, y: 570, type: 'local' },
  { id: 'tatsumi', name: '辰巳', x: 975, y: 570, type: 'local' },
  { id: 'shin_kiba', name: '新木場', x: 1020, y: 570, type: 'local' },
];

export const stationMap = new Map<string, Station>(
  stations.map(s => [s.id, s])
);
