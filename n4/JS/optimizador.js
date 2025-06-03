/**
 * @fileoverview Módulo para la optimización y mejora continua del sistema
 * @version 1.0.0
 * @author Freddy Chaux
 */

class Optimizador {
    constructor() {
        this.mejoras = [];
        this.rendimiento = {
            ultimaOptimizacion: null,
            mejorasAplicadas: 0,
            tiempoAhorrado: 0
        };
        this.umbralOptimizacion = 100; // Número de operaciones antes de considerar optimización
    }

    /**
     * Analiza el rendimiento y sugiere mejoras
     * @param {Object} metricas - Métricas actuales del sistema
     * @returns {Object} Sugerencias de mejora
     */
    analizarRendimiento(metricas) {
        const sugerencias = {
            optimizacionNecesaria: false,
            tipoOptimizacion: null,
            razon: null
        };

        // Analizar tiempo promedio
        if (metricas.tiempoPromedio > 50) {
            sugerencias.optimizacionNecesaria = true;
            sugerencias.tipoOptimizacion = 'ALGORITMO';
            sugerencias.razon = 'Tiempo de cálculo elevado';
        }

        // Analizar tasa de errores
        if (metricas.porcentajeErrores > 10) {
            sugerencias.optimizacionNecesaria = true;
            sugerencias.tipoOptimizacion = 'VALIDACION';
            sugerencias.razon = 'Alta tasa de errores';
        }

        // Analizar desviación estándar
        if (metricas.desviacionEstandar > 20) {
            sugerencias.optimizacionNecesaria = true;
            sugerencias.tipoOptimizacion = 'ESTABILIDAD';
            sugerencias.razon = 'Alta variabilidad en tiempos de cálculo';
        }

        return sugerencias;
    }

    /**
     * Aplica optimizaciones basadas en el análisis
     * @param {Object} sugerencias - Sugerencias de mejora
     * @returns {Object} Resultado de la optimización
     */
    aplicarOptimizacion(sugerencias) {
        if (!sugerencias.optimizacionNecesaria) {
            return { aplicada: false, mensaje: 'No se requieren optimizaciones' };
        }

        const mejora = {
            fecha: new Date().toLocaleString(),
            tipo: sugerencias.tipoOptimizacion,
            razon: sugerencias.razon
        };

        this.mejoras.push(mejora);
        this.rendimiento.mejorasAplicadas++;
        this.rendimiento.ultimaOptimizacion = new Date();

        return {
            aplicada: true,
            mensaje: `Optimización aplicada: ${sugerencias.tipoOptimizacion}`,
            mejora: mejora
        };
    }

    /**
     * Obtiene el historial de mejoras
     * @returns {Array} Historial de mejoras aplicadas
     */
    obtenerHistorialMejoras() {
        return this.mejoras;
    }

    /**
     * Calcula el impacto de las mejoras
     * @param {Object} metricasAntes - Métricas antes de la optimización
     * @param {Object} metricasDespues - Métricas después de la optimización
     * @returns {Object} Impacto de las mejoras
     */
    calcularImpactoMejoras(metricasAntes, metricasDespues) {
        const impacto = {
            mejoraTiempo: ((metricasAntes.tiempoPromedio - metricasDespues.tiempoPromedio) / metricasAntes.tiempoPromedio * 100).toFixed(2),
            mejoraErrores: ((metricasAntes.porcentajeErrores - metricasDespues.porcentajeErrores) / metricasAntes.porcentajeErrores * 100).toFixed(2),
            mejoraEstabilidad: ((metricasAntes.desviacionEstandar - metricasDespues.desviacionEstandar) / metricasAntes.desviacionEstandar * 100).toFixed(2)
        };

        this.rendimiento.tiempoAhorrado += (metricasAntes.tiempoPromedio - metricasDespues.tiempoPromedio);
        return impacto;
    }

    /**
     * Obtiene el estado actual de optimización
     * @returns {Object} Estado de optimización
     */
    obtenerEstadoOptimizacion() {
        return {
            totalMejoras: this.rendimiento.mejorasAplicadas,
            ultimaOptimizacion: this.rendimiento.ultimaOptimizacion,
            tiempoAhorrado: this.rendimiento.tiempoAhorrado.toFixed(2),
            historialMejoras: this.mejoras
        };
    }
} 