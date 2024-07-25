// Función para verificar el uso del Local Storage
function checkLocalStorageUsage() {
  var total = 0;
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    total += (key.length + value.length) * 2; // Cada carácter en UTF-16 ocupa 2 bytes
  }
  // Tamaño total del Local Storage permitido por el navegador (generalmente alrededor de 5 MB a 10 MB)
  var totalAllowed = 1024 * 1024 * 5; // Por ejemplo, 5 MB

  // Convertir bytes a megabytes (MB)
  var totalUsedMB = (total / (1024 * 1024)).toFixed(2);
  var totalAllowedMB = (totalAllowed / (1024 * 1024)).toFixed(2);

  // Calcular el espacio disponible
  var availableSpaceMB = (totalAllowedMB - totalUsedMB).toFixed(2);

  if (totalUsedMB >= totalAllowedMB * 0.9) {
    // Si se ha utilizado más del 90% del espacio permitido
    alert(
      "¡Atención! Has utilizado " +
        totalUsedMB +
        " MB de un total de " +
        totalAllowedMB +
        " MB en el Local Storage. Quedan disponibles " +
        availableSpaceMB +
        " MB."
    );
  } else {
    console.log(
      "Espacio utilizado en el LocalStorage: " +
        totalUsedMB +
        "/" +
        totalAllowedMB +
        "MBs"
    );
    console.log(
      "Espacio disponible en el LocalStorage: " + availableSpaceMB + " MB"
    );
  }
}

checkLocalStorageUsage();

// Función para redireccionar a una nueva ubicación
function exitFunction() {
  var ubicacionActual = window.location.origin;
  // Agregar la ruta o el nombre del archivo que deseas
  var nuevaUbicacion = ubicacionActual + "/miniprograma/todo.html";
  // Redirigir a la nueva ubicación
  window.location.href = nuevaUbicacion;
}

function aleatorio() {
  numero = prompt(
    "Ingresa un numero\n*El numero aleatorio se calculará entre 1 y el numero ingresado."
  );

  // Verificar si el usuario presionó "Cancelar" o ingresó un valor no válido
  if (numero === null || isNaN(numero)) {
    alert("⚠️Ingresa un valor numérico válido para el rango inicial.");
    return;
  }

  alert(`🎲El número aleatorio es ${Math.floor(Math.random() * numero + 1)}`);
}

document.addEventListener("DOMContentLoaded", () => {
  let categories = JSON.parse(localStorage.getItem("categories")) || [
    "General",
  ];
  let currentCategory = "General";
  let cards = JSON.parse(localStorage.getItem("cards")) || { General: [] };

  const sidebar = document.getElementById("sidebar");
  const openSidebarButton = document.getElementById("openSidebar");
  const closeSidebarButton = document.getElementById("closeSidebar");
  const categoriesList = document.getElementById("categoriesList");
  const currentCategoryTitle = document.getElementById("currentCategory");
  const cardsContainer = document.getElementById("cardsContainer");
  const addCardButton = document.getElementById("addCard");
  const cardModal = document.getElementById("cardModal");
  const cardForm = document.getElementById("cardForm");
  const confirmModal = document.getElementById("confirmModal");
  const confirmMessage = document.getElementById("confirmMessage");
  const confirmInput = document.getElementById("confirmInput");
  const confirmButton = document.getElementById("confirmButton");
  const modalTitle = document.getElementById("modalTitle");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  let editCardIndex = null;

  const renderCategories = () => {
    // Limpia el contenido anterior de categoriesList
    categoriesList.innerHTML = "";

    // Ordena el array de categorías alfabéticamente (ignorando mayúsculas y minúsculas)
    categories.sort((a, b) =>
      a.localeCompare(b, "es", { sensitivity: "base" })
    );

    // Itera sobre cada categoría para renderizar en el sidebar
    categories.forEach((category, index) => {
      if (category !== "Buscaste") {
        // Crea un elemento de lista (li) para cada categoría
        const li = document.createElement("li");

        // Añade botones de edición y eliminación si la categoría no es "General"
        if (category !== "General") {
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "❌";
          deleteButton.classList.add("delete-category");
          deleteButton.addEventListener("click", (event) => {
            event.stopPropagation();
            deleteCategory(category, index);
          });
          li.appendChild(deleteButton);

          const editButton = document.createElement("button");
          editButton.textContent = "☰";
          editButton.classList.add("edit-category");
          editButton.addEventListener("click", (event) => {
            event.stopPropagation();
            editCategory(category, index);
          });
          li.appendChild(editButton);
        }

        // Añade el texto de la categoría como un elemento span dentro del li
        const categoryText = document.createElement("span");
        categoryText.textContent = category;
        li.appendChild(categoryText);

        // Maneja el evento clic en el elemento li para cambiar la categoría actual
        li.addEventListener("click", () => {
          currentCategory = category;
          localStorage.setItem("currentCategory", currentCategory);
          currentCategoryTitle.textContent = currentCategory;
          renderCards(); // Vuelve a renderizar las tarjetas relacionadas con la categoría seleccionada
          sidebar.style.display = "none"; // Oculta el sidebar después de seleccionar la categoría
        });

        // Agrega el elemento li al sidebar (categoriesList)
        categoriesList.appendChild(li);
      }
    });
  };

  const renderCards = () => {
    cardsContainer.innerHTML = "";
    if (!cards[currentCategory]) {
      cards[currentCategory] = [];
    }
    cards[currentCategory].forEach((card, index) => {
      const cardElement = document.createElement("div");
      cardElement.className = "card";
      cardElement.innerHTML = `
                <h3>${card.title}</h3>
                <p>${card.description}</p>
                ${
                  card.image
                    ? `<img src="${card.image}" alt="${card.title}">`
                    : ""
                }
                <button class="number-card">${index + 1}</button>
                <button class="edit-card">☰</button>
                <button class="delete-card">❌</button>
            `;

      if (card.link.startsWith("@") || card.link.startsWith(" @")) {
        cardElement.addEventListener("click", () => {
          const confirmOpen = confirm(
            "¿Estás seguro de que deseas abrir esta tarjeta?"
          );
          if (confirmOpen) {
            const contentlink = card.link.substring(1).trim(); // Elimina el "@" y espacios en blanco al inicio
            window.open(`${contentlink}`, "_blank");
          }
        });
      } else if (card.link.startsWith("v/") || card.link.startsWith(" v/")) {
        cardElement.addEventListener("click", () => {
          const cardContent = card.link.trim();
          mostrarContenidoTarjeta(cardContent);
        });
      } else {
        cardElement.addEventListener("click", () => {
          navigator.clipboard
            .writeText(card.link)
            .then(() => {
              alert("Contenido copiado al portapapeles");
            })
            .catch((err) => {
              console.error("Error al copiar al portapapeles:", err);
            });
        });
      }

      function mostrarContenidoTarjeta(cardContent) {
        const modal = document.createElement("div");
        modal.classList.add("custom-modal");

        const modalContent = document.createElement("div");
        modalContent.classList.add("custom-modal-content");

        const closeButton = document.createElement("span");
        closeButton.classList.add("custom-close");
        closeButton.innerHTML = "❌";
        closeButton.onclick = function () {
          document.body.removeChild(modal);
        };

        const title = document.createElement("h2");
        title.textContent = `${card.title}`;
        title.style.padding = "0rem 2.5rem";

        const content = document.createElement("div");
        content.classList.add("custom-modal-content");
        content.style.whiteSpace = "pre-wrap"; // Esta línea permite que se respeten los saltos de línea

        // Verificar si cardContent comienza con "v/"
        if (cardContent.startsWith("v/")) {
          // Obtener el contenido después de "v/"
          const contenido = cardContent.substring(2); // Obtiene el texto después de los primeros dos caracteres ("v/")
          content.textContent = contenido;
        } else {
          content.textContent = cardContent;
        }

        modalContent.appendChild(closeButton);
        modalContent.appendChild(title);
        modalContent.appendChild(content);
        modal.appendChild(modalContent);

        document.body.appendChild(modal);
        modal.style.display = "block";
      }

      // Añadir botón de prueba cuando el DOM esté listo
      document.addEventListener("DOMContentLoaded", function () {
        const testButton = document.createElement("button");
        testButton.textContent = "Abrir Modal de Prueba";
        testButton.onclick = testModal;
        document.body.appendChild(testButton);
      });

      // Añade esto al final de tu archivo JavaScript o en una etiqueta <script> en el HTML
      document.addEventListener("DOMContentLoaded", function () {
        const testButton = document.createElement("button");
        testButton.textContent = "Abrir Modal de Prueba";
        testButton.onclick = testModal;
        document.body.appendChild(testButton);
      });

      // Evento para abrir el modal de edición y mostrar la tarjeta actual para edición
      cardElement.querySelector(".edit-card").addEventListener("click", (e) => {
        e.stopPropagation();
        editCardIndex = index;
        modalTitle.textContent = "Editar tarjeta";
        cardForm.cardTitle.value = card.title;
        cardForm.cardLink.value = card.link;
        cardForm.cardDescription.value = card.description;
        cardForm.cardImage.value = card.image;
        cardModal.style.display = "flex";
        cardModal.style.color = "white";
      });

      cardElement
        .querySelector(".delete-card")
        .addEventListener("click", (e) => {
          e.stopPropagation();
          const num1 = Math.floor(Math.random() * 10 + 1);
          const num2 = Math.floor(Math.random() * 10 + 1);
          const correctSum = num1 + num2;

          confirmMessage.textContent = `¿Estás seguro de que quieres eliminar la tarjeta '${card.title}'? ${num1} + ${num2} para confirmar`;
          confirmModal.style.display = "flex";

          confirmButton.onclick = () => {
            if (parseInt(confirmInput.value) === correctSum) {
              cards[currentCategory].splice(index, 1);
              saveData();
              renderCards();
              confirmModal.style.display = "none";
            } else {
              alert("La suma es incorrecta.");
            }
          };
        });

      cardsContainer.appendChild(cardElement);
    });
  };

  const editCategory = (categoryName, index) => {
    const newCategoryName = prompt(
      "Ingrese el nuevo nombre de la categoría:",
      categoryName
    );
    if (newCategoryName && !categories.includes(newCategoryName)) {
      cards[newCategoryName] = cards[categoryName];
      delete cards[categoryName];

      categories[index] = newCategoryName;
      localStorage.setItem("categories", JSON.stringify(categories));

      saveData();
      renderCategories();
    }
  };

  const saveData = () => {
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("cards", JSON.stringify(cards));
  };

  const deleteCategory = (categoryName, index) => {
    const confirmation = confirm(
      `¿Estás seguro de que quieres eliminar la categoría '${categoryName}'?`
    );
    if (confirmation) {
      categories.splice(index, 1);
      delete cards[categoryName];
      saveData();
      renderCategories();
      if (currentCategory === categoryName) {
        currentCategory = "General";
        localStorage.setItem("currentCategory", currentCategory);
        currentCategoryTitle.textContent = currentCategory;
        renderCards();
      }
    }
  };

  const searchCards = (query = "") => {
    const searchCategory = "Buscaste";
    categories = categories.filter((category) => category !== searchCategory);
    delete cards[searchCategory];

    if (query.trim() !== "") {
      const searchResults = [];

      Object.values(cards).forEach((cardArray) => {
        cardArray.forEach((card) => {
          if (card.title.toLowerCase().includes(query.toLowerCase())) {
            searchResults.push(card);
          }
        });
      });

      if (searchResults.length > 0) {
        categories.push(searchCategory);
        cards[searchCategory] = searchResults;
        currentCategory = searchCategory;
        localStorage.setItem("currentCategory", currentCategory);
        currentCategoryTitle.textContent = currentCategory;
      }
    }

    saveData();
    renderCategories();
    renderCards();
  };

  // Evento de clic en el botón de búsqueda
  searchButton.addEventListener("click", () => {
    const searchQuery = searchInput.value.trim();
    searchCards(searchQuery);
  });

  // Evento de tecla presionada en el campo de entrada
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const searchQuery = searchInput.value.trim();
      searchCards(searchQuery);
    }
  });

  openSidebarButton.addEventListener("click", () => {
    sidebar.style.display = "grid";
  });

  closeSidebarButton.addEventListener("click", () => {
    sidebar.style.display = "none";
  });

  addCardButton.addEventListener("click", () => {
    editCardIndex = null;
    modalTitle.textContent = "Crear tarjeta";
    cardForm.reset();
    cardModal.style.display = "flex";
    cardModal.style.color = "white";
  });

  cardForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newCard = {
      title: cardForm.cardTitle.value || "",
      description: cardForm.cardDescription.value || "",
      link: cardForm.cardLink.value || "",
      image: cardForm.cardImage.value || "",
    };
    if (editCardIndex !== null) {
      cards[currentCategory][editCardIndex] = newCard;
    } else {
      cards[currentCategory].push(newCard);
    }
    saveData();
    renderCards();
    cardModal.style.display = "none";
  });

  document.querySelectorAll(".close-modal").forEach((closeButton) => {
    closeButton.addEventListener("click", () => {
      cardModal.style.display = "none";
      confirmModal.style.display = "none";
    });
  });

  searchButton.addEventListener("click", () => {
    const searchQuery = searchInput.value.trim();
    searchCards(searchQuery);
  });

  // Función para agregar una nueva categoría
  document.getElementById("addCategory").addEventListener("click", () => {
    const categoryName = prompt("Ingrese el nombre de la categoría:");
    if (categoryName && !categories.includes(categoryName)) {
      categories.push(categoryName);
      cards[categoryName] = [];
      saveData();
      renderCategories();
    }
  });

  const importDataButton = document.getElementById("importData");
  importDataButton.addEventListener("click", () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";

    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const importedData = JSON.parse(event.target.result);
        localStorage.setItem(
          "categories",
          JSON.stringify(importedData.categories)
        );
        localStorage.setItem("cards", JSON.stringify(importedData.cards));
        categories = importedData.categories;
        cards = importedData.cards;
        renderCategories();
        renderCards();
        alert("Datos importados correctamente.");
      };

      reader.readAsText(file);
    });

    fileInput.click();
  });

  const exportDataButton = document.getElementById("exportData");
  exportDataButton.addEventListener("click", () => {
    const dataToExport = {
      categories: categories,
      cards: cards,
    };

    const blob = new Blob([JSON.stringify(dataToExport)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const formattedDate = `${day}-${month}-${year} ${hours}.${minutes}`;
    const filename = `My Walllist - ${formattedDate}.json`;

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);

    //alert("Datos exportados correctamente.");
  });

  const exportToCSV = () => {
    const csvContent = [];
    csvContent.push("Title,Description,Link,Image");

    Object.values(cards).forEach((cardArray) => {
      cardArray.forEach((card) => {
        const { title, description, link, image } = card;
        csvContent.push(`${title},${description},${link},${image}`);
      });
    });

    const csvString = csvContent.join("\n");
    const csvBlob = new Blob([csvString], { type: "text/csv" });
    const csvURL = URL.createObjectURL(csvBlob);

    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const formattedDate = `${day}-${month}-${year} ${hours}.${minutes}`;
    const filename = `My Walllist - ${formattedDate}.csv`;

    const downloadLink = document.createElement("a");
    downloadLink.href = csvURL;
    downloadLink.download = filename;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    URL.revokeObjectURL(csvURL);
  };

  const exportCSVButton = document.getElementById("exportCSV");
  exportCSVButton.addEventListener("click", () => {
    exportToCSV();
    //alert("Datos exportados correctamente en formato CSV.");
  });

  const resetDataButton = document.getElementById("resetData");
  resetDataButton.addEventListener("click", () => {
    const confirmation = confirm(
      "¿Estás seguro de que deseas borrar todos los datos?"
    );
    if (confirmation) {
      const num1 = Math.floor(Math.random() * 100 + 1);
      const num2 = Math.floor(Math.random() * 100 + 1);
      const correctSum = num1 + num2;
      const correctSumInput = prompt(
        `¿Estás seguro de que quieres eliminar todos tus datos? ${num1} + ${num2} para confirmar`
      );

      if (parseInt(correctSumInput) === correctSum) {
        localStorage.removeItem("categories");
        localStorage.removeItem("cards");
        categories = ["General"];
        cards = { General: [] };
        saveData(); // Guardar los cambios en el localStorage
        renderCategories();
        renderCards();
        alert("Datos restablecidos correctamente.");
      } else {
        alert("La suma es incorrecta.");
      }
    }
  });

  renderCategories();
  renderCards();
});
