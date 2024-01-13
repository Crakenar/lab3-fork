<template>
  <div class="login-container">
    <form @submit.prevent="handleRegister" class="login-form">
      <h2>Register</h2>

      <div class="input-group">
        <label for="username">Username:</label>
        <input id="username" v-model="username" type="text" required />
      </div>

      <div class="input-group">
        <label for="username">Email:</label>
        <input id="email" v-model="email" type="email" @blur="validateEmail" required />
        <p v-if="emailError" style="color: red">{{ emailError }}</p>
      </div>

      <div class="input-group">
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" required />
        <p v-if="passwordError" style="color: red">{{ passwordError }}</p>
      </div>

      <div class="input-group">
        <label for="passwordConfirm">Confim Password:</label>
        <input id="passwordConfirm" v-model="passwordConfirm" type="password" required />
        <p v-if="passwordConfirmError" style="color: red">{{ passwordConfirmError }}</p>
      </div>

      <button type="submit" class="login-button">Register</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { register } from './../services/auth'
const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')

const emailError = ref('')
const passwordError = ref('')
const passwordConfirmError = ref('')

const validEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const validEmailFormat = emailRegex.test(email.value)
  emailError.value = email.value === '' ? 'Email is required' : !validEmailFormat ? 'Invalid email format' : null;
  return emailError.value === null;
}

const validPasswords = () => {
  passwordError.value = password.value === '' ? 'Password is required' : null
  console.log(password.value, passwordConfirm.value);
  
  passwordConfirmError.value = password.value !== passwordConfirm.value ? 'Passwords do not match' : null
  return passwordError.value === null && passwordConfirmError.value === null;
}

const handleRegister = () => {
  if (validEmail() && validPasswords()) {
    register({
      username: username.value,
      email: email.value,
      password: password.value
    }).then(
      (res) => {
        console.log('Register successful Redirect to login page', res)
        router.push('/login')
      },
      (error: any) => {
        //need more data from server to show why it did not work
        console.log(error)
      }
    )
  }
}
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

.login-form h2 {
  color: rgba(0, 0, 0, 0.6);
}

.input-group {
  margin-bottom: 15px;
  padding: 0.5rem 0;
}

.input-group label {
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.6);
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
  background-color: rgb(6, 104, 71);
}
</style>
