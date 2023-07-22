import { defineStore } from 'pinia'

import { IState } from '@/store/common.interfaces';

export const useCommonStore = defineStore('common', {
  state: () => ({
    loading: false,
  } as IState),
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
