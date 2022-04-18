import $api from "../http";

export default class UserDataService {
  // get user all user data
  static async fetchUserData() {
    return await $api.get("/userData");
  }

  // add list
  static async addList(list) {
    return await $api.post(`/list`, list);
  }

  // delete list
  static async deleteList(id) {
    return await $api.delete(`/list/${id}`);
  }

  // upadate list
  static async updateCurrentList(id, list) {
    return await $api.put(`/list/${id}`, list);
  }
}
