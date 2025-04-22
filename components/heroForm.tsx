"use client";

import type React from "react";

import { useState } from "react";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { CoupomCheckbox } from "./couponCheckbox";
import { InputLabel } from "./ui/inputLabel";
import { DropdownLabel } from "./ui/dropdownLabel";
import { CalendarLabel } from "./ui/calendarLabel";

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

  const embarqueDate = watch("embarqueDate");
  const desembarqueDate = watch("desembarqueDate");
  const celular = watch("celular");

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setSubmitMessage("");

    try {
      const body = JSON.stringify({
        ...data,
        embarqueDate: format(data.embarqueDate, "yyyy-MM-dd"),
        desembarqueDate: format(data.desembarqueDate, "yyyy-MM-dd"),
        celular: data.celular.replace(/\D/g, ""),
      });
      console.log("Dados do formulário:", body);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/`, {
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

            <CalendarLabel
              label="Embarque no Brasil"
              htmlFor="embarqueDate"
              selected={embarqueDate}
              onSelect={(date) => date && setValue("embarqueDate", date)}
              error={errors.embarqueDate}
              placeholder="Embarque no Brasil"
              disabled={(date) => date < new Date()}
            />

            <CalendarLabel
              label="Desembarque no Brasil"
              htmlFor="desembarqueDate"
              selected={desembarqueDate}
              onSelect={(date) => date && setValue("desembarqueDate", date)}
              error={errors.desembarqueDate}
              placeholder="Desembarque no Brasil"
              disabled={(date) => date < new Date() || (embarqueDate && date <= new Date(embarqueDate.getTime() + 24 * 1000))}
            />

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
        {submitSuccess !== null && (
          <div
            className={`mt-3 p-4 rounded-md text-sm ${
              submitSuccess
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {submitMessage}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
