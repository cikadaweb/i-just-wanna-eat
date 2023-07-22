import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => ({
    loading: false,
  }),
  getters: {
    getLoadingStatus(): boolean  {
      return this.loading;
    },
  },
  actions: {
    setLoading(payload: boolean) {
      this.loading = payload;
    },
  },
})
