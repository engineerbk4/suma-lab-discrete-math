from pathlib import Path
import re
root=Path(__file__).parent
s=(root/'dist/index.html').read_text()
s=s.replace('<link rel="stylesheet" href="style.css">','<style>'+(root/'dist/style.css').read_text()+'</style>')
model=(root/'dist/model.mjs').read_text().replace('export function ', 'function ')
app=re.sub(r"^import .*?;\n",'',(root/'dist/app.mjs').read_text(),count=1)
s=s.replace('<script type="module" src="app.mjs"></script>','')
s=s.replace('</body>','<script type="module">\n'+model+'\n'+app+'\n</script></body>')
(root/'dist/Simulador_EDI.html').write_text(s)
print('Created self-contained Simulador_EDI.html')
