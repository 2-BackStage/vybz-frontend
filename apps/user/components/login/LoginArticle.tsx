import { LoginArticleDataType } from '@/types/ResponseDataTypes';

interface LoginArticleProps {
  data: LoginArticleDataType;
}

export default function LoginArticle({ data }: LoginArticleProps) {
  return (
    <article className="text-left px-6">
      <h1 className="pt-22 text-3xl font-semibold tracking-[0.01em]">
        {data.title}
      </h1>
      <section className="pt-6 text-sm">
        <p>조회수 {data.views}</p>
        <p>{data.description}</p>
      </section>
      <section className="pt-2 text-sm flex gap-2">
        {data.hashtags.map((hashtag: string, index: number) => (
          <p key={index}>{hashtag}</p>
        ))}
      </section>
      <h3 className="pt-4 pb-12">{data.cta}</h3>
    </article>
  );
}
