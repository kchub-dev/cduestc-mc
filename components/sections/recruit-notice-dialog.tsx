"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { recruitConfig } from "@/content/recruit";
import Link from "next/link";
import { useEffect, useState } from "react";

export function RecruitNoticeDialog() {
  const [open, setOpen] = useState(false);
  const { home } = recruitConfig;

  useEffect(() => {
    if (!recruitConfig.enabled) return;
    try {
      if (window.localStorage.getItem(home.noticeStorageKey)) return;
    } catch {
      return;
    }
    const id = window.setTimeout(() => setOpen(true), 1600);
    return () => window.clearTimeout(id);
  }, [home.noticeStorageKey]);

  const persistClosed = () => {
    try {
      window.localStorage.setItem(home.noticeStorageKey, "1");
    } catch {
      /* ignore quota / private mode */
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) persistClosed();
      }}
    >
      <DialogContent className="pixel-border sm:max-w-md">
        <DialogHeader>
          <p className="font-[family-name:var(--font-pixel)] text-[10px] tracking-widest text-foreground uppercase">
            {recruitConfig.hero.eyebrow}
          </p>
          <DialogTitle className="text-2xl text-foreground">
            {home.dialogTitle}
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            {home.dialogBody}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              persistClosed();
              setOpen(false);
            }}
          >
            {home.dialogSecondary}
          </Button>
          <Button
            size="sm"
            render={<Link href={recruitConfig.navHref} />}
            onClick={persistClosed}
          >
            {home.dialogPrimary}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
