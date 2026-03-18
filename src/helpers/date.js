import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

// Zona horaria por defecto (Colombia)
const DEFAULT_TZ = "America/Bogota";

// Obtener fecha actual en UTC
export const nowUTC = () => {
  return dayjs().utc().toDate();
};

// Convertir fecha UTC → Local (Colombia)
export const toLocal = (date) => {
 return dayjs(date).tz(DEFAULT_TZ).format("YYYY-MM-DD HH:mm:ss");
};

// Formatear fecha
export const formatDate = (date, format = "YYYY-MM-DD HH:mm:ss") => {
  return dayjs(date).tz(DEFAULT_TZ).format(format);
};

// Inicio del día (para filtros)
export const startOfDay = (date) => {
  return dayjs(date).tz(DEFAULT_TZ).startOf("day").utc().toDate();
};

// Fin del día (para filtros)
export const endOfDay = (date) => {
  return dayjs(date).tz(DEFAULT_TZ).endOf("day").utc().toDate();
};

// Inicio del mes
export const startOfMonth = (date) => {
  return dayjs(date).tz(DEFAULT_TZ).startOf("month").utc().toDate();
};

// Fin del mes
export const endOfMonth = (date) => {
  return dayjs(date).tz(DEFAULT_TZ).endOf("month").utc().toDate();
};