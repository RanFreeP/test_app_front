<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div class="container">
        <img src="https://bootstrap-5.ru/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Bootstrap" width="30" height="24">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Переключатель навигации">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Главная</a>
            </li>
          </ul>
          <form v-if="!authenticated" class="d-flex" @submit.prevent="authenticate">
            <input class="form-control me-2" :class="{ 'is-invalid': loginState }" id="formLogin" v-model="user.username" type="text" placeholder="Логин" aria-label="Логин" required>
            <input class="form-control me-2" :class="{ 'is-invalid': passwordState }" id="formPass" v-model="user.password" type="password" placeholder="Пароль" aria-label="Пароль" required>
            <button v-if="loadingForm" class="btn btn-outline-success" type="button" disabled>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </button>
            <button v-else class="btn btn-outline-success" type="submit" :disabled="loginState || passwordState">Войти</button>
          </form>
          <div v-if="authenticated">
            <span class="m-3" style="color:#ffffff;">{{userMe.username}}</span>
            <button class="btn btn-outline-success" @click="logout" type="submit">Выйти</button>
          </div>
        </div>
      </div>
    </nav>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "NavbarComponent",

  computed: {
    ...mapGetters({
      authenticated: 'authenticated',
      userMe: 'profileMe'
    }),
    loginState() {
        return this.user.username.length <= 4;
    },
    passwordState() {
        return this.user.password.length <= 5;
    }
  },

  data() {
    return {
      user: {
        username: '',
        password: ''
      },

      loadingForm: false,

      error: {
        errorPhone: null,
        errorPassword: null,
        errorMassage: null,
      }
    }
  },

  methods: {
    async logout() {
      try {
        await this.$store.dispatch('logout');
      } catch (data) {
        this.error = data;
      } finally {
        this.loading = false
      }
    },
    async authenticate() {
        this.loadingForm = true;
        try {
          await this.$store.dispatch('login', this.user).catch(response => {
            if(response.code==='ERR_NETWORK')
              this.makeToast('Сервер не отвечает!');

            if(response.status === 401) {
              this.makeToast('Не правильный логин или пароль');
            }

          })
        } catch (data) {
          this.error.errorMassage = data;

          this.makeToast(this.error.errorMassage);
        } finally {
          this.loadingForm = false;
        }
    },

    makeToast(message) {
      console.log(message)
    },
  },
}
</script>

<style scoped>

</style>