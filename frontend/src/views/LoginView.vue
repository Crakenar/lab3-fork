<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2>Login</h2>

      <div class="input-group">
        <label for="username">Username:</label>
        <input id="username" v-model="username" type="text" />
      </div>

      <div class="input-group">
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" />
      </div>

      <button type="submit" class="login-button">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { login } from './../services/auth';
import { useRouter } from 'vue-router';
import { useUserStore } from './../stores/user';

const { setLoggedInStatus } = useUserStore();

const username = ref('');
const password = ref('');

const router = useRouter();

const handleLogin = () => {
  login({ username: username.value, password: password.value })
    .then(
      (res) => {
        console.log('Login successful', res);
        setLoggedInStatus(true);
        router.push('/');
      },
      (error: any) => {
        console.log(error);
      }
    );
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.login-form {
  width: 600px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.input-group {
  margin-bottom: 15px;
  padding: 0.5rem 0;
}

.input-group label {
  margin-right: 10px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.login-button:hover {
  background-color: rgb(6, 104, 71);;
}
</style>