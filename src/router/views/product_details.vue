<script>
import appConfig from '@src/app.config'
import axios from 'axios'
import Menu from '@layouts/menu.vue'
import Header from '@layouts/header.vue'
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
      title: '',
      price: '',
      description: '',
      files: '',

      product: null,
    }
  },
  created() {
    this.getProduct(this.id)
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
          <div class="header_wrap">
            <div class="header_wrap_wrap">
              <RouterLink class="back_btn" to="/home">
                <div class="back_btn_icn"
                  ><img src="@assets/keyboard_arrow_left-24px.svg" alt=""
                /></div>
                <div class="back_btn_txt">Товары</div>
              </RouterLink>
              <div class="main_screen_title">
                {{ product.title }}
              </div>
            </div>
            <button
              type="submit"
              class="btn save_btn"
              @click="submitForm($event)"
            >
              Сохранить
            </button>
          </div>

          <div class="row product-details-wrap">
            <div class="input_title_wrap">
              <div class="input_title">
                <div class="input_txt">Название товара*</div>
                <input type="text" maxlength="100" :value="product.title"
              /></div>
              <div class="date_created">{{ product.date_created }}</div>
            </div>

            <div class="input_price">
              <div class="input_txt">Цена*</div>
              <div class="input_price_wrap">
                <input
                  type="number"
                  class="input_price"
                  :value="product.price"
                />
                <span>.руб</span></div
              >
            </div>
            <div class="input_desc_wrap">
              <div class="input_txt">Описание</div>
              <textarea
                type="text"
                class="input_desc"
                :value="product.description"
            /></div>

            <!-- <select v-model="product.category">
              <option>А</option>
              <option>Б</option>
              <option>В</option>
            </select> -->
            <div class="input_media">
              <div class="input_media_wrap">
                <div class="input_txt">Изображения*</div>
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
.product-details-wrap {
  padding-right: 25px;
}
.date_created {
  width: 95px;
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
  margin-top: 10px;
  margin-right: 15px;
}
.img_product {
  border: 1px solid rgba(161, 159, 176, 0.2);
  border-radius: 12px;
  object-fit: cover;
}
.imageDefault img {
  border: 3px solid $primary-color;
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
  width: 120px;
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
</style>
