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
    async fetchRandomCafe() {
      let cafesID = this.cafes.map((cafe) => cafe.id);
      let randomIndex = Math.floor(Math.random() * cafesID.length);
      let randomCafeId = cafesID[randomIndex];
      const response = await CafesApi.getOneByID(randomCafeId);
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
