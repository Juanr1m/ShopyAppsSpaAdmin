<script>
import appConfig from '@src/app.config'
// import axios from 'axios'
import Menu from '@layouts/menu.vue'
import Header from '@layouts/header.vue'
export default {
  page: {
    title: 'Review',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Header, Menu },
}
</script>

<template>
  <div class="wrapper">
    <div class="screen">
      <Header></Header>
      <div class="row height_wrap">
        <Menu></Menu>
        <div class="col-10 main_screen">
          <div class="main_screen_title">
            Обзор
          </div>
          <div class="row"> </div>
        </div>
      </div>
    </div>
  </div>
</template>
