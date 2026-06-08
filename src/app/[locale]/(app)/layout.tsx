import { AppHeader } from '@widgets/app-header';
import { AuthGate } from '@features/auth';
import { MeUserPrefetch } from '@features/me-user-prefetch';

type AppLayoutProps = {
    children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <AuthGate mode="protected">
            <MeUserPrefetch />
            <div className="flex h-dvh flex-col overflow-hidden">
                <AppHeader />
                <div className="flex min-h-0 flex-1 flex-col">{children}</div>
            </div>
        </AuthGate>
    );
}
