import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const isLoggedIn: Ref<boolean> = ref(false);
  const setLoggedInStatus = async (status: boolean = false) => {
    isLoggedIn.value = status;
  }

  return { isLoggedIn, setLoggedInStatus }
})