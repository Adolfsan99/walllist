checkLocalStorageUsage()

function checkLocalStorageUsage() {
    var total = 0;
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var value = localStorage.getItem(key);
      total += (key.length + value.length) * 2; // Cada carácter en UTF-16 ocupa 2 bytes
    }
    // Tamaño total del Local Storage permitido por el navegador (generalmente alrededor de 5 MB a 10 MB)
    var totalAllowed = (1024 * 1024 * 5); // Por ejemplo, 5 MB
  
    // Convertir bytes a megabytes (MB)
    var totalUsedMB = (total / (1024 * 1024)).toFixed(2);
    var totalAllowedMB = (totalAllowed / (1024 * 1024)).toFixed(2);
  
    // Calcular el espacio disponible
    var availableSpaceMB = (totalAllowedMB - totalUsedMB).toFixed(2);
  
    if (totalUsedMB >= (totalAllowedMB * 0.9)) { // Si se ha utilizado más del 90% del espacio permitido
      alert("¡Atención! Has utilizado " + totalUsedMB + " MB de un total de " + totalAllowedMB + " MB en el Local Storage. Quedan disponibles " + availableSpaceMB + " MB.");
    } else {
      console.log("Espacio utilizado en el LocalStorage: " + totalUsedMB + "/" + totalAllowedMB + "MBs");
      console.log("Espacio disponible en el LocalStorage: " + availableSpaceMB + " MB");
    }
  }

function exitFunction() {
    var ubicacionActual = window.location.origin;
    // Agregar la ruta o el nombre del archivo que deseas
    var nuevaUbicacion = ubicacionActual + "/miniprograma/todo.html";
    // Redirigir a la nueva ubicación
    window.location.href = nuevaUbicacion;
}

document.addEventListener('DOMContentLoaded', () => {
    let categories = JSON.parse(localStorage.getItem('categories')) || ['General'];
    let currentCategory = localStorage.getItem('currentCategory') || 'General';
    let cards = JSON.parse(localStorage.getItem('cards')) || { 'General': [] };

    const sidebar = document.getElementById('sidebar');
    const openSidebarButton = document.getElementById('openSidebar');
    const closeSidebarButton = document.getElementById('closeSidebar');
    const categoriesList = document.getElementById('categoriesList');
    const currentCategoryTitle = document.getElementById('currentCategory');
    const cardsContainer = document.getElementById('cardsContainer');
    const addCardButton = document.getElementById('addCard');
    const cardModal = document.getElementById('cardModal');
    const cardForm = document.getElementById('cardForm');
    const confirmModal = document.getElementById('confirmModal');
    const confirmMessage = document.getElementById('confirmMessage');
    const confirmInput = document.getElementById('confirmInput');
    const confirmButton = document.getElementById('confirmButton');
    const modalTitle = document.getElementById('modalTitle');
    
    let editCardIndex = null;
/*
// Dentro de la función renderCategories
const renderCategories = () => {
    categoriesList.innerHTML = '';
    categories.forEach((category, index) => {
        const li = document.createElement('li');

        // Agregar botón de editar
        const editButton = document.createElement('button');
        editButton.textContent = '📝';
        editButton.classList.add('edit-category');
        editButton.addEventListener('click', (event) => {
            event.stopPropagation();
            editCategory(category, index);
        });
        li.appendChild(editButton);

        // Agregar botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete-category');
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            deleteCategory(category, index);
        });
        li.appendChild(deleteButton);

        // Agregar nombre de la categoría
        const categoryText = document.createElement('span');
        categoryText.textContent = category;
        li.appendChild(categoryText);

        // Agregar el evento click para cambiar la categoría
        li.addEventListener('click', () => {
            currentCategory = category;
            localStorage.setItem('currentCategory', currentCategory);
            currentCategoryTitle.textContent = currentCategory;
            renderCards();
            sidebar.style.display = 'none';
        });

        categoriesList.appendChild(li);
    });
};
*/
const renderCategories = () => {
    categoriesList.innerHTML = '';
    categories.forEach((category, index) => {
        const li = document.createElement('li');

        // Verificar si la categoría es "General"
        if (category !== 'General') {
            // Agregar botón de editar
            const editButton = document.createElement('button');
            editButton.textContent = '📝';
            editButton.classList.add('edit-category');
            editButton.addEventListener('click', (event) => {
                event.stopPropagation();
                editCategory(category, index);
            });
            li.appendChild(editButton);

            // Agregar botón de eliminar
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '❌';
            deleteButton.classList.add('delete-category');
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation();
                deleteCategory(category, index);
            });
            li.appendChild(deleteButton);
        }

        // Agregar nombre de la categoría
        const categoryText = document.createElement('span');
        categoryText.textContent = category;
        li.appendChild(categoryText);

        // Agregar el evento click para cambiar la categoría
        li.addEventListener('click', () => {
            currentCategory = category;
            localStorage.setItem('currentCategory', currentCategory);
            currentCategoryTitle.textContent = currentCategory;
            renderCards();
            sidebar.style.display = 'none';
        });

        categoriesList.appendChild(li);
    });
};


const renderCards = () => {
    cardsContainer.innerHTML = '';
    if (!cards[currentCategory]) {
        cards[currentCategory] = [];
    }
    cards[currentCategory].forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `
            <h3>${card.title}</h3>
            <p>${card.description}</p>
            ${card.image ? `<img src="${card.image}" alt="${card.title}">` : ''}
            <button class="edit-card">✏️</button>
            <button class="delete-card">❌</button>
        `;

        if (card.link.startsWith('@')) {
            cardElement.addEventListener('click', () => {
                window.open(card.link.substring(1), '_blank');
            });
        } else {
            cardElement.addEventListener('click', () => {
                navigator.clipboard.writeText(card.link).then(() => {
                    alert('Enlace copiado al portapapeles');
                });
            });
        }

        cardElement.querySelector('.edit-card').addEventListener('click', (e) => {
            e.stopPropagation();
            editCardIndex = index;
            modalTitle.textContent = 'Editar Tarjeta';
            cardForm.cardTitle.value = card.title;
            cardForm.cardDescription.value = card.description;
            cardForm.cardLink.value = card.link;
            cardForm.cardImage.value = card.image;
            cardModal.style.display = 'flex';
        });

        cardElement.querySelector('.delete-card').addEventListener('click', (e) => {
            e.stopPropagation();
            const num1 = Math.floor(Math.random() * 10+1);
            const num2 = Math.floor(Math.random() * 10+1);
            const correctSum = num1 + num2;

            confirmMessage.textContent = `¿Estás seguro de que quieres eliminar la tarjeta '${card.title}'? ${num1} + ${num2} para confirmar`;
            confirmModal.style.display = 'flex';
            
            confirmButton.onclick = () => {
                if (parseInt(confirmInput.value) === correctSum) {
                    cards[currentCategory].splice(index, 1);
                    saveData();
                    renderCards();
                    confirmModal.style.display = 'none';
                } else {
                    alert('La suma es incorrecta.');
                }
            };
        });

        cardsContainer.appendChild(cardElement);
    });
};

    const saveData = () => {
        localStorage.setItem('categories', JSON.stringify(categories));
        localStorage.setItem('cards', JSON.stringify(cards));
    };

    const editCategory = (categoryName, index) => {
        const newCategoryName = prompt('Ingrese el nuevo nombre de la categoría:', categoryName);
        if (newCategoryName && !categories.includes(newCategoryName)) {
            categories[index] = newCategoryName;
            saveData();
            renderCategories();
        }
    };

    const deleteCategory = (categoryName, index) => {
        const confirmation = confirm(`¿Estás seguro de que quieres eliminar la categoría '${categoryName}'?`);
        if (confirmation) {
            categories.splice(index, 1);
            delete cards[categoryName];
            saveData();
            renderCategories();
            // Si la categoría eliminada es la actual, selecciona una categoría predeterminada ('General')
            if (currentCategory === categoryName) {
                currentCategory = 'General';
                localStorage.setItem('currentCategory', currentCategory);
                currentCategoryTitle.textContent = currentCategory;
                renderCards();
            }
        }
    };

    openSidebarButton.addEventListener('click', () => {
        sidebar.style.display = 'grid';
    });

    closeSidebarButton.addEventListener('click', () => {
        sidebar.style.display = 'none';
    });

    addCardButton.addEventListener('click', () => {
        editCardIndex = null;
        modalTitle.textContent = 'Crear Tarjeta';
        cardForm.reset();
        cardModal.style.display = 'flex';
    });

    cardForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newCard = {
            title: cardForm.cardTitle.value || '',
            description: cardForm.cardDescription.value || '',
            link: cardForm.cardLink.value || '',
            image: cardForm.cardImage.value || '',
        };
        if (editCardIndex !== null) {
            cards[currentCategory][editCardIndex] = newCard;
        } else {
            cards[currentCategory].push(newCard);
        }
        saveData();
        renderCards();
        cardModal.style.display = 'none';
    });

    document.querySelectorAll('.close-modal').forEach(closeButton => {
        closeButton.addEventListener('click', () => {
            cardModal.style.display = 'none';
            confirmModal.style.display = 'none';
        });
    });

    // Función para agregar una nueva categoría
    document.getElementById('addCategory').addEventListener('click', () => {
        const categoryName = prompt('Ingrese el nombre de la categoría:');
        if (categoryName && !categories.includes(categoryName)) {
            categories.push(categoryName);
            cards[categoryName] = [];
            saveData();
            renderCategories();
        }
    });


// Botón para importar datos
const importDataButton = document.getElementById('importData');
importDataButton.addEventListener('click', () => {
    //alert('Haz clic en "Seleccionar archivo" para importar datos.');

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';

    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const importedData = JSON.parse(event.target.result);
            localStorage.setItem('categories', JSON.stringify(importedData.categories));
            localStorage.setItem('cards', JSON.stringify(importedData.cards));
            // Actualizar la vista con los nuevos datos importados
            categories = importedData.categories;
            cards = importedData.cards;
            renderCategories();
            renderCards();
            alert('Datos importados correctamente.');
        };

        reader.readAsText(file);
    });

    fileInput.click();
});

// Botón para exportar datos
const exportDataButton = document.getElementById('exportData');
exportDataButton.addEventListener('click', () => {
    //alert('Haz clic en "Aceptar" para exportar los datos.');

    const dataToExport = {
        categories: categories,
        cards: cards
    };

    const blob = new Blob([JSON.stringify(dataToExport)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Obtener la fecha y hora actual
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-indexados
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    // Formatear la fecha y hora en el formato "dd-mm-yyyy hh.mm"
    const formattedDate = `${day}-${month}-${year} ${hours}.${minutes}`;
    const filename = `My Walllist - ${formattedDate}.json`;

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);

    alert('Datos exportados correctamente.');
});

// Botón para formatear datos
const resetDataButton = document.getElementById('resetData');
resetDataButton.addEventListener('click', () => {
    const confirmation = confirm('¿Estás seguro de que deseas borrar todos los datos?');
    if (confirmation) {
        localStorage.removeItem('categories');
        localStorage.removeItem('cards');
        categories = ['General']; // Restablecer categorías predeterminadas
        cards = { 'General': [] }; // Restablecer tarjetas predeterminadas
        renderCategories();
        renderCards();
        alert('Datos restablecidos correctamente.');
    }
});

    renderCategories();
    renderCards();
});
