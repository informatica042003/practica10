document.addEventListener('DOMContentLoaded', function() {
    const cedulaInput = document.getElementById('cedula');
    const validarBtn = document.getElementById('validar');
    const resultadoDiv = document.getElementById('resultado');
    const mensajeP = document.getElementById('mensaje');
    const detalleP = document.getElementById('detalle');

    validarBtn.addEventListener('click', validarCedula);
    cedulaInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            validarCedula();
        }
    });

    function validarCedula() {
        let cedula = cedulaInput.value.trim();
        
        // Eliminar guiones si los tiene
        cedula = cedula.replace(/-/g, '');
        
        // Validaciones básicas
        if (cedula === '') {
            mostrarResultado(false, 'Por favor ingrese un número de cédula');
            return;
        }
        
        if (!/^\d{11}$/.test(cedula)) {
            mostrarResultado(false, 'La cédula debe tener 11 dígitos numéricos (puede usar formato 000-0000000-0)');
            return;
        }
        
        // Validar dígito verificador con módulo 10
        const digitoVerificador = parseInt(cedula.charAt(10));
        const digitoCalculado = calcularDigitoVerificador(cedula.substring(0, 10));
        
        if (digitoVerificador === digitoCalculado) {
            mostrarResultado(true, 'Cédula dominicana válida', `Número: ${formatearCedula(cedula)}`);
        } else {
            mostrarResultado(false, 'Cédula inválida', `El dígito verificador debería ser ${digitoCalculado} (ingresado: ${digitoVerificador})`);
        }
    }
    
    function calcularDigitoVerificador(diezDigitos) {
        const pesos = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
        let suma = 0;
        
        for (let i = 0; i < diezDigitos.length; i++) {
            let digito = parseInt(diezDigitos.charAt(i));
            digito = digito * pesos[i];
            
            // Si el resultado es mayor a 9, sumar los dígitos
            if (digito > 9) {
                digito = Math.floor(digito / 10) + (digito % 10);
            }
            
            suma += digito;
        }
        
        // Calcular dígito verificador
        const residuo = suma % 10;
        const digitoVerificador = residuo === 0 ? 0 : 10 - residuo;
        
        return digitoVerificador;
    }
    
    function formatearCedula(cedula) {
        return `${cedula.substring(0, 3)}-${cedula.substring(3, 10)}-${cedula.substring(10)}`;
    }
    
    function mostrarResultado(valido, mensaje, detalle = '') {
        resultadoDiv.classList.remove('hidden', 'valida', 'invalida');
        
        if (valido) {
            resultadoDiv.classList.add('valida');
        } else {
            resultadoDiv.classList.add('invalida');
        }
        
        mensajeP.textContent = mensaje;
        detalleP.textContent = detalle;
    }
});