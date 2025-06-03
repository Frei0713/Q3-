/**
 * @fileoverview Módulo para el cálculo de factoriales
 * @version 1.1.0
 * @author Freddy Chaux
 */

class FactorialCalculator {
    constructor() {
        this.historialCalculos = [];
        this.maxHistorial = 5;
    }

    /**
     * Valida la entrada del usuario
     * @param {number} numero - El número a validar
     * @throws {Error} Si la entrada no es válida
     */
    validarEntrada(numero) {
        if (isNaN(numero)) {
            throw new Error('Por favor ingrese un número válido');
        }
        if (numero < 0) {
            throw new Error('No se puede calcular el factorial de números negativos');
        }
        if (!Number.isInteger(numero)) {
            throw new Error('Por favor ingrese un número entero');
        }
        if (numero > 170) {
            throw new Error('El número es demasiado grande para calcular su factorial');
        }
    }

    /**
     * Calcula el factorial de un número
     * @param {number} numero - El número para calcular su factorial
     * @returns {number} El factorial calculado
     */
    calcular(numero) {
        this.validarEntrada(numero);
        let factorial = 1;
        for (let i = 1; i <= numero; i++) {
            factorial *= i;
        }
        return factorial;
    }

    /**
     * Agrega un cálculo al historial
     * @param {number} numero - El número calculado
     * @param {number} resultado - El resultado del cálculo
     */
    agregarAlHistorial(numero, resultado) {
        const calculo = {
            numero: numero,
            resultado: resultado,
            fecha: new Date().toLocaleString()
        };
        this.historialCalculos.push(calculo);
        if (this.historialCalculos.length > this.maxHistorial) {
            this.historialCalculos.shift();
        }
    }

    /**
     * Obtiene el historial de cálculos
     * @returns {Array} El historial de cálculos
     */
    obtenerHistorial() {
        return this.historialCalculos;
    }
} 
