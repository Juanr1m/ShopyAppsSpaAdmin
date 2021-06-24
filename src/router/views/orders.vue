<script>
import appConfig from '@src/app.config'
import axios from 'axios'
import Menu from '@layouts/menu.vue'
import Header from '@layouts/header.vue'
export default {
  page: {
    title: 'Заказы',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Header, Menu },
  data() {
    return {
      orders: null,

      isActiveTab: true,
      isAllTab: false,

      isLoading: false,
      isDropdown: false,
    }
  },
  methods: {
    async getOrders() {
      this.isLoading = true
      const userId = localStorage.getItem('userId')
      await axios
        .get('http://127.0.0.1:8000/api/users/' + `${userId}/` + 'products/')
        .then((response) => (this.products = response.data))

      this.isLoading = false
    },
    toggleActiveOrders: function() {
      if (this.isAllTab) {
        this.isActiveTab = !this.isActiveTab
        this.isAllTab = false
      }
    },
    toggleAllOrders: function() {
      if (this.isActiveTab) {
        this.isActiveTab = !this.isActiveTab
        this.isAllTab = true
      }
    },
    dropdown: function() {
      if (!this.isDropdown) {
        this.isDropdown = true
      } else {
        this.isDropdown = false
      }
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
        <div class="col-10 main_screen">
          <div class="main_screen_title">
            Заказы
          </div>
          <div class="row height_wrap">
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
                  :class="{ active: isActiveTab }"
                  @click=";[toggleActiveOrders()]"
                  >Активные</button
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
                  :class="{ active: isAllTab }"
                  @click=";[toggleAllOrders()]"
                  >Все</button
                >
              </div>
              <div class="dropdown">
                <button
                  id="dropdownMenuButton"
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  @click="dropDown"
                >
                  Dropdown button
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>
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
                <div v-if="isLoading" class="lds-ring"
                  ><div></div><div></div><div></div><div></div
                ></div>
                <RouterLink
                  v-for="product in products"
                  :key="product.title"
                  class="item_block"
                  :to="{
                    name: 'product-details',
                    params: { endpoint: product.url },
                  }"
                >
                  <div class="item_wrap">
                    <div class="item_img"
                      ><img
                        :src="
                          'http://127.0.0.1:8000' +
                            product.image_cover.image_small
                        "
                    /></div>
                    <div class="item_title col-3">{{ product.title }}</div>
                    <div class="item_category col-2">{{
                      product.category
                    }}</div>
                    <div class="item_price">{{ product.price }} руб.</div>
                  </div>
                </RouterLink>
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
                <div v-if="isLoading" class="lds-ring"
                  ><div></div><div></div><div></div><div></div
                ></div>
                <RouterLink
                  v-for="category in categories"
                  :key="category.title"
                  class="item_block"
                  :to="{
                    name: 'category-details',
                    params: { endpoint: category.url },
                  }"
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
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@design';

.tabs_product {
  padding-bottom: 28px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
.nav-tabs .nav-link {
  border-bottom: 2px solid transparent;
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
  border-bottom: 2px solid $primary-color;
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
  background-color: $primary-color;
  border-radius: 20px;
}
.add_btn:visited {
  color: white;
  background-color: $primary-color;
}
.add_btn:hover {
  color: white;
  background-color: #153769;
}
.item_wrap {
  display: flex;
  align-items: center;
  padding: 12px;
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
  img {
    border-radius: 8px;
  }
}
.item_title {
  font-size: 15px;
}

.info_bar {
  display: flex;
  padding-left: 12px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 600;
}
.space {
  width: 50px;
  margin-right: 10px;
}
.tab-pane {
  height: 65vh;
  padding-bottom: 20px;
  overflow-y: auto;
}
</style>
