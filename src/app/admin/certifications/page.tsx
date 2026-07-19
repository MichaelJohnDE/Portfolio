import { prisma } from '../../../lib/prisma';
import CertificationClient from './CertificationClient';
import { parseStatedDate } from '../../../utils/dateParser';

export const dynamic = 'force-dynamic';

export default async function CertificationsAdminPage() {
  const certifications = await prisma.certification.findMany();
  certifications.sort((a, b) => parseStatedDate(b.date) - parseStatedDate(a.date));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-on-surface">Manage Certifications</h1>
      </div>
      <CertificationClient initialData={certifications} />
    </div>
  );
}
