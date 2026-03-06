import { NextResponse } from 'next/server';
import { getDirectoryClient } from '@/lib/supabaseDirectory';

export async function GET() {
  const db = getDirectoryClient();

  const { data, error } = await db
    .from('user_profiles')
    .select('department')
    .eq('user_classification', 'employee')
    .eq('scim_active', true)
    .not('department', 'is', null);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const counts = new Map<string, number>();
  for (const row of data ?? []) {
    if (row.department) {
      counts.set(row.department, (counts.get(row.department) ?? 0) + 1);
    }
  }

  const departments = Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return NextResponse.json(departments);
}
