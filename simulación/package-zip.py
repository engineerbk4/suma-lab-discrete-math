from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import sys
root=Path(__file__).parent
out=Path(sys.argv[1]) if len(sys.argv)>1 else root/'SUMA_Lab_Interactivo_v3.zip'
manual='''SUMA LAB — SIMULADOR INTERACTIVO DE BLOQUEOS TEMPORALES DE IP

PARA EMPEZAR
1. Extrae el ZIP completo (clic derecho > Extraer todo).
2. Abre Simulador_EDI.html con doble clic.
3. Se abrirá en tu navegador; no necesitas instalar nada ni iniciar sesión.

La portada muestra una consola animada de siete bloqueos de una misma IP.
Puedes pausar, continuar, repetir o elegir Otra IP ficticia.
El último bloqueo dura 64 minutos y el total de los siete es 127 minutos.
Debajo se compara por separado un caso de CUATRO bloqueos (4, 15 y 12 min).

En Simulador, cambia las entradas y pulsa Comparar políticas.
Usa Reproducir, Pausar, Siguiente episodio o Reiniciar para seguir las sumas.
Inducción guiada conecta el ejemplo con la demostración matemática.
Resultados y pruebas permite exportar los datos y verificar las operaciones.
La carpeta codigo incluye la versión editable, pruebas y documentación.

El HTML funciona sin Internet. Las referencias externas sí requieren conexión.
La consola muestra datos simulados y el comando visible no se ejecuta.
El recurso no bloquea equipos ni realiza acciones sobre una red.
'''
files=['README.md','build-offline.py','package-zip.py','design-system/MASTER.md','dist/index.html','dist/style.css','dist/app.mjs','dist/model.mjs','tests/verify.mjs','tests/verification-results.json']
with ZipFile(out,'w',ZIP_DEFLATED,compresslevel=9) as z:
 z.write(root/'dist/Simulador_EDI.html','SUMA_Lab/Simulador_EDI.html')
 z.writestr('SUMA_Lab/LEEME.txt',manual)
 for f in files:z.write(root/f,'SUMA_Lab/codigo/'+f)
with ZipFile(out) as z:
 assert z.testzip() is None
 assert z.read('SUMA_Lab/Simulador_EDI.html')==(root/'dist/Simulador_EDI.html').read_bytes()
 print(f'{out}: {len(z.namelist())} archivos; {out.stat().st_size} bytes; integridad correcta.')
