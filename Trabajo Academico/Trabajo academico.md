## Resumen

SUMA Lab v3 es un simulador web dirigido a estudiantes de Ingeniería Informática que permite estudiar las sumatorias y la inducción matemática mediante un caso de bloqueo temporal de una dirección IP ficticia. Cada episodio aporta un término a la sumatoria: los minutos que dura ese bloqueo. La suma de los términos representa el tiempo total que la dirección permanece bloqueada.

El simulador compara tres políticas de duración: fija, progresiva por duplicación y progresiva con un máximo por episodio. Mediante una tabla, una gráfica y un reproductor paso a paso, el estudiante puede predecir cuánto aportará el siguiente bloqueo y observar cómo cambia el acumulado. Una actividad guiada conecta esa predicción con la demostración por inducción de la identidad geométrica.

En el escenario principal, con una duración inicial de un minuto, cuatro episodios y un máximo de cinco minutos por bloqueo, los tiempos acumulados fueron **4, 15 y 12 minutos**, respectivamente. La diferencia entre las dos políticas progresivas se explica por el cuarto sumando, que pasa de ocho a cinco minutos al aplicar el máximo. La verificación del simulador comprendió 720 ejecuciones y 33 480 comparaciones de acumulados, todas coincidentes con los valores esperados.

**Palabras clave:** inducción matemática, sumatoria geométrica, simulación pedagógica, bloqueo temporal de direcciones IP.

## I. Introducción

La seguridad informática constituye uno de los aspectos fundamentales en el desarrollo y mantenimiento de los sistemas tecnológicos actuales, debido a la necesidad de proteger la información y garantizar que únicamente los usuarios autorizados puedan acceder a determinados recursos digitales. Para ello, existen mecanismos de protección que permiten prevenir accesos no autorizados, controlar actividades sospechosas y reducir los riesgos asociados al uso de servicios informáticos [1].

Dentro de este contexto, las matemáticas discretas desempeñan un papel importante en el análisis y la resolución de problemas relacionados con la informática. Proporcionan herramientas para representar secuencias, establecer relaciones y desarrollar modelos que permiten comprender el comportamiento de distintos procesos. Entre estas herramientas se encuentran las sumatorias, las progresiones geométricas y el principio de inducción matemática, conceptos que permiten expresar y demostrar patrones de crecimiento numérico [2].

Este proyecto aborda la relación entre estos fundamentos matemáticos y un escenario de seguridad informática: el bloqueo temporal de direcciones IP ante intentos reiterados de autenticación. Los ataques de fuerza bruta representan una de las amenazas que pueden dar lugar a estos intentos [3], mientras que las directrices del NIST contemplan mecanismos para limitar los intentos fallidos de autenticación [4].

Para estudiar este comportamiento se desarrolló **SUMA Lab v3**, un simulador web pedagógico que compara tres políticas de bloqueo:

- **Duración fija:** cada episodio mantiene el mismo tiempo de bloqueo.
- **Duplicación progresiva:** cada nuevo episodio duplica la duración del anterior.
- **Duplicación con límite máximo:** la duración aumenta progresivamente, pero no puede superar un máximo establecido por episodio.

El simulador permite representar estas políticas mediante tablas, gráficas y una actividad guiada de inducción matemática. De esta manera, se busca vincular los conocimientos de Estructuras Discretas I con una aplicación de la Ingeniería Informática, facilitando la comprensión de los conceptos matemáticos mediante su representación, experimentación y análisis interactivo.

### 1.1. Contextualización del problema

En la administración de servidores, la limitación de intentos fallidos se aplica mediante herramientas como **Fail2ban**, que revisa los registros del sistema y bloquea temporalmente las direcciones IP que acumulan intentos fallidos. Su configuración permite que la duración del bloqueo aumente cuando una dirección reincide, hasta alcanzar un máximo establecido por el administrador [5].

Cuando cada bloqueo duplica la duración del anterior, el tiempo total que una dirección permanece bloqueada forma una progresión geométrica. Su suma puede calcularse mediante una identidad matemática cuya validez para cualquier número de episodios se demuestra por inducción matemática [6], [7].

Este comportamiento permite utilizar un escenario de seguridad informática para estudiar la relación entre las sumatorias, las progresiones geométricas y la inducción matemática.

### 1.2. Justificación

El proyecto se fundamenta en dos perspectivas complementarias: la aplicación de las matemáticas discretas a un problema de seguridad informática y el fortalecimiento del aprendizaje matemático mediante una herramienta de simulación.

Desde la perspectiva informática, los mecanismos de bloqueo temporal constituyen una medida para dificultar los intentos reiterados de autenticación no autorizada. Sin embargo, la duración de estas restricciones debe considerar tanto la protección del sistema como la posibilidad de que usuarios legítimos se vean afectados por bloqueos excesivos. Por ello, resulta conveniente analizar las consecuencias de las políticas de duración fija, progresiva y limitada por un máximo [3], [4].

Desde la perspectiva matemática, el problema permite aplicar conceptos fundamentales de Estructuras Discretas I, especialmente las sumatorias, las progresiones geométricas y el principio de inducción matemática. Cada término de una secuencia representa la duración de un bloqueo temporal, lo que permite relacionar expresiones algebraicas con un escenario informático concreto.

Asimismo, la demostración por inducción permite verificar que la identidad utilizada para calcular el tiempo acumulado de la política progresiva es válida para cualquier número entero positivo de episodios. Esto facilita comprender no solamente cómo se obtiene un resultado particular, sino también por qué una expresión matemática puede generalizarse a diferentes cantidades de elementos [6], [7], [8].

Finalmente, el simulador web permite experimentar con diferentes valores de duración inicial, número de episodios y tiempo máximo permitido. Así, los conceptos teóricos se convierten en una experiencia interactiva que favorece la comprensión, el razonamiento matemático y la relación entre teoría y aplicación.

### 1.3. Delimitación

El estudio utiliza un modelo determinista que analiza una dirección IP ficticia a la vez. Cada episodio representa un bloqueo que ya ha sido activado; por tanto, no se modela la detección de los intentos fallidos.

La simulación contempla tres políticas:

1. **Política de duración fija:** cada episodio mantiene la misma duración inicial, independientemente de las reincidencias.
2. **Política progresiva por duplicación:** la duración de cada nuevo episodio duplica la del anterior, sin establecer un límite máximo dentro del modelo.
3. **Política progresiva con duración máxima:** la duración aumenta mediante duplicación hasta alcanzar el límite establecido, evitando que los episodios superen dicho valor.

El estudio se concentra en calcular y comparar las duraciones individuales y los tiempos acumulados de bloqueo para una misma dirección IP. Además, utiliza la identidad de la sumatoria geométrica para obtener el resultado de la política progresiva sin límite y demuestra su validez mediante inducción matemática.

La investigación no contempla la implementación de un mecanismo real de detección de ataques, la conexión con servidores de producción ni la aplicación efectiva de bloqueos sobre direcciones IP. Tampoco analiza técnicas de evasión, ataques distribuidos, identificación de atacantes o el comportamiento de redes completas [9].

En consecuencia, los resultados describen el comportamiento del modelo matemático y no mediciones de un sistema en producción.

### 1.4. Pregunta de investigación

¿Cómo puede un simulador web pedagógico representar y comparar el tiempo acumulado de bloqueo temporal de una dirección IP bajo distintas políticas de duración, utilizando la identidad de la sumatoria geométrica y su demostración por inducción matemática?

---

## II. Antecedentes históricos y aportes de autores

### 2.1. Evolución histórica de la inducción matemática

La inducción matemática es un método de demostración cuyo desarrollo histórico se relaciona con la necesidad de establecer la validez general de determinadas propiedades numéricas. Aunque algunos razonamientos semejantes ya se encontraban presentes en las matemáticas antiguas, uno de los primeros usos explícitos documentados de este procedimiento se atribuye al matemático italiano **Francesco Maurolico (1494–1575)**.

Maurolico empleó este razonamiento en el estudio de propiedades de los números poligonales. Sus trabajos fueron publicados en *Arithmeticorum libri duo*, incluida posteriormente en *Opuscula Mathematica* (1575). Entre sus aportes destaca la demostración de relaciones entre los números impares y los cuadrados, mediante un razonamiento que anticipaba la estructura de la inducción matemática moderna [10].

Posteriormente, el matemático francés **Blaise Pascal (1623–1662)** contribuyó al desarrollo de este método mediante sus estudios sobre los coeficientes binomiales y las propiedades del triángulo aritmético, conocido actualmente como triángulo de Pascal. Al establecer relaciones entre sus elementos, utilizó procedimientos de demostración que permitían extender determinadas propiedades a sucesivos casos. Sus aportes contribuyeron a fortalecer el uso de razonamientos inductivos en el desarrollo de las matemáticas [10].

Durante el siglo XIX, el estudio de los fundamentos de los números naturales permitió avanzar hacia una formulación más rigurosa de este principio. En este proceso destacaron los trabajos de **Richard Dedekind y Giuseppe Peano (1858–1932)**. En particular, Peano incorporó el principio de inducción entre los postulados utilizados para caracterizar los números naturales en su obra *Arithmetices principia, nova methodo exposita*, publicada en 1889. Esta formalización contribuyó a consolidar la inducción matemática como uno de los fundamentos del razonamiento matemático y de las demostraciones sobre sucesiones y estructuras numéricas [11].

La evolución de este método resulta relevante para el proyecto, debido a que permite fundamentar la demostración de identidades matemáticas que dependen de un número variable de términos. En particular, el principio de inducción se utiliza para demostrar que la identidad de la suma de una progresión geométrica se cumple para cualquier cantidad de episodios de bloqueo considerada en el modelo.

### 2.2. Desarrollo de las matemáticas discretas y sus aplicaciones

El desarrollo de las matemáticas discretas ha permitido establecer herramientas fundamentales para representar y resolver problemas relacionados con las ciencias de la computación. Dentro de este campo, las sucesiones, las sumatorias, las relaciones y los métodos de demostración constituyen conocimientos necesarios para comprender diferentes estructuras y procedimientos computacionales.

Uno de los autores de referencia en esta área es **Kenneth H. Rosen**, quien, mediante su obra *Discrete Mathematics and Its Applications*, desarrolla conceptos relacionados con la lógica, las estructuras matemáticas, las sucesiones, las sumatorias, la inducción y la recursividad. Su trabajo proporciona una organización sistemática de los fundamentos matemáticos que intervienen en la formación de profesionales de informática y computación. En particular, permite comprender cómo las expresiones matemáticas pueden utilizarse para representar patrones, establecer relaciones y demostrar propiedades generales [6].

De manera complementaria, **Susanna S. Epp**, en su obra *Discrete Mathematics with Applications*, aborda el razonamiento matemático mediante el estudio de la lógica, las técnicas de demostración, las sucesiones y la inducción matemática. Su enfoque destaca la importancia de comprender los fundamentos de una demostración y no limitarse únicamente a la aplicación mecánica de fórmulas. Estos contenidos resultan relevantes para desarrollar actividades académicas orientadas a fortalecer el razonamiento lógico y la comprensión de propiedades matemáticas [7].

Los aportes de Rosen y Epp constituyen una base conceptual para este proyecto, ya que los contenidos desarrollados en sus obras permiten fundamentar las sumatorias, las progresiones geométricas y el principio de inducción matemática utilizados en el simulador. De esta manera, sus contribuciones respaldan la relación entre las matemáticas discretas y la representación de procesos mediante modelos computacionales.

### 2.3. Investigaciones sobre seguridad informática y ataques de fuerza bruta

En el ámbito de la seguridad informática, los ataques de fuerza bruta representan una amenaza asociada a los intentos reiterados de autenticación mediante diferentes combinaciones de credenciales. Su estudio ha impulsado el desarrollo de mecanismos de detección y medidas de protección destinadas a limitar los intentos no autorizados y reducir los riesgos asociados al acceso a sistemas informáticos.

En este contexto, en 2013, **Mobin Javed y Vern Paxson** desarrollaron la investigación *Detecting Stealthy, Distributed SSH Brute-Forcing*, en la que propusieron un método para identificar actividades maliciosas distribuidas dirigidas a servicios SSH. Los autores analizaron cómo diferentes fuentes pueden participar en un mismo ataque generando cantidades reducidas de actividad individual, lo que dificulta su identificación mediante mecanismos de detección convencionales. Su investigación utilizó el análisis estadístico de los intentos de autenticación para distinguir comportamientos coordinados de actividades legítimas de los usuarios [9].

Por otra parte, el **Instituto Nacional de Estándares y Tecnología de Estados Unidos (NIST)**, mediante la publicación *Digital Identity Guidelines: Authentication and Authenticator Management* (SP 800-63B-4, 2025), establece recomendaciones y requisitos relacionados con la protección de los mecanismos de autenticación. Entre sus disposiciones se contempla la implementación de mecanismos de limitación de intentos fallidos, así como medidas que pueden incrementar los tiempos de espera cuando se producen reiterados errores de autenticación. Estas directrices muestran la importancia de establecer restricciones que contribuyan a reducir los intentos de acceso no autorizado sin afectar innecesariamente a los usuarios legítimos [4].

Asimismo, herramientas como **Fail2ban** representan una aplicación práctica de estos mecanismos de protección, ya que permiten supervisar registros del sistema y ejecutar acciones de bloqueo temporal cuando se identifican patrones de actividad definidos como sospechosos. Su configuración contempla parámetros relacionados con la duración de las restricciones y las condiciones bajo las cuales se aplican los bloqueos [5].

Estos antecedentes permiten comprender la importancia de los mecanismos de restricción temporal dentro de la seguridad informática. En relación con este proyecto, proporcionan el contexto necesario para representar matemáticamente diferentes políticas de bloqueo y analizar cómo varía el tiempo acumulado cuando las duraciones permanecen constantes, aumentan progresivamente o están sujetas a un límite máximo.

---

## III. Marco teórico

### 3.1. Sumatorias: definición y notación

#### 3.1.1. Definición de sumatoria

En matemáticas, una sumatoria es una operación que permite representar de manera abreviada la adición de una secuencia de términos. Se utiliza cuando se necesita calcular el resultado de sumar varios elementos que siguen una determinada regla o expresión matemática.

En lugar de escribir cada término de manera individual, se emplea el símbolo sigma mayúscula (\(\sum\)), que representa la suma de los elementos comprendidos entre un límite inferior y uno superior. Esta notación facilita la representación de expresiones matemáticas extensas y permite establecer fórmulas generales para calcular acumulaciones [6], [7].

#### 3.1.2. Notación sigma

La notación general de una sumatoria se expresa de la siguiente manera:

\[
\sum_{i=1}^{n} a_i
\]

Donde:

- \(\sum\): símbolo de sumatoria, representa la operación de adición.
- \(i\): índice de sumación que identifica cada término.
- \(1\): límite inferior, indica dónde comienza la suma.
- \(n\): límite superior, indica dónde termina la suma.
- \(a_i\): expresión o término que se debe sumar en cada iteración.

Por ejemplo:

\[
\sum_{i=1}^{4} i
\]

Al desarrollar la expresión se obtiene:

\[
1+2+3+4=10
\]

Esto significa que se suman los valores del índice desde 1 hasta 4.

#### 3.1.3. Propiedades fundamentales de las sumatorias

Las sumatorias presentan propiedades algebraicas que permiten simplificar expresiones y facilitar el cálculo de diferentes acumulaciones.

**a) Suma de dos expresiones**

La suma de dos secuencias puede separarse en dos sumatorias:

\[
\sum_{i=1}^{n}(a_i+b_i)
=
\sum_{i=1}^{n}a_i+
\sum_{i=1}^{n}b_i
\]

**b) Multiplicación por una constante**

Una constante que multiplica todos los términos puede extraerse de la sumatoria:

\[
\sum_{i=1}^{n}c\,a_i
=
c\sum_{i=1}^{n}a_i
\]

**c) Sumatoria de una constante**

Cuando se suma una constante durante \(n\) términos, el resultado corresponde a multiplicar dicha constante por la cantidad de términos:

\[
\sum_{i=1}^{n}c=nc
\]

Estas propiedades permiten transformar expresiones matemáticas y obtener fórmulas que simplifican el cálculo de sumas [6], [7].

### 3.2. Progresión geométrica y su identidad

#### 3.2.1. Definición de progresión geométrica

Una progresión geométrica es una sucesión numérica en la que cada término se obtiene multiplicando el término anterior por una constante denominada razón común. Esta razón determina el comportamiento de crecimiento o disminución de los elementos de la sucesión [6], [7].

Por ejemplo:

\[
2,\ 4,\ 8,\ 16,\ 32
\]

En esta secuencia, cada término se obtiene multiplicando el anterior por 2. Por lo tanto, su razón común es \(r=2\).

#### 3.2.2. Elementos de una progresión geométrica

Una progresión geométrica está determinada principalmente por los siguientes elementos:

- **Primer término (\(b\)):** valor inicial de la sucesión.
- **Razón común (\(r\)):** constante por la que se multiplica cada término para obtener el siguiente.
- **Número de términos (\(n\)):** cantidad de elementos que conforman la progresión.
- **Término general (\(a_i\)):** expresión que permite calcular cualquier término de la progresión.

El término general se expresa mediante:

\[
a_i=br^{i-1}
\]

Donde el exponente representa la cantidad de multiplicaciones por la razón común realizadas desde el primer término.

#### 3.2.3. Identidad de la suma de una progresión geométrica

Cuando se requiere sumar los primeros \(n\) términos de una progresión geométrica, se utiliza la siguiente identidad:

\[
S_n=b\frac{r^n-1}{r-1},\qquad r\neq 1
\]

Para una razón común igual a 2, la suma se calcula mediante:

\[
S_n=b(2^n-1)
\]

#### 3.2.4. Caso particular: progresión geométrica de razón 2

En el proyecto se utiliza una progresión geométrica cuya razón común es igual a 2, debido a que cada nuevo episodio de bloqueo duplica la duración del anterior.

Si se considera una duración inicial \(b\), la sucesión queda representada de la siguiente manera:

\[
b,\ 2b,\ 4b,\ 8b,\ \ldots
\]

El término general es:

\[
a_i=b2^{i-1}
\]

Para calcular la suma de los primeros \(n\) términos, se reemplazan los valores en la identidad geométrica:

\[
S_n=b\frac{2^n-1}{2-1}
\]

Simplificando:

\[
\boxed{S_n=b(2^n-1)}
\]

Esta identidad constituye la expresión matemática central de la política progresiva por duplicación utilizada en el simulador.

Por ejemplo, si la duración inicial es de un minuto y se consideran cuatro episodios:

\[
S_4=1(2^4-1)
\]

\[
S_4=16-1=15
\]

Por lo tanto, el tiempo acumulado de bloqueo es de **15 minutos**.

### 3.3. Principio de inducción matemática

#### 3.3.1. Definición del principio de inducción matemática

El principio de inducción matemática es un método de demostración utilizado para establecer la validez de una proposición matemática para todos los números naturales comprendidos en un determinado dominio.

Su funcionamiento se basa en demostrar que la proposición se cumple para un primer valor y comprobar que, si se cumple para un número natural cualquiera, también se cumple para su sucesor. De esta manera, es posible generalizar su validez a todos los números naturales considerados [6], [7].

La inducción matemática resulta especialmente útil para demostrar identidades relacionadas con sumatorias, sucesiones y progresiones, debido a que permite verificar que una expresión conserva su validez al incorporar nuevos términos.

#### 3.3.2. Etapas de la demostración por inducción

El procedimiento de inducción matemática comprende tres componentes:

**a) Caso base**

Consiste en verificar que la proposición es verdadera para el primer valor del conjunto considerado, generalmente \(n=1\).

**b) Hipótesis inductiva**

Se supone que la proposición es verdadera para un número natural arbitrario \(k\), bajo las condiciones establecidas.

**c) Paso inductivo**

Se demuestra que, partiendo de la hipótesis inductiva, la proposición también se cumple para el siguiente número natural, es decir, \(k+1\).

Si se cumplen estas condiciones, se concluye que la proposición es válida para todos los números naturales desde el caso inicial.

#### 3.3.3. Demostración de la identidad de la sumatoria geométrica

En esta investigación se utiliza la identidad:

\[
\boxed{\sum_{i=1}^{n}b2^{i-1}=b(2^n-1)}
\]

Se demostrará que esta igualdad se cumple para todo entero \(n\geq 1\).

**1. Caso base**

Para \(n=1\), se verifica que:

\[
\sum_{i=1}^{1}b2^{i-1}=b2^0=b
\]

Por otro lado:

\[
b(2^1-1)=b(2-1)=b
\]

Ambas expresiones son iguales. Por lo tanto, la identidad se cumple para \(n=1\).

**2. Hipótesis inductiva**

Se supone que la identidad se cumple para un entero arbitrario \(k\):

\[
\sum_{i=1}^{k}b2^{i-1}=b(2^k-1)
\]

Esta igualdad representa el tiempo acumulado de los primeros \(k\) episodios.

**3. Paso inductivo**

Se debe demostrar que la identidad también se cumple para \(k+1\).

Partimos de la sumatoria:

\[
\sum_{i=1}^{k+1}b2^{i-1}
\]

Separamos el último término:

\[
=\sum_{i=1}^{k}b2^{i-1}+b2^k
\]

Aplicando la hipótesis inductiva:

\[
=b(2^k-1)+b2^k
\]

Desarrollando:

\[
=b2^k-b+b2^k
\]

Agrupando términos:

\[
=2b2^k-b
\]

Finalmente:

\[
=b(2\cdot 2^k-1)
\]

\[
=b(2^{k+1}-1)
\]

Se ha demostrado que la identidad también se cumple para \(k+1\).

**4. Conclusión**

Como la identidad se cumple para el caso base y se ha demostrado que su validez para \(k\) implica su validez para \(k+1\), se concluye, por el principio de inducción matemática, que:

\[
\boxed{\sum_{i=1}^{n}b2^{i-1}=b(2^n-1)}
\]

es válida para todo entero \(n\geq 1\).

Esta demostración permite fundamentar matemáticamente el cálculo del tiempo acumulado de la política progresiva por duplicación implementada en el simulador.

### 3.4. Bloqueo temporal de direcciones IP

#### 3.4.1. Seguridad informática y ataques de fuerza bruta

La seguridad informática comprende un conjunto de medidas, mecanismos y procedimientos destinados a proteger los sistemas, las redes y la información frente a accesos no autorizados y otras amenazas digitales.

Entre estas amenazas se encuentran los ataques de fuerza bruta, una técnica mediante la cual un atacante intenta obtener acceso a un sistema probando repetidamente diferentes combinaciones de credenciales hasta encontrar una válida. Estos ataques pueden dirigirse a distintos mecanismos de autenticación, incluidos los servicios de acceso remoto [3].

Los intentos reiterados pueden generar registros de actividad que permiten identificar comportamientos sospechosos y aplicar mecanismos de protección para reducir la posibilidad de accesos no autorizados.

#### 3.4.2. Direcciones IP y mecanismos de bloqueo

Una dirección IP es un identificador numérico asignado a una interfaz de red que permite identificarla y establecer comunicaciones mediante el protocolo de Internet.

En determinados mecanismos de seguridad, las direcciones IP se utilizan para identificar el origen de las conexiones y establecer restricciones cuando se detectan actividades consideradas sospechosas.

El bloqueo temporal consiste en impedir durante un intervalo determinado que una dirección IP establezca determinadas conexiones con un servicio o recurso protegido. Esta medida permite limitar los intentos reiterados de acceso y reducir la exposición del sistema ante determinadas actividades maliciosas.

Sin embargo, un bloqueo demasiado prolongado también puede afectar a usuarios legítimos, especialmente cuando se producen errores de autenticación. Por ello, es importante establecer políticas que consideren la duración y las condiciones de aplicación de estas restricciones [4], [5].

#### 3.4.3. Fail2ban como herramienta de referencia

Fail2ban es una herramienta de seguridad utilizada principalmente en sistemas Linux para supervisar registros de actividad e identificar patrones asociados a intentos fallidos de autenticación u otros comportamientos definidos mediante filtros.

Cuando se detectan las condiciones configuradas, Fail2ban puede ejecutar acciones que bloquean temporalmente la dirección IP correspondiente mediante los mecanismos de filtrado de red disponibles en el sistema.

Entre sus opciones de configuración se encuentran los tiempos de bloqueo, los incrementos progresivos de duración y el establecimiento de un tiempo máximo. Estas características permiten adaptar las restricciones de acuerdo con la reincidencia de una dirección IP [5].

Es importante señalar que el comportamiento exacto depende de la configuración utilizada. Por ello, en esta investigación se toma como referencia la posibilidad de incrementar progresivamente los tiempos de bloqueo, utilizando la duplicación como regla matemática específica del modelo propuesto. En el archivo de configuración distribuido con la herramienta, el incremento progresivo (`bantime.increment`) aparece desactivado de forma predeterminada [5].

#### 3.4.4. Relación entre el bloqueo temporal y las matemáticas discretas

La duración de los bloqueos temporales puede representarse mediante sucesiones numéricas cuando se establece una regla para determinar el tiempo de cada episodio.

En particular, cuando cada nuevo bloqueo duplica la duración del anterior, se genera una progresión geométrica de razón 2. Esta característica permite utilizar la identidad de la suma geométrica para calcular el tiempo acumulado después de una cantidad determinada de episodios.

De esta manera, un mecanismo utilizado en seguridad informática puede analizarse mediante herramientas matemáticas, estableciendo una relación entre las políticas de bloqueo temporal, las sumatorias y el principio de inducción matemática.

Esta conexión constituye el fundamento conceptual de **SUMA Lab v3**, el simulador pedagógico desarrollado en el proyecto.

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
