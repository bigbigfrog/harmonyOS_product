// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** doChat POST /api/chat/send */
export async function doChatUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.doChatUsingPOSTParams,
  options?: { [key: string]: any }
) {
  return request<string>("/api/chat/send", {
    method: "POST",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
