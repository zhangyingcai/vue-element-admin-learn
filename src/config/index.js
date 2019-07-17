const config = {
  // etherscan 获取账户 ERC20 交易记录
  tokentxuri: 'https://api.etherscan.io/api?module=account&action=tokentx',
  // BCAT 合约地址
  contractaddress: '0xfDEAA4ab9fea519aFD74df2257A21e5BcA0DFd3f',
  // BCAT 单位
  tokenDecimal: 18,
  // etherscan api key
  apikey: 'K7T921SQKMBW35UTUIVI5YU2VJX76IUQSV',
  // etherscan 根据地址获取交易列表
  txlisturi: 'http://api.etherscan.io/api?module=account&action=txlist&',
  // BCAT 创建地址
  creatorAddress: '0x1F759FAE44ca006a496434908B009820afEa0A90',
  // 获取一个地址的交易记录
  tokeninternal: 'https//api.etherscan.io/api?module=account&action=txlistinternal',
  // 获取当前合约的 token 数量
  tokenbalance:'https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=0xfDEAA4ab9fea519aFD74df2257A21e5BcA0DFd3f&apikey=K7T921SQKMBW35UTUIVI5YU2VJX76IUQSV',
  // 线上环境地址
  apiurl: 'http://blockapi.liuyiqian.net:7001', 
  // 官方地址
  appeth: '0x06bb48363eff79604febc5329dd3688690e7fd8f', // 官方地址
  // otcbtc 地址
  otcbtceth: '0xaeec6f5aca72f3a005af1b3420ab8c8c7009bac8',
  // 销毁地址
  cleareth: '0x4660378743fa83f0d1f45d60fa9f5c9d1d7c1d49',
  // bigone 地址
  bigoneeth: '0xd4dcd2459bb78d7a645aa7e196857d421b10d93f',
  // 捐赠 地址
  donationeth: '0x4660378743FA83f0d1F45d60FA9f5c9D1D7C1D49'
}

export default config

// 根据 txhash 来查询交易信息 href="//api.etherscan.io/api?module=account&action=txlistinternal&txhash=0x40eb908387324f2b575b4879cd9d7188f69c8fc9d87c901b9e2daaea4b442170&apikey=YourApiKeyToken"