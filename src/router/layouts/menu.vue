<template>
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
        ><RouterLink to="/">
          <div class="menu_item_icn">
            <img src="@assets/Buy.svg" alt="" />
          </div>
          <div class="menu_item_txt">
            Товары
          </div></RouterLink
        ></li
      >
      <li
        ><RouterLink to="/orders">
          <div class="menu_item_icn">
            <img src="@assets/Bag.svg" alt="" />
          </div>
          <div class="menu_item_txt">
            Заказы
          </div></RouterLink
        ></li
      >
      <li
        ><RouterLink to="/publication">
          <div class="menu_item_icn">
            <img src="@assets/Upload.svg" alt="" />
          </div>
          <div class="menu_item_txt">
            Публикация
          </div></RouterLink
        ></li
      >
    </ul>
    <RouterLink to="/settings" class="settings">
      <div class="menu_item_icon">
        <img src="@assets/Filter Icon.svg" alt="" />
      </div>
      <div class="menu_item_txt">
        Настройки
      </div>
    </RouterLink>
  </div>
</template>

<style lang="scss">
@import '@design';

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
</style>
