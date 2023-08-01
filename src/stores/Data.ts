import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import type { Item, ServerOptions } from "vue3-easy-data-table";

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
  const AllUsersData = ref<any>({});
  const UserData = ref<any>({});

  //const serverCurrentPageItems = ref<Item[]>([]);
  //const serverTotalItemsLength=ref<Number>(0);;

  // function SetAllUserList(data: any) {
  //   AllUsersList.value = data.data;
  //   errors.value = data.errors;
  // }
  function SetAllUserList(data: any) {
    debugger
    AllUsersData.value = {
      AllUserList: data.data,
      serverCurrentPageItems: data.Page,
      serverTotalItemsLength: data.userCount,
    };
    errors.value = data.errors;
  }
  function SetUser(data: any) {
    debugger
    UserData.value = data.data;
    errors.value = data.errors;
  }
  function setError(error: any) {
    errors.value = { ...error };
  }

  // async function FechAllUsers(Page, Number) {
  //   return await ApiService.get(`/User/GetAllUsers/${Page}&${Number}`)
  //     .then(({ data }) => {
  //       SetAllUserList(data);
  //     })
  //     .catch(({ response }) => {
  //       setError(response.data.errors);
  //     });
  // }
  const FechAllUsers = async (serverOptions: ServerOptions) => {
    const { page, rowsPerPage, sortBy, sortType } = serverOptions;
    if (sortBy && sortType) {
      return await ApiService.get(`/User/GetAllUsers/${page}&${rowsPerPage}&${sortBy}&${sortType}`)
        .then(({ data }) => {
          SetAllUserList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    } else {
      return await ApiService.get(`/User/GetAllUsers/${page}&${rowsPerPage}&${" "}&${" "}`)
        .then(({ data }) => {
          SetAllUserList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    }
  };
  const FechUser = async (Guid: string) => {
    debugger
    return await ApiService.get(`/User/GetUser/${Guid}`)
      .then(({ data }) => {
        SetUser(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });


  };
  const DeleteUser = async (Guid: string) => {
    return await ApiService.get(`/User/DeleteUser/${Guid}`)
      .then(({ data }) => {
        // SetAllUserList(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });

  };
  const UpdateUser = async (UserModel) => {
    debugger
    return ApiService.post(`/User/UpdateUser`, UserModel)
      .then(({ data }) => {
        console.log(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }
  return {
    errors,
    AllUsersData,
    FechAllUsers,
    DeleteUser,
    UpdateUser,
     FechUser,
     UserData
  };
});


