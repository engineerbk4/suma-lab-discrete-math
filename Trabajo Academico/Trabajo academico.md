## Resumen

SUMA Lab v3 es un simulador web dirigido a estudiantes de Ingeniería Informática que permite estudiar las sumatorias y la inducción matemática mediante un caso de bloqueo temporal de una dirección IP ficticia. Cada episodio aporta un término a la sumatoria: los minutos que dura ese bloqueo. La suma de los términos representa el tiempo total que la dirección permanece bloqueada.

El simulador compara tres políticas de duración: fija, progresiva por duplicación y progresiva con un máximo por episodio. Mediante una tabla, una gráfica y un reproductor paso a paso, el estudiante puede predecir cuánto aportará el siguiente bloqueo y observar cómo cambia el acumulado. Una actividad guiada conecta esa predicción con la demostración por inducción de la identidad geométrica.

En el escenario principal, con una duración inicial de un minuto, cuatro episodios y un máximo de cinco minutos por bloqueo, los tiempos acumulados fueron **4, 15 y 12 minutos**, respectivamente. La diferencia entre las dos políticas progresivas se explica por el cuarto sumando, que pasa de ocho a cinco minutos al aplicar el máximo. La verificación del simulador comprendió 720 ejecuciones y 33 480 comparaciones de acumulados, todas coincidentes con los valores esperados.

**Palabras clave:** inducción matemática, sumatoria geométrica, simulación pedagógica, bloqueo temporal de direcciones IP.

## IV. Objetivos

### 4.1. Objetivo general

Diseñar un simulador web pedagógico que permita a estudiantes de Ingeniería Informática comparar el tiempo acumulado de bloqueo de una dirección IP bajo tres políticas de duración y demostrar por inducción matemática la identidad de la sumatoria geométrica correspondiente a la duplicación sin tope.

### 4.2. Objetivos específicos

1. Modelar la duración de cada episodio y el tiempo acumulado para las tres políticas, manteniendo la misma duración inicial y el mismo número de episodios. En la política con tope, identificar el primer episodio cuya duración se reduce.
2. Demostrar por inducción matemática la identidad de la suma geométrica y vincular cada etapa de la demostración con la simulación: el primer bloqueo representa el caso base y la incorporación de un nuevo bloqueo representa el paso inductivo.
3. Verificar que las duraciones y los acumulados calculados por el simulador coincidan con los valores esperados en casos normales y casos límite. Para la duplicación sin tope, contrastar también la suma directa con la fórmula demostrada.

## V. Metodología y diseño

### 5.1. Enfoque y alcance de la simulación

Se desarrolló una simulación discreta y determinista. La unidad de análisis es una secuencia de bloqueos ya activados sobre una misma dirección IP ficticia. El acumulado cuenta únicamente los minutos de bloqueo. Por ejemplo, si el primer episodio dura dos minutos y el segundo dura cuatro, se acumulan seis minutos, cualquiera que sea el intervalo transcurrido entre ambos.

El trabajo comprendió tres etapas: formulación de las reglas matemáticas, diseño de la actividad de inducción y verificación de los cálculos mediante resultados obtenidos de forma independiente.

### 5.2. Datos de entrada y condiciones de comparación

| Símbolo | Entrada | Valores admitidos |
|---|---|---|
| $b$ | Duración inicial del bloqueo | De 0,01 a 10 000 minutos, con hasta dos decimales |
| $n$ | Número de episodios | Entero entre 1 y 30 |
| $M$ | Duración máxima por episodio | De 0,01 a 10 000 minutos, con hasta dos decimales y $M \geq b$ |

Las tres políticas se comparan con los mismos valores de $b$ y $n$. El simulador admite coma o punto decimal y convierte las duraciones a centésimas enteras de minuto antes de sumarlas. Por ejemplo, 0,50 minutos se representan internamente como 50 centésimas.

### 5.3. Modelo matemático de las políticas de bloqueo

Sea $d_i$ la duración del episodio $i$. El tiempo acumulado después de $n$ episodios se obtiene sumando las duraciones individuales:

$$
T(n)=\sum_{i=1}^{n}d_i
$$

| Política | Duración del episodio $i$ | Tiempo acumulado tras $n$ episodios |
|---|---|---|
| Fija | $d_i=b$ | $T_f(n)=nb$ |
| Progresiva por duplicación | $d_i=b\cdot 2^{i-1}$ | $T_p(n)=b(2^n-1)$ |
| Progresiva con tope | $d_i=\min(b\cdot 2^{i-1},M)$ | $T_m(n)=\sum_{i=1}^{n}\min(b\cdot 2^{i-1},M)$ |

El exponente $i-1$ indica cuántas duplicaciones han ocurrido desde el primer bloqueo. El máximo $M$ se aplica a cada término antes de incorporarlo a la suma. Por eso, el acumulado de la política limitada puede superar $M$.

### 5.4. Diseño del algoritmo y herramientas elegidas

La interfaz se desarrolló con HTML y CSS. JavaScript calcula las duraciones, actualiza la tabla y controla la reproducción. La gráfica utiliza el formato SVG.

El algoritmo valida las entradas e inicializa un acumulador por política. Luego recorre los episodios en orden. En cada iteración calcula las tres duraciones, las añade a sus respectivos acumuladores y guarda los resultados en una fila. Al finalizar, compara la suma de la política progresiva con $b(2^n-1)$ e identifica dos momentos: el primer episodio que alcanza el máximo y el primero cuya duración se reduce por efecto del tope.

### 5.5. Diseño de la actividad pedagógica

La actividad parte de una predicción. Después de tres bloqueos de 1, 2 y 4 minutos, el estudiante observa un acumulado de 7 minutos. Antes de avanzar, predice cuánto aportará el cuarto episodio. La duplicación añade 8 minutos y lleva el total a 15. Con un máximo de 5 minutos, el cuarto episodio añade 5 y lleva el total a 12.

La sección **Inducción guiada** traslada el mismo razonamiento al caso general:

1. **Caso base.** Para $n=1$, el primer bloqueo dura $b$ y la fórmula da $b(2^1-1)=b$.
2. **Hipótesis inductiva.** Se supone que, para un entero arbitrario $k\geq 1$, los primeros $k$ episodios acumulan $T_p(k)=b(2^k-1)$.
3. **Paso inductivo.** El episodio $k+1$ aporta $b\cdot 2^k$, pues han ocurrido $k$ duplicaciones. Al incorporar ese término se obtiene:

$$
T_p(k+1)=b(2^k-1)+b\cdot 2^k=b(2^{k+1}-1)
$$

Por el principio de inducción matemática, la identidad es válida para todo entero $n\geq 1$ y toda duración inicial $b>0$.

### 5.6. Diseño de la verificación

La verificación combinó cuatro duraciones iniciales, seis factores para determinar el máximo y los 30 valores admitidos de $n$. Para cada fila se compararon los tres acumulados del programa con referencias calculadas de forma independiente. El criterio de aceptación fue la **coincidencia exacta en centésimas de minuto**.

Para la política con tope, si $q$ de los primeros $i$ términos geométricos conservan su valor original, esos términos suman $b(2^q-1)$. Los $i-q$ restantes aportan $M$ cada uno. La referencia utilizada fue:

$$
T_m(i)=b(2^q-1)+(i-q)M
$$

También se seleccionaron casos para comprobar la inicialización con un solo episodio, el manejo de decimales, el primer recorte y el rechazo de entradas fuera del dominio.

## VI. Implementación o simulación

### 6.1. Arquitectura del simulador

| Archivo | Función |
|---|---|
| `Simulador_EDI.html` | Versión integrada que se abre en un navegador y funciona sin conexión. |
| `index.html` y `style.css` | Estructura y presentación visual de la versión editable. |
| `dist/model.mjs` | Validación de entradas, cálculo de las tres políticas y verificación de los acumulados. |
| `app.mjs` | Interacción con el estudiante y actualización de la tabla, la gráfica y el reproductor. |
| `tests/verify.mjs` | Pruebas automatizadas sobre el mismo módulo de cálculo utilizado por la interfaz. |

La tabla y las tarjetas muestran los resultados del escenario completo. El reproductor permite detener la gráfica y las sumas parciales en un episodio específico para predecir el siguiente término.

### 6.2. Fragmento esencial de código

La función `simularBloqueos` recibe `b` y `M` en centésimas de minuto. Cada fila contiene el número de episodio, las tres duraciones individuales y los tres acumulados.

```javascript
export function simularBloqueos(b, n, M) {
  let f = 0, p = 0, t = 0;
  const filas = [];

  for (let i = 1; i <= n; i++) {
    const d = b * 2 ** (i - 1);
    const c = Math.min(d, M);

    f += b;
    p += d;
    t += c;
    filas.push([i, b, d, c, f, p, t]);
  }

  return {
    filas,
    teorico: b * (2 ** n - 1),
    alcanza: filas.find(r => r[3] === M)?.[0] ?? null,
    recorta: filas.find(r => r[2] > M)?.[0] ?? null
  };
}
```

`alcanza` identifica el primer episodio cuya duración limitada es igual a $M$. `recorta` identifica el primero cuya duración por duplicación supera $M$. Ambos resultados pueden corresponder a episodios diferentes.

### 6.3. Procedimiento de reproducción

1. Abrir `Simulador_EDI.html` en un navegador y entrar en **Simulador**.
2. Introducir $b=1$ minuto, $n=4$ episodios y $M=5$ minutos. Seleccionar **Comparar políticas**.
3. Reiniciar el reproductor y avanzar hasta el tercer episodio. Las dos políticas progresivas acumulan $1+2+4=7$ minutos.
4. Avanzar al cuarto episodio y contrastar la predicción con la tabla.

| Episodio | Duración fija | Duración por duplicación | Duración con tope | Acumulado fijo | Acumulado por duplicación | Acumulado con tope |
|---:|---:|---:|---:|---:|---:|---:|
| 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| 2 | 1 | 2 | 2 | 2 | 3 | 3 |
| 3 | 1 | 4 | 4 | 3 | 7 | 7 |
| 4 | 1 | 8 | 5 | 4 | 15 | 12 |

Todas las duraciones y los acumulados de la tabla se expresan en minutos. En **Inducción guiada**, el estudiante relaciona la incorporación del cuarto sumando con la incorporación de $b\cdot 2^k$ en el paso de $k$ a $k+1$.

### 6.4. Casos normales y casos límite

Con un solo episodio, las tres políticas acumulan $b$ minutos. Cuando $M=b$, la política limitada mantiene esa misma duración en todos los episodios y su acumulado coincide con el de la política fija.

El caso $b=1$, $n=4$ y $M=4$ permite observar la diferencia entre **alcanzar** y **recortar**. El tercer episodio alcanza exactamente 4 minutos y conserva el valor previsto. El primer recorte ocurre en el cuarto episodio, cuando la duración prevista de 8 minutos se reduce a 4. El acumulado limitado es $1+2+4+4=11$ minutos. El anexo C reúne los siete escenarios comprobados, incluido el caso con duración decimal.

### 6.5. Evidencias de ejecución y registro

La ejecución documentada de `node tests/verify.mjs` reprodujo los resultados de `tests/verification-results.json`. Los siete escenarios válidos coincidieron con los valores esperados y el validador identificó las seis entradas inválidas. El barrido sistemático produjo **11 160 filas y 33 480 comparaciones sin discrepancias**.

Desde **Resultados y pruebas** se pueden exportar la tabla en CSV, la gráfica en SVG y el escenario en JSON. Para conservar la gráfica completa, se selecciona el último episodio antes de exportar. Si se ejecuta primero la verificación, el JSON también incluye sus resultados.

## IX. Conclusiones

### 9.1. Modelado de las políticas de bloqueo

Las tres políticas pueden expresarse mediante una misma estructura de sumatoria. La diferencia está en el término que aporta cada episodio. En el escenario principal, las dos políticas progresivas coincidieron durante los primeros tres bloqueos. La diferencia final de tres minutos se originó íntegramente en el cuarto término: la duplicación aportó ocho minutos y la regla con tope aportó cinco. El caso de máximo exacto mostró además que alcanzar el límite y experimentar el primer recorte pueden ocurrir en episodios distintos.

### 9.2. Demostración por inducción matemática

La inducción permitió justificar que $T_p(n)=b(2^n-1)$ para todo entero $n\geq 1$ y $b>0$. El vínculo con el simulador se encuentra en el paso inductivo: avanzar una fila equivale a añadir la duración del siguiente episodio, $b\cdot 2^k$, al acumulado de los primeros $k$ bloqueos. En la política limitada, desde el primer recorte se incorpora $M$ por cada episodio restante.

### 9.3. Verificación del simulador

Las 720 ejecuciones del barrido correspondieron a 690 combinaciones distintas de entradas debido al redondeo del máximo a centésimas. Las 33 480 comparaciones coincidieron con las referencias independientes. Estos resultados respaldan la implementación de las reglas matemáticas dentro del dominio examinado. Evaluar cuánto contribuye la actividad a la comprensión de la inducción requiere una aplicación posterior con estudiantes.

## XI. Anexos

### Anexo A. Código del simulador y de las pruebas

La versión de uso directo se encuentra en `Simulador_EDI.html`. En la versión editable, `dist/model.mjs` contiene la validación de entradas, la función `simularBloqueos` y la verificación matemática. El archivo `tests/verify.mjs` importa ese módulo y comprueba la conversión a centésimas, los resultados de escenarios concretos, la detección del primer recorte y los totales del barrido sistemático.

### Anexo B. Manual mínimo de uso

1. Abrir `Simulador_EDI.html` y entrar en **Empieza aquí**. Observar la secuencia de siete bloqueos: el séptimo dura 64 minutos y los siete acumulan 127 minutos.
2. Entrar en **Simulador**, ingresar los parámetros y seleccionar **Comparar políticas**.
3. Utilizar el reproductor para avanzar episodio por episodio. Antes de cada avance, predecir la duración del siguiente bloqueo y el nuevo acumulado.
4. Abrir **Inducción guiada**, resolver la predicción numérica e identificar el término que debe añadirse en el paso inductivo.
5. En **Resultados y pruebas**, ejecutar la verificación y exportar los datos o la gráfica del escenario.

### Anexo C. Salida de la ejecución de las pruebas

Desde la carpeta `codigo`, ejecutar:

```bash
node tests/verify.mjs
```

El registro de referencia se encuentra en `tests/verification-results.json`. Los resultados de las tres últimas columnas son tiempos acumulados en minutos.

| Escenario | $b$ (min) | $n$ | $M$ (min) | Fija | Duplicación | Con tope |
|---|---:|---:|---:|---:|---:|---:|
| Principal | 1 | 4 | 5 | 4 | 15 | 12 |
| Un episodio | 1 | 1 | 5 | 1 | 1 | 1 |
| Máximo igual a la duración inicial | 2 | 4 | 2 | 8 | 30 | 8 |
| Duración decimal | 0,5 | 3 | 1 | 1,5 | 3,5 | 2,5 |
| Máximo exacto | 1 | 4 | 4 | 4 | 15 | 11 |
| Máximo sin recorte | 1 | 4 | 20 | 4 | 15 | 15 |
| Valores máximos admitidos | 10 000 | 30 | 10 000 | 300 000 | 10 737 418 230 000 | 300 000 |

El validador rechazó seis entradas: duración inicial igual a cero, número fraccionario de episodios, 31 episodios, máximo inferior a la duración inicial, duración con tres decimales y máximo de 10 001 minutos.

### Anexo D. Distribución de tareas y evidencia de participación

| Integrante | Actividades realizadas | Evidencia o versión |
|---|---|---|
| Yessica Alvarez Hanampa | Por completar | Por completar |
| Rebeca Milagros Cerdan Dongo | Por completar | Por completar |
| Leydi Katerin Huamaní Huamaní | Por completar | Por completar |

### Anexo E. Declaración de autoría y atribución

El equipo presenta **SUMA Lab v3** como material de simulación del trabajo académico. El código de cálculo y las pruebas corresponden a los archivos `dist/model.mjs` y `tests/verify.mjs` de la versión entregada. La guía de diseño `MASTER.md` documenta la consulta de UX Pro Max para la presentación visual.

El modelo matemático se fundamenta en los textos de Kenneth H. Rosen y Susanna S. Epp, incluidos en las referencias [6] y [7] del informe. La configuración de Fail2ban, citada en la referencia [5], sirvió como contexto informático para el estudio del bloqueo temporal. Se utilizó ChatGPT como apoyo en la revisión y organización del informe.
