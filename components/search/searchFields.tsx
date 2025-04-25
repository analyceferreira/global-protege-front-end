"use client";

import React, { useState } from "react";
import { z } from "zod";
import { format, parseISO } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CalendarLabel } from "@/components/ui/calendarLabel";
import { DropdownLabel } from "@/components/ui/dropdownLabel";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  destiny: z.string().min(1, "Selecione um destino"),
  departureDate: z.date({
    required_error: "Selecione a data de embarque",
  }),
  arriveDate: z.date({
    required_error: "Selecione a data de desembarque",
  }),
});

const destinations = [
  { name: "Europa", value: "europa" },
  { name: "América do Norte", value: "america-norte" },
  { name: "América do Sul", value: "america-sul" },
  { name: "Ásia", value: "asia" },
  { name: "Oceania", value: "oceania" },
];

const destinationsValues = destinations.map((item) => item.value);

type FormValues = z.infer<typeof formSchema>;

const SearchFields = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [submitMessage, setSubmitMessage] = useState("");
  const searchParams = useSearchParams();

  const destinyParm: string = destinationsValues.includes(
    searchParams.get("c") ?? ""
  )
    ? (searchParams.get("c") as string)
    : "";
  const departureParm =
    searchParams.get("d") && parseISO(searchParams.get("d") as string);
  const arriveParm =
    searchParams.get("a") && parseISO(searchParams.get("a") as string);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destiny: destinyParm,
      departureDate: departureParm || undefined,
      arriveDate: arriveParm || undefined,
    },
  });

  const departureDate = watch("departureDate");
  const arriveDate = watch("arriveDate");
  const destiny = watch("destiny");

  const daysOfStay =
    departureDate && arriveDate
      ? format(departureDate, "dd/MM/yyyy") === format(arriveDate, "dd/MM/yyyy")
        ? 1
        : Math.abs(
            (departureDate.getTime() - arriveDate.getTime()) /
              (1000 * 60 * 60 * 24)
          )
      : 0;

  const daysOfStayText = daysOfStay === 1 ? "1 dia" : `${daysOfStay} dias`;

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setSubmitMessage("");

    try {
      const body = JSON.stringify({
        ...data,
        departureDate: format(data.departureDate, "yyyy-MM-dd"),
        arriveDate: format(data.arriveDate, "yyyy-MM-dd"),
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

  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold mb-4 mt-0">Você pesquisou por:</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <DropdownLabel
            label="Destino"
            htmlFor="destiny"
            itens={destinations}
            onValueChange={(value) => setValue("destiny", value)}
            defaultValue={destiny}
            error={errors.destiny}
            placeholder="Destino"
            outline
          />

          <CalendarLabel
            label="Embarque no Brasil"
            htmlFor="embarqueDate"
            selected={departureDate}
            onSelect={(date) => date && setValue("departureDate", date)}
            error={errors.departureDate}
            placeholder="Embarque no Brasil"
            disabled={(date) => date < new Date()}
            outline
          />

          <CalendarLabel
            label="Desembarque no Brasil"
            htmlFor="desembarqueDate"
            selected={arriveDate}
            onSelect={(date) => date && setValue("arriveDate", date)}
            error={errors.arriveDate}
            placeholder="Desembarque no Brasil"
            disabled={(date) =>
              date < new Date() ||
              (departureDate &&
                date <= new Date(departureDate.getTime() + 24 * 1000))
            }
            outline
          />
          <Button
            type="submit"
            size="lg"
            className="w-full md:w-56 md:h-12 bg-accent hover:bg-amber-500 text-black font-medium text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Buscando..."
            ) : (
              <>
                <Search />
                Buscar
              </>
            )}
          </Button>
        </div>
      </form>

      <div className="mt-4 text-sm">
        <p> {daysOfStayText} de permanencia </p>
      </div>

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
    </div>
  );
};

export { SearchFields };
