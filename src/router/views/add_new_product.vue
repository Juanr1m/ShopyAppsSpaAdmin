<script>
import appConfig from '@src/app.config'
import axios from 'axios'
import Menu from '@layouts/menu.vue'
import Header from '@layouts/header.vue'
export default {
  page: {
    title: 'Add new product',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Header, Menu },
  data() {
    return {
      id: '',
      title: '',
      description: '',
      price: null,

      image: '',
    }
  },
  methods: {
    handleFileUpload() {
      this.image = this.$refs.file.files[0]
    },
    async addNewProduct() {
      const userId = localStorage.getItem('userId')
      const formData = new FormData()

      formData.append('title', this.title)
      formData.append('price', this.price)
      formData.append('description', this.description)
      formData.append('id', userId)

      await axios
        .post('http://127.0.0.1:8000/api/products/', formData)
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => console.warn(error))

      const formDataImages = new FormData()
      formDataImages.append('id', this.id)
      formDataImages.append('image', this.image)
      formDataImages.append('is_cover', true)
      axios
        .post('http://127.0.0.1:8000/api/product-images/', formDataImages)
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
        <Menu></Menu>
        <div class="col-10 main_screen pt">
          <RouterLink class="back_btn" to="/home">
            <div class="back_btn_icn"
              ><img src="@assets/keyboard_arrow_left-24px.svg" alt=""
            /></div>
            <div class="back_btn_txt">Товары</div>
          </RouterLink>
          <div class="main_screen_title">
            Добавить новый товар
          </div>
          <div class="row scroll">
            <form @submit.prevent="addNewProduct">
              <input
                v-model="title"
                type="text"
                class="input_title"
                maxlength="100"
              />
              <div class="input_desc_wrap">
                <div class="input_text_title">Описание*</div>
                <textarea v-model="description" type="text" class="input_desc"
              /></div>
              <input
                v-model="price"
                type="number"
                class="input_price"
                placeholder=".руб"
              />

              <input
                id="file"
                ref="file"
                type="file"
                @change="handleFileUpload"
              />

              <button type="submit">Добавить</button>
            </form>
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
