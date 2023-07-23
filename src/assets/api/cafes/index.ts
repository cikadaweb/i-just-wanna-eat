import { DefaultAPIInstance } from "@/assets/api/index";

export const CafesApi = {
  getAll() {
    const url = '/get-index';
    return DefaultAPIInstance.get(url, {});
  },
  getOneByID(id: string) {
    const url = `/get-view?id=${id}`;
    return DefaultAPIInstance.get(url, {});
  },
}