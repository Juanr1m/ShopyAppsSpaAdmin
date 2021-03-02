<script>
import appConfig from '@src/app.config'
import Menu from '@layouts/menu.vue'
import Header from '@layouts/header.vue'
import ProductsPage from '@views/products.vue'

import jwtDecode from 'jwt-decode'
export default {
  page: {
    title: 'Home',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Menu, Header, ProductsPage },
  data() {
    return {
      id: null,
    }
  },
  created() {
    this.getUserId()
  },
  methods: {
    getUserId() {
      const token = localStorage.getItem('token')
      try {
        //  decode token here and attach to the user object
        const decoded = jwtDecode(token)
        this.id = decoded.user_id
        localStorage.setItem('user_id', this.id)
      } catch (error) {
        // return error in production env
        console.log(error, 'error from decoding token')
      }
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
