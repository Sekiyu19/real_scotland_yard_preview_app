import type { Line } from './types';

export const lines: Line[] = [
  // === 東京メトロ ===
  {
    id: 'ginza',
    name: '銀座線',
    color: '#FF9500',
    stations: [
      'shibuya', 'omote_sando', 'gaienmae', 'aoyama_itchome',
      'akasaka_mitsuke', 'tameike_sanno', 'toranomon', 'shimbashi',
      'ginza', 'kyobashi', 'nihombashi', 'mitsukoshimae', 'kanda',
      'akihabara', 'suehirocho', 'ueno_hirokoji', 'ueno',
      'inaricho', 'tawaramachi', 'asakusa',
    ],
  },
  {
    id: 'marunouchi',
    name: '丸ノ内線',
    color: '#F62E36',
    stations: [
      'ogikubo_dummy', // placeholder - not on game map, starts from ikebukuro side
      'ikebukuro', 'shin_otsuka', 'myogadani', 'korakuen',
      'hongosanchome', 'ochanomizu', 'awajicho', 'otemachi',
      'tokyo', 'ginza', 'kasumigaseki', 'kokkai_gijidomae',
      'akasaka_mitsuke', 'yotsuya', 'yotsuya_sanchome',
      'shinjuku_gyoenmae', 'shinjuku_sanchome', 'shinjuku',
    ].filter(s => s !== 'ogikubo_dummy'),
  },
  {
    id: 'hibiya',
    name: '日比谷線',
    color: '#B5B5AC',
    stations: [
      'kita_senju', 'minami_senju', 'minowa', 'ueno',
      'naka_okachimachi', 'akihabara', 'ogawamachi',
      'ningyocho', 'kayabacho', 'hacchobori', 'tsukiji',
      'higashi_ginza', 'ginza', 'hibiya', 'kasumigaseki',
      'kamiyacho', 'roppongi', 'hiroo', 'ebisu',
      'naka_meguro',
    ],
  },
  {
    id: 'tozai',
    name: '東西線',
    color: '#009BBF',
    stations: [
      'nakano', 'ochiai', 'takadanobaba', 'waseda',
      'kagurazaka', 'iidabashi', 'kudanshita', 'takebashi',
      'otemachi', 'nihombashi', 'kayabacho', 'monzen_nakacho',
      'kiyosumi_shirakawa', 'sumiyoshi', 'kinshicho',
    ],
  },
  {
    id: 'chiyoda',
    name: '千代田線',
    color: '#00BB85',
    stations: [
      'kita_ayase', 'ayase', 'kita_senju', 'nishi_nippori',
      'sendagi', 'nezu', 'yushima', 'shin_ochanomizu',
      'otemachi', 'nijubashimae', 'hibiya', 'kasumigaseki',
      'kokkai_gijidomae', 'akasaka', 'nogizaka', 'omote_sando',
      'meiji_jingumae', 'yoyogi_koen', 'yoyogi_uehara',
    ],
  },
  {
    id: 'yurakucho',
    name: '有楽町線',
    color: '#C1A470',
    stations: [
      'wakoshi_dummy', // not on game map
      'ikebukuro', 'higashi_otsuka', 'gokokuji',
      'edogawabashi', 'iidabashi', 'ichigaya', 'kojimachi',
      'nagatacho', 'sakuradamon', 'yurakucho', 'ginza_itchome',
      'shintomicho', 'tsukishima', 'toyosu',
      'tatsumi', 'shin_kiba',
    ].filter(s => s !== 'wakoshi_dummy'),
  },
  {
    id: 'fukutoshin',
    name: '副都心線',
    color: '#9C5E31',
    stations: [
      'ikebukuro', 'zoshigaya_dummy', // not on map
      'nishi_waseda', 'higashi_shinjuku',
      'shinjuku_sanchome', 'kita_sando', 'meiji_jingumae',
      'shibuya',
    ].filter(s => s !== 'zoshigaya_dummy'),
  },
  {
    id: 'hanzomon',
    name: '半蔵門線',
    color: '#8F76D6',
    stations: [
      'shibuya', 'omote_sando', 'aoyama_itchome',
      'nagatacho', 'hanzomon', 'kudanshita',
      'jimbocho', 'otemachi', 'mitsukoshimae',
      'suitengumae', 'kiyosumi_shirakawa', 'sumiyoshi',
      'kinshicho', 'oshiage',
    ],
  },
  {
    id: 'namboku',
    name: '南北線',
    color: '#00AC9B',
    stations: [
      'akabane_iwabuchi', 'shimo', 'oji_kamiya', 'oji',
      'nishi_ga_hara', 'komagome', 'hon_komagome',
      'todaimae', 'korakuen', 'iidabashi', 'ichigaya',
      'yotsuya', 'nagatacho', 'tameike_sanno',
      'roppongi', 'azabu_juban',
      'shirokane_takanawa', 'shirokanedai', 'meguro',
    ],
  },

  // === 都営地下鉄 ===
  {
    id: 'mita',
    name: '都営三田線',
    color: '#0079C2',
    stations: [
      'nishi_takashimadaira_dummy',
      'sugamo', 'sengoku', 'hakusan', 'kasuga',
      'suidobashi', 'jimbocho', 'otemachi', 'hibiya',
      'onarimon', 'shiba_koen', 'mita',
      'shirokane_takanawa', 'shirokanedai', 'meguro',
    ].filter(s => s !== 'nishi_takashimadaira_dummy'),
  },
  {
    id: 'shinjuku_line',
    name: '都営新宿線',
    color: '#6CBB5A',
    stations: [
      'shinjuku', 'shinjuku_sanchome', 'akebonobashi',
      'ichigaya', 'kudanshita', 'jimbocho', 'ogawamachi',
      'iwamotocho', 'bakuroyokoyama', 'hamachou',
      'morishita', 'kikukawa', 'sumiyoshi',
    ],
  },
  {
    id: 'oedo',
    name: '都営大江戸線',
    color: '#CE2869',
    stations: [
      'tochomae', 'shinjuku_nishiguchi', 'higashi_shinjuku',
      'wakamatsu_kawada', 'ushigome_kagurazaka', 'iidabashi',
      'kasuga', 'hongosanchome', 'ueno_okachimachi',
      'shin_ochanomizu', 'iwamotocho',
      'bakuroyokoyama', 'higashi_nihombashi', 'morishita',
      'kiyosumi_shirakawa', 'monzen_nakacho',
      'tsukishima', 'katsudoki', 'tsukijishijo',
      'shiodome', 'daimon', 'akabane_bashi',
      'azabu_juban', 'roppongi', 'aoyama_itchome',
      'kokuritsu_kyogijo', 'yoyogi', 'shinjuku',
      'tochomae', // loop
    ],
  },
  {
    id: 'asakusa_line',
    name: '都営浅草線',
    color: '#E85298',
    stations: [
      'oshiage', 'honjo_azumabashi', 'asakusa',
      'kuramae_dummy', 'asakusabashi',
      'higashi_nihombashi', 'ningyocho', 'nihombashi',
      'takaracho', 'shimbashi', 'daimon',
      'mita', 'sengakuji', 'takanawadai', 'gotanda',
    ].filter(s => s !== 'kuramae_dummy'),
  },

  // === JR線 ===
  {
    id: 'yamanote',
    name: 'JR山手線',
    color: '#9ACD32',
    stations: [
      'ikebukuro', 'sugamo', 'komagome', 'nishi_nippori',
      'nippori', 'ueno', 'akihabara', 'kanda', 'tokyo',
      'shimbashi', 'takanawa_gateway', 'meguro',
      'ebisu', 'shibuya', 'shinjuku', 'takadanobaba',
      'ikebukuro', // loop
    ],
  },
  {
    id: 'chuo',
    name: 'JR中央線',
    color: '#FF4500',
    stations: [
      'tokyo', 'kanda', 'ochanomizu', 'yotsuya',
      'shinjuku', 'nakano',
    ],
  },
  {
    id: 'keihin_tohoku',
    name: 'JR京浜東北線',
    color: '#00B2E5',
    stations: [
      'akabane_iwabuchi', 'oji', 'nishi_nippori', 'nippori',
      'ueno', 'akihabara', 'kanda', 'tokyo',
      'shimbashi', 'takanawa_gateway',
    ],
  },
];
