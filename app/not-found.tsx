import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-[family-name:var(--font-pixel)] text-xs tracking-widest text-mc-grass">
        ERROR 404
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight">方块失踪了</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        你访问的页面不存在，或者已经传送到别的维度。
      </p>
      <Button className="mt-8" render={<Link href="/" />}>
        返回主城
      </Button>
    </div>
  );
}
