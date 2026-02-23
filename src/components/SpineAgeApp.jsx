import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";

import SpineAssessment from "@/components/SpineAssessment";
import { SpineFormProvider } from "@/context/SpineFormContext";

export default function SpineAgeApp() {

  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  // global open/close events (same as before)
  useEffect(() => {
    const openHandler = () => setOpen(true);
    const closeHandler = () => setOpen(false);

    window.addEventListener("spine-age:open", openHandler);
    window.addEventListener("spine-age:close", closeHandler);

    return () => {
      window.removeEventListener("spine-age:open", openHandler);
      window.removeEventListener("spine-age:close", closeHandler);
    };
  }, []);

  return (
    <SpineFormProvider>

      {isMobile ? (
        /* ================= MOBILE (DRAWER) ================= */
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger>Open</DrawerTrigger>

          <DrawerContent className="h-[97vh]">
            <SpineAssessment />
          </DrawerContent>
        </Drawer>
      ) : (
        /* ================= DESKTOP (DIALOG) ================= */
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>Open</DialogTrigger>

          <DialogContent className="max-w-6xl h-[85vh] overflow-hidden">
            <SpineAssessment />
          </DialogContent>
        </Dialog>
      )}

    </SpineFormProvider>
  );
}