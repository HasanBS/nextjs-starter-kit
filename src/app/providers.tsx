// app/providers.tsx

import { AppProvider } from '@/components/ui/authentication/AppContext';
import { NextUIProvider } from '@nextui-org/react';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AppProvider>
            <NextUIProvider>{children}</NextUIProvider>
        </AppProvider>
    );
}
