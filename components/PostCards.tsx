import Link from "next/link";
import { categoryLabel, type PostSummary } from "@/lib/blog-shared";
import { Icon } from "@/components/ui/Icon";

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <Link href={`/blog/${post.slug}`} className="card card-hover group flex h-full flex-col p-6">
      <span className="text-[12.5px] font-semibold uppercase tracking-[0.1em] text-tin-ink">{categoryLabel(post.category)}</span>
      <h3 className="mt-3 font-display text-[20px] font-semibold leading-snug text-navy">{post.title}</h3>
      <p className="mt-3 flex-1 text-[15px] text-mute">{post.description}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-[14.5px] font-semibold text-navy">
        Read the guide · {post.readingMinutes} min
        <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export function PostGrid({ posts }: { posts: PostSummary[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => <PostCard key={p.slug} post={p} />)}
    </div>
  );
}
