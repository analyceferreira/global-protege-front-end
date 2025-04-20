"use client";

import type React from "react";

import { useState } from "react";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/cn";

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
  hasCoupon: z.boolean(),
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
      hasCoupon: true,
    },
  });

  // Observando valores do formulário
  const embarqueDate = watch("embarqueDate");
  const desembarqueDate = watch("desembarqueDate");
  const hasCoupon = watch("hasCoupon");
  const celular = watch("celular");

  // Função para enviar os dados para a API
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setSubmitMessage("");

    try {
      const response = await fetch("http://127.0.0.1:4015/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          embarqueDate: format(data.embarqueDate, "yyyy-MM-dd"),
          desembarqueDate: format(data.desembarqueDate, "yyyy-MM-dd"),
          // Removendo a formatação do celular para enviar apenas os números
          celular: data.celular.replace(/\D/g, ""),
        }),
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
            <div className="space-y-1">
              <Label htmlFor="destino">Destino</Label>
              <Select
                onValueChange={(value) => setValue("destino", value)}
                defaultValue=""
              >
                <SelectTrigger
                  id="destino"
                  className="w-full md:min-h-12 bg-white border-none"
                >
                  <div className="flex items-center gap-2 placeholder:text-red-500">
                    <MapPinIcon className="h-4 w-4" />
                    <SelectValue placeholder="Destino" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="europa">Europa</SelectItem>
                  <SelectItem value="america-norte">
                    América do Norte
                  </SelectItem>
                  <SelectItem value="america-sul">América do Sul</SelectItem>
                  <SelectItem value="asia">Ásia</SelectItem>
                  <SelectItem value="oceania">Oceania</SelectItem>
                </SelectContent>
              </Select>
              {errors.destino && (
                <p className="text-tiny font-medium text-error">{errors.destino.message}</p>
              )}
            </div>

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
            <div className="space-y-1">
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" placeholder="Nome" {...register("nome")} />
              {errors.nome && (
                <p className="text-tiny font-medium text-error">{errors.nome.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="E-mail"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-tiny font-medium text-error">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="celular">Celular</Label>
              <Input
                id="celular"
                type="tel"
                placeholder="Celular"
                value={celular}
                onChange={handlePhoneChange}
              />
              {errors.celular && (
                <p className="text-tiny font-medium text-error">{errors.celular.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasCoupon"
                checked={hasCoupon}
                onCheckedChange={(checked) =>
                  setValue("hasCoupon", checked as boolean)
                }
                className="border-black border-2 size-5 data-[state=checked]:bg-green-600 data-[state=checked]:text-white"
              />
              <Label
                htmlFor="hasCoupon"
                className={cn(
                  `text-base font-medium ${
                    hasCoupon.valueOf() ? "text-green-800" : "text-black"
                  }`
                )}
              >
                {hasCoupon.valueOf()
                  ? "Cupom de 20% de desconto aplicado"
                  : "Aplicar cupom de 20% de desconto"}
              </Label>
            </div>

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
