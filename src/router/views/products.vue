<script>
import axios from 'axios'
export default {
  data() {
    return {
      products: null,
      categories: null,

      isActiveProduct: true,
      isActiveCategory: false,

      isLoading: false,
    }
  },
  created() {
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
    async getProducts() {
      this.isLoading = true
      const userId = localStorage.getItem('user_id')
      await axios
        .get('http://127.0.0.1:8000/api/users/' + `${userId}/` + 'products/')
        .then((response) => (this.products = response.data))

      this.isLoading = false
    },
    async getCategories() {
      if (this.categories == null) {
        this.isLoading = true
        const userId = localStorage.getItem('user_id')
        await axios
          .get(
            'http://127.0.0.1:8000/api/users/' + `${userId}/` + 'categories/'
          )
          .then((response) => (this.categories = response.data))
        this.isLoading = false
      }
    },
  },
}
</script>

<template>
  <div class="col-10 main_screen">
    <div class="main_screen_title">
      Товары
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
            @click=";[toggleCategory(), getCategories()]"
            >Категории</button
          >
        </div>
        <div class="btn_button_list">
          <RouterLink class="btn add_btn" to="/add-product"
            >+ Новый товар</RouterLink
          >
          <RouterLink class="btn add_btn" to="/add-category"
            >+ Новая категория</RouterLink
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
                ><img :src="product.image_cover.image_small"
              /></div>
              <div class="item_title col-3">{{ product.title }}</div>
              <div class="item_category col-2">{{ product.category }}</div>
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
              <div class="item_img"><img :src="category.image_small"/></div>
              <div class="item_title col-3">{{ category.title }}</div>
              <div class="item_count">{{ category.products.length }} шт.</div>
            </div>
          </RouterLink>
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
  border-bottom: 2px solid #0057d6;
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
  background-color: #0057d6;
  border-radius: 20px;
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
  overflow-y: auto;
}
</style>
