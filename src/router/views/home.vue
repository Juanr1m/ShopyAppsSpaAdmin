<script>
import appConfig from '@src/app.config'
import Menu from '@layouts/menu.vue'
import Header from '@layouts/header.vue'
import ProductsPage from '@views/products.vue'
import axios from 'axios'
import store from '@/src/state/store'
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
      axios
        .get('http://127.0.0.1:8000/api/users/auth/users/me/', {
          headers: {
            Authorization: `Token ${store.state.auth.currentUser}`,
          },
        })
        .then((response) => (this.id = response.data))
        .catch((error) => console.log(error))
    },
  },
}
</script>

<template>
  <div class="wrapper">
    <div class="screen">
      <Header></Header>
      <div class="row height_wrap">
        <Menu></Menu>
        <ProductsPage></ProductsPage>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@design';
</style>
