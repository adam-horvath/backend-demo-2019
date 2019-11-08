import {Methods} from "../lib/http";
import request from "../lib/request";

export const login = async credentials => {
  return await request({
    method: Methods.POST,
    resource: `/login`,
    data: credentials
  });
};
