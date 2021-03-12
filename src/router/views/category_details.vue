<script>
import appConfig from '@src/app.config'
import axios from 'axios'
import Menu from '@layouts/menu.vue'
import Header from '@layouts/header.vue'
export default {
  page: {
    title: 'Publication',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Header, Menu },
  props: {
    endpoint: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      category: null,
    }
  },
  created() {
    this.getCategory(this.id)
  },
  methods: {
    getCategory(id) {
      axios(this.endpoint)
        .then((response) => {
          this.category = response.data
        })
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
        <div class="col-10 main_screen pt">
          <RouterLink class="back_btn" to="/home">
            <div class="back_btn_icn"
              ><img src="@assets/keyboard_arrow_left-24px.svg" alt=""
            /></div>
            <div class="back_btn_txt">Товары</div>
          </RouterLink>
          <div class="main_screen_title">
            {{ category.title }}
          </div>
          <div class="row">
            <div class="date_created">{{ category.date_created }}</div>
            <input type="text" :value="category.title" />
            <div class="img_product_wrap">
              <img :src="category.image_medium" class="img_product" />
            </div>
          </div>
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
.img_product_wrap {
  width: 112px;
  height: 112px;
}
.img_product {
  border: 1px solid rgba(161, 159, 176, 0.2);
  border-radius: 12px;
  object-fit: cover;
}
</style>
