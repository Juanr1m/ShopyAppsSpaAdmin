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
      file: '',
    }
  },
  methods: {
    addNewCategory() {
      const userId = localStorage.getItem('userId')
      const formData = new FormData()
      formData.append('image', this.file)
      formData.append('title', this.title)
      formData.append('id', userId)

      axios
        .post('http://127.0.0.1:8000/api/categories/', formData)
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
          <div class="header_wrap">
            <div class="header_wrap_wrap">
              <RouterLink class="back_btn" to="/home">
                <div class="back_btn_icn"
                  ><img src="@assets/keyboard_arrow_left-24px.svg" alt=""
                /></div>
                <div class="back_btn_txt">Товары</div>
              </RouterLink>
              <div class="main_screen_title noborder">
                Добавить новую категорию
              </div>
            </div>
            <button class="btn save_btn" @click="addNewCategory">
              Сохранить
            </button>
          </div>

          <div class="row scroll">
            <template>
              <div class="input_title">
                <div class="input_txt">Название категории*</div>
                <input v-model="title" type="text" maxlength="100"
              /></div>

              <div class="input_media">
                <div class="input_media_wrap">
                  <div class="input_txt">Изображение*</div>
                  <div class="btn">
                    <button @click="addFiles">Добавить</button>
                  </div>

                  <input
                    id="files"
                    ref="files"
                    type="file"
                    @change="handleFilesUpload"
                  />
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@design';

.header_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
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

.input_title {
  padding: 10px 10px 10px 0;
  margin-top: 5px;
  margin-right: 25px;
  margin-bottom: 15px;
  input {
    width: 100%;
    padding-bottom: 5px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.08);
  }
  input:focus {
    border-bottom: 2px solid #000;
  }
}
.noborder {
  border: none;
}
.input_media {
  margin-top: 15px;
  .input_media_wrap {
    display: flex;
    justify-content: space-between;
    width: 450px;
  }
}
</style>
