// ضعي بيانات مشروع Supabase هنا
const SUPABASE_URL = 'https://fosepdbsvzflvarklxsm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvc2VwZGJzdnpmbHZhcmtseHNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyNjYxNDYsImV4cCI6MjA5ODg0MjE0Nn0.c43dkVqy3IFbf2_lRSv4vDRbM-v7jyxDp5vzegweZnY';

const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const STORAGE_BUCKETS = {
  accounts: 'account-images'
};

const DEVPLAY_WHATSAPP = '201035966569';

function money(value) {
  const n = Number(value || 0);
  return n.toLocaleString('ar-EG') + ' جنيه';
}

function safeText(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function statusText(status) {
  const lang = localStorage.getItem('dp_lang') || 'ar';
  const ar = { available: 'متاح', reserved: 'محجوز', sold: 'تم البيع' };
  const en = { available: 'Available', reserved: 'Reserved', sold: 'Sold' };
  return (lang === 'en' ? en : ar)[status] || status || '';
}

function cleanStoragePath(img) {
  if (!img) return '';
  if (img.includes('/storage/v1/object/public/account-images/')) {
    return img.split('/storage/v1/object/public/account-images/')[1];
  }
  if (img.includes('/storage/v1/object/sign/account-images/')) {
    return img.split('/storage/v1/object/sign/account-images/')[1].split('?')[0];
  }
  if (img.startsWith('account-images/')) return img.replace('account-images/', '');
  return img;
}

async function getAccountImageUrl(img) {
  if (!img) return 'assets/placeholder.svg';
  if (String(img).startsWith('http')) return img;

  const path = cleanStoragePath(img);
  const signed = await db.storage.from(STORAGE_BUCKETS.accounts).createSignedUrl(path, 60 * 60);
  if (!signed.error && signed.data?.signedUrl) return signed.data.signedUrl;

  const publicUrl = db.storage.from(STORAGE_BUCKETS.accounts).getPublicUrl(path);
  return publicUrl.data?.publicUrl || 'assets/placeholder.svg';
}

function whatsappOrderUrl(account) {
  const lang = localStorage.getItem('dp_lang') || 'ar';
  const price = account.sell_price || account.price || 0;
  const text = lang === 'en'
    ? `Hello DevPlay Studio\nI want to order this game account:\n\nAccount code: ${account.code}\nGame: ${account.game}\nAccount name: ${account.account_name || ''}\nPrice: ${price} EGP\n\nIs it still available?`
    : `مرحبًا DevPlay Studio\nأريد طلب هذا الحساب:\n\nكود الحساب: ${account.code}\nاللعبة: ${account.game}\nاسم الحساب: ${account.account_name || ''}\nالسعر: ${price} جنيه\n\nهل الحساب متاح؟`;

  return `https://wa.me/${DEVPLAY_WHATSAPP}?text=${encodeURIComponent(text)}`;
}
