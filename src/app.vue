<script>
import appConfig from '@src/app.config'

export default {
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === 'function' ? title(this.$store) : title
      return title ? `${title} | ${appConfig.title}` : appConfig.title
    },
  },
}
</script>

<template>
  <div id="app">
    <!--
    Even when routes use the same component, treat them
    as distinct and create the component again.
    -->
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<!-- This should generally be the only global CSS in the app. -->
<style lang="scss">
// Allow element/type selectors, because this is global CSS.
// stylelint-disable selector-max-type, selector-class-pattern

// Normalize default styles across browsers,
// https://necolas.github.io/normalize.css/
@import '~normalize.css/normalize.css';
// Style loading bar between pages.
// https://github.com/rstacruz/nprogress
@import '~nprogress/nprogress.css';

// Design variables and utilities from src/design.
@import '@design';

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  background: $color-body-bg;
}
#app {
  @extend %typography-small;
}
input[type='file'] {
  position: absolute;
  top: -500px;
}
// ===
// Base element styles
// ===

a {
  color: $color-link-text;
  text-decoration: none;
}
a:visited {
  color: $color-link-text;
}
a:hover {
  color: $color-link-text;
  text-decoration: none;
}

input {
  background-color: transparent;
  border: none;
  outline: none;
}

ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
img {
  width: 100%;
}
button {
  background: none;
  border: none;
  outline: none;
}

.wrapper {
  overflow: hidden;
}
.screen {
  height: 100vh;
  max-height: 100%;
  padding-top: 80px;
}
.main_screen {
  padding: 50px;
  padding-top: 20px;
}
.main_screen_title {
  padding-bottom: 15px;
  font-size: 26px;
  font-weight: 400;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
.height_wrap {
  align-items: flex-start;
  height: 100%;
}
.row {
  margin: 0;
}
.row > * {
  width: 100%;
}
.delete_btn {
  color: red;
}

.save_btn {
  max-height: 40px;
  padding: 8px 16px;
  margin-left: 20px;
  color: white;
  background-color: $primary-color;
  border-radius: 20px;
}
.save_btn:visited {
  color: white;
  background-color: $primary-color;
}
.save_btn:hover {
  color: white;
  background-color: #153769;
}

/* scrollbar */
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #dee3e8;
  border-radius: 5px;
}
// ===
// Vendor
// ===

#nprogress .bar {
  background: $color-body-bg;
}

.toast_success {
  padding: 25px 32px;
  font-size: 18px;
  color: white;
  background-color: #4bb543;
  border-radius: 10px;
}

.toast_dng {
  padding: 25px 32px;
  font-size: 18px;
  color: white;
  background-color: #df4759;
  border-radius: 10px;
}
</style>
