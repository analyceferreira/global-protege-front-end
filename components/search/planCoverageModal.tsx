"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { PlanCovarages } from "@/utils/types/plan";

interface CoberturasModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: string;
  plan: string;
  coverages: PlanCovarages[];
}

export function PlansCoveragesModal({
  isOpen,
  onClose,
  company,
  plan,
  coverages,
}: CoberturasModalProps) {
  const [coveragesExpandidas, setcoveragesExpandidas] = useState<
    Record<string, boolean>
  >({});

  const [itensExpandidos, setItensExpandidos] = useState<
    Record<string, boolean>
  >({});

  const togglecoverage = (coverage: string) => {
    setcoveragesExpandidas((prev) => ({
      ...prev,
      [coverage]: !prev[coverage],
    }));
  };

  const toggleItemInfo = (
    coverageId: string,
    itemId: string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();

    const itemKey = `${coverageId}-${itemId}`;
    setItensExpandidos((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }));
  };

  const formatarValorCobertura = (valor: string | number | boolean): string => {
    if (typeof valor === "number") {
      return `US$ ${valor.toLocaleString()}`;
    } else if (typeof valor === "boolean") {
      return valor ? "sim" : "não";
    } else if (valor === null || valor === undefined || valor === "") {
      return "não";
    } else if (typeof valor === "string" && !isNaN(Number(valor))) {
      return `US$ ${Number(valor).toLocaleString()}`;
    } else {
      return valor.toString();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] w-full max-h-[90vh] h-full overflow-hidden p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl flex flex-col md:flex-row gap-2">
            <p> Coberturas do plano </p>
            <p className="underline">{plan + " - " + company}</p>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-120px)] sm:pr-4 pr-2">
          {coverages.map(
            (coverage) =>
              coverage.items.length > 0 && (
                <div
                  key={coverage.title}
                  role="button"
                  tabIndex={-1}
                  className="w-full"
                >
                  <details
                    className="w-full"
                    open={coveragesExpandidas[coverage.title.toLowerCase()]}
                  >
                    <summary
                      className={`p-2 w-full flex font-bold text-lg sm:text-xl items-center justify-between cursor-pointer
                                  mt-2 rounded-lg `}
                      onClick={(e) => {
                        e.preventDefault();
                        togglecoverage(coverage.title.toLowerCase());
                      }}
                    >
                      <p
                        className={`${
                          coveragesExpandidas[coverage.title.toLowerCase()]
                            ? "text-secondary"
                            : ""
                        }`}
                      >
                        {coverage.title}
                      </p>
                      <div className="flex gap-4 items-center">
                        <ChevronDown
                          className={cn("h-4 w-4 transition-transform", {
                            "transform rotate-180":
                              coveragesExpandidas[coverage.title.toLowerCase()],
                          })}
                        />
                      </div>
                    </summary>

                    <div>
                      {coverage.items.map((item, itemIndex) => {
                        const itemKey = `${coverage.title.toLowerCase()}-${
                          item.title
                        }`;
                        const isInfoExpanded =
                          itensExpandidos[itemKey] || false;

                        return (
                          <div key={item.title} className="mb-1">
                            <div
                              className={cn(
                                "flex flex-col p-2 sm:p-3 gap-2 sm:gap-4 rounded-lg",
                                {
                                  "bg-gray-100/50": itemIndex % 2 === 0,
                                }
                              )}
                            >
                              <div className="flex justify-between items-start flex-col sm:flex-row sm:items-center">
                                <div className="flex items-center font-bold gap-1 mb-2 sm:mb-0 md:w-80">
                                  <h2 className="text-sm sm:text-base">
                                    {item.title}
                                  </h2>
                                  <button
                                    className={`focus:outline-none ml-1 flex-shrink-0 ${
                                      isInfoExpanded
                                        ? "text-blue-500"
                                        : "text-gray-500"
                                    }`}
                                    onClick={(e) =>
                                      toggleItemInfo(
                                        coverage.title.toLowerCase(),
                                        item.title,
                                        e
                                      )
                                    }
                                  >
                                    <Info className="h-4 w-4" />
                                  </button>
                                </div>
                                <span className="text-sm sm:text-base">
                                  {formatarValorCobertura(item.value)}
                                </span>
                              </div>

                              {isInfoExpanded && (
                                <div className="mt-2 text-xs sm:text-sm text-secondary border-t border-stroke pt-2 break-words">
                                  {item.description}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </details>
                </div>
              )
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
