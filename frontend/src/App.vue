<template>
  <header>
    <div class="wrapper">
      <h1>Labs</h1>
      <nav v-if="!isLoggedIn">
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </nav>
      <nav v-else>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/import">Import</RouterLink>
        <RouterLink to="/export">Export</RouterLink>
        <RouterLink to="/data">Data</RouterLink>
        <RouterLink to="/logout" @click.prevent="handleLogout">Logout</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { useUserStore } from './stores/user';
import { logout } from './services/auth'
import { computed } from 'vue';
 
const userStore = useUserStore();
const router = useRouter();

const isLoggedIn = computed(() => userStore.isLoggedIn);

const handleLogout = async () => {
  try {
    await logout();
    userStore.setLoggedInStatus(false);
    router.push('/login');
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 1rem;
  text-align: right;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

</style>
