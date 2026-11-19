// seed.js  — با: node seed.js اجرا کن
const fs = require('fs');
const path = require('path');
const F = path.join(__dirname, 'questions.json');
const cur = JSON.parse(fs.readFileSync(F, 'utf8'));

// ۲۳۴ سوال جدید (c, d, q, o) — درستی گزینه اول فرض می‌شه و a تصادفی می‌شه
const NEW = [
  // sci - easy
  ["sci","easy","بزرگ‌ترین سیاره منظومه شمسی کدام است؟",["مشتری","زحل","زمین","نپتون"]],
  ["sci","easy","کدام گاز بیشتر هوا را تشکیل می‌دهد؟",["اکسیژن","نیتروژن","دی‌اکسید کربن","آرگون"]],
  // ... (اینجا ۲۳۴ ردیف)
];

let id = Math.max(0, ...cur.map(q=>q.id));
const added = NEW.map(([c,d,q,o])=>{
  const a = Math.floor(Math.random()*4);
  // جابه‌جایی گزینه درست به a
  const correct = o[0];
  const rest = o.slice(1);
  const opts = [...rest];
  opts.splice(a, 0, correct);
  return {id:++id, c, d, q, o:opts, a};
});
fs.writeFileSync(F, JSON.stringify([...cur, ...added], null, 0));
console.log(`✔ ${added.length} سوال اضافه شد. مجموع: ${cur.length + added.length}`);