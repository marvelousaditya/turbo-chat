export function Input({
  placeholder,
  onChange,
  type,
}: {
  placeholder: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <input
        className="border p-2 w-full rounded"
        onChange={onChange}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
}
