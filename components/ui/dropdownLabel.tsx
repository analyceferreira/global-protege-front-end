import { SelectTriggerProps } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { MapPinIcon } from "lucide-react";
import { FieldError } from "react-hook-form";

interface ISelectLabelProps extends SelectTriggerProps {
  itens?: Array<{ name: string; value: string }>;
  label?: string;
  htmlFor: string;
  onValueChange: (value: string) => void;
  defaultValue?: string;
  placeholder: string;
  error?: FieldError | undefined;
  outline?: boolean;
}

const DropdownLabel = ({
  id,
  itens,
  label,
  htmlFor,
  onValueChange,
  defaultValue = "",
  placeholder,
  error,
  outline = false,
}: ISelectLabelProps) => {
  return (
    <div className="text-sm font-medium">
      {label && (
        <Label className="mb-0.5" htmlFor={htmlFor}>
          {label}
        </Label>
      )}
      <Select onValueChange={onValueChange} defaultValue={defaultValue}>
        <SelectTrigger
          id={id}
          className={`w-full md:min-h-12 bg-white ${
            outline ? "border-gray-300" : "border-none"
          }`}
        >
          <div className="flex items-center gap-2 placeholder:text-red-500">
            <MapPinIcon className="h-4 w-4" />
            <SelectValue placeholder={placeholder} />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-white">
          {itens?.map((item, index) => (
            <SelectItem key={index} value={item.value}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-tiny font-medium text-error">{error.message}</p>
      )}
    </div>
  );
};

export { DropdownLabel };
