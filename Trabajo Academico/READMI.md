# VII. Resultados y análisis.

Los resultados corresponden a SUMA Lab v3. Se examinaron las duraciones individuales, los acumulados y la coincidencia entre la suma directa y las fórmulas del modelo. Los archivos del anexo permiten reproducir tanto el escenario principal como la verificación automatizada.

## 7.1. Condiciones y parámetros de los escenarios analizados.

La comparación de las tres políticas mostró que una misma cantidad de bloqueos puede generar tiempos acumulados diferentes. En el escenario principal, con duración inicial de 1 minuto, cuatro episodios y máximo de 5 minutos por episodio, los totales fueron 4, 15 y 12 minutos para las políticas fija, por duplicación y con tope. La diferencia de 3 minutos entre las dos últimas se produjo en el cuarto sumando.

***Tabla II. Entradas del escenario principal y dominio admitido***

| **Entrada**           | **Valor principal** | **Condición de la interfaz** |
|-----------------------|---------------------|------------------------------|
| Duración inicial b    | 1 min               | 0,01 a 10 000 min            |
| Número de episodios n | 4                   | Entero de 1 a 30             |
| Máximo por episodio M | 5 min               | b ≤ M ≤ 10 000 min           |

Se examinaron además casos con un solo episodio, máximo igual a la duración inicial, valores decimales, máximo alcanzado exactamente y máximo no alcanzado. El caso con las entradas máximas permitió comprobar el límite numérico de la interfaz. Una exploración adicional con b = 1, n = 30 y M = 16 se utilizó para analizar el crecimiento de los acumulados.

## 7.2. Resultados de la duración de cada episodio de bloqueo.

La tabla III muestra qué término aporta cada episodio al escenario principal. La regla fija conserva un minuto; la duplicación genera 1, 2, 4 y 8 minutos. Con un máximo de 5 minutos, las primeras tres duraciones se mantienen y la cuarta se recorta de 8 a 5.

***Tabla III. Duraciones individuales del escenario principal en minutos***

| **Episodio i** | **Fija** | **Duplicación** | **Con tope** |
|----------------|----------|-----------------|--------------|
| 1              | 1        | 1               | 1            |
| 2              | 1        | 2               | 2            |
| 3              | 1        | 4               | 4            |
| 4              | 1        | 8               | 5            |

El máximo se aplica al término individual y no a la suma. Por ello, una política puede respetar M = 5 minutos en todos sus bloqueos y acumular más de cinco minutos en total. También se distinguió entre alcanzar el máximo y recortar una duración: con M = 4, el tercer episodio alcanza el máximo sin alterarse, mientras que el primer recorte se produce en el cuarto episodio.

## 7.3. Comparación del tiempo acumulado mediante tablas y gráficas.

Cada acumulado se obtuvo añadiendo la duración actual al total de la fila anterior. En los tres primeros episodios, la duplicación y la política limitada coinciden en 1, 3 y 7 minutos. La separación aparece en el cuarto episodio, cuando se añaden 8 y 5 minutos, respectivamente.

***Tabla IV. Tiempos acumulados del escenario principal en minutos***

| **Episodios** | **Fija** | **Duplicación** | **Con tope** |
|---------------|----------|-----------------|--------------|
| 1             | 1        | 1               | 1            |
| 2             | 2        | 3               | 3            |
| 3             | 3        | 7               | 7            |
| 4             | 4        | 15              | 12           |

![Figura 1. Acumulados del escenario b = 1, n = 4 y M = 5. Elaboración a partir de las filas del simulador.](imagenes/image6.png)

***Figura 1. Acumulados del escenario b = 1, n = 4 y M = 5. Elaboración a partir de las filas del simulador.***

En este caso, el tope reduce el acumulado de 15 a 12 minutos: una diferencia de 3 minutos, equivalente al 20 % del total progresivo sin límite. El porcentaje describe solamente esta comparación de tiempos. No representa una reducción de ataques ni una medida de eficacia de seguridad.

Para M ≥ b, cada término limitado es al menos b y no supera el término geométrico. En consecuencia, los resultados satisfacen nb ≤ Tₘ(n) ≤ Tₚ(n). Además, Tₘ(n) ≤ nM, porque ninguno de los n bloqueos limitados dura más de M minutos.

## 7.4. Contraste de los resultados con la identidad de sumatoria.

La suma progresiva del escenario principal fue 1 + 2 + 4 + 8 = 15. La expresión cerrada produjo el mismo resultado:

$$
T_p(4) = 1(2^{4} - 1) = 15\,\mathrm{min}
$$

El contraste numérico permite revisar el cálculo de un caso. La validez para cualquier entero positivo se sustenta en la inducción matemática \[6\], \[7\]. En el caso base, Tₚ(1) = b = b(2¹ − 1). Si se supone que para un entero arbitrario k ≥ 1 se cumple Tₚ(k) = b(2ᵏ − 1), el siguiente bloqueo aporta b·2ᵏ. Entonces:

$$
T_p(k + 1) = b(2^{k} - 1) + b \cdot 2^{k}
$$

$$
= b(2\cdot 2^{k} - 1) = b(2^{k+1} - 1)
$$

El caso base y el paso para un k arbitrario justifican Tₚ(n) = b(2ⁿ − 1) para todo entero n ≥ 1. En el programa, esta incorporación de un nuevo término corresponde a la actualización del acumulador progresivo. La interfaz guía la elección de b·2ᵏ y explica por qué el acumulado anterior o una potencia con una duplicación adicional no son el término que debe añadirse.

La identidad geométrica sin tope deja de describir el acumulado limitado desde el primer recorte. Para contrastar esta segunda política se utilizó una expresión por tramos. Si q es el número de términos geométricos que no superan M, incluyendo un eventual término igual a M, se obtiene:

$$
q = \min\left(n,\,1+\left\lfloor\log_2(M/b)\right\rfloor\right)
$$

$$
T_m(n) = b(2^{q} - 1) + (n-q)M
$$

Con b = 1, n = 4 y M = 5, se tiene q = 3. Los tres términos iniciales suman 7 y el término restante aporta 5: Tₘ(4) = 1(2³ − 1) + (4 − 3)5 = 12 minutos.

## 7.5. Análisis de casos normales y casos límite.

Los siete escenarios válidos de la prueba automatizada produjeron los acumulados previstos en la tabla V. El escenario E1 corresponde al caso principal. En cada configuración se conservaron b y n para las tres políticas.

***Tabla V. Acumulados finales de los siete escenarios válidos en minutos***

| Caso y entradas en minutos | Fija | Duplicación | Con tope |
| --- | --- | --- | --- |
| E1<br> b=1; n=4; M=5 | 4 | 15 | 12 |
| E2<br> b=1; n=1; M=5 | 1 | 1 | 1 |
| E3<br> b=2; n=4; M=2 | 8 | 30 | 8 |
| E4<br> b=0,5; n=3; M=1 | 1,5 | 3,5 | 2,5 |
| E5<br> b=1; n=4; M=4 | 4 | 15 | 11 |
| E6<br> b=1; n=4; M=20 | 4 | 15 | 15 |
| E7<br> b=10 000; n=30; M=10 000 | 300 000 | 10 737 418 230 000 | 300 000 |

E2 comprobó que con un solo episodio las tres políticas coinciden. En E3, M = b hizo que la política limitada coincidiera con la fija en los cuatro episodios. En E4, las duraciones limitadas fueron 0,5; 1; 1 y sumaron 2,5 minutos. E5 separó el máximo alcanzado en el tercer episodio del primer recorte en el cuarto. En E6, el máximo de 20 minutos no modificó ninguna duración.

E7 utilizó b = M = 10 000 minutos y n = 30. Su total progresivo fue 10 737 418 230 000 minutos, mientras que las políticas fija y limitada acumularon 300 000. Estos valores verifican un extremo admitido por la interfaz; no constituyen tiempos de bloqueo recomendados para un sistema real.

## 7.6. Verificación del simulador y evidencias de ejecución.

La verificación comparó los tres acumulados de cada fila con valores esperados calculados mediante expresiones independientes. Para la política fija se utilizó nb; para la progresiva, b(2ⁿ − 1); para la limitada, la expresión por tramos del apartado 7.4. Los resultados esperados se evaluaron con enteros BigInt y se contrastaron exactamente en centésimas de minuto. Esta comprobación corresponde a la verificación de la implementación, en el sentido metodológico de Sargent (2013) \[14\].

La batería sistemática combinó cuatro duraciones iniciales de 1, 50, 100 y 275 centésimas; seis factores para establecer M, iguales a 1; 1,5; 2; 3; 5 y 16; y n entre 1 y 30. Se ejecutaron 4 × 6 × 30 = 720 combinaciones de prueba. El máximo se redondeó a una centésima cuando fue necesario.

Las 720 ejecuciones corresponden a 690 ternas distintas (b, n, M). Con b = 0,01 min, los factores 1,5 y 2 generan el mismo máximo M = 0,02 min después del redondeo. Esto repite una configuración para cada uno de los 30 valores de n. Las repeticiones se incluyen en el total de ejecuciones, pero no amplían la cantidad de entradas distintas examinadas.

***Tabla VI. Resumen de la verificación sistemática***

| **Indicador**                            | **Resultado** |
|------------------------------------------|---------------|
| Ejecuciones de combinaciones de entrada  | 720           |
| Ternas distintas de entrada              | 690           |
| Filas revisadas en las 720 ejecuciones   | 11 160        |
| Contrastes de acumulados (tres por fila) | 33 480        |
| Diferencias detectadas                   | 0             |

La cantidad de filas fue 4 × 6 × (1 + 2 + … + 30) = 11 160. Al contrastar tres acumulados por fila se obtuvieron 33 480 comparaciones. También se comprobaron los siete escenarios válidos de la tabla V y seis entradas inválidas. Todas las pruebas previstas se superaron; ello respalda los casos examinados y no equivale a una prueba exhaustiva de todos los valores admitidos.

***Tabla VII. Entradas inválidas y respuesta esperada del formulario***

| **Entrada modificada**   | **Motivo de rechazo**                 | **Resultado** |
|--------------------------|---------------------------------------|---------------|
| b = 0; n = 4; M = 5      | Duración inicial fuera del dominio    | Rechazada     |
| b = 1; n = 1,5; M = 5    | Número de episodios no entero         | Rechazada     |
| b = 1; n = 31; M = 5     | Número de episodios mayor que 30      | Rechazada     |
| b = 2; n = 4; M = 1      | Máximo inferior a la duración inicial | Rechazada     |
| b = 0,001; n = 4; M = 5  | Más de dos decimales                  | Rechazada     |
| b = 1; n = 4; M = 10 001 | Máximo fuera del límite admitido      | Rechazada     |

En la interfaz, una entrada modificada oculta los resultados anteriores hasta ejecutar una nueva comparación. Cuando se rechaza un campo, se muestra el motivo junto a él. Este comportamiento evita interpretar los totales de una configuración anterior como si correspondieran a los nuevos valores.

![Figura 2. Captura de ejecución del escenario principal. Se muestran b = 1, n = 4, M = 5 y los totales de 4, 15 y 12 minutos.](imagenes/image4.png)

*Figura 2. Captura de ejecución del escenario principal. Se muestran b = 1, n = 4, M = 5 y los totales de 4, 15 y 12 minutos.*

![Figura 3. Captura del resultado de la verificación ejecutada en el navegador. La revisión sistemática finaliza sin diferencias.](imagenes/image5.png)

*Figura 3. Captura del resultado de la verificación ejecutada en el navegador. La revisión sistemática finaliza sin diferencias.*

La portada presenta una traza complementaria de siete episodios para una misma IP ficticia. Sus duraciones son 1, 2, 4, 8, 16, 32 y 64 minutos, y el total progresivo es 127. Se trata de un ejemplo distinto del caso principal de cuatro episodios. La consola solo representa el cálculo: el comando visible no se ejecuta ni se leen registros de un servidor.

## 7.7. Análisis de complejidad y escalabilidad.

La función de cálculo recorre los n episodios una sola vez y realiza un número constante de operaciones aritméticas por iteración. Bajo el modelo de costo unitario y dentro del rango numérico admitido, su tiempo es O(n). La tabla conserva n filas con una cantidad fija de valores, por lo que la memoria también es O(n). Si solo se requirieran los totales y no las filas, bastarían los acumuladores y memoria O(1).

La identidad progresiva requiere O(1) operaciones aritméticas bajo precisión fija. Esta descripción no supone que la aritmética con enteros de tamaño ilimitado tenga costo constante. En la interfaz, reconstruir la tabla y la gráfica exige O(n) trabajo por actualización; reproducir los n pasos con reconstrucción en cada paso puede acumular O(n²) trabajo de representación. No se midieron tiempos de ejecución para afirmar un rendimiento empírico.

En la exploración b = 1, n = 30 y M = 16, los totales fueron 30, 1 073 741 823 y 431 minutos. El máximo se alcanzó exactamente en el episodio 5 y el primer recorte ocurrió en el 6. Desde ese momento, cada episodio limitado añadió 16 minutos. Por eso el acumulado limitado creció con incremento constante, mientras que el progresivo siguió creciendo geométricamente.

![Figura 4. Acumulados de b = 1, n = 30 y M = 16 en escala logarítmica. La escala permite comparar magnitudes muy diferentes sin alterar sus valores.](imagenes/image3.png)

***Figura 4. Acumulados de b = 1, n = 30 y M = 16 en escala logarítmica. La escala permite comparar magnitudes muy diferentes sin alterar sus valores.***

Las duraciones se almacenan en centésimas enteras para evitar la acumulación de errores al sumar decimales. El mayor total progresivo permitido, 1 073 741 823 000 000 centésimas. La generalización matemática puede plantearse para cualquier n positivo, pero ampliar el límite informático requiere revisar la representación numérica y el costo de mostrar las filas.

# VIII. Discusión. 

## 8.1. Interpretación y utilidad de los resultados.

La comparación permite localizar la causa de una diferencia entre acumulados. En el caso principal, las dos políticas progresivas tenían 7 minutos antes del cuarto bloqueo; la diferencia final se originó al añadir 8 o 5 minutos. El simulador hace visible esa relación al presentar las duraciones, los acumulados y la reproducción de los sumandos con los mismos datos.

El resultado también permite distinguir el valor de un término del valor de la suma. En la consola de siete episodios, el último bloqueo dura 64 minutos y el total es 127; utilizar 64 como respuesta al tiempo acumulado omite los seis episodios anteriores. Esta distinción es el vínculo entre la aplicación informática y la identidad de sumatoria que se demuestra por inducción.

La utilidad pedagógica del recurso reside en ofrecer una actividad reproducible de predicción, comprobación y justificación. Por ejemplo, el estudiante puede predecir qué cambia al sustituir M = 5 por M = 4 y después explicar por qué el total limitado pasa de 12 a 11. Esa posibilidad de uso está implementada; su efecto en el aprendizaje todavía debe medirse con estudiantes.

## 8.2. Comparación del modelo con la bibliografía y herramientas reales.

La configuración oficial de Fail2ban contempla el aumento de la duración mediante historial de bloqueos, un máximo configurable y reglas expresadas por fórmulas o multiplicadores. También incluye parámetros de detección como maxretry y findtime, además de un componente temporal aleatorio opcional \[5\]. El simulador conserva únicamente tres reglas de duración y fija una razón de duplicación igual a dos. Por tanto, permite analizar sus sumas, pero no reproduce toda la detección ni la operación de Fail2ban.

Los intentos de autenticación y la fuerza bruta pertenecen al contexto del problema \[3\], \[4\]. Sin embargo, el presente modelo comienza después de la activación del bloqueo y no calcula intentos rechazados, accesos evitados ni ataques distribuidos. El trabajo de Javed y Paxson \[9\] aborda precisamente un escenario de detección distribuida que queda fuera de esta simulación de una sola IP.

Stylianides, Stylianides y Philippou (2007) identificaron dificultades relacionadas con el caso base y con el significado del paso inductivo para un k arbitrario \[8\]. La actividad guiada del recurso permite trabajar esas diferencias al pedir el término del episodio k + 1. Esta relación orienta el diseño de la actividad; no demuestra que las dificultades se hayan superado en los usuarios.

Sorva, Karavirta y Malmi (2013) revisan sistemas de visualización de programas para principiantes y examinan la participación del estudiante en ese tipo de recursos \[13\]. En SUMA Lab, esa participación se concreta en modificar entradas, predecir un término y justificar una respuesta. La evidencia presentada aquí corresponde a la ejecución del modelo y a sus controles; no incluye una evaluación comparativa de aprendizaje.

## 8.3. Limitaciones del modelo y posibles errores de interpretación.

El modelo es determinista y estudia una sola secuencia de bloqueos. No incorpora tráfico real, simultaneidad entre IP, umbrales de detección, intervalos entre episodios ni cambios de comportamiento. En consecuencia, un tiempo acumulado mayor no permite concluir que una regla sea más segura o conveniente para un servicio en producción.

El máximo M limita cada duración, mientras que n determina cuántas duraciones se suman. Confundir ambos niveles puede llevar a considerar erróneo un total superior a M. Asimismo, comprobar varios valores de n no sustituye la demostración por inducción. La igualdad para todo entero positivo depende del caso base y del paso para un entero arbitrario, no de la cantidad de ejemplos calculados.

La batería de pruebas no cubre todas las entradas posibles. Además, las 720 ejecuciones contienen repeticiones debidas al redondeo, como se precisa en el apartado 7.6. Las pruebas revisan acumulados de filas y escenarios seleccionados; no establecen la ausencia de cualquier defecto de interfaz. El límite de 30 episodios y la precisión de dos decimales delimitan el alcance informático de la versión evaluada.

## 8.4. Propuestas de mejora y ampliaciones del simulador.

Una mejora inmediata de la verificación consiste en elegir máximos directamente como centésimas enteras y eliminar ternas repetidas. También conviene ampliar los casos alrededor de cada frontera: un máximo igual a b·2ⁱ⁻¹, otro una centésima menor y otro una centésima mayor. Así se examinarían de forma más dirigida los momentos de alcanzar y de recortar el máximo.

Como ampliación matemática, puede incorporarse una razón r configurable y estudiar T(n) = b(rⁿ − 1)/(r − 1) para r ≠ 1, dejando T(n) = nb cuando r = 1. Esta opción exige revisar las reglas de precisión, las validaciones y las demostraciones; no forma parte de los resultados obtenidos en la versión actual.

Para evaluar el aprendizaje se propone una aplicación posterior con estudiantes: una tarea inicial, uso del simulador y una tarea final que exija explicar el siguiente sumando y el paso inductivo. La comparación debería distinguir resultados numéricos de justificaciones matemáticas y describir participantes, criterios y limitaciones. También se propone actualizar solo los elementos modificados durante la reproducción para reducir el trabajo de representación al ampliar n.

# IX. Conclusiones

## 9.1. Conclusiones sobre el modelado de las políticas de bloqueo.

Se representaron las tres políticas mediante duraciones individuales y acumulados comparables. Con b = 1, n = 4 y M = 5, los resultados fueron 4, 15 y 12 minutos. El recorte del cuarto término de 8 a 5 explicó íntegramente la diferencia de 3 minutos entre las políticas progresivas. El caso M = 4 distinguió alcanzar el máximo en el tercer episodio de recortar por primera vez en el cuarto. Estos resultados responden al objetivo de modelar y comparar las reglas manteniendo las mismas entradas de duración inicial y cantidad de episodios.

## 9.2. Conclusiones sobre la demostración por inducción matemática.

La demostración por inducción justificó Tₚ(n) = b(2ⁿ − 1) para b \> 0 y todo entero n ≥ 1. El caso base coincide con el primer bloqueo y el paso inductivo añade b·2ᵏ al acumulado de los primeros k episodios. La actividad guiada vincula ese razonamiento con una actualización que puede seguirse en la tabla y en la reproducción. La identidad corresponde a la duplicación sin tope; desde el primer recorte, el acumulado limitado requiere considerar los términos M.

## 9.3. Conclusiones sobre la verificación del simulador.

Los acumulados de los siete escenarios válidos coincidieron con los esperados y las seis entradas inválidas fueron rechazadas. La revisión sistemática completó 720 ejecuciones, que contienen 690 ternas distintas, y 33 480 contrastes de acumulados sin diferencias. Estos resultados respaldan la correspondencia del programa con las reglas matemáticas en los casos examinados y cumplen el objetivo de verificación. El recurso queda disponible para una actividad pedagógica reproducible; determinar su efecto en la comprensión de la inducción requiere una evaluación posterior con estudiantes.

