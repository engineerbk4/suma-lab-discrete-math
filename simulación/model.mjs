export function centimos(raw) {
  const s=String(raw).trim().replace(',', '.');
  if(!/^\d+(?:\.\d{1,2})?$/.test(s)) return null;
  const [a,b='']=s.split('.');
  const v=Number(a)*100+Number(b.padEnd(2,'0'));
  return Number.isSafeInteger(v)&&v>=1&&v<=1000000?v:null;
}
export function validar(bRaw,nRaw,mRaw){
 const errores={}; const b=centimos(bRaw),M=centimos(mRaw);
 const n=Number(nRaw);
 if(b===null) errores.b='Escribe de 0,01 a 10 000 min, con hasta 2 decimales.';
 if(!String(nRaw).trim()||!Number.isInteger(n)||n<1||n>30) errores.n='Elige un número entero de 1 a 30 episodios.';
 if(M===null) errores.M='Escribe de 0,01 a 10 000 min, con hasta 2 decimales.';
 else if(b!==null&&M<b) errores.M='El máximo debe ser mayor o igual que la duración inicial.';
 return {b,n,M,errores};
}
export function simularBloqueos(b,n,M){
 let f=0,p=0,t=0; const filas=[];
 for(let i=1;i<=n;i++){
  const d=b*2**(i-1),c=Math.min(d,M);f+=b;p+=d;t+=c;
  filas.push([i,b,d,c,f,p,t]);
 }
 return {filas,teorico:b*(2**n-1),alcanza:filas.find(r=>r[3]===M)?.[0]??null,recorta:filas.find(r=>r[2]>M)?.[0]??null};
}
export function esperadoLimitado(b,n,M){
 // Closed form split, evaluated with BigInt independently of the row accumulator.
 let q=0;while(q<n&&BigInt(b)*2n**BigInt(q)<=BigInt(M))q++;
 return Number(BigInt(b)*(2n**BigInt(q)-1n)+BigInt(n-q)*BigInt(M));
}
export function verificar(){
 let configuraciones=0,filas=0,controles=0; const fallos=[];
 for(const b of [1,50,100,275]) for(const factor of [1,1.5,2,3,5,16]) for(let n=1;n<=30;n++){
  const M=Math.round(b*factor),r=simularBloqueos(b,n,M);configuraciones++;
  for(const f of r.filas){filas++;const i=f[0];const esperado=[b*i,Number(BigInt(b)*(2n**BigInt(i)-1n)),esperadoLimitado(b,i,M)];
   esperado.forEach((v,j)=>{controles++;if(f[j+4]!==v)fallos.push({b,n,M,i,politica:j,actual:f[j+4],esperado:v});});
  }
 }
 const escenarios=[['1','4','5',[400,1500,1200]],['1','1','5',[100,100,100]],['2','4','2',[800,3000,800]],['0.5','3','1',[150,350,250]],['1','4','4',[400,1500,1100]],['1','4','20',[400,1500,1500]],['10000','30','10000',[30000000,1073741823000000,30000000]]];
 const casos=escenarios.map(([b,n,M,e])=>{const v=validar(b,n,M),r=simularBloqueos(v.b,v.n,v.M);return {b,n,M,ok:e.every((x,j)=>r.filas.at(-1)[j+4]===x)};});
 const invalidas=[['0','4','5'],['1','1.5','5'],['1','31','5'],['2','4','1'],['0.001','4','5'],['1','4','10001']].map(v=>({entradas:v,ok:Object.keys(validar(...v).errores).length>0}));
 return {configuraciones,filas,controles,fallos,casos,invalidas,ok:!fallos.length&&casos.every(c=>c.ok)&&invalidas.every(c=>c.ok)};
}
