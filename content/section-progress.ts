export type SectionProgressItem = {
  id: string;
  href: string;
  label: string;
};

/** Homepage chapter markers — one per major section. */
export const sectionProgressItems: SectionProgressItem[] = [
  { id: "hero", href: "#hero", label: "首页" },
  { id: "status", href: "#status", label: "监控" },
  { id: "servers", href: "#servers", label: "服务器" },
  { id: "services", href: "#services", label: "特色" },
  { id: "about", href: "#about", label: "关于我们" },
  { id: "faq", href: "#faq", label: "常见问题" },
  { id: "team", href: "#team", label: "开发团队" },
  { id: "partners", href: "#partners", label: "合作伙伴" },
];
