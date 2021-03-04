<script>
import appConfig from '@src/app.config'
import axios from 'axios'
import Menu from '@layouts/menu.vue'
import Header from '@layouts/header.vue'
export default {
  page: {
    title: 'Add new category',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Header, Menu },
  data() {
    return {
      title: '',
      image: '',
    }
  },
  methods: {
    handleFileUpload() {
      this.image = this.$refs.file.files[0]
    },
    addNewCategory() {
      const token = localStorage.getItem('token')
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('title', this.title)

      axios
        .post('http://127.0.0.1:8000/api/categories/', formData, {
          headers: {
            Authorization: 'Token' + token,
          },
        })
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
            Добавить новую категорию
          </div>
          <div class="row scroll">
            <form @submit.prevent="addNewCategory">
              <BaseInputText
                v-model="title"
                name="title"
                required
                type="text"
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
.scroll {
  overflow: scroll;
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
</style>
