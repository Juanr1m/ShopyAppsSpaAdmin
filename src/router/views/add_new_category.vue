<script>
import appConfig from '@src/app.config'
// import axios from 'axios'
import Menu from '@layouts/menu.vue'
import Header from '@layouts/header.vue'
export default {
  page: {
    title: 'Add new category',
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
        <div class="col-10 main_screen pt">
          <RouterLink class="back_btn" to="/">
            <div class="back_btn_icn"
              ><img src="@assets/keyboard_arrow_left-24px.svg" alt=""
            /></div>
            <div class="back_btn_txt">Товары</div>
          </RouterLink>
          <div class="main_screen_title">
            Добавить новую категорию
          </div>
          <div class="row"> </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@design';
.pt {
  padding-top: 20px;
}
.back_btn {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.back_btn_icn {
  width: 24px;
}
.back_btn_txt {
  font-size: 14px;
}
</style>
