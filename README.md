# DevPlay Accounts Store

## قبل التشغيل
افتحي js/supabase.js وضعي:
- SUPABASE_URL
- SUPABASE_ANON_KEY

## SQL المطلوب في Supabase
```sql
create policy "public can view available accounts"
on public.game_accounts
for select
to anon
using (status = 'available');

create policy "public read account images"
on storage.objects
for select
to anon
using (bucket_id = 'account-images');
```

لو Bucket الصور Private والكود بيستخدم Signed URL، الأفضل تخليه Public للعرض العام أو تضيفي سياسة قراءة anon للصور.

## الدومين المقترح
accounts.devplaystudio.com

DNS في Hostinger:
Type: CNAME
Name: accounts
Target: ym1647445-commits.github.io
