<script>
import appConfig from '@src/app.config'
import axios from 'axios'
import Menu from '@layouts/menu.vue'
import Header from '@layouts/header.vue'
import { toast } from 'bulma-toast'
export default {
  page: {
    title: 'Редактировать',
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
      title: '',

      file: '',
    }
  },
  created() {
    this.getCategory(this.id)
  },
  methods: {
    addFiles() {
      this.$refs.files.click()
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
    },
    getCategory(id) {
      axios(this.endpoint)
        .then((response) => {
          this.category = response.data
          this.title = this.category.title
          this.file = this.category.image.file
        })
        .catch((error) => console.log(error))
    },
    deleteCategory() {
      const token = localStorage.getItem('token')
      axios
        .delete(this.endpoint, {
          headers: { Authorization: 'Token ' + token },
        })
        .then(
          this.$router.push('/home'),
          toast({
            message: 'Категория удалена',
            type: 'toast_dng',
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: 'bottom-right',
          })
        )
        .catch((error) => console.log(error))
    },
    editCategory() {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      const formData = new FormData()

      formData.append('title', this.title)
      formData.append('image', this.file)
      formData.append('id', userId)

      axios
        .put(this.endpoint, formData, {
          headers: { Authorization: 'Token ' + token },
        })
        .then(
          this.$router.push('/home'),
          toast({
            message: 'Категория изменена',
            type: 'toast_success',
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: 'bottom-right',
          })
        )
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
              <div class="main_screen_title">
                {{ category.title }}
              </div></div
            >
            <div class="header_btn_wrap">
              <a class="btn delete_btn" @click="deleteCategory">Удалить</a>
              <button class="btn save_btn" @click="editCategory">
                Сохранить
              </button>
            </div>
          </div>
          <div class="row">
            <div class="date_created">{{ category.date_created }}</div>
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
.header_btn_wrap {
  display: flex;
  justify-content: space-between;
  width: 250px;
}
.input_txt {
  display: inline-box;
  margin-bottom: 5px;
  margin-left: 5px;
  font-size: 14px;
  color: #58585c;
}
.input_title {
  width: 100%;
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
.header_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header_wrap_wrap {
    width: 100%;
  }
}
.input_title_wrap {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
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
