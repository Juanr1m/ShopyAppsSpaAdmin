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
      product: null,
    }
  },
  created() {
    this.getProduct(this.id)
  },
  methods: {
    getProduct(id) {
      axios(this.endpoint)
        .then((response) => {
          this.product = response.data
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
            {{ product.title }}
          </div>
          <div class="row product-details-wrap">
            <div class="date_created">{{ product.date_created }}</div>
            <input
              type="text"
              class="input_title"
              maxlength="100"
              :value="product.title"
            />
            <div class="input_desc_wrap">
              <div class="input_text_title">Описание*</div>
              <textarea
                type="text"
                class="input_desc"
                :value="product.description"
            /></div>

            <input type="number" :value="product.price" class="input_price" />
            <select v-model="product.category">
              <option>А</option>
              <option>Б</option>
              <option>В</option>
            </select>
            <div
              v-for="(image, index) in product.images"
              :key="image.id"
              class="img_product_wrap"
              :class="{ imageDefault: image.is_cover }"
            >
              <img
                :src="product.images[index].image_medium"
                class="img_product"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@design';
.product-details-wrap {
  padding-right: 25px;
}
.date_created {
  margin-top: 5px;
  text-align: right;
}
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
  margin-top: 25px;
  margin-right: 15px;
}
.img_product {
  border: 1px solid rgba(161, 159, 176, 0.2);
  border-radius: 12px;
  object-fit: cover;
}
.imageDefault img {
  border: 3px solid #0057d6;
}
.input_title {
  padding: 10px 10px 10px 0;
  margin-right: 25px;
  margin-bottom: 25px;
  background: transparent;
  border: none;
  border-bottom: 2px solid #000;
  outline: none;
}
.input_desc {
  display: block;
  width: 100%;
  height: 100%;
  padding: 10px 10px 10px 0;
  background: transparent;
  border: none;
  outline: none;
}
.input_price {
  padding: 10px 10px 10px 0;
  background: transparent;
  border: none;
  outline: none;
}
.input_desc_wrap {
  height: 150px;
  padding: 16px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  transition: all 300ms ease-out;
}
.input_text_title {
  color: #a19fb0;
}
</style>
