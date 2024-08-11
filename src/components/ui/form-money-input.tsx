'use client';
import { useState } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Input } from './input';
import { UseFormReturn } from 'react-hook-form';

type TextInputProps = {
    form: UseFormReturn<any>;
    name: string;
    label: string;
    placeholder: string;
};

const moneyFormatter = Intl.NumberFormat('tr-TR', {
    currency: 'TRY',
    currencyDisplay: 'symbol',
    currencySign: 'standard',
    style: 'currency',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export default function FormMoneyInput({label, name, placeholder, form }: TextInputProps) {
    const initialValue = form.getValues()[name] ? moneyFormatter.format(form.getValues()[name]) : moneyFormatter.format(0);

    const [value, setValue] = useState(initialValue);

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => {
                field.value = value;

                return (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Input
                                placeholder={placeholder}
                                type="text"
                                {...field}
                                onChange={(ev) => {
                                    const digits = ev.target.value.replace(/\D/g, '').slice(0, 8);
                                    const realValue = Number(digits) / 100;
                                    const formattedValue = moneyFormatter.format(realValue);

                                    setValue(formattedValue);
                                    field.onChange(realValue);
                                }}
                                value={value}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
}
