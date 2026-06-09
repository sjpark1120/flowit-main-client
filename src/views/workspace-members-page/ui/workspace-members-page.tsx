import { useTranslations } from 'next-intl';

import { PageTitle } from '@shared/ui';

export function WorkspaceMembersPage() {
    const t = useTranslations('members');

    return (
        <main className="p-8">
            <PageTitle title={t('title')} subtitle={t('description')} />
        </main>
    );
}
