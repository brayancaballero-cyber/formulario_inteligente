document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formProducto');
  const imagenInput = document.getElementById('imagen');
  const previewDiv = document.getElementById('preview');

  // Vista previa de imagen
  imagenInput.addEventListener('change', () => {
    previewDiv.innerHTML = '';
    const file = imagenInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = 'Vista previa';
        img.classList.add('preview-img');
        previewDiv.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  });

  // Envío del formulario
  form.addEventListener('submit', e => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const precioInput = document.getElementById('precio').value;
    const precio = parseFloat(precioInput);
    const file = imagenInput.files[0];

    // Validación básica
    if (!nombre || !descripcion || isNaN(precio) || precio <= 0) {
      alert('⚠️ Completa todos los campos correctamente.');
      return;
    }

    // Procesar imagen o guardar sin ella
    if (file) {
      const reader = new FileReader();
      reader.onload = () => guardarProducto(nombre, descripcion, precio, reader.result);
      reader.readAsDataURL(file);
    } else {
      guardarProducto(nombre, descripcion, precio, null);
    }
  });

  // Guardar producto
  function guardarProducto(nombre, descripcion, precio, imagenBase64) {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    
    const nuevoProducto = {
      id: Date.now(),
      nombre,
      descripcion,
      precio: parseFloat(precio.toFixed(2)),
      imagen: imagenBase64,
      fechaRegistro: new Date().toLocaleString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    productos.push(nuevoProducto);
    localStorage.setItem('productos', JSON.stringify(productos));
    window.location.href = 'reporte.html';
  }
});