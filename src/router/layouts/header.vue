<template>
  <div class="header_bar col-12">
    <div class="header_bar_left">
      <div class="logo_wrap col-2">
        <div class="logo">
          <img src="@assets/Sh..svg" alt="" />
        </div>
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
    </div>
  </div>
</template>

<style lang="scss">
@import '@design';
.logo {
  width: 80px;
  padding: 10px;
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
  width: 100%;
}
.header_search {
  margin-left: 25px;
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
  width: 40px;
  padding: 8px;
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
  width: 25px;
  margin-right: 5px;
}
.header_bar_right {
  display: flex;
  align-items: center;
}
</style>
