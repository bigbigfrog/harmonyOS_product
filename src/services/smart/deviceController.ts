// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** send GET /api/send */
export async function sendUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sendUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<string>("/api/send", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
