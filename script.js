const API_URL = "https://script.google.com/macros/s/AKfycbwjzizKbrXBPZ2IcXuRcbxUNQYrVd-2twt0Sfx1bcdS6V1qKXyoIHUPRa1FEUZu10yT/exec";

function cargarInventario() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#tabla-inventario tbody");
      tbody.innerHTML = "";
      data.forEach(item => {
        tbody.innerHTML += `
          <tr>
            <td>${item.codigo}</td>
            <td>${item.descripcion}</td>
            <td>${item.cantidad}</td>
          </tr>
        `;
      });
    });
}

// Buscar descripción automáticamente
document.getElementById("codigo").addEventListener("blur", function() {
  const codigo = this.value.trim();
  if (codigo) {
    fetch(`${API_URL}?codigo=${codigo}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          document.getElementById("descripcion").value = data.descripcion;
        } else {
          document.getElementById("descripcion").value = "";
          alert("Código no encontrado en catálogo");
        }
      });
  }
});

document.getElementById("form-agregar").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const producto = {
    codigo: document.getElementById("codigo").value,
    descripcion: document.getElementById("descripcion").value,
    cantidad: document.getElementById("cantidad").value
  };

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(producto)
  })
  .then(res => res.json())
  .then(() => {
    cargarInventario();
    this.reset();
  });
});

cargarInventario();


