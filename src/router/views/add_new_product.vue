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

      files: [],
    }
  },
  methods: {
    handleFilesUpload() {
      const uploadedFiles = this.$refs.files.files

      /*
          Adds the uploaded file to the files array
        */
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i])
      }
    },

    /*
        Removes a select file the user has uploaded
      */
    removeFile(key) {
      this.files.splice(key, 1)
    },
    addFiles() {
      this.$refs.files.click()
    },

    addNewProduct() {
      const userId = localStorage.getItem('userId')
      const formData = new FormData()

      formData.append('title', this.title)
      formData.append('price', this.price)
      formData.append('description', this.description)
      formData.append('id', userId)
      formData.append('images', this.files)

      axios
        .post('http://127.0.0.1:8000/api/products/', formData)
        .then((response) => {
          console.log(response.data)
          this.files = []
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
          <div class="header_wrap">
            <div class="header_wrap_wrap">
              <RouterLink class="back_btn" to="/home">
                <div class="back_btn_icn"
                  ><img src="@assets/keyboard_arrow_left-24px.svg" alt=""
                /></div>
                <div class="back_btn_txt">Товары</div>
              </RouterLink>
              <div class="main_screen_title noborder">
                Добавить новый товар
              </div>
            </div>
            <button class="btn save_btn" @click="addNewProduct">
              Сохранить
            </button>
          </div>

          <div class="row scroll">
            <template>
              <div class="input_title">
                <div class="input_txt">Название товара*</div>
                <input v-model="title" type="text" maxlength="100"
              /></div>
              <div class="input_price">
                <div class="input_txt">Цена*</div>
                <div class="input_price_wrap">
                  <input v-model="price" type="number" class="input_price" />
                  <span>.руб</span></div
                >
              </div>
              <div class="input_desc_wrap">
                <div class="input_txt">Описание</div>
                <textarea v-model="description" type="text" class="input_desc"
              /></div>
              <div class="input_media">
                <div class="input_media_wrap">
                  <div class="input_txt">Картинки*</div>
                  <div class="btn">
                    <button @click="addFiles">Добавить</button>
                  </div>
                  <div class="large-12 medium-12 small-12 cell">
                    <div
                      v-for="(file, key) in files"
                      :key="file.key"
                      class="file-listing"
                      >{{ file.name }}
                      <span class="remove-file" @click="removeFile(key)"
                        >Remove</span
                      ></div
                    >
                  </div>
                  <input
                    id="files"
                    ref="files"
                    type="file"
                    multiple
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
input[type='file'] {
  position: absolute;
  top: -500px;
}
.pt {
  padding-top: 20px;
}
.header_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
.input_desc {
  display: block;
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
}

.input_desc_wrap {
  height: 150px;
  padding: 5px;
  margin-right: 25px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  transition: all 300ms ease-out;
}
.input_txt {
  display: inline-box;
  margin-bottom: 5px;
  margin-left: 5px;
  font-size: 14px;
  color: #58585c;
}
.input_price {
  width: 150px;
  margin-bottom: 15px;
  .input_price_wrap {
    display: flex;
    input {
      width: 100%;
      padding-bottom: 5px;
      margin-right: 5px;
      border-bottom: 2px solid rgba(0, 0, 0, 0.08);
    }
    input:focus {
      border-bottom: 2px solid #000;
    }
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
.save_btn {
  max-height: 40px;
  padding: 8px 16px;
  margin-left: 20px;
  color: white;
  background-color: #0057d6;
  border-radius: 20px;
}
.save_btn:visited {
  color: white;
  background-color: #0057d6;
}
.save_btn:hover {
  color: white;
  background-color: #153769;
}
div.file-listing {
  width: 200px;
}

span.remove-file {
  float: right;
  color: red;
  cursor: pointer;
}
</style>
