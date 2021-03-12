<script>
import appConfig from '@src/app.config'
import Menu from '@layouts/menu.vue'
import Header from '@layouts/header.vue'
import ProductsPage from '@views/products.vue'
import axios from 'axios'

export default {
  page: {
    title: 'Home',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Menu, Header, ProductsPage },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('user_id')
      axios
        .get(
          'http://127.0.0.1:8000/api/users/' +
            userId +
            '/' +
            '?auth_token=' +
            token
        )
        .then((response) => localStorage.setItem('user', response))
        .catch((error) => console.warn(error))
    },
  },
}
</script>

<template>
  <div class="wrapper">
    <div class="screen">
      <Header></Header>
      <div class="row height_wrap">
        <Menu> </Menu>
        <ProductsPage></ProductsPage>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@design';
</style>
