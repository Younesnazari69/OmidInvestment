import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import type { ServerOptions } from "vue3-easy-data-table";

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
  const CompanyLevelsData = ref<any>({});
  const CompanystatusData = ref<any>({});
  const CompanyTypesData = ref<any>({});
  const IndustryTypesData = ref<any>({});
  const MarketTypesData = ref<any>({});
  const CompanyData = ref<any>({});
  const GroupsData = ref<any>({});
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
    RegionsData.value = {
      List: data.data,
      serverCurrentPageItems: data.page,
      serverTotalItemsLength: data.count,
    };
  }
  function SetRegion(data: any) {
    RegionData.value = data.data;
    errors.value = data.errors;
  }

  const FechRegions = async (serverOptions: any | ServerOptions) => {
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
  const FechRegion = async (id: string | string[]) => {
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
    AllUsersData.value = {
      List: data.data,
      serverCurrentPageItems: data.page,
      serverTotalItemsLength: data.count,
    };
    errors.value = data.errors;
  }
  function SetUser(data: any) {

    UserData.value = data.data;
    errors.value = data.errors;
  }
  const FechAllUsers = async (serverOptions: ServerOptions|any, filter: any,ResultType:string) => {
    const Filter = {
      Page: serverOptions.page,
      Number: serverOptions.rowsPerPage,
      SortBy: serverOptions.sortBy,
      SortType: serverOptions.sortType,
      Searchfield: filter.value.searchFields,
      Searchvalue: filter.value.searchValue,
      ResultType:ResultType
    }
    return await ApiService.post(`/User/GetAllUsers`, Filter)
      .then(({ data }) => {
        SetAllUserList(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
    // } else {
    //   return await ApiService.get(`/User/GetAllUsers/${page}&${rowsPerPage}&${" "}&${" "}`)
    //     .then(({ data }) => {
    //       SetAllUserList(data);
    //     })
    //     .catch(({ response }) => {
    //       setError(response.data.errors);
    //     });
    // }
  };
  const FechUser = async (Guid: string | string[]) => {

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
    LocationsData.value = {
      List: data.data,
      serverCurrentPageItems: data.page,
      serverTotalItemsLength: data.count,
    };
    errors.value = data.errors;
  }
  function SetLocation(data: any) {
    LocationData.value = data.data;
    errors.value = data.errors;
  }
  const FechLocations = async (serverOptions: any | ServerOptions) => {
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
  const FechLocation = async (id: string | string[]) => {

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
    CompanysData.value = {
      List: data.data,
      serverCurrentPageItems: data.page,
      serverTotalItemsLength: data.count,
      exportToExcellFileUrl: data.exportToExcellFileUrl,
    };
    errors.value = data.errors;
  }
  function SetCompany(data: any) {
    CompanyData.value = data.data;
    errors.value = data.errors;
  }
  const FechCompanys = async (serverOptions: any) => {
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
  const FechCompany = async (id: string | string[]) => {

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

    return ApiService.post(`/Company/UpdateCompany`, CompanyModel)
      .then(({ data }) => {
        console.log(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }


  function SetCompanyLevelList(data: any) {
    CompanyLevelsData.value = {
      List: data.data,
      serverCurrentPageItems: data.page,
      serverTotalItemsLength: data.count,
    };
    errors.value = data.errors;
  }
  const FechCompanyLevels = async (serverOptions: any | ServerOptions) => {
    const { page, rowsPerPage, sortBy, sortType } = serverOptions;
    if (sortBy && sortType) {
      return await ApiService.get(`/Company/GetCompanyLevels/${page}&${rowsPerPage}&${sortBy}&${sortType}`)
        .then(({ data }) => {
          SetCompanyLevelList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    } else {
      return await ApiService.get(`/Company/GetCompanyLevels/${page}&${rowsPerPage}&${" "}&${" "}`)
        .then(({ data }) => {
          SetCompanyLevelList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    }
  };

  function SetCompanystatusList(data: any) {
    CompanystatusData.value = {
      List: data.data,
      serverCurrentPageItems: data.page,
      serverTotalItemsLength: data.count,
    };
    errors.value = data.errors;
  }
  const FechCompanystatus = async (serverOptions: any | ServerOptions) => {
    const { page, rowsPerPage, sortBy, sortType } = serverOptions;
    if (sortBy && sortType) {
      return await ApiService.get(`/Company/GetCompanystatus/${page}&${rowsPerPage}&${sortBy}&${sortType}`)
        .then(({ data }) => {
          SetCompanystatusList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    } else {
      return await ApiService.get(`/Company/GetCompanystatus/${page}&${rowsPerPage}&${" "}&${" "}`)
        .then(({ data }) => {
          SetCompanystatusList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    }
  };
  function SetCompanyTypesList(data: any) {
    CompanyTypesData.value = {
      List: data.data,
      serverCurrentPageItems: data.page,
      serverTotalItemsLength: data.count,
    };
    errors.value = data.errors;
  }
  const FechCompanyTypes = async (serverOptions: any | ServerOptions) => {
    const { page, rowsPerPage, sortBy, sortType } = serverOptions;
    if (sortBy && sortType) {
      return await ApiService.get(`/Company/GetCompanyTypes/${page}&${rowsPerPage}&${sortBy}&${sortType}`)
        .then(({ data }) => {
          SetCompanyTypesList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    } else {
      return await ApiService.get(`/Company/GetCompanyTypes/${page}&${rowsPerPage}&${" "}&${" "}`)
        .then(({ data }) => {
          SetCompanyTypesList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    }
  };

  function SetIndustryTypesList(data: any) {
    IndustryTypesData.value = {
      List: data.data,
      serverCurrentPageItems: data.page,
      serverTotalItemsLength: data.count,
    };
    errors.value = data.errors;
  }
  const FechIndustryTypes = async (serverOptions: any | ServerOptions) => {
    const { page, rowsPerPage, sortBy, sortType } = serverOptions;
    if (sortBy && sortType) {
      return await ApiService.get(`/Company/GetIndustryTypes/${page}&${rowsPerPage}&${sortBy}&${sortType}`)
        .then(({ data }) => {
          SetIndustryTypesList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    } else {
      return await ApiService.get(`/Company/GetIndustryTypes/${page}&${rowsPerPage}&${" "}&${" "}`)
        .then(({ data }) => {
          SetIndustryTypesList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    }
  };
  function SetMarketTypesList(data: any) {
    MarketTypesData.value = {
      List: data.data,
      serverCurrentPageItems: data.page,
      serverTotalItemsLength: data.count,
    };
    errors.value = data.errors;
  }
  const FechMarketTypes = async (serverOptions: any | ServerOptions) => {
    const { page, rowsPerPage, sortBy, sortType } = serverOptions;
    if (sortBy && sortType) {
      return await ApiService.get(`/Company/GetMarketTypes/${page}&${rowsPerPage}&${sortBy}&${sortType}`)
        .then(({ data }) => {
          SetMarketTypesList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    } else {
      return await ApiService.get(`/Company/GetMarketTypes/${page}&${rowsPerPage}&${" "}&${" "}`)
        .then(({ data }) => {
          SetMarketTypesList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    }
  };
  //#endregion
  //#region EquipmentAndMachinery 
  function SetEquipmentAndMachineryList(data: any) {

    EquipmentAndMachinerysData.value = {
      List: data.data,
      serverCurrentPageItems: data.page,
      serverTotalItemsLength: data.count,
      exportToExcellFileUrl: data.exportToExcellFileUrl,

    };
    errors.value = data.errors;
  }
  function SetEquipmentAndMachinery(data: any) {
    EquipmentAndMachineryData.value = data.data;
    errors.value = data.errors;
  }
  const FechEquipmentAndMachinerys = async (serverOptions: ServerOptions|any, filter: any,ResultType:string) => {
    const Filter = {
      Page: serverOptions.page,
      Number: serverOptions.rowsPerPage,
      SortBy: serverOptions.sortBy,
      SortType: serverOptions.sortType,
      Searchfield: filter.value.searchFields,
      Searchvalue: filter.value.searchValue,
      ResultType:ResultType
    }
    return await ApiService.post(`/Forms/GetEquipmentAndMachinerys`, Filter)
      .then(({ data }) => {
        SetEquipmentAndMachineryList(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });

  };
  const FechEquipmentAndMachinery = async (id: string | string[]) => {

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

    RealEstatesData.value = {
      List: data.data,
      serverCurrentPageItems: data.page,
      serverTotalItemsLength: data.count,
      exportToExcellFileUrl: data.exportToExcellFileUrl,
    };
    errors.value = data.errors;
  }
  function SetRealEstate(data: any) {

    RealEstateData.value = data.data;
    errors.value = data.errors;
  }
  const FechRealEstates = async (serverOptions: ServerOptions|any,filter: any,ResultType:string) => {
    const Filter = {
      Page: serverOptions.page,
      Number: serverOptions.rowsPerPage,
      SortBy: serverOptions.sortBy,
      SortType: serverOptions.sortType,
      Searchfield: filter.value.searchFields,
      Searchvalue: filter.value.searchValue,
      ResultType:ResultType
    }
      return await ApiService.post(`/Forms/GetRealEstates`,Filter)
        .then(({ data }) => {
          SetRealEstateList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
  };
  const FechRealEstate = async (id: string | string[]) => {

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

    VehiclesData.value = {
      List: data.data,
      serverCurrentPageItems: data.page,
      serverTotalItemsLength: data.count,
      exportToExcellFileUrl: data.exportToExcellFileUrl,

    };
    errors.value = data.errors;
  }
  function SetVehicle(data: any) {
    VehicleData.value = data.data;
    errors.value = data.errors;
  }
  const FechVehicles = async (serverOptions: ServerOptions|any,filter: any,ResultType:string) => {
    const Filter = {
      Page: serverOptions.page,
      Number: serverOptions.rowsPerPage,
      SortBy: serverOptions.sortBy,
      SortType: serverOptions.sortType,
      Searchfield: filter.value.searchFields,
      Searchvalue: filter.value.searchValue,
      ResultType:ResultType
    }
      return await ApiService.post(`/Forms/GetVehicles`,Filter)
        .then(({ data }) => {
          SetVehicleList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    
  };
  const FechVehicle = async (id: string | string[]) => {

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

    FilesData.value = {
      List: data.data,
      serverCurrentPageItems: data.page,
      serverTotalItemsLength: data.count,
    };
    errors.value = data.errors;
  }
  const FechFiles = async (serverOptions: ServerOptions|any, FormType, FormId) => {
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
  const FechFile = async (Url) => {
    debugger
    return await ApiService.getByConfig(Url, {
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'blob',
    })
  };
  const DeleteFiles = async (id: string) => {

    return await ApiService.get(`/Forms/DeleteFiles/${id}`)
      .then(({ data }) => {
        // SetAllVehicleList(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });

  };
  //#endregion
  //#region Group 
  function SetGroupList(data: any) {
    GroupsData.value = {
      List: data.data,
      serverCurrentPageItems: data.page,
      serverTotalItemsLength: data.count,
    };
    errors.value = data.errors;
  }
  const FechGroups = async (serverOptions: any | ServerOptions) => {
    const { page, rowsPerPage, sortBy, sortType } = serverOptions;
    if (sortBy && sortType) {
      return await ApiService.get(`/User/GetGroups/${page}&${rowsPerPage}&${sortBy}&${sortType}`)
        .then(({ data }) => {
          SetGroupList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    } else {
      return await ApiService.get(`/User/GetGroups/${page}&${rowsPerPage}&${" "}&${" "}`)
        .then(({ data }) => {
          SetGroupList(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
        });
    }
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
    FechCompanyLevels,
    FechCompanystatus,
    FechCompanyTypes,
    FechIndustryTypes,
    FechMarketTypes,
    CompanyLevelsData,
    CompanystatusData,
    CompanyTypesData,
    IndustryTypesData,
    MarketTypesData,
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
    FechFile,
    DeleteFiles,
    FilesData,
    FechGroups,
    GroupsData
  };
});


