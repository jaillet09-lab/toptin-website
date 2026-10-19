// crude HTML -> text for reading pages
let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{
s=s.replace(/<script[\s\S]*?<\/script>/gi,'').replace(/<style[\s\S]*?<\/style>/gi,'').replace(/<(header|nav|footer)[\s\S]*?<\/\1>/gi,'')
 .replace(/<br\s*\/?>/gi,'\n').replace(/<\/(p|h[1-6]|li|div|section)>/gi,'\n').replace(/<h([1-6])[^>]*>/gi,(m,l)=>'\n'+'#'.repeat(+l)+' ')
 .replace(/<[^>]+>/g,'').replace(/&nbsp;/g,' ').replace(/&#8217;|&rsquo;/g,"'").replace(/&#8211;|&ndash;/g,'-').replace(/&amp;/g,'&').replace(/&#82(20|21);/g,'"')
 .split('\n').map(l=>l.trim()).filter(Boolean).filter((l,i,a)=>l!==a[i-1]).join('\n');console.log(s)})
