"use client";

import type React from "react";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { CoupomCheckbox } from "./couponCheckbox";
import { InputLabel } from "./ui/inputLabel";
import { DropdownLabel } from "./ui/dropdownLabel";

// Função para aplicar máscara de telefone
const applyPhoneMask = (value: string) => {
  // Remove todos os caracteres não numéricos
  const numericValue = value.replace(/\D/g, "");

  // Aplica a máscara conforme o número de dígitos
  if (numericValue.length <= 2) {
    return numericValue.length ? `(${numericValue}` : "";
  } else if (numericValue.length <= 7) {
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2)}`;
  } else {
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(
      2,
      7
    )}-${numericValue.slice(7, 11)}`;
  }
};

// Definindo o schema de validação com Zod
const formSchema = z.object({
  destino: z.string().min(1, "Selecione um destino"),
  embarqueDate: z.date({
    required_error: "Selecione a data de embarque",
  }),
  desembarqueDate: z.date({
    required_error: "Selecione a data de desembarque",
  }),
  nome: z.string().min(3, "Nome invalido"),
  email: z.string().email("Insira um e-mail válido"),
  celular: z.string().min(14, "Insira um número de celular válido"),
});

type FormValues = z.infer<typeof formSchema>;

export function HeroForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [submitMessage, setSubmitMessage] = useState("");

  // Inicializando o formulário com React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destino: "",
      nome: "",
      email: "",
      celular: "",
    },
  });

  // Observando valores do formulário
  const embarqueDate = watch("embarqueDate");
  const desembarqueDate = watch("desembarqueDate");
  const celular = watch("celular");

  // Função para enviar os dados para a API
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setSubmitMessage("");

    try {
      const body = JSON.stringify({
        ...data,
        embarqueDate: format(data.embarqueDate, "yyyy-MM-dd"),
        desembarqueDate: format(data.desembarqueDate, "yyyy-MM-dd"),
        // Removendo a formatação do celular para enviar apenas os números
        celular: data.celular.replace(/\D/g, ""),
      });
      console.log("Dados do formulário:", body);
      const response = await fetch("http://127.0.0.1:4015/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar os dados");
      }

      setSubmitSuccess(true);
      setSubmitMessage(
        "Cotação enviada com sucesso! Entraremos em contato em breve."
      );
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setSubmitSuccess(false);
      setSubmitMessage(
        "Erro ao enviar cotação. Sente novamente mais tarde ou entre em contato com o suporte."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Manipulador para o campo de telefone com máscara
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = applyPhoneMask(e.target.value);
    setValue("celular", maskedValue, { shouldValidate: true });
  };

  return (
    <Card className="max-w-3xl relative z-20 bg-white/70 backdrop-blur-sm border-none m-0 text-black">
      <CardContent>
        <h3 className="text-xl font-semibold mb-6 mt-0">
          Encontre o seguro viagem ideal para seu destino
        </h3>

        {submitSuccess !== null && (
          <div
            className={`mb-6 p-4 rounded-md text-sm ${
              submitSuccess
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
            <DropdownLabel
              label="Destino"
              htmlFor="destino"
              itens={[
                { name: "Europa", value: "europa" },
                { name: "América do Norte", value: "america-norte" },
                { name: "América do Sul", value: "america-sul" },
                { name: "Ásia", value: "asia" },
                { name: "Oceania", value: "oceania" },
              ]}
              onValueChange={(value) => setValue("destino", value)}
              defaultValue=""
              error={errors.destino}
              placeholder="Destino"
            />

            <div className="space-y-1">
              <Label htmlFor="embarqueDate">Embarque no Brasil</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal hover:bg-white border-none  ${
                      !embarqueDate && "text-muted-foreground"
                    } md:min-h-12`}
                    type="button"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {embarqueDate ? (
                      format(embarqueDate, "dd 'de' MMMM 'de' yyyy", {
                        locale: ptBR,
                      })
                    ) : (
                      <span>Embarque no Brasil</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white">
                  <Calendar
                    mode="single"
                    selected={embarqueDate}
                    onSelect={(date) => date && setValue("embarqueDate", date)}
                    initialFocus
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
              {errors.embarqueDate && (
                <p className="text-tiny font-medium text-error">
                  {errors.embarqueDate.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="desembarqueDate">Desembarque no Brasil</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal border-none hover:bg-white md:min-h-12 ${
                      !desembarqueDate && "text-muted-foreground"
                    }`}
                    type="button"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {desembarqueDate ? (
                      format(desembarqueDate, "dd 'de' MMMM 'de' yyyy", {
                        locale: ptBR,
                      })
                    ) : (
                      <span>Desembarque no Brasil</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white">
                  <Calendar
                    mode="single"
                    selected={desembarqueDate}
                    onSelect={(date) =>
                      date && setValue("desembarqueDate", date)
                    }
                    initialFocus
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
              {errors.desembarqueDate && (
                <p className="text-tiny font-medium text-error">
                  {errors.desembarqueDate.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputLabel
              label="Nome"
              htmlFor="nome"
              value={watch("nome")}
              placeholder="Seu Nome Completo"
              error={errors.nome}
              {...register("nome")}
            />

            <InputLabel
              label="Email"
              htmlFor="email"
              value={watch("email")}
              placeholder="seu@email.com"
              error={errors.email}
              {...register("email")}
            />

            <InputLabel
              label="Celular"
              htmlFor="celular"
              placeholder="(xx) xxxxx-xxxx"
              value={celular}
              onChange={handlePhoneChange}
              error={errors.celular}
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <CoupomCheckbox />
            <Button
              type="submit"
              size="lg"
              className="w-full md:w-56 md:h-12 bg-amber-500 hover:bg-amber-600 text-black font-semibold text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Cotar meu seguro"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
