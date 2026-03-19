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

    const [transacciones, gastosAgrupados] = await Promise.all([
      // Traemos TODO con relaciones (clave)
      prisma.transacciones.findMany({
        where: {
          usuarios_id: usuario_id,
          fecha: { gte: inicio, lte: fin },
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
        },
        _sum: { valor: true },
      }),
    ]);

    // ===============================
    // 🧠 GASTOS POR CATEGORÍA
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

    const gastosPorCategoria = {
      labels: [],
      datasets: [{ label: "Gastos por categoría", data: [] }],
    };

    for (const item of gastosAgrupados) {
      const categoria =
        conceptosMap[item.conceptos_id]?.categorias.nombre || "Sin categoría";

      gastosPorCategoria.labels.push(categoria);
      gastosPorCategoria.datasets[0].data.push(Number(item._sum.valor));
    }

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
      const key = `${fecha.getFullYear()}-${fecha.getMonth() + 1}`;

      if (!mesesMap[key]) {
        mesesMap[key] = key;
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
      (a, b) => new Date(a) - new Date(b),
    );

    const labels = mesesOrdenados;

    const ingresosArr = mesesOrdenados.map((m) => ingresos[m]);
    const egresosArr = mesesOrdenados.map((m) => egresos[m]);
    const balanceArr = mesesOrdenados.map((m) => ingresos[m] - egresos[m]);

    // ===============================
    // 📊 RESPUESTAS
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
      mes: m,
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
    // 🎯 RESPUESTA FINAL
    // ===============================

    res.json({
      gastosPorCategoria,
      resumenMensual,
      balanceMensual,
      totalesMensuales,
      resumenAnual,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error en dashboard " + error,
    });
  }
};
