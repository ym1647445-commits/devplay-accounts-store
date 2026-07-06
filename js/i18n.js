const translations = {
  ar: {
    tagline: 'حسابات ألعاب موثوقة وآمنة', accounts: 'الحسابات', how: 'طريقة الطلب', why: 'لماذا نحن؟',
    newService: 'خدمة جديدة', heroTitle: 'بيع وشراء حسابات الألعاب بأمان وخصوصية',
    heroText: 'اختر الحساب المناسب، شاهد الكود والسعر والوصف، واطلبه مباشرة عبر واتساب. بيانات البائع والمشتري محفوظة بالكامل.',
    browseAccounts: 'تصفح الحسابات', contactUs: 'تواصل معنا', secureDeal: 'وسيط موثوق',
    secureDealText: 'لا يتم تحويل المبلغ للبائع إلا بعد تأكيد استلام الحساب.', availableNow: 'متاح الآن', accountsTitle: 'حسابات الألعاب',
    search: 'بحث', game: 'اللعبة', allGames: 'كل الألعاب', minPrice: 'أقل سعر', maxPrice: 'أعلى سعر', reset: 'إعادة ضبط',
    privacy: 'خصوصية كاملة', privacyText: 'لا نشارك بيانات البائع أو المشتري مع أي طرف.', guarantee: 'ضمان للطرفين',
    guaranteeText: 'الصفقة تتم بالوساطة والمتابعة حتى اكتمال التسليم.', fast: 'طلب سريع', fastText: 'زر واتساب يرسل كود الحساب تلقائيًا للدعم.',
    howTitle: 'طريقة الطلب', step1: 'اختر الحساب المناسب', step2: 'اضغط طلب عبر واتساب', step3: 'أكد التفاصيل مع الدعم', step4: 'استلم الحساب بأمان',
    footerText: 'كل خدماتك الرقمية في مكان واحد', back: 'رجوع'
  },
  en: {
    tagline: 'Trusted and secure game accounts', accounts: 'Accounts', how: 'How to order', why: 'Why us?',
    newService: 'New service', heroTitle: 'Buy and sell game accounts safely and privately',
    heroText: 'Choose an account, view its code, price, and description, then order directly via WhatsApp. Seller and buyer data stays private.',
    browseAccounts: 'Browse accounts', contactUs: 'Contact us', secureDeal: 'Trusted mediator',
    secureDealText: 'The seller is paid only after the buyer confirms delivery.', availableNow: 'Available now', accountsTitle: 'Game accounts',
    search: 'Search', game: 'Game', allGames: 'All games', minPrice: 'Min price', maxPrice: 'Max price', reset: 'Reset',
    privacy: 'Full privacy', privacyText: 'We do not share seller or buyer data with any party.', guarantee: 'Protection for both sides',
    guaranteeText: 'The deal is handled and followed up until delivery is complete.', fast: 'Fast order', fastText: 'WhatsApp button sends the account code automatically.',
    howTitle: 'How to order', step1: 'Choose the right account', step2: 'Order via WhatsApp', step3: 'Confirm details with support', step4: 'Receive the account safely',
    footerText: 'All your digital services in one place', back: 'Back'
  }
};

function applyLanguage(lang) {
  localStorage.setItem('dp_lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang]?.[key]) el.textContent = translations[lang][key];
  });
  document.querySelectorAll('[data-placeholder-ar]').forEach(el => {
    el.placeholder = lang === 'ar' ? el.dataset.placeholderAr : el.dataset.placeholderEn;
  });
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = lang === 'ar' ? 'EN' : 'AR';
}

document.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem('dp_lang') || 'ar';
  applyLanguage(lang);
  document.getElementById('langToggle')?.addEventListener('click', () => {
    const next = (localStorage.getItem('dp_lang') || 'ar') === 'ar' ? 'en' : 'ar';
    applyLanguage(next);
    if (typeof renderAccounts === 'function') renderAccounts();
  });
});
