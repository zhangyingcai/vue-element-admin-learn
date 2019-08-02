<template>
  <section class="mine-main">
    <van-icon class="main-user" name="manager-o"></van-icon>
    <a class="main-login" href="://localhost/login">点击登录</a>
  </section>
</template>

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
