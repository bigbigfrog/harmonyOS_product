// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** query GET /api/query */
export async function queryUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseCollectData_>("/api/query", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
