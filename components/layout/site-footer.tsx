import { siteConfig } from "@/content/site";
import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[#0b1228]">
      <div className="container-site flex flex-col items-center gap-6 py-12 text-center text-sm text-muted-foreground">
        <a
          href={siteConfig.mclistsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-90 transition hover:opacity-100"
        >
          <Image
            src={siteConfig.mclistsBanner}
            alt="McLists 服务器列表：电子科技大学成都学院 MC 公益服"
            width={300}
            height={50}
            unoptimized
            className="h-[50px] w-auto"
          />
        </a>

        <p>
          &copy; {new Date().getFullYear()} {siteConfig.club}（{siteConfig.brand}）
          — 保留所有权利
        </p>

        <p>
          友情链接：
          <a
            href={siteConfig.links.school}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:underline"
          >
            电子科技大学成都学院
          </a>
          {" | "}
          <a
            href={siteConfig.links.muaDocs}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:underline"
          >
            MUA高校联盟
          </a>
        </p>

        <Link
          href={siteConfig.beianUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground hover:text-secondary"
        >
          {siteConfig.beian}
        </Link>
      </div>
    </footer>
  );
}
