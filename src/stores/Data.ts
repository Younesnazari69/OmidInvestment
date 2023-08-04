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
// export interface EquipmentAndMachinery {
//   id: number;
//   companyID: number;
//   provinceID: number;
//   cityID: number;
//   inspection: string;
//   municipalArea: string;
//   regionalMunicipality: string;
//   representativeMobile: string;
//   companyRepresentative_owner_ToVisit: string;
//   address: string;
//   file: object
// }
export const useDataStore = defineStore("Data", () => {
  const errors = ref({});
  const AllUsersData = ref<any>({});
  const RegionsData = ref<any>({});
  const UserData = ref<any>({});
  const RegionData = ref<any>({});
  const LocationsData = ref<any>({});
  const LocationData = ref<any>({});
  const CompanysData = ref<any>({});
  const CompanyData = ref<any>({});
  const EquipmentAndMachinerysData = ref<any>({});
  const EquipmentAndMachineryData = ref<any>({});
  const RealEstatesData = ref<any>({});
  const RealEstateData = ref<any>({});
  const VehiclesData = ref<any>({});
  const VehicleData = ref<any>({});
  const FilesData = ref<any>({});


  //const serverCurrentPageItems = ref<Item[]>([]);
  //const serverTotalItemsLength=ref<Number>(0);;

  // function SetAllUserList(data: any) {
  //   AllUsersList.value = data.data;
  //   errors.value = data.errors;
  // }

  function setError(error: any) {
    errors.value = { ...error };
  }
  //#region Region
  function SetRegionList(data: any) {
    debugger
    RegionsData.value = {
      RegionList: data.data,
      serverCurrentPageItems: data.Page,
      serverTotalItemsLength: data.userCount,
    };
  }
  function SetRegion(data: any) {
    debugger
    RegionData.value = data.data;
    errors.value = data.errors;
  }

  const FechRegions = async (serverOptions: ServerOptions) => {
    const { page, rowsPerPage, sortBy, sortType } = serverOptions;
    if (sortBy && sortType) {
      return await ApiService.get(`/BaseInfo/GetRegions/${page}&${rowsPerPage}&${sortBy}&${sortType}`)
        .then(({ data }) => {
          SetRegionList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    } else {
      return await ApiService.get(`/BaseInfo/GetRegions/${page}&${rowsPerPage}&${" "}&${" "}`)
        .then(({ data }) => {
          SetRegionList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    }
  };
  const FechRegion = async (id: number) => {
    debugger
    return await ApiService.get(`/BaseInfo/GetRegion/${id}`)
      .then(({ data }) => {
        SetRegion(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });


  };
  const DeleteRegion = async (id: Number) => {
    return await ApiService.get(`/BaseInfo/DeleteRegion/${id}`)
      .then(({ data }) => {
        // SetAllUserList(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });

  };
  const UpdateRegion = async (RegionModel) => {
    debugger
    return ApiService.post(`/BaseInfo/UpdateRegion`, RegionModel)
      .then(({ data }) => {
        console.log(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }
  //#endregion
  //#region User 
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
  //#endregion
  //#region Location 
  function SetLocationList(data: any) {
    debugger
    LocationsData.value = {
      LocationList: data.data,
      serverCurrentPageItems: data.Page,
      serverTotalItemsLength: data.LocationCount,
    };
    errors.value = data.errors;
  }
  function SetLocation(data: any) {
    debugger
    LocationData.value = data.data;
    errors.value = data.errors;
  }
  const FechLocations = async (serverOptions: ServerOptions) => {
    const { page, rowsPerPage, sortBy, sortType } = serverOptions;
    if (sortBy && sortType) {
      return await ApiService.get(`/BaseInfo/GetLocations/${page}&${rowsPerPage}&${sortBy}&${sortType}`)
        .then(({ data }) => {
          SetLocationList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    } else {
      return await ApiService.get(`/BaseInfo/GetLocations/${page}&${rowsPerPage}&${" "}&${" "}`)
        .then(({ data }) => {
          SetLocationList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    }
  };
  const FechLocation = async (id: string) => {
    debugger
    return await ApiService.get(`/BaseInfo/GetLocation/${id}`)
      .then(({ data }) => {
        SetLocation(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });


  };
  const DeleteLocation = async (id: string) => {
    return await ApiService.get(`/BaseInfo/DeleteLocation/${id}`)
      .then(({ data }) => {
        // SetAllLocationList(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });

  };
  const UpdateLocation = async (LocationModel) => {
    debugger
    return ApiService.post(`/BaseInfo/UpdateLocation`, LocationModel)
      .then(({ data }) => {
        console.log(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }
  //#endregion
  //#region Company 
  function SetCompanyList(data: any) {
    debugger
    CompanysData.value = {
      CompanyList: data.data,
      serverCurrentPageItems: data.Page,
      serverTotalItemsLength: data.CompanyCount,
    };
    errors.value = data.errors;
  }
  function SetCompany(data: any) {
    debugger
    CompanyData.value = data.data;
    errors.value = data.errors;
  }
  const FechCompanys = async (serverOptions: ServerOptions) => {
    const { page, rowsPerPage, sortBy, sortType } = serverOptions;
    if (sortBy && sortType) {
      return await ApiService.get(`/Company/GetCompanys/${page}&${rowsPerPage}&${sortBy}&${sortType}`)
        .then(({ data }) => {
          SetCompanyList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    } else {
      return await ApiService.get(`/Company/GetCompanys/${page}&${rowsPerPage}&${" "}&${" "}`)
        .then(({ data }) => {
          SetCompanyList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    }
  };
  const FechCompany = async (id: string) => {
    debugger
    return await ApiService.get(`/Company/GetCompany/${id}`)
      .then(({ data }) => {
        SetCompany(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });


  };
  const DeleteCompany = async (id: string) => {
    return await ApiService.get(`/Company/DeleteCompany/${id}`)
      .then(({ data }) => {
        // SetAllCompanyList(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });

  };
  const UpdateCompany = async (CompanyModel) => {
    debugger
    return ApiService.post(`/Company/UpdateCompany`, CompanyModel)
      .then(({ data }) => {
        console.log(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }
  //#endregion
  //#region EquipmentAndMachinery 
  function SetEquipmentAndMachineryList(data: any) {
    debugger
    EquipmentAndMachinerysData.value = {
      EquipmentAndMachineryList: data.data,
      serverCurrentPageItems: data.Page,
      serverTotalItemsLength: data.EquipmentAndMachineryCount,
    };
    errors.value = data.errors;
  }
  function SetEquipmentAndMachinery(data: any) {
    debugger
    EquipmentAndMachineryData.value = data.data;
    errors.value = data.errors;
  }
  const FechEquipmentAndMachinerys = async (serverOptions: ServerOptions) => {
    const { page, rowsPerPage, sortBy, sortType } = serverOptions;
    if (sortBy && sortType) {
      return await ApiService.get(`/Forms/GetEquipmentAndMachinerys/${page}&${rowsPerPage}&${sortBy}&${sortType}`)
        .then(({ data }) => {
          SetEquipmentAndMachineryList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    } else {
      return await ApiService.get(`/Forms/GetEquipmentAndMachinerys/${page}&${rowsPerPage}&${" "}&${" "}`)
        .then(({ data }) => {
          SetEquipmentAndMachineryList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    }
  };
  const FechEquipmentAndMachinery = async (id: string) => {
    debugger
    return await ApiService.get(`/Forms/GetEquipmentAndMachinery/${id}`)
      .then(({ data }) => {
        SetEquipmentAndMachinery(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });


  };
  const DeleteEquipmentAndMachinery = async (id: string) => {
    return await ApiService.get(`/Forms/DeleteEquipmentAndMachinery/${id}`)
      .then(({ data }) => {
        // SetAllEquipmentAndMachineryList(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });

  };
  const UpdateEquipmentAndMachinery = async (EquipmentAndMachineryModel) => {
    debugger
    return ApiService.post(`/Forms/UpdateEquipmentAndMachinery`, EquipmentAndMachineryModel)
      .then(({ data }) => {
        console.log(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }
  //#endregion
  //#region RealEstate 
  function SetRealEstateList(data: any) {
    debugger
    RealEstatesData.value = {
      RealEstateList: data.data,
      serverCurrentPageItems: data.Page,
      serverTotalItemsLength: data.RealEstateCount,
    };
    errors.value = data.errors;
  }
  function SetRealEstate(data: any) {
    debugger
    RealEstateData.value = data.data;
    errors.value = data.errors;
  }
  const FechRealEstates = async (serverOptions: ServerOptions) => {
    const { page, rowsPerPage, sortBy, sortType } = serverOptions;
    if (sortBy && sortType) {
      return await ApiService.get(`/Forms/GetRealEstates/${page}&${rowsPerPage}&${sortBy}&${sortType}`)
        .then(({ data }) => {
          SetRealEstateList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    } else {
      return await ApiService.get(`/Forms/GetRealEstates/${page}&${rowsPerPage}&${" "}&${" "}`)
        .then(({ data }) => {
          SetRealEstateList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    }
  };
  const FechRealEstate = async (id: string) => {
    debugger
    return await ApiService.get(`/Forms/GetRealEstate/${id}`)
      .then(({ data }) => {
        SetRealEstate(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });


  };
  const DeleteRealEstate = async (id: string) => {
    return await ApiService.get(`/Forms/DeleteRealEstate/${id}`)
      .then(({ data }) => {
        // SetAllRealEstateList(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });

  };
  const UpdateRealEstate = async (RealEstateModel) => {
    debugger
    return ApiService.post(`/Forms/UpdateRealEstate`, RealEstateModel)
      .then(({ data }) => {
        console.log(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }
  //#endregion
  //#region Vehicle 
  function SetVehicleList(data: any) {
    debugger
    VehiclesData.value = {
      VehicleList: data.data,
      serverCurrentPageItems: data.Page,
      serverTotalItemsLength: data.VehicleCount,
    };
    errors.value = data.errors;
  }
  function SetVehicle(data: any) {
    debugger
    VehicleData.value = data.data;
    errors.value = data.errors;
  }
  const FechVehicles = async (serverOptions: ServerOptions) => {
   debugger
    const { page, rowsPerPage, sortBy, sortType } = serverOptions;
    if (sortBy && sortType) {
      return await ApiService.get(`/Forms/GetVehicles/${page}&${rowsPerPage}&${sortBy}&${sortType}`)
        .then(({ data }) => {
          SetVehicleList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    } else {
      return await ApiService.get(`/Forms/GetVehicles/${page}&${rowsPerPage}&${" "}&${" "}`)
        .then(({ data }) => {
          SetVehicleList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    }
  };
  const FechVehicle = async (id: string) => {
    debugger
    return await ApiService.get(`/Forms/GetVehicle/${id}`)
      .then(({ data }) => {
        SetVehicle(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });


  };
  const DeleteVehicle = async (id: string) => {
    return await ApiService.get(`/Forms/DeleteVehicle/${id}`)
      .then(({ data }) => {
        // SetAllVehicleList(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });

  };
  const UpdateVehicle = async (VehicleModel) => {
    debugger
    return ApiService.post(`/Forms/UpdateVehicle`, VehicleModel)
      .then(({ data }) => {
        console.log(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }
  //#endregion
  //#region Files 

  function SetFilesList(data: any) {
    debugger
    FilesData.value = {
      FilesList: data.data,
      serverCurrentPageItems: data.Page,
      serverTotalItemsLength: data.FilesCount,
    };
    errors.value = data.errors;
  }
  const FechFiles = async (serverOptions: ServerOptions, FormType, FormId) => {
    const { page, rowsPerPage, sortBy, sortType } = serverOptions;
    if (sortBy && sortType) {
      return await ApiService.get(`/Forms/GetFiles/${FormType}&${FormId}&${page}&${rowsPerPage}&${sortBy}&${sortType}`)
        .then(({ data }) => {
          SetFilesList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    } else {
      return await ApiService.get(`/Forms/GetFiles/${FormType}&${FormId}&${page}&${rowsPerPage}&${" "}&${" "}`)
        .then(({ data }) => {
          SetFilesList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    }
  };
  const DeleteFiles = async (id: string) => {
    debugger
    return await ApiService.get(`/Forms/DeleteFiles/${id}`)
      .then(({ data }) => {
        // SetAllVehicleList(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });

  };
    //#endregion

  return {
    errors,
    AllUsersData,
    FechAllUsers,
    DeleteUser,
    UpdateUser,
    FechUser,
    UserData,
    FechRegions,
    FechRegion,
    UpdateRegion,
    DeleteRegion,
    RegionsData,
    RegionData,
    FechLocations,
    FechLocation,
    UpdateLocation,
    DeleteLocation,
    LocationsData,
    LocationData,
    FechCompanys,
    FechCompany,
    UpdateCompany,
    DeleteCompany,
    CompanysData,
    CompanyData,
    FechEquipmentAndMachinerys,
    FechEquipmentAndMachinery,
    UpdateEquipmentAndMachinery,
    DeleteEquipmentAndMachinery,
    EquipmentAndMachinerysData,
    EquipmentAndMachineryData,
    FechRealEstates,
    FechRealEstate,
    UpdateRealEstate,
    DeleteRealEstate,
    RealEstatesData,
    RealEstateData,
    FechVehicles,
    FechVehicle,
    UpdateVehicle,
    DeleteVehicle,
    VehiclesData,
    VehicleData,
    FechFiles,
    DeleteFiles,
    FilesData

  };
});


