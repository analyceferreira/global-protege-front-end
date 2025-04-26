"use client";

import React from "react";

import { useState, useEffect } from "react";
import { X, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Tipo para os dados de seguros
type Seguro = {
  id: number;
  seguradora: string;
  logo: string;
  plano: string;
  faixaEtaria: string;
  valorIdosos: string;
  despesaMedica: number;
  seguroBagagem: number;
  valorTotal: number;
  valorComDesconto: number;
  desconto: number;
  formaPagamento: string;
  custoBeneficio: number;
  coberturas: {
    viagem: Record<string, string | number | boolean>;
    bagagem: Record<string, string | number | boolean>;
    assistenciaMedica: Record<string, string | number | boolean>;
    covid19: Record<string, string | number | boolean>;
    repatriacao: Record<string, string | number | boolean>;
    fiancas?: Record<string, string | number | boolean>;
    outros?: Record<string, string | number | boolean>;
  };
};

interface PlanComparisonProps {
  segurosComparacao: Seguro[];
  removerSeguroComparacao: (id: number) => void;
  selecionarSeguro: (id: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function PlanComparison({
  segurosComparacao,
  removerSeguroComparacao,
  selecionarSeguro,
  isOpen,
  onClose,
}: PlanComparisonProps) {
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>("geral");
  const [scrollIndex, setScrollIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Verificar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Categorias para comparação
  const categorias = [
    { id: "geral", nome: "Geral" },
    { id: "viagem", nome: "Viagem" },
    { id: "bagagem", nome: "Bagagem" },
    { id: "assistenciaMedica", nome: "Assistência Médica" },
    { id: "covid19", nome: "COVID-19" },
    { id: "repatriacao", nome: "Repatriação" },
  ];

  // Função para formatar o valor da cobertura
  const formatarValorCobertura = (valor: any): string => {
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

  // Função para navegar entre os planos em dispositivos móveis
  const navegarPlanos = (direcao: "prev" | "next") => {
    if (direcao === "prev") {
      setScrollIndex(Math.max(0, scrollIndex - 1));
    } else {
      setScrollIndex(Math.min(segurosComparacao.length - 1, scrollIndex + 1));
    }
  };

  // Função para remover um seguro com feedback
  const handleRemoverSeguro = (id: number) => {
    const seguro = segurosComparacao.find((s) => s.id === id);
    removerSeguroComparacao(id);
    if (seguro) {
      //   toast.info("Plano removido", {
      //     description: `${seguro.seguradora} - ${seguro.plano} removido da comparação.`,
      //   });
    }
  };

  // Se não estiver aberto, não renderizar nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white md:bg-black/50 flex flex-col md:items-center md:justify-center overflow-hidden">
      {/* Cabeçalho */}
      <div className="bg-white p-4 flex justify-between items-center border-b md:rounded-t-lg md:w-[95%] md:max-w-5xl">
        <h2 className="text-lg font-bold">
          Comparação de Planos ({segurosComparacao.length}/3)
        </h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 bg-white md:rounded-b-lg md:w-[95%] md:max-w-5xl overflow-hidden flex flex-col">
        {/* Tabs de categorias */}
        <div className="border-b overflow-x-auto">
          <ScrollArea orientation="horizontal" className="w-full">
            <div className="flex p-2 space-x-2">
              {categorias.map((categoria) => (
                <button
                  key={categoria.id}
                  onClick={() => setCategoriaAtiva(categoria.id)}
                  className={cn(
                    "px-3 py-2 text-sm rounded-md whitespace-nowrap",
                    categoriaAtiva === categoria.id
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  {categoria.nome}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 overflow-hidden">
          {/* Navegação mobile */}
          {isMobile && segurosComparacao.length > 1 && (
            <div className="flex justify-between items-center p-2 bg-gray-50">
              <button
                onClick={() => navegarPlanos("prev")}
                disabled={scrollIndex === 0}
                className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-30"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm">
                Plano {scrollIndex + 1} de {segurosComparacao.length}
              </span>
              <button
                onClick={() => navegarPlanos("next")}
                disabled={scrollIndex === segurosComparacao.length - 1}
                className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-30"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Conteúdo da comparação */}
          <ScrollArea className="h-full">
            <div className="p-4">
              {/* Grid de comparação */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_repeat(auto-fill,minmax(200px,1fr))] gap-4">
                {/* Cabeçalho da tabela (apenas em desktop) */}
                {!isMobile && (
                  <>
                    <div className="hidden md:block"></div>
                    {segurosComparacao.map((seguro) => (
                      <div
                        key={seguro.id}
                        className="hidden md:flex flex-col items-center p-2 relative"
                      >
                        <button
                          onClick={() => handleRemoverSeguro(seguro.id)}
                          className="absolute top-0 right-0 p-1 rounded-full hover:bg-gray-100"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <div className="w-16 h-16 relative mb-2">
                          <Image
                            src="/placeholder.svg?height=64&width=64"
                            alt={seguro.seguradora}
                            width={64}
                            height={64}
                            className="object-contain"
                          />
                        </div>
                        <h3 className="font-bold text-center">
                          {seguro.seguradora}
                        </h3>
                        <p className="text-sm text-center">{seguro.plano}</p>
                        <div className="mt-2 text-xl font-bold text-center">
                          R$ {seguro.valorComDesconto.toFixed(2)}
                        </div>
                        <Button
                          onClick={() => selecionarSeguro(seguro.id)}
                          className="mt-2 w-full bg-blue-700 hover:bg-blue-800"
                        >
                          Selecionar
                        </Button>
                      </div>
                    ))}
                  </>
                )}

                {/* Conteúdo da categoria selecionada */}
                {categoriaAtiva === "geral" ? (
                  // Informações gerais
                  <>
                    {/* Títulos das linhas (apenas em desktop) */}
                    {!isMobile && (
                      <>
                        <div className="hidden md:block font-medium py-2">
                          Seguradora
                        </div>
                        <div className="hidden md:block font-medium py-2">
                          Plano
                        </div>
                        <div className="hidden md:block font-medium py-2">
                          Faixa etária
                        </div>
                        <div className="hidden md:block font-medium py-2">
                          Despesa Médica
                        </div>
                        <div className="hidden md:block font-medium py-2">
                          Seguro Bagagem
                        </div>
                        <div className="hidden md:block font-medium py-2">
                          Valor Total
                        </div>
                        <div className="hidden md:block font-medium py-2">
                          Valor com Desconto
                        </div>
                        <div className="hidden md:block font-medium py-2">
                          Desconto
                        </div>
                      </>
                    )}

                    {/* Conteúdo para mobile (um plano por vez) */}
                    {isMobile && segurosComparacao.length > 0 && (
                      <div className="bg-white rounded-lg shadow-sm border p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold">
                              {segurosComparacao[scrollIndex].seguradora}
                            </h3>
                            <p className="text-sm">
                              {segurosComparacao[scrollIndex].plano}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              handleRemoverSeguro(
                                segurosComparacao[scrollIndex].id
                              )
                            }
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="text-sm text-gray-500">
                              Faixa etária
                            </div>
                            <div>
                              {segurosComparacao[scrollIndex].faixaEtaria}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">
                              Despesa Médica
                            </div>
                            <div>
                              USD{" "}
                              {segurosComparacao[
                                scrollIndex
                              ].despesaMedica.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">
                              Seguro Bagagem
                            </div>
                            <div>
                              USD{" "}
                              {segurosComparacao[
                                scrollIndex
                              ].seguroBagagem.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">
                              Valor Total
                            </div>
                            <div>
                              R${" "}
                              {segurosComparacao[
                                scrollIndex
                              ].valorTotal.toFixed(2)}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">
                              Valor com Desconto
                            </div>
                            <div className="text-xl font-bold">
                              R${" "}
                              {segurosComparacao[
                                scrollIndex
                              ].valorComDesconto.toFixed(2)}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">
                              Desconto
                            </div>
                            <div>
                              {segurosComparacao[scrollIndex].desconto}% no{" "}
                              {segurosComparacao[scrollIndex].formaPagamento}
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={() =>
                            selecionarSeguro(segurosComparacao[scrollIndex].id)
                          }
                          className="mt-4 w-full bg-blue-700 hover:bg-blue-800"
                        >
                          Selecionar Seguro
                        </Button>
                      </div>
                    )}

                    {/* Conteúdo para desktop (todos os planos lado a lado) */}
                    {!isMobile &&
                      segurosComparacao.map((seguro) => (
                        <React.Fragment key={`geral-${seguro.id}`}>
                          <div className="py-2">{seguro.seguradora}</div>
                          <div className="py-2">{seguro.plano}</div>
                          <div className="py-2">{seguro.faixaEtaria}</div>
                          <div className="py-2">
                            {/* USD {seguro.despesaMedica.toLocaleString()} */}
                          </div>
                          <div className="py-2">
                            USD {seguro.seguroBagagem.toLocaleString()}
                          </div>
                          <div className="py-2">
                            R$ {seguro.valorTotal.toFixed(2)}
                          </div>
                          <div className="py-2 font-bold">
                            R$ {seguro.valorComDesconto.toFixed(2)}
                          </div>
                          <div className="py-2">
                            {seguro.desconto}% no {seguro.formaPagamento}
                          </div>
                        </React.Fragment>
                      ))}
                  </>
                ) : (
                  // Coberturas específicas da categoria
                  <>
                    {/* Obter todas as coberturas únicas da categoria atual */}
                    {(() => {
                      const todasCoberturas = new Set<string>();
                      segurosComparacao.forEach((seguro) => {
                        Object.keys(
                          seguro.coberturas[
                            categoriaAtiva as keyof typeof seguro.coberturas
                          ] || {}
                        ).forEach((cobertura) => {
                          todasCoberturas.add(cobertura);
                        });
                      });

                      const coberturasOrdenadas =
                        Array.from(todasCoberturas).sort();

                      return (
                        <>
                          {/* Títulos das coberturas (apenas em desktop) */}
                          {!isMobile && (
                            <>
                              <div className="hidden md:block"></div>
                              {segurosComparacao.map((seguro) => (
                                <div
                                  key={`header-${seguro.id}`}
                                  className="hidden md:block"
                                ></div>
                              ))}

                              {coberturasOrdenadas.map((cobertura) => (
                                <div
                                  key={`title-${cobertura}`}
                                  className="hidden md:block font-medium py-2"
                                >
                                  {cobertura}
                                </div>

                                // Valores para cada seguro
                              ))}
                              {segurosComparacao.map((seguro) =>
                                coberturasOrdenadas.map((cobertura) => {
                                  const coberturaObj =
                                    (seguro.coberturas[
                                      categoriaAtiva as keyof typeof seguro.coberturas
                                    ] as Record<string, any>) || {};
                                  const valor = coberturaObj[cobertura];
                                  return (
                                    <div
                                      key={`valor-${seguro.id}-${cobertura}`}
                                      className="py-2"
                                    >
                                      {valor === true ? (
                                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                                      ) : valor === false ? (
                                        <X className="h-5 w-5 text-red-500 mx-auto" />
                                      ) : (
                                        formatarValorCobertura(valor)
                                      )}
                                    </div>
                                  );
                                })
                              )}
                            </>
                          )}

                          {/* Conteúdo para mobile (um plano por vez) */}
                          {isMobile && segurosComparacao.length > 0 && (
                            <div className="bg-white rounded-lg shadow-sm border p-4">
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h3 className="font-bold">
                                    {segurosComparacao[scrollIndex].seguradora}
                                  </h3>
                                  <p className="text-sm">
                                    {segurosComparacao[scrollIndex].plano}
                                  </p>
                                </div>
                                <button
                                  onClick={() =>
                                    handleRemoverSeguro(
                                      segurosComparacao[scrollIndex].id
                                    )
                                  }
                                  className="p-1 rounded-full hover:bg-gray-100"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>

                              <div className="space-y-3">
                                {coberturasOrdenadas.map((cobertura) => {
                                  const coberturaObj =
                                    (segurosComparacao[scrollIndex].coberturas[
                                      categoriaAtiva as keyof (typeof segurosComparacao)[typeof scrollIndex]["coberturas"]
                                    ] as Record<string, any>) || {};
                                  const valor = coberturaObj[cobertura];
                                  return (
                                    <div
                                      key={`mobile-${cobertura}`}
                                      className="flex justify-between items-center"
                                    >
                                      <div className="text-sm">{cobertura}</div>
                                      <div>
                                        {valor === true ? (
                                          <Check className="h-5 w-5 text-green-500" />
                                        ) : valor === false ? (
                                          <X className="h-5 w-5 text-red-500" />
                                        ) : (
                                          formatarValorCobertura(valor)
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                              <Button
                                onClick={() =>
                                  selecionarSeguro(
                                    segurosComparacao[scrollIndex].id
                                  )
                                }
                                className="mt-4 w-full bg-blue-700 hover:bg-blue-800"
                              >
                                Selecionar Seguro
                              </Button>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </>
                )}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
