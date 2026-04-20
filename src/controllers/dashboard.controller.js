import { transacciones_estado } from "@prisma/client";
import prisma from "../../prismaClient.js";
export const getDashboard = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const { from, to } = req.query;

    // Fechas dinámicas
    const inicio = from
      ? new Date(from)
      : new Date(new Date().getFullYear(), 0, 1);

    const fin = to
      ? new Date(to + "T23:59:59")
      : new Date(new Date().getFullYear(), 11, 31, 23, 59, 59);

    // ===============================
    // CONSULTAS EN PARALELO
    // ===============================

    const [transacciones, gastosAgrupados, ultimasTransacciones] =
      await Promise.all([
        // Traemos TODO con relaciones (clave)
        prisma.transacciones.findMany({
          where: {
            usuarios_id: usuario_id,
            fecha: { gte: inicio, lte: fin },
            estado: transacciones_estado.Activa,
          },
          include: {
            conceptos: {
              include: {
                categorias: true,
              },
            },
          },
        }),

        // Para gráfica por categoría (optimizado)
        prisma.transacciones.groupBy({
          by: ["conceptos_id"],
          where: {
            usuarios_id: usuario_id,
            fecha: { gte: inicio, lte: fin },
            estado: transacciones_estado.Activa,
            conceptos: {
              categorias: {
                tipo: "Egreso",
              },
            },
          },
          _sum: { valor: true },
        }),

        prisma.transacciones.findMany({
          where: {
            usuarios_id: usuario_id,
            fecha: { gte: inicio, lte: fin },
            estado: transacciones_estado.Activa,
          },
          include: {
            conceptos: {
              include: {
                categorias: true,
              },
            },
          },
          orderBy: {
            fecha: "desc",
          },
          take: 5,
        }),
      ]);

    // ===============================
    // GASTOS POR CATEGORÍA
    // ===============================

    const conceptosIds = gastosAgrupados.map((g) => g.conceptos_id);

    const conceptos = conceptosIds.length
      ? await prisma.conceptos.findMany({
          where: { id: { in: conceptosIds } },
          include: { categorias: true },
        })
      : [];

    const conceptosMap = {};
    for (const c of conceptos) {
      conceptosMap[c.id] = c;
    }

    const categoriasMap = {};

    for (const item of gastosAgrupados) {
      const categoria =
        conceptosMap[item.conceptos_id]?.categorias.nombre || "Sin categoría";

      const valor = Number(item._sum.valor);

      if (!categoriasMap[categoria]) {
        categoriasMap[categoria] = 0;
      }

      categoriasMap[categoria] += valor;
    }

    // Convertir a formato Chart.js
    const gastosPorCategoria = {
      labels: Object.keys(categoriasMap),
      datasets: [
        {
          label: "Gastos por categoría",
          data: Object.values(categoriasMap),
        },
      ],
    };

    // ===============================
    // PROCESAMIENTO EN MEMORIA
    // ===============================

    const mesesMap = {};
    const ingresos = {};
    const egresos = {};

    let totalIngresos = 0;
    let totalEgresos = 0;

    for (const t of transacciones) {
      const fecha = new Date(t.fecha);

      const key = `${fecha.getFullYear()}-${String(
        fecha.getMonth() + 1,
      ).padStart(2, "0")}`;

      if (!mesesMap[key]) {
        mesesMap[key] = true;
        ingresos[key] = 0;
        egresos[key] = 0;
      }

      const valor = Number(t.valor);
      const tipo = t.conceptos.categorias.tipo;

      if (tipo === "Ingreso") {
        ingresos[key] += valor;
        totalIngresos += valor;
      } else {
        egresos[key] += valor;
        totalEgresos += valor;
      }
    }

    // ===============================
    // ORDENAR MESES
    // ===============================

    const mesesOrdenados = Object.keys(mesesMap).sort(
      (a, b) => new Date(`${a}-01`) - new Date(`${b}-01`),
    );

    const labels = mesesOrdenados.map((m) =>
      new Date(`${m}-01`).toLocaleString("es-CO", { month: "long" }),
    );

    const ingresosArr = mesesOrdenados.map((m) => ingresos[m]);
    const egresosArr = mesesOrdenados.map((m) => egresos[m]);
    const balanceArr = mesesOrdenados.map((m) => ingresos[m] - egresos[m]);

    // ===============================
    // RESPUESTAS
    // ===============================

    const resumenMensual = {
      labels,
      datasets: [
        { label: "Ingresos", data: ingresosArr },
        { label: "Egresos", data: egresosArr },
      ],
    };

    const balanceMensual = {
      labels,
      datasets: [{ label: "Balance", data: balanceArr }],
    };

    const totalesMensuales = mesesOrdenados.map((m) => ({
      mes: new Date(m).toLocaleString("es-CO", { month: "long" }),
      ingresos: ingresos[m],
      egresos: egresos[m],
      balance: ingresos[m] - egresos[m],
    }));

    const resumenAnual = {
      ingresos: totalIngresos,
      egresos: totalEgresos,
      balance: totalIngresos - totalEgresos,
    };

    // ===============================
    // RESPUESTA FINAL
    // ===============================

    res.json({
      gastosPorCategoria,
      resumenMensual,
      balanceMensual,
      totalesMensuales,
      resumenAnual,
      ultimasTransacciones,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error en dashboard " + error,
    });
  }
};
