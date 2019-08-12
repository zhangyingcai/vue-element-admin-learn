import Mock from 'mockjs'

const data = Mock.mock({
  'items|1-10': [{
    id: '@id',
    name: '@sentence(1, 5)',
    introduction: '@sentence(2, 40)',
    'price': 10,
    cover_urls: ['https://flowin.oss-cn-hongkong.aliyuncs.com/r9j0srqpeabfa549jz2b6iajqqf5?x-oss-process=image%2Fresize%2Cw_750'],
    currency: {
      asset_id: "c94ac88f-4671-3976-b60a-09064f1811e8",
      icon_url: "https://images.mixin.one/UasWtBZO0TZyLTLCFQjvE_UYekjC7eHCuT_9_52ZpzmCC-X-NPioVegng7Hfx0XmIUavZgz5UL-HIgPCBECc-Ws=s128",
      id: 1,
      name: "Mixin",
      symbol: "XIN"
    },
    'status|1': ['online'],
    seller: {
      avatar_url: "https://images.mixin.one/QNfy0KdnVqCXVGy_buNRYumnGOKKO12pybohVs1W0KLG8s4KGSY1WyQUGYUzDCj0jOj2jYvhX2ByY74BuaWkHw=s256",
      identity_number: "26596",
      user_id: "f59b9309-70c2-4b69-8fd8-5773dbd10018",
      full_name: "mumu",
      phone: "+8617600116372",
    }
  }]
})

export default [
  {
    url: '/products',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
