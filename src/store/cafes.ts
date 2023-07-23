import { defineStore } from 'pinia';

import { CafesApi } from '@/assets/api/cafes';

import { IState, ICafe } from '@/store/cafes.interfaces';

import { useCommonStore } from '@/store/common';

export const useCafesStore = defineStore('cafes', {
  state: () => ({
    cafes: [] as ICafe[],
    currentCafe: {} as ICafe,
  } as IState),
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
      try {
        const response = await CafesApi.getAll();
        const data = await response.data.data;
        this.setCafes(data);
      } catch (error) {
        throw error;
      }
    },
    async fetchCafeByID(cafeID: string) {
      const commonStore = useCommonStore();
      commonStore.setLoading(true);
      try {
        const response = await CafesApi.getOneByID(cafeID);
        const data = await response.data.data;
        setTimeout(() => {
          this.setCurrentCafe(data);
          commonStore.setLoading(false);
        }, 1000);
      } catch (error) {
        throw error;
      }
    },
    async fetchRandomCafe() {
      const commonStore = useCommonStore();
      commonStore.setLoading(true);
      let cafesID = this.cafes.map((cafe) => cafe.id);
      let randomIndex = Math.floor(Math.random() * cafesID.length);
      let randomCafeId = cafesID[randomIndex];
      try {
        const response = await CafesApi.getOneByID(randomCafeId.toString());
        const data = await response.data.data;
        setTimeout(() => {
          this.setCurrentCafe(data);
          commonStore.setLoading(false);
        }, 1000);
      } catch (error) {
        throw error;
      }
    },
    setCafes(payload: ICafe[]) {
      this.cafes = payload;
    },
    setCurrentCafe(payload: ICafe) {
      this.currentCafe = payload;
    },
  },
})
