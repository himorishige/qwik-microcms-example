import { createClient } from "microcms-js-sdk"; //ES6
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSDate,
} from "microcms-js-sdk";

//ブログの型定義
export type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch?: MicroCMSImage;
} & MicroCMSDate;

export type BlogResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Blog[];
};

if (!import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!import.meta.env.VITE_MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

// Initialize Client SDK.
export const client = createClient({
  serviceDomain: import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.VITE_MICROCMS_API_KEY,
});

// ブログ一覧を取得
export const getList = async (queries?: MicroCMSQueries) => {
  const listData = await client.get<BlogResponse>({
    endpoint: "blogs",
    queries,
  });
  return listData;
};

// ブログの詳細を取得
export const getDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.get<Blog>({
    endpoint: "blogs",
    contentId,
    queries,
  });

  return detailData;
};
