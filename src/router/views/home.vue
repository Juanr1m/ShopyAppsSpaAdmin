<script>
import appConfig from '@src/app.config'
import Menu from '@layouts/menu.vue'
import Header from '@layouts/header.vue'
import ProductsPage from '@views/products.vue'

export default {
  page: {
    title: 'Товары',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Menu, Header, ProductsPage },
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
