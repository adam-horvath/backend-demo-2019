import {Methods} from "../lib/http";
import request from "../lib/request";

export const addBlogEntry = async data => {
  return await request({
    method: Methods.POST,
    resource: '/v1/entry',
    data,
  });
};

export const getBlogEntries = async () => {
  return await request({
    resource: '/v1/entry',
  })
};
