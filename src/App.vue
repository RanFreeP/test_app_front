<template>
  <NavbarComponent/>
  <router-view />
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent";
export default {
  name: 'App',

  components: {
    NavbarComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

a {
  font-weight: bold;
  color: #2c3e50;
}
}
</style>
