import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { FieldError } from "react-hook-form";

interface IInputLabelProps extends React.ComponentProps<"input"> {
  label: string;
  htmlFor: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: FieldError | undefined;
}

const InputLabel = ({
  label,
  htmlFor,
  value,
  placeholder,
  onChange,
  error,
  ...rest
}: IInputLabelProps) => {
  return (
    <div className="space-y-1 text-sm font-medium">
      <Label htmlFor={htmlFor}>{label}</Label>
      <Input
        id="celular"
        type="tel"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="placeholder:text-sm"
        {...rest}
      />
      {error && (
        <p className="text-tiny font-medium text-error">{error.message}</p>
      )}
    </div>
  );
};

export { InputLabel };
