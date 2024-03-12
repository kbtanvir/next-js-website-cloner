import { FormErrorMessage } from "@/components/FormMessage";
import { Button } from "@/components/ui/button";

// import { Form, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { cartService } from "@/features/cart/controller/service";
import { useCartStore } from "@/features/cart/controller/store";
import { Paths } from "@/lib/const/navigation";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export const PaymentMethodEnum = {
  COD: "cod",
  CREDIT_CARD: "credit_card",
};

export const checkoutFormSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  state: z.string(),
  zipcode: z.string(),
  paymentMethod: z.nativeEnum(PaymentMethodEnum),
  cardName: z.string().optional(),
  cardNumber: z
    .string()
    .refine((v) => v.length === 16, "Card number must be 16 digits")
    .optional(),
  cardExpiry: z
    .string()
    .refine(
      (v) => v.length === 5 && v.includes("/"),
      "Card expiry must be in MM/YY format",
    )
    .optional(),
  cardCVC: z
    .string()
    .refine((v) => v.length === 3, "Card CVC must be 3 digits")
    .optional(),
});

export type ICheckoutForm = z.infer<typeof checkoutFormSchema>;

type IFormFields = ({
  name: keyof ICheckoutForm;
} & Record<string, any>)[];

export function PageView() {
  const { toast } = useToast();
  const { cart } = useCartStore();
  const router = useRouter();
  const mutation = api.order.createOrder.useMutation({
    onSuccess: () => {
      cartService.clearCart();
      router.push("/order/success");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        className: "bg-red-500 text-white",
      });
    },
  });
  const form = useForm<ICheckoutForm>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      paymentMethod: PaymentMethodEnum.COD,
    },
  });
  const addressFields: IFormFields = [
    {
      name: "name",
      label: "Full name",
      type: "text",
      placeholder: "Your full name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Your email",
    },
    {
      name: "phone",
      label: "Phone",
      type: "text",
      placeholder: "Your phone",
    },

    {
      name: "address",
      label: "Address",
      type: "text",
      placeholder: "Your address",
    },
    {
      name: "city",
      label: "City",
      type: "text",
      placeholder: "Your city",
    },
    {
      name: "state",
      label: "State",
      type: "text",
      placeholder: "Your state",
    },
    {
      name: "zipcode",
      label: "Zip",
      type: "text",
      placeholder: "Your zip",
    },

    {
      name: "country",
      label: "Country",
      type: "text",
      placeholder: "Your country",
    },
  ];

  function onSubmit(data: ICheckoutForm) {
    mutation.mutate({
      data,
      items: cart.map((item) => ({
        productId: item.id,
        qty: item.qty,
      })),
    });
  }

  return (
    <div className="mx-auto w-full max-w-[1000px] px-10 max-md:px-5 ">
      <div className="mt-20 max-md:mt-10">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-20 max-md:grid max-md:gap-10 "
          >
            <div className="grid w-full gap-10">
              {/* {Object.entries(form.formState.errors).length !== 0 &&
                JSON.stringify(form.formState.errors)} */}

              <div className="grid gap-10">
                <div className="">
                  <div className="text-2xl font-semibold uppercase leading-8 text-zinc-800">
                    Shipping address
                  </div>
                  <div className="mt-5">
                    <div className="text-sm leading-5 text-zinc-600">
                      Please enter your shipping address
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 items-start gap-5">
                  {addressFields.map((row, i) => (
                    <Fragment key={i}>
                      <div className="grid items-start gap-3">
                        <label
                          htmlFor={row.name}
                          className="text-sm font-medium leading-none"
                        >
                          {row.label}
                        </label>
                        <Input
                          {...row}
                          onChange={(e) =>
                            form.setValue(row.name, e.target.value)
                          }
                          value={form.watch(row.name) ?? ""}
                          required
                        />
                        <FormErrorMessage name={row.name} />
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
              <div className="grid gap-10">
                <div className="">
                  <div className="text-2xl font-semibold uppercase leading-8 text-zinc-800">
                    Shipping address
                  </div>
                  <div className="mt-5">
                    <div className="text-sm leading-5 text-zinc-600">
                      Please enter your shipping address
                    </div>
                  </div>
                </div>
                {/* payment method radio group */}

                <RadioGroup
                  defaultValue={PaymentMethodEnum.COD}
                  className="grid gap-5"
                  onValueChange={(value) => {
                    console.log(value);
                    form.setValue("paymentMethod", value);
                  }}
                  name="paymentMethod"
                >
                  {Object.entries({
                    [PaymentMethodEnum.COD]: "Cash on delivery",
                    [PaymentMethodEnum.CREDIT_CARD]: "Credit card",
                  }).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center space-x-2 rounded-lg bg-gray-50 p-5"
                    >
                      <RadioGroupItem value={key} id={key} />
                      <Label htmlFor={key} className="cursor-pointer text-lg">
                        {value}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              {/* credit card fields */}
              {form.watch("paymentMethod") ===
                PaymentMethodEnum.CREDIT_CARD && (
                <div className="grid gap-10">
                  <div className="grid gap-5">
                    <div className="text-2xl font-semibold uppercase leading-8 text-zinc-800">
                      Credit card
                    </div>
                    <div className=" ">
                      <div className="text-sm leading-5 text-zinc-600">
                        Please enter your credit card details
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-5">
                    <div className="grid items-start gap-3">
                      <label
                        htmlFor="cardName"
                        className="text-sm font-medium leading-none"
                      >
                        Name on card
                      </label>
                      <Input
                        name="cardName"
                        type="text"
                        placeholder="Your card name"
                      />
                    </div>
                    <div className="grid items-start gap-3">
                      <label
                        htmlFor="cardNumber"
                        className="text-sm font-medium leading-none"
                      >
                        Card number
                      </label>
                      <Input
                        name="cardNumber"
                        type="password"
                        placeholder="Your card number"
                        onChange={(e) =>
                          form.setValue("cardNumber", e.target.value)
                        }
                      />
                      <FormErrorMessage name={"cardNumber"} />
                    </div>
                    <div className="grid grid-cols-2 items-start gap-5">
                      <div className="grid items-start gap-3">
                        <label
                          htmlFor="cardExpiry"
                          className="text-sm font-medium leading-none"
                        >
                          Expiry Date
                        </label>
                        <Input
                          name="cardExpiry"
                          type="text"
                          placeholder="MM/YY"
                          onChange={(e) =>
                            form.setValue("cardExpiry", e.target.value)
                          }
                        />
                        <FormErrorMessage name={"cardExpiry"} />
                      </div>
                      <div className="grid items-start gap-3">
                        <label
                          htmlFor="cardCVC"
                          className="text-sm font-medium leading-none"
                        >
                          CVC
                        </label>
                        <Input
                          name="cardCVC"
                          type="text"
                          placeholder="XXX"
                          onChange={(e) =>
                            form.setValue("cardCVC", e.target.value)
                          }
                        />
                        <FormErrorMessage name={"cardCVC"} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <TotalAmount handleSubmit={form.handleSubmit(onSubmit)} />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

function TotalAmount({ handleSubmit }: { handleSubmit: () => void }) {
  const { data: sessionData } = useSession();

  const cstate = useCartStore();

  const [total, setcState] = useState<number>(0);

  useEffect(() => setcState(cstate.total), [cstate]);

  return (
    <>
      <div className="sticky top-0 mt-[-2em] w-full max-w-[300px]  self-start pt-10">
        <div
          className="sticky top-0 grid h-full w-full max-w-[300px] 
      gap-5 self-start rounded-lg bg-gray-100 p-5"
        >
          <div className="grid w-full grid-cols-2 rounded-lg bg-gray-200 p-5">
            <span className="text-base ">Subtotal</span>
            <span className="justify-self-end  text-base">${total}</span>
          </div>
          <div className="grid w-full grid-cols-2 rounded-lg bg-gray-200 p-5">
            <span className="text-base ">Shipping</span>
            <span className="justify-self-end  text-base">${0}</span>
          </div>
          <div className="grid w-full grid-cols-2 rounded-lg bg-gray-200 p-5">
            <span className="text-base font-bold">Total</span>
            <span className="justify-self-end text-base font-bold">
              ${total}
            </span>
          </div>
          <Link className="self-end" href={Paths.checkout.path}>
            <Button
              type="submit"
              className="h-12 bg-black px-10 py-5 text-base text-white"
              onClick={handleSubmit}
            >
              Confirm Order
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
