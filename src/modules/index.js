// ثبت خودکار: هر فایل .js در src/modules/<دسته>/ که یک ماژول export default کند، اینجا اضافه می‌شود.
const files=import.meta.glob('./*/*.js',{eager:true});
export const CATS=['mechanics','gravity','fluids','thermo','electricity','electromagnetism','waves','optics','atomic','nuclear','relativity'];
export const modules=Object.entries(files).map(([p,m])=>m.default).filter(Boolean)
  .sort((a,b)=>CATS.indexOf(a.cat)-CATS.indexOf(b.cat));
