import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";

// export interface LoginUser {

//   AcceptAgreement: boolean;
//   ChangePasswordShow: boolean;
//   Email: string;
//   Firstname: string;
//   Fullname: string;
//   JobTitle: string;
//   Lastname: string;
//   Mobile: string;
//   PCode: number;
//   Phone: string;
// }

export const useDataStore = defineStore("Data", () => {
  const errors = ref({});
  const PublicUserList = ref<any>([]);

  function SetPublicUserList(data: any) {
    PublicUserList.value = data.data;
    errors.value = data.errors;
  }

  function setError(error: any) {
    errors.value = { ...error };
  }
async  function  FechPublicUsers(Page,Number) {
    debugger
    return  await ApiService.get(`/User/GetPublicUsers/${Page}&${Number}`)
      .then(({ data }) => {
        SetPublicUserList(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  return {
    errors,
    PublicUserList,
    FechPublicUsers,
  };
});
