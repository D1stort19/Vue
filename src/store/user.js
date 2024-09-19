import { defineStore } from "pinia";

export const useUser = defineStore("user", {
  state: () => {
    return {
      username: null,
      password: null,
      name: null,
      user_type: null,
      user_id: null,
    };
  },
});
