'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/ui/layout/header';
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { CheckCircle2, Link } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils"

import { useRouter } from 'next/navigation'
import { plans } from '@/models/plans';

export default function Home() {

    type PricingSwitchProps = {
        onSwitch: (value: string) => void
    }
    const [filteredPlans, setFilteredPlans] = useState([] as PricingCardProps[]);
    const [isYearly, setIsYearly] = useState(false)
    const togglePricingPeriod = (value: string) => {
        setIsYearly(parseInt(value) === 1)
    }

    type PricingCardProps = {
        isYearly: boolean
        title: string
        price: string
        link?: string
        description: string
        features: string[]
        actionLabel: string
        popular?: boolean
        exclusive?: boolean
    }

    const PricingHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
        <section className="text-center">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-xl pt-1">{subtitle}</p>
            <br />
        </section>
    )

    const PricingSwitch = ({ onSwitch }: PricingSwitchProps) => (
        <Tabs defaultValue="0" className="w-40 mx-auto">
            <TabsList className="py-6 px-2">
                <TabsTrigger onClick={() => onSwitch("0")} value="0" className="text-base">
                    Monthly
                </TabsTrigger>
                /
                <TabsTrigger onClick={() => onSwitch("1")} value="1" className="text-base">
                    Yearly
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )

    // Function to handle subscription
    function handleSubscription(link?: string) {
        // Construct the query parameters
        const queryParams = new URLSearchParams({
            param: link ?? '',
        });
        if (link) {
            // Navigate to the signup page with the query parameters
            router.push(`/register/subscribe?${queryParams.toString()}`);
        } else {
            router.push(`/register}`);
        }
    }


    const PricingCard = ({ isYearly, title, price, link, description, features, actionLabel, popular, exclusive }: PricingCardProps) => (
        <Card
            className={cn(`w-72 flex flex-col justify-between py-1 ${popular ? "border-rose-400" : "border-zinc-700"} mx-auto sm:mx-0`, {
                "animate-background-shine bg-white dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors":
                    exclusive,
            })}>
            <div>
                <CardHeader className="pb-8 pt-4">
                    {price ? (
                        <div className="flex justify-between">
                            <CardTitle className="text-zinc-700 dark:text-zinc-300 text-lg">{title}</CardTitle>
                            {
                                isYearly ?
                                    <div
                                        className={cn("px-2.5 rounded-xl h-fit text-sm py-1 bg-zinc-200 text-black dark:bg-zinc-800 dark:text-white", {
                                            "bg-gradient-to-r from-orange-400 to-rose-400 dark:text-black ": popular,
                                        })}>
                                        Save 20%
                                    </div>
                                    : null
                            }
                        </div>
                    ) : (
                        <CardTitle className="text-zinc-700 dark:text-zinc-300 text-lg">{title}</CardTitle>
                    )}
                    <div className="flex gap-0.5">
                        <h3 className="text-3xl font-bold">{"$" + price}</h3>
                        {
                            isYearly ?
                                <span className="flex flex-col justify-end text-sm mb-1">{isYearly ? "/year" : "/month"}</span>
                                : null
                        }
                    </div>
                    <CardDescription className="pt-1.5 h-12">{description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    {features.map((feature: string) => (
                        <CheckItem key={feature} text={feature} />
                    ))}
                </CardContent>
            </div>
            <CardFooter className="mt-2">
                <Button onClick={() => handleSubscription(link)} className="relative inline-flex w-full items-center justify-center rounded-md bg-black text-white dark:bg-white px-6 font-medium  dark:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                    <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
                    {actionLabel}
                </Button>
            </CardFooter>
        </Card>
    )

    const CheckItem = ({ text }: { text: string }) => (
        <div className="flex gap-2">
            <CheckCircle2 size={18} className="my-auto text-green-400" />
            <p className="pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm">{text}</p>
        </div>
    )


    useEffect(() => {
        const filteredPlans = plans.filter((plan) => plan.isYearly === null || plan.isYearly === isYearly) as unknown as PricingCardProps[];
        setFilteredPlans(filteredPlans);
    }, [isYearly]);

    const router = useRouter();

    const includedFeatures = [
        'Private forum access',
        'Member resources',
        'Entry to annual conference',
        'Official member t-shirt',
    ]

    return (
        <section>
            <div className="flex flex-col">
                <Header />
            </div>
            <div className="py-8">
                <PricingHeader title="Pricing Plans" subtitle="Choose the plan that's right for you" />
                <PricingSwitch onSwitch={togglePricingPeriod} />
                <section className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8 mt-8">
                    {filteredPlans.map((plan) => {
                        return <PricingCard key={plan.title} {...plan} price={plan.price.toString()} />
                    })}
                </section>
            </div>
        </section>
    );
}