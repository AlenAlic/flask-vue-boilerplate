import Vue from "vue";
import i18n from "@/languages";
import { backendServer } from "./servers";
import { loadServerToken } from "./token-storage";
import router from "@/router";
import { ERROR_CODES, getNetworkErrorCode } from "@/api/util/network-errors";

backendServer.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  error => {
    const errorCode = getNetworkErrorCode(error);
    if (errorCode === ERROR_CODES.NETWORK) {
      Vue.$notify.error(i18n.t("network-errors.server-offline"));
      return Promise.reject(error);
    }
    if (errorCode === ERROR_CODES.UNAUTHORIZED && router.currentRoute.name !== "home") {
      router.push({ name: "home" });
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

backendServer.interceptors.request.use(async request => {
  // Inject authorization token if present
  const token = loadServerToken(backendServer);
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  return request;
});

export { backendServer };
