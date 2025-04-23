import { Label } from "@radix-ui/react-label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DayPickerProps } from "react-day-picker";
import { FieldError } from "react-hook-form";

type CalendarLabelProps = Omit<DayPickerProps, "mode"> & {
  id?: string;
  label: string;
  htmlFor: string;
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  error?: FieldError | undefined;
  placeholder?: string;
  outline?: boolean;
};

const CalendarLabel = ({
  label,
  htmlFor,
  selected,
  onSelect,
  error,
  placeholder = "Selecione uma data",
  id,
  outline = false,
  ...rest
}: CalendarLabelProps) => {
  return (
    <div id={id} className="text-sm font-medium">
      <Label htmlFor={htmlFor}>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`w-full justify-start text-left font-normal hover:bg-white 
              ${!selected && "text-muted-foreground"} 
              ${outline ? "border-gray-300" : "border-none"} 
              md:min-h-12`}
            type="button"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected ? (
              format(selected, "dd 'de' MMMM 'de' yyyy", {
                locale: ptBR,
              })
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={onSelect}
            initialFocus
            locale={ptBR}
            {...rest}
          />
        </PopoverContent>
      </Popover>
      {error && (
        <p className="text-tiny font-medium text-error">{error.message}</p>
      )}
    </div>
  );
};

export { CalendarLabel };
