import { defineStore } from 'pinia';

import { CafesApi } from '@/assets/api/cafes';

import { ICafe } from '@/store/cafes.interfaces';


export const useCafesStore = defineStore('cafes', {
  state: () => ({
    cafes: [] as ICafe[],
    currentCafe: {} as ICafe,
  }),
  getters: {
    getCafesList(): ICafe[]  {
      return this.cafes;
    },
    getCurrentCafe(): ICafe  {
      return this.currentCafe;
    }
  },
  actions: {
    async fetchAllCafes() {
      const response = await CafesApi.getAll();
      const data = await response.data.data;
      this.setCafes(data);
    },
    async fetchOneCafe(id: number) {
      const response = await CafesApi.getOneByID(id);
      const data = await response.data.data;
      this.setCurrentCafe(data);
    },
    setCafes(payload: ICafe[]) {
      this.cafes = payload;
    },
    setCurrentCafe(payload: ICafe[]) {
      this.currentCafe = payload;
    },
  },
})
