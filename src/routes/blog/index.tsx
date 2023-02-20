import { component$ } from "@builder.io/qwik";
import { loader$ } from "@builder.io/qwik-city";
import { getList } from "~/libs/microcms";
import { useServerTimeLoader } from "~/routes/layout";

// microCMSから記事一覧を取得する
export const useListLoader = loader$(async () => {
  const { contents } = await getList();
  return contents;
});

export default component$(() => {
  // 別ファイルから複数のLoaderを読み込むこともできる
  const serverTime = useServerTimeLoader();

  const list = useListLoader();

  return (
    <div>
      <h1>Server time: {serverTime.value.date}</h1>

      <ul>
        {list.value.map((item) => (
          <li>
            <a href={`/blog/${item.id}`}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
});
