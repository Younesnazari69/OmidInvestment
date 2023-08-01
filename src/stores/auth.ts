import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";

export interface User {
  // name: string;
  // surname: string;
  username: string;
  password: string;
  api_token: string;
  remember: boolean;
}
export interface LoginUser {

  AcceptAgreement: boolean;
  ChangePasswordShow: boolean;
  Email: string;
  Firstname: string;
  Fullname: string;
  JobTitle: string;
  Lastname: string;
  Mobile: string;
  PCode: number;
  Phone: string;
}

export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref<LoginUser>({} as LoginUser);
  const isAuthenticated = ref(!!JwtService.getToken());

  function decodeMyToken(token: string) {
    var parts = token.split(".");
    if (parts.length !== 3) return null;
    try {
      var base64Url = parts[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      const myDecodedToken = JSON.parse(jsonPayload);
      if (myDecodedToken.exp * 1000 < new Date().getTime()) {
        console.log("token is expired");
        return null;
      }
      myDecodedToken.data = JSON.parse(myDecodedToken.data);
      return myDecodedToken;
    } catch (e) {
      return null;
    }
  };
  function setAuth(data: any) {
    let userLogin = decodeMyToken(data.accessToken);
    let authUser: LoginUser = userLogin.data;
    isAuthenticated.value = true;
    user.value = authUser;
    errors.value = {};
    JwtService.saveToken(data.accessToken);
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {} as LoginUser;
    errors.value = [];
    JwtService.destroyToken();
  }

  function login(credentials: User) {
    return ApiService.post("/auth/login", credentials)
      .then(({ data }) => {
        setAuth(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function logout() {
    purgeAuth();
  }

  function register(credentials: User) {
    return ApiService.post("register", credentials)
      .then(({ data }) => {
        setAuth(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function forgotPassword(email: string) {
    return ApiService.post("forgot_password", email)
      .then(() => {
        setError({});
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function verifyAuth() {
    //debugger
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("/auth/CheckValidtionToken", { Token: JwtService.getToken() })
        .then(({ data }) => {
          if (data.tokenISValid == false) {
            purgeAuth();
          }
          // setAuth(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
          purgeAuth();
        });
    } else {
      purgeAuth();
    }
  }

  return {
    errors,
    user,
    isAuthenticated,
    login,
    logout,
    register,
    forgotPassword,
    verifyAuth,
  };
});
