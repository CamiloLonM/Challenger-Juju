import AuditLog from '../models/audit.js';

/**
 * Crea un registro de auditoría.
 * @param {Object} params - Parámetros para el log
 * @param {Object} [params.req] - Request HTTP opcional, para obtener ip, user-agent, method y path
 * @param {String} params.user - ID del usuario que realiza la acción
 * @param {String} params.action - Acción realizada (CREATE, UPDATE, LOGIN, REGISTER, etc.)
 * @param {String} params.entity - Entidad afectada (Book, User, etc.)
 * @param {String} params.entityId - ID de la entidad afectada
 * @param {String} params.description - Descripción de la acción
 */
export const createAudit = async ({
  req,
  user,
  action,
  entity,
  entityId,
  description,
}) => {
  await AuditLog.create({
    user,
    action,
    entity,
    entityId,
    ipAddress: req?.ip || 'Unknown',
    userAgent: req?.headers?.['user-agent'] || 'Unknown',
    method: req?.method || 'Unknown',
    path: req?.originalUrl || 'Unknown',
    description,
  });
};
