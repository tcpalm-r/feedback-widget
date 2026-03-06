import { NextRequest, NextResponse } from 'next/server';
import { getDirectoryClient } from '@/lib/supabaseDirectory';

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const search = sp.get('search')?.trim() ?? '';
  const department = sp.get('department')?.trim() ?? '';
  const page = Math.max(1, Number(sp.get('page')) || 1);
  const limit = Math.min(100, Math.max(1, Number(sp.get('limit')) || 20));
  const offset = (page - 1) * limit;

  const db = getDirectoryClient();

  let query = db
    .from('user_profiles')
    .select('id, email, full_name, given_name, family_name, department, job_title, location, phone_number, avatar_url, manager_email, role', { count: 'exact' })
    .eq('user_classification', 'employee')
    .eq('scim_active', true)
    .order('full_name', { ascending: true })
    .range(offset, offset + limit - 1);

  if (department) {
    query = query.eq('department', department);
  }

  if (search) {
    query = query.or(
      `full_name.ilike.%${search}%,email.ilike.%${search}%,department.ilike.%${search}%`
    );
  }

  const { data, count, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    data: data ?? [],
    total: count ?? 0,
    page,
    limit,
    totalPages: Math.ceil((count ?? 0) / limit),
  });
}
