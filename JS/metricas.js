/**
 * @fileoverview Módulo para el manejo de métricas y análisis estadísticos
 * @version 1.0.0
 * @author Freddy Chaux
 */

class MetricasCalculator {
    constructor() {
        this.metricas = {
            totalCalculos: 0,
            tiempoPromedio: 0,
            errores: 0,
            numerosProcesados: [],
            tiemposCalculo: []
        };
    }

    /**
     * Registra una operación de cálculo
     * @param {number} numero - Número procesado
     * @param {number} tiempo - Tiempo de cálculo en ms
     * @param {boolean} fueExitoso - Si el cálculo fue exitoso
     */
    registrarOperacion(numero, tiempo, fueExitoso) {
        this.metricas.totalCalculos++;
        this.metricas.numerosProcesados.push(numero);
        this.metricas.tiemposCalculo.push(tiempo);
        
        if (!fueExitoso) {
            this.metricas.errores++;
        }

        // Actualizar tiempo promedio
        this.metricas.tiempoPromedio = this.calcularTiempoPromedio();
    }

    /**
     * Calcula el tiempo promedio de cálculo
     * @returns {number} Tiempo promedio en ms
     */
    calcularTiempoPromedio() {
        if (this.metricas.tiemposCalculo.length === 0) return 0;
        const suma = this.metricas.tiemposCalculo.reduce((a, b) => a + b, 0);
        return suma / this.metricas.tiemposCalculo.length;
    }

    /**
     * Calcula la desviación estándar de los tiempos
     * @returns {number} Desviación estándar
     */
    calcularDesviacionEstandar() {
        if (this.metricas.tiemposCalculo.length < 2) return 0;
        const media = this.metricas.tiempoPromedio;
        const sumaCuadrados = this.metricas.tiemposCalculo.reduce((sum, tiempo) => {
            return sum + Math.pow(tiempo - media, 2);
        }, 0);
        return Math.sqrt(sumaCuadrados / (this.metricas.tiemposCalculo.length - 1));
    }

    /**
     * Calcula el porcentaje de errores
     * @returns {number} Porcentaje de errores
     */
    calcularPorcentajeErrores() {
        if (this.metricas.totalCalculos === 0) return 0;
        return (this.metricas.errores / this.metricas.totalCalculos) * 100;
    }

    /**
     * Obtiene el número más frecuente
     * @returns {number} Número más frecuente
     */
    obtenerNumeroMasFrecuente() {
        const frecuencia = {};
        let maxFreq = 0;
        let numeroMasFreq = null;

        this.metricas.numerosProcesados.forEach(num => {
            frecuencia[num] = (frecuencia[num] || 0) + 1;
            if (frecuencia[num] > maxFreq) {
                maxFreq = frecuencia[num];
                numeroMasFreq = num;
            }
        });

        return numeroMasFreq;
    }

    /**
     * Obtiene todas las métricas actuales
     * @returns {Object} Objeto con todas las métricas
     */
    obtenerMetricas() {
        return {
            totalCalculos: this.metricas.totalCalculos,
            tiempoPromedio: this.metricas.tiempoPromedio.toFixed(2),
            desviacionEstandar: this.calcularDesviacionEstandar().toFixed(2),
            porcentajeErrores: this.calcularPorcentajeErrores().toFixed(2),
            numeroMasFrecuente: this.obtenerNumeroMasFrecuente(),
            ultimosTiempos: this.metricas.tiemposCalculo.slice(-5)
        };
    }
} 
