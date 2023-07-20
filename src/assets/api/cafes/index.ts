import { DefaultAPIInstance } from "@/assets/api/index";

export const CafesApi = {
  getAll() {
    const url = '/get-index';
    return DefaultAPIInstance.get(url, {});
  },
  getOneByID(id: number) {
    const url = `/get-view?id=${id}`;
    return DefaultAPIInstance.get(url, {});
  },
}