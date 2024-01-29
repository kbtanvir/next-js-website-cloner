import { useFormContext } from "react-hook-form"

export function FormErrorMessage({ name }: { name: string }) {
  const formService = useFormContext()

  return (
    <>
      {formService.formState.errors?.[name] && (
        <p className="text-red-500 text-sm">
          {formService.formState.errors[name]?.message as any}{" "}
        </p>
      )}
    </>
  )
}
