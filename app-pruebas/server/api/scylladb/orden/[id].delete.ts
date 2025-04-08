import { scylladb } from "../../../utils/scylladb/scylladb";

type response = {
  statusCode: number;
  message: string;
};

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  try {
    // Ejecutar el query DELETE en scylladb
    const query = "DELETE FROM ordenes WHERE id = ?";
    await scylladb.execute(query, [id], { prepare: true });

    return { statusCode: 200, message: "Eliminado correctamente" };
  } catch (error) {
    console.error("❌ Error al eliminar en scylladb:", error);
    return {
      statusCode: 500,
      message: "Error al eliminar",
    };
  }
});
