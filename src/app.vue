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

// ===
// Base element styles
// ===

a {
  text-decoration: none;
}
a:visited {
  color: $color-link-text;
}
a:hover {
  text-decoration: none;
}

h1 {
  @extend %typography-xxlarge;
}

h2 {
  @extend %typography-xlarge;
}

h3 {
  @extend %typography-large;
}

h4 {
  @extend %typography-medium;
}

h5,
h6 {
  @extend %typography-small;
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
  overflow-x: hidden;
}
.screen {
  height: 100vh;
  max-height: 100%;
  padding-top: 80px;
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
.height_wrap {
  align-items: flex-start;
  height: 100%;
}
// ===
// Vendor
// ===

#nprogress .bar {
  background: $color-body-bg;
}
</style>
