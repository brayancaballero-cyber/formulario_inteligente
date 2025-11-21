// ✅ Función global para eliminar (ahora SÍ accesible desde onclick)
function eliminarProducto(id) {
  if (!confirm('⚠️ ¿Seguro que deseas eliminar este producto? No se puede deshacer.')) {
    return;
  }

  let productos = JSON.parse(localStorage.getItem('productos')) || [];
  productos = productos.filter(p => p.id !== id);
  localStorage.setItem('productos', JSON.stringify(productos));

  // ✅ Recargar la lista inmediatamente
  renderProductos();
}

// ✅ Función de renderizado (reutilizable)
function renderProductos() {
  const container = document.getElementById('productosContainer');
  const productos = JSON.parse(localStorage.getItem('productos')) || [];

  if (productos.length === 0) {
    container.innerHTML = `
      <p class="no-data">
        <i class="fas fa-info-circle"></i> Aún no hay productos registrados.
      </p>
    `;
    return;
  }

  // Ordenar: más reciente primero
  productos.sort((a, b) => new Date(b.fechaRegistro) - new Date(a.fechaRegistro));

  // Formatear soles
  const formatearSoles = (monto) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2
    }).format(monto);
  };

  const html = productos.map(p => `
    <article class="producto-card">
      <div class="producto-header">
        <h3>${p.nombre}</h3>
        <span class="fecha">${p.fechaRegistro}</span>
      </div>
      <p class="descripcion">${p.descripcion}</p>
      <p class="precio"><strong>Precio:</strong> ${formatearSoles(p.precio)}</p>
      ${p.imagen 
        ? `<figure class="imagen-container"><img src="${p.imagen}" alt="${p.nombre}" /></figure>`
        : `<p class="sin-imagen"><i class="fas fa-image"></i> Sin imagen</p>`
      }
      <button class="btn btn-delete" onclick="eliminarProducto(${p.id})">
        <i class="fas fa-trash-alt"></i> Eliminar
      </button>
    </article>
  `).join('');

  container.innerHTML = html;
}

// ✅ Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', renderProductos);