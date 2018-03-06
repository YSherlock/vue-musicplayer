export function getSinger(){
  let data = Object.assign({},{
    channel:'singer',
    page:'list',
    key:'all_all_all',
    pagesize:100,
    pagenum:1,
    g_tk:5381,
    // jsonCallback:'getSingerListCallback',
    loginUin:0,
    hostUin:0,
    format:'jsonp',
    inCharset:'utf-8',
    outCharset:'utf-8',
    notice:0,
    platform:'yqq',
    needNewCode:0
  })

  return data
}
