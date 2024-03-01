import { defineStore } from "pinia";
import login from "@/api/login";
import { UserType } from "@/types/user/UserType.js";
import axios from '../api/axios.js'

export const useUserStore = defineStore("user", {
  state: (): UserType => {
    return {
      siteId: "",
      accessToken: "",
      isUserConnected: false,
    };
  },
  persist: true,
  actions: {
    async login(username: string, password: string) {
      try {
        const userData = await login(username, password);
        this.siteId = userData.siteId
        this.accessToken = userData.accessToken
        this.isUserConnected = userData.isUserConnected;
        axios.defaults.headers.common["X-Tableau-Auth"] = `${userData.accessToken}`
      } catch (error) {
        //TODO: Error handling
        console.log(error);
        this.isUserConnected = false;
        return error;
      }
    },
  },
});
