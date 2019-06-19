const config = {
  tokentxuri: 'https://api.etherscan.io/api?module=account&action=tokentx',
  contractaddress: '0xfDEAA4ab9fea519aFD74df2257A21e5BcA0DFd3f',
  tokenDecimal: 18,
  apikey: 'K7T921SQKMBW35UTUIVI5YU2VJX76IUQSV',
  txlisturi: 'http://api.etherscan.io/api?module=account&action=txlist&',
  creatorAddress: '0x1F759FAE44ca006a496434908B009820afEa0A90',
  tokenbalances: 'https://api.etherscan.io/api?module=account&action=balancemulti',
  tokeninternal: 'https//api.etherscan.io/api?module=account&action=txlistinternal',
  // 获取当前合约的 token 数量
  tokenbalance:'https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=0xfDEAA4ab9fea519aFD74df2257A21e5BcA0DFd3f&apikey=K7T921SQKMBW35UTUIVI5YU2VJX76IUQSV',
  apiurl: 'http://blockapi.liuyiqian.net:7001/holders', // 排行榜
  acountinfourl: 'http://blockapi.liuyiqian.net:7001/accountinfo', // 单个地址
  txinfourl: 'http://localhost:7001/txinfo', // 单个地址
  // apiurl: 'http://localhost:7001/holders'
  appeth: '0x06bb48363eff79604febc5329dd3688690e7fd8f', // 官方地址
  otcbtceth: '0xaeec6f5aca72f3a005af1b3420ab8c8c7009bac8',
  cleareth: '0x4660378743FA83f0d1F45d60FA9f5c9D1D7C1D49'
}

export default config

// 根据 txhash 来查询交易信息 href="//api.etherscan.io/api?module=account&action=txlistinternal&txhash=0x40eb908387324f2b575b4879cd9d7188f69c8fc9d87c901b9e2daaea4b442170&apikey=YourApiKeyToken"