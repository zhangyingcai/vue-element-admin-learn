<template>
  <section class="mine-main">
    <van-icon class="main-user" name="manager-o" />
    <a class="main-login" href="http://localhost:8080/user/signin">点击登录</a>
    <button @click="handleLogin">模拟登陆</button>
  </section>
</template>
<script>
import { testLogin } from '@/api/user'
import { setToken } from '@/utils/auth'
export default {
  name: 'LoginView',
  data() {
    return {
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route){
        this.redirect = route.query && route.query.redirect
      }
    }
  },
  methods: {
    handleLogin() {
      testLogin().then(response => {
        const { data } = response
        this.$store.commit('user/SET_TOKEN', data.token)
        setToken(data.token)
        this.$router.push(this.redirect || '/')
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.mine-main{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.main-user{
  background-color: #999;
  color: #888;
  font-size: 60rem;
  width: 20vw;
  height: 20vw;
  padding: 2vw;
  border-radius: 50%;
}
.main-login{
  font-size: 20rem;
  color: #999;
  text-decoration: none;
}
</style>
