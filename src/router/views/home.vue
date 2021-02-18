<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main.vue'
import axios from 'axios'
export default {
  page: {
    title: 'Home',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout },
  data() {
    return {
      categories: null,
      products: null,

      isActiveProduct: true,
      isActiveCategory: false,
    }
  },
  created() {
    this.getCategories()
    this.getProducts()
  },
  methods: {
    toggleProduct: function() {
      if (this.isActiveCategory) {
        this.isActiveProduct = !this.isActiveProduct
        this.isActiveCategory = false
      }
    },
    toggleCategory: function() {
      if (this.isActiveProduct) {
        this.isActiveProduct = !this.isActiveProduct
        this.isActiveCategory = true
      }
    },
    getCategories() {
      axios
        .get('http://127.0.0.1:8000/api/categories/')
        .then((response) => (this.categories = response.data))
        .catch((error) => console.log(error))
    },
    getProducts() {
      axios
        .get('http://127.0.0.1:8000/api/products/')
        .then((response) => (this.products = response.data))
        .catch((error) => console.log(error))
    },
  },
}
</script>

<template>
  <Layout>
    <div class="wrapper">
      <div class="screen">
        <div class="header_bar col-12">
          <div class="header_bar_left">
            <div class="logo">
              <img src="@assets/Sh..svg" alt="" />
            </div>
            <div class="header_search">
              <div class="search_input">
                <input type="text" placeholder="Поиск" />
                <div class="search_icn"
                  ><img src="@assets/search-24px.svg" alt=""
                /></div>
              </div>
            </div>
          </div>
          <div class="header_bar_right">
            <button class="notify_btn">
              <img src="@assets/notification on.svg" alt="" />
            </button>
            <a href="#!" class="btn_profile">
              <div class="profile_icn">
                <img src="@assets/Profile.svg" alt="" />
              </div>
              <div class="profile_txt">
                Профиль
              </div>
            </a>
          </div>
        </div>
        <div class="row">
          <div class="col-2 menu">
            <ul>
              <li
                ><a href="#!">
                  <div class="menu_item_icn">
                    <img src="@assets/Activity.svg" alt="" />
                  </div>
                  <div class="menu_item_txt">
                    Обзор
                  </div>
                </a></li
              >
              <li
                ><a href="#!">
                  <div class="menu_item_icn">
                    <img src="@assets/Buy.svg" alt="" />
                  </div>
                  <div class="menu_item_txt">
                    Товары
                  </div></a
                ></li
              >
              <li
                ><a href="#!">
                  <div class="menu_item_icn">
                    <img src="@assets/Bag.svg" alt="" />
                  </div>
                  <div class="menu_item_txt">
                    Заказы
                  </div></a
                ></li
              >
              <li
                ><a href="#!">
                  <div class="menu_item_icn">
                    <img src="@assets/Upload.svg" alt="" />
                  </div>
                  <div class="menu_item_txt">
                    Публикация
                  </div></a
                ></li
              >
            </ul>
            <a href="#!" class="settings">
              <div class="menu_item_icon">
                <img src="@assets/Filter Icon.svg" alt="" />
              </div>
              <div class="menu_item_txt">
                Настройки
              </div>
            </a>
          </div>
          <div class="col-10 main_screen">
            <div class="main_screen_title">
              Товары
            </div>
            <div class="row">
              <nav class="tab_bar tabs_bar">
                <div id="nav-tab" class="nav nav-tabs" role="tablist">
                  <button
                    id="nav-products-tab"
                    class="nav-link tab_products"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-home"
                    type="button"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                    :class="{ active: isActiveProduct }"
                    @click="toggleProduct"
                    >Список товаров</button
                  >
                  <button
                    id="nav-category-tab"
                    class="nav-link tab_products"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-profile"
                    type="button"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                    :class="{ active: isActiveCategory }"
                    @click="toggleCategory"
                    >Категории</button
                  >
                </div>
                <div class="btn_button_list">
                  <button class="btn add_btn" type="submit"
                    >+ Новый товар</button
                  >
                  <button class="btn add_btn" type="submit"
                    >+ Новая категория</button
                  >
                </div>
              </nav>
              <div id="nav-tabContent" class="tab-content">
                <div
                  id="nav-home"
                  class="tab-pane fade "
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                  :class="{ active: isActiveProduct, show: isActiveProduct }"
                >
                  <div class="info_bar">
                    <div class="space"></div>
                    <div class="span col-3">Название</div>
                    <div class="span col-2">Категория</div>
                    <div class="span">Цена</div>
                  </div>
                  <div
                    v-for="product in products"
                    :key="product.title"
                    class="item_block"
                  >
                    <div class="item_wrap">
                      <div class="item_img"
                        ><img :src="product.images[0].image_small"
                      /></div>
                      <div class="item_title col-3">{{ product.title }}</div>
                      <div class="item_category col-2">{{
                        product.category
                      }}</div>
                      <div class="item_price">{{ product.price }} руб.</div>
                    </div>
                  </div>
                </div>
                <div
                  id="nav-profile"
                  class="tab-pane fade"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                  :class="{ active: isActiveCategory, show: isActiveCategory }"
                >
                  <div class="info_bar">
                    <div class="space"></div>
                    <div class="span col-3">Название</div>
                    <div class="span col-2">Товары</div>
                  </div>
                  <div
                    v-for="category in categories"
                    :key="category.title"
                    class="item_block"
                  >
                    <div class="item_wrap">
                      <div class="item_img"
                        ><img :src="category.image_small"
                      /></div>
                      <div class="item_title col-3">{{ category.title }}</div>
                      <div class="item_count"
                        >{{ category.products.length }} шт.</div
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style lang="scss">
@import '@design';
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
.logo {
  width: 80px;
  padding: 10px;
}
.wrapper {
  overflow-x: hidden;
}
.screen {
  height: 100vh;
  max-height: 100%;
  padding-top: 40px;
}
.menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 50px;
  padding-bottom: 20px;
  background-color: #0043a4;
  border-radius: 0 15px 15px 0;
}
.menu ul li a {
  display: block;
  display: flex;
  align-items: center;
  padding: 15px 30px;
  margin-bottom: 10px;
  font-size: 18px;
  color: white;
}
.menu_item_icn {
  margin-right: 10px;
}
.menu ul li a:hover {
  background-color: #1069eb;
}
.main_screen {
  padding: 50px;
  padding-top: 40px;
}
.main_screen_title {
  padding-bottom: 15px;
  font-size: 26px;
  font-weight: 400;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
.tabs_product {
  padding-bottom: 28px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
.nav-tabs .nav-link:hover,
.nav-tabs .nav-link:focus {
  border-color: transparent;
}
.nav-tabs {
  border-bottom: 1px solid transparent;
}
.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  color: black;
  background-color: transparent;
  border-color: transparent;
  border-bottom: 2px solid #0043a4;
}

.tab_products {
  padding: 32px 0 24px;
  margin-right: 30px;
}
.tabs_bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
.add_btn {
  max-height: 40px;
  padding: 8px 16px;
  margin-left: 20px;
  color: white;
  background-color: #0043a4;
  border-radius: 20px;
}
.add_btn:hover {
  color: white;
  background-color: #153769;
}
.header_bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 70px;
  padding-top: 10px;
  padding-right: 50px;
  padding-bottom: 10px;
  padding-left: 20px;
  background-color: #edf2f6;
}
.header_bar_left {
  display: flex;
  align-items: center;
}
.header_search {
  margin-left: 260px;
}
.search_input {
  position: relative;
  width: 300px;
  height: 40px;
}
.search_input input {
  display: block;
  width: 100%;
  padding-right: 30px;
  padding-left: 16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 40px;
  color: #000;
  background-color: white;
  border: none;
  border-radius: 20px;
  outline: none;
}
.search_icn {
  position: absolute;
  top: 23%;
  right: 5%;
}
.notify_btn {
  padding: 10px;
  background-color: white;
  border-radius: 50%;
  box-shadow: rgb(0 0 0 / 10%) 0 10px 15px -3px;
}
.btn_profile {
  display: flex;
  align-items: center;
  padding: 6px 16px;
  margin-left: 20px;
  color: black;
  background-color: white;
  border-radius: 30px;
  box-shadow: rgb(0 0 0 / 10%) 0 10px 15px -3px;
}
.profile_icn {
  margin-right: 5px;
}

.settings {
  display: block;
  display: flex;
  align-items: center;
  padding: 15px 30px;
  margin-bottom: 10px;
  font-size: 18px;
  color: white;
}
.settings:hover {
  color: white;
  background-color: #1069eb;
}
.menu_item_icon {
  margin-right: 10px;
}
.header_bar_right {
  display: flex;
  align-items: center;
}

.item_wrap {
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
.item_wrap:hover {
  cursor: pointer;
  background-color: #dee3e8;
  border-bottom: 1px solid transparent;
}

.item_img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.item_title {
  font-size: 15px;
}

.info_bar {
  display: flex;
  padding-left: 12px;
  margin-top: 10px;
  font-weight: 600;
}
.space {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.row > * {
  width: 100%;
}
</style>
