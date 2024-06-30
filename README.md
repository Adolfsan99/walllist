# ✅Todo.html

## - ❓Guía de usuario

A continuación, encontrarás una descripción completa de cada funcionalidad y cómo puedes sacar partido para mejorar tu productividad con mi aplicación. 

**¡Sigue leyendo para descubrir cómo sacar el máximo provecho de todas las características que ofrecemos!**

---

## - 📝Ver/crear tarea

### Descripción

Instrucciones para visualizar y crear tareas en la aplicación.

### Cómo ver o crear una tarea

1. **Presionar el botón "Ver/crear Tarea"**:
   - Este botón te llevará a una alerta donde podrás ver las tareas existentes o crear una nueva.

2. **Crear una nueva tarea de forma sencilla**:
   - En el espacio donde debes ingresar texto, escribe "crear", de esta manera podrás crear una tarea de forma rapida.

3. **Crear una nueva tarea utilizando un prompt**:
   - Sigue el siguiente formato para ingresar una nueva tarea:
      ```
      Prioridad,Estado,Descripción,Día
      ```

### Detalles de Entrada

- **Prioridad**: Un número del `1 al 3`.
- **Estado**: 
  - `p` (🔴 Pendiente)
  - `e` (🟡 En proceso)
  - `f` (🟢 Finalizada)
- **Descripción**: La `descripción` de la tarea.
- **Día**: 
  - `l` (Lunes)
  - `m` (Martes)
  - `mi` (Miércoles)
  - `j` (Jueves)
  - `v` (Viernes)
  - `s` (Sábado)
  - `d` (Domingo)
  - `x` (Sin asignar)

### Ejemplos

**Ejemplo 1**

- **Entrada**:
   ```
   1,p,Lavar los platos,mi
   ```
   - **Prioridad**: 1
   - **Estado**: Pendiente (🔴)
   - **Descripción**: Lavar los platos
   - **Día**: Miércoles

- **Salida**:
   ```
   📆Miércoles
   🔴Lavar los platos
   ```

**Ejemplo 2**

- **Entrada**:
   ```
   1,p,26/05/24,Ir a comprar en el supermercado,x
   ```

- **Salida**:
   ```
   📆Sin asignar
   🔴26/05/24, Ir a comprar en el supermercado
   ```

### Notas adicionales

- Solo se mostrarán las tareas con Prioridad 1.
- El día actual estará marcado con una estrella ⭐ para facilitar el seguimiento.
- Podrás ver una barra de progreso de todas las tareas, que se irá llenando conforme vayas completando las tareas.
- Si en vez de crear una tarea escribes en el prompt "actualizar" se moverán las tareas incompletas del dia anterior al dia actual.
- Si en vez de crear una tarea escribes en el prompt "mover" se moverán las tareas incompletas del dia actual al dia siguiente.
---

## - ✏️Gestor de tareas

### Descripción

Instrucciones para gestionar una tarea existente en la aplicación.

### Cómo gestionar una tarea

1. **Verificar tareas existentes**:
   - La función comprueba si hay tareas almacenadas . Si no hay tareas, muestra una alerta: "⚠️Actualmente, no tienes tareas para gestionar.".

2. **Seleccionar una tarea para gestionar**:
   - Se muestra un mensaje con la lista de tareas, cada una con su prioridad, estado, descripción y día.
   - El usuario selecciona la tarea que desea gestionar ingresando el número correspondiente.

3. **Gestionar detalles de la tarea**:
   - **Nueva Prioridad**: Se solicita al usuario que ingrese la nueva prioridad (`1`, `2`, `3`).
   - **Nuevo Estado**: Se solicita al usuario que ingrese el nuevo estado (`p`: 🔴, `e`: 🟡, `f`: 🟢).
   - **Nueva Descripción**: Se solicita al usuario que ingrese la nueva `descripción`.
   - **Nuevo Día**: Se solicita al usuario que ingrese el nuevo día (`l`: Lunes, `m`: Martes, `mi`: Miércoles, `j`: Jueves, `v`: Viernes, `s`: Sábado, `d`: Domingo, `x`: Sin asignar). El usuario puede escribir 'borrar' para eliminar la tarea.

4. **Validaciones**:
   - **Prioridad**: Debe ser un número entre `1` y `3`.
   - **Estado**: Debe ser uno de los valores permitidos (`p`, `e`, `f`).
   - **Descripción**: No debe exceder los `64 caracteres`.
   - **Día**: Debe ser uno de los valores permitidos (`l`, `m`, `mi`, `j`, `v`, `s`, `d`, `x`).

### Ejemplos

**Ejemplo 1: Gestionando una tarea**

1. **Entrada**:
   ```
   Selecciona la tarea que deseas gestionar:
   1: 1🔴Lavar los platos,Miércoles.
   2: 2🟡Estudiar para el examen,Jueves.
   ```

2. **Edición**:
   - Nueva Prioridad: `2`
   - Nuevo Estado: `e`
   - Nueva Descripción: `Lavar la ropa`
   - Nuevo Día: `v`

3. **Salida**:
   ```
   ✏️Tarea editada exitosamente.
   ```

**Ejemplo 2: Eliminar una tarea**

1. **Entrada**:
   ```
   Selecciona la tarea que deseas gestionar:
   1: 1🔴Lavar los platos,Miércoles.
   ```

2. **Edición**:
   - Ingresar "borrar" para eliminar la tarea

3. **Salida**:
   ```
   🗑️Tarea borrada exitosamente.
   ```

### Notas adicionales

- Si el usuario cancela cualquier prompt, la edición se detiene.
- Si se ingresa una tarea inválida, se muestra una alerta: "⚠️Tarea inválida."
- Los cambios se actualizan una vez que se completan las ediciones.
- Las tareas no realizadas o en proceso, se moverán al dia siguiente despues de las 23:00PM

---

## - 🔃Ver/crear rutina

### Descripción

Esta función te permite ver tu rutina actual y crear una nueva rutina de tareas si lo deseas.

### Cómo ver o crear una rutina

1. **Ver tu rutina actual**:
   - Al abrir la función, verás tu rutina actual en un formato fácil de entender. Si no tienes ninguna rutina, empezarás desde cero.

2. **Editar o crear una nueva rutina**:
   - Para editar tu rutina actual o crear una nueva, sigue estos pasos:
     - Ingresa cada tarea siguiendo este formato: 

      ```
     'Prioridad,Estado,Descripción,Día;Prioridad,Estado,Descripción,Día;'. 
      ```

     Por ejemplo: 
     
      ```
     '1,p,Lavar los platos,mi';1,p,Barrer,j';.
           ```

     - Separa cada tarea con un punto y coma (';').
     - Si deseas crear la rutina y sus tareas, al final de la lista escribe ';crear'.

3. **Confirmar la creación de tareas**:
   - Si decides crear una nueva rutina con sus tareas, se te pedirá que resuelvas una simple suma para confirmar tu decisión.

### Ejemplos

**Ejemplo 1: Ver tu rutina actual y editarla**

1. **Visualizar la rutina actual**:
   ```
   🔃Rutina actual:
   1🔴Lavar los platos,Miércoles;
   2🟡Estudiar para el examen,Jueves;
   ```

2. **Editar la rutina**:
   - Modifica las tareas según tus necesidades siguiendo el formato indicado.

3. **Guardar los cambios**:
   - Cuando hayas terminado de editar, presiona "Aceptar" para guardar los cambios.

**Ejemplo 2: Crear una nueva rutina**

1. **Iniciar una nueva rutina**:
   ```
   🔃Rutina actual:
   (sin tareas)

   *Ingresa la nueva rutina con el formato: 'Prioridad,Estado,Descripción,Día;...'
   ```

2. **Crear la rutina**:
   - Ingresa las tareas siguiendo el formato indicado, separadas por un punto y coma (';').
   - Al final de la lista, escribe ';crear' para confirmar la creación de las tareas.

3. **Confirmar la creación de tareas**:
   - Se te pedirá resolver una suma para confirmar la creación de las tareas. Responde correctamente para finalizar el proceso.

### Notas adicionales

- Asegúrate de seguir el formato adecuado al ingresar tus tareas para evitar errores.
- Si decides cancelar en cualquier momento, tus cambios no se guardarán.
- Las tareas creadas a partir de una nueva rutina se añadirán a tus tareas existentes.

---

## - 🪄Actualizar tareas

### Descripción

La función "Actualizar Tareas" te permite actualizar el estado de tus tareas, mover tareas completadas al registro de tareas completadas y ajustar las prioridades de las tareas según su estado.

### Cómo actualizar tus tareas

1. **Abrir la función**:
   - Al abrir la función, se te pedirá que resuelvas una suma para confirmar la actualización de las tareas. Esto garantiza que la actualización sea intencional.

2. **Resolver la suma**:
   - Resuelve la suma proporcionada para confirmar la actualización de tus tareas.

3. **Actualizar las tareas**:
   - Después de resolver la suma, las tareas se actualizarán automáticamente de acuerdo con las siguientes reglas:
     - Las tareas completadas con prioridad 1 se moverán al ✅Registro.
     - Las tareas con prioridad 2 se cambiarán a prioridad 1.
     - Las tareas con prioridad 3 se cambiarán a prioridad 2.

### Ejemplo

**Actualizar tus tareas**

1. **Confirmar la actualización**:
   - Se te pedirá que resuelvas una suma para confirmar la actualización de las tareas.

2. **Resolver la suma**:
   - Responde correctamente a la suma proporcionada para continuar.

3. **Actualizar las tareas**:
   - Las tareas se actualizarán automáticamente según las reglas establecidas.

### Notas adicionales

- Asegúrate de resolver correctamente la suma para confirmar la actualización de tus tareas.
- Las tareas se actualizarán de acuerdo con las reglas establecidas para cada prioridad.
- Las tareas completadas se moverán al registro de tareas completadas después de la actualización.

---

## - ✅Registro

### Descripción

El registro de tareas completadas te muestra las tareas que has finalizado, tu nivel actual y cuántas tareas más necesitas para subir de nivel. También te permite eliminar el registro de tareas completadas si lo deseas.

### Cómo ver las tareas completadas

1. **Abrir el Registro**:
   - Para abrir la función presiona "✅Todo.html", verás una lista de tus tareas completadas junto con tu nivel actual y tu progreso para alcanzar el próximo nivel.

2. **Ver detalles**:
   - Cada tarea completada se mostrará con su estado (🔴 Pendiente, 🟡 En progreso, 🟢 Finalizada) y la descripción de la tarea junto con el día en que se completó.

3. **Eliminar el registro**:
   - Si deseas eliminar el registro de tareas completadas, escribe "borrar" cuando se te solicite.
   - Para confirmar la eliminación, se te pedirá resolver una suma simple.

### Ejemplo

**Ver tareas completadas y eliminar el registro**

1. **Visualizar el registro**:
   ```
   🟢Tareas completadas - Tu nivel: 2🐸
   *Tienes (20), requieres (30🟢) más para subir de nivel.

   🟢 Lavar los platos, Miércoles
   🟢 Estudiar para el examen, Jueves
   ...
   ```

2. **Eliminar el registro**:
   - Escribe "borrar" cuando se te solicite.
   - Responde a la suma para confirmar la eliminación.

3. **Confirmación**:
   - Se te informará si el registro se ha eliminado exitosamente.

### Notas adicionales

- Asegúrate de escribir "borrar" correctamente para evitar errores.
- Si decides cancelar en cualquier momento, el registro de tareas completadas no se eliminará.
- Se te pedirá resolver una suma para confirmar la eliminación del registro.

---
## - 📋Ver/escribir nota

### Descripción
Esta función te permite ver, escribir y exportar notas en la aplicación.

### Cómo usar Ver o escribir nota

1. **Abrir la función**:
   - Al abrir la función, te llevará a la alerta donde podrás ver o escribir tus notas.

2. **Formato para Crear Notas:**
   - Sigue el siguiente formato para crear una nota:
     ```
     Nota 1;Nota 2;Nota 3
     ```

   - Utiliza ";" (punto y coma) para indicar un salto de línea entre las notas.

### Ejemplos de Entrada y Salida

**Ejemplo 1:**
```
Cocinar;Barrer;Limpiar
```
- **Salida:**
```
  Cocinar
  Barrer
  Limpiar
```

**Ejemplo 2:**
```
📌Recordatorios;-Beber agua;-Limpiar el polvo;;📜Diario;-Mayo 26, Sigo programando una aplicación de productividad;-Mayo 27, Realicé de forma efectiva mi trabajo gracias a esta app.
```
- **Salida:**

```
  - 📌Recordatorios
    - Beber agua
    - Limpiar el polvo
  - 📜Diario
    - Mayo 26, Sigo programando una aplicación de productividad
    - Mayo 27, Realicé de forma efectiva mi trabajo gracias a esta app.
```

### Notas adicionales:
- Asegúrate de guardar la nota antes de cerrar la página.
- El uso de ";" (punto y coma) entre las notas permite separarlas correctamente.
- Si deseas exportar la nota, incluye ";exportar" al final de la nota. Esto generará un archivo de texto con el contenido de la nota en formato .txt.

---

## - 📌Walllist

### Tiene su propia guia, se esta trabajando en ella.

---

## - ✒️TextTo.html

### Descripción

"✒️TextTo.html" es una página web que te permite ingresar texto, visualizarlo, exportarlo como un archivo de texto y regresar a la página principal "✅Todo.html".

### Cómo usar "TextTo.html"

1. **Ingresar texto**:
   - En el área de texto provista, escribe el texto que deseas visualizar o exportar.

2. **Visualizar y contar caracteres**:
   - El texto que ingreses se mostrará debajo del área de texto.
   - El contador de caracteres indicará el número total de caracteres ingresados.

3. **Exportar el texto**:
   - Puedes exportar el texto como un archivo de texto haciendo clic en el botón "Exportar". Se te pedirá que elijas una ubicación para guardar el archivo.

4. **Regresar a la página principal**:
   - Si deseas regresar a la página principal haz clic en el botón "Regresar a ✅Todo.html".

### Notas adicionales

- Esta herramienta fue creada para superar las limitaciones del menú contextual de muchas aplicaciones, que a menudo solo permite copiar texto. Si encuentras un sitio web con un menú contextual limitado, puedes pegar el texto en "TextTo.html" para realizar diversas operaciones, como leer en voz alta, traducir, contar caracteres y corregir texto en tiempo real. Sin embargo, las funcionalidades disponibles pueden variar según el navegador y las extensiones utilizadas.
- El contador de caracteres se actualiza cuando presionas OK.

---

## - 🎲Generar n° aleatorio


### Descripción

La función "Generar Número Aleatorio" te permite obtener un número aleatorio dentro de un rango especificado por el usuario.

### Cómo generar un número aleatorio

1. **Ingresar el rango inicial**:
   - Se te solicitará que ingreses el número que marcará el inicio del rango para el número aleatorio. Normalmente, este valor es 1, pero puedes especificar cualquier número.

2. **Ingresar el rango final**:
   - Luego, ingresa el número que marcará el final del rango para el número aleatorio. Si elegiste 1 como rango inicial, puedes usar 100 como rango final para generar un número aleatorio entre 1 y 100.

3. **Obtener el número aleatorio**:
   - Después de ingresar los rangos, se generará y mostrará un número aleatorio dentro del rango especificado.

### Ejemplo

**Generar un número aleatorio entre 1 y 100**

1. **Ingresar el rango inicial**:
   - Ingresa 1 como el rango inicial.

2. **Ingresar el rango final**:
   - Ingresa 100 como el rango final.

3. **Obtener el número aleatorio**:
   - Se mostrará un número aleatorio entre 1 y 100.

### Notas adicionales

- Asegúrate de ingresar valores numéricos válidos para los rangos inicial y final.
- El número aleatorio se genera dentro del rango especificado por el usuario.
- El número aleatorio se mostrará tanto en la consola como en una alerta.

---

## - 📊Calcular porcentaje

### Descripción

La función "Calcular Porcentaje" te permite determinar el porcentaje de una cantidad en relación con un total dado.

### Cómo calcular el porcentaje

1. **Ingresar el número de partes**:
   - Se te solicitará que ingreses el número de partes que deseas calcular como porcentaje. Por ejemplo, si tienes 3 partes de algo, ingresa 3.

2. **Ingresar el número total**:
   - Luego, ingresa el número total del cual se extraen las partes. Por ejemplo, si el total es 10, ingresa 10.

3. **Obtener el porcentaje**:
   - Después de ingresar ambos valores, se calculará y mostrará el porcentaje correspondiente.

### Ejemplo

**Calcular el porcentaje de 3 sobre 10**

1. **Ingresar el número de partes**:
   - Ingresa 3 como el número de partes.

2. **Ingresar el número total**:
   - Ingresa 10 como el número total.

3. **Obtener el porcentaje**:
   - Se calculará y mostrará el porcentaje de 3 sobre 10.

### Notas adicionales

- Asegúrate de ingresar valores numéricos válidos tanto para el número de partes como para el número total.
- El porcentaje se calcula como (partes / total) * 100.
- El resultado se mostrará como un número entero seguido del símbolo "%".

---
## - 📥 Importar datos

### Descripción
Esta función te permite importar datos desde un archivo JSON.

### Cómo Usar Importar Datos
1. **Haz clic en el botón "Importar Datos".**

2. **Selecciona el archivo JSON que contiene los datos que deseas importar.**

3. **Confirma la selección del archivo.**

4. **Si la importación es exitosa, recibirás una notificación indicando que los datos se han importado correctamente.**

5. **La página se recargará automáticamente para reflejar los cambios en el almacenamiento local.**

### Notas adicionales:
- Asegúrate de seleccionar un archivo JSON válido para la importación.
- Los datos importados reemplazarán cualquier información existente en la aplicación.
---

## - 💾 Exportar datos

### Descripción
Esta función te permite exportar los datos de la aplicación en formato JSON.

### Cómo Usar Exportar Datos
1. **Haz clic en el botón "Exportar Datos".**

2. **Se descargará automáticamente un archivo JSON con los datos de la aplicación.**

3. **Guarda el archivo en tu dispositivo.**

### Notas adicionales:
- Los datos exportados se guardarán en un archivo JSON que puedes utilizar para respaldar o transferir información de la aplicación.
---

## - 🗑️ Formatear Datos

### Descripción
Esta función borra todos los datos almacenados en la aplicación, restableciéndola a su estado inicial.

### Cómo Usar Formatear Datos
1. **Haz clic en el botón "Formatear Datos".**

2. **Se te pedirá que resuelvas una suma como confirmación.**

3. **Ingresa el resultado correcto de la suma.**

4. **Si la suma es correcta, todos los datos de la aplicación serán eliminados.**

### Notas adicionales:
- Ten en cuenta que esta acción es irreversible y eliminará todos los datos de la aplicación de forma permanente. Asegúrate de hacer una copia de seguridad de los datos importantes antes de realizar esta operación.
---

## 🎉¡Has Completado la Guía!

¡Felicidades! Has llegado al final de esta guía. Esperamos que hayas encontrado útiles las instrucciones proporcionadas y que te sientas más cómodo utilizando mi aplicación.

**Recomendaciones Finales:**

Tómate el tiempo para explorar todas las funciones de la aplicación y experimentar con ellas.

**Mantén tus datos actualizados** no olvides exportar tus datos de forma regular, la exportación de datos es util para tener una experiencia en multiples dispositivos, importa tus datos solo cuando sientas que sea necesario.
