<script>
import appConfig from '@src/app.config'
import axios from 'axios'

export default {
  page: {
    title: 'Войти',
    meta: [{ name: 'description', content: `Log in to ${appConfig.title}` }],
  },
  data() {
    return {
      email: '',
      password: '',
      errors: [],
      tryingToLogIn: false,
    }
  },
  methods: {
    async submitForm() {
      this.tryingToLogIn = true
      this.errors = []
      axios.defaults.headers.common.Authorization = ''
      localStorage.removeItem('token')
      const formData = {
        email: this.email,
        password: this.password,
      }
      await axios
        .post('http://127.0.0.1:8000/api/users/auth/token/login/', formData)
        .then((response) => {
          this.tryingToLogIn = false
          const token = response.data.auth_token
          const userId = response.data.id
          this.$store.commit('setToken', token)
          this.$store.commit('setUserId', userId)

          axios.defaults.headers.common.Authorization = 'Token ' + token
          localStorage.setItem('token', token)
          localStorage.setItem('userId', userId)
          const toPath = this.$route.query.to || '/home'
          this.$router.push(toPath)
        })
        .catch((error) => {
          this.tryingToLogIn = false
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[property]}`)
            }
          } else {
            this.errors.push('Something went wrong. Please try again')

            console.log(JSON.stringify(error))
          }
        })
    },
  },
}
</script>

<template>
  <div class="wrapper_login">
    <a class="logo_login" href="/">
      <img
        src="https://uploads.quarkly.io/5fca1c30f8ae59001fb0c043/images/ShopyApps..png?v=2020-12-11T10:59:29.018Z"
        alt=""
      />
    </a>
    <div class="form_box">
      <div class="form_box_titles">
        <div class="form_box_titles_text">Ваш мобильный магазин</div>
        <div class="signup_btn">
          <RouterLink to="/signup" class="sign_up_txt"
            >Зарегистрироваться</RouterLink
          >
          <div class="sign_up_icn">
            <img src="@assets/keyboard_arrow_right-24px.svg" />
          </div>
        </div>
      </div>
      <form @submit.prevent="submitForm">
        <div class="form_item">
          <div class="form_item_title">
            Email
          </div>
          <BaseInputText
            v-model="email"
            name="email"
            required
            type="email"
            placeholder="Введите свою электронную почту"
          />
        </div>
        <div class="form_item">
          <div class="form_item_title">
            Пароль
          </div>
          <BaseInputText
            v-model="password"
            name="password"
            required
            type="password"
            placeholder="Введите пароль"
          />
        </div>
        <RouterLink to="/forget-password" class="forgot_password_link"
          >Забыли пароль?</RouterLink
        >
        <BaseButton :disabled="tryingToLogIn" type="submit" class="login_btn"
          >Войти</BaseButton
        >
      </form>
    </div>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans&display=swap');
@import '@design';
.form_box input {
  padding: 0;
  border: none;
  outline: none;
}

.wrapper_login {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form_box {
  width: 578px;
  padding: 60px 60px 60px 60px;
  margin: 0 0 30px 0;
  background: #fff;
  border: 1px solid #eaeaef;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgb(18 16 37 / 7%);
}
.logo_login {
  display: block;
  width: 150px;
  margin: 45px 0 40px 0;
}
.form_box_titles {
  display: flex;
  align-content: center;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 32px;
}

.form_item {
  padding: 0 16px 0 16px;
  margin: 16px 0 16px 0;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
}
.form_item_title {
  margin: 16px 0 10px 0;
  font: 13px/1 sans-serif;
  color: #a19fb0;
}
.form_item input {
  width: 100%;
  height: 24px;
  margin: 0 0 16px 0;
  font-size: 15px;
  line-height: 1.5;
}
.forgot_password_link {
  display: block;
  margin: 16px 0 32px 0;
  font: 15px/13px sans-serif;
  color: #a19fb0;
}
.login_btn {
  width: 100%;
  height: 56px;
  padding: 8px 22px 8px 22px;
  margin-top: 15px;
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  color: #f7fbff;
  background: $primary-color;
  border-radius: 8px;
}
.signup_btn {
  display: flex;
  align-content: center;
}
.sign_up_txt {
  font-family: 'Roboto', sans-serif;
  font-size: 13px;
  color: $primary-color;
}

.form_box_titles_text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 18px;
}
</style>
