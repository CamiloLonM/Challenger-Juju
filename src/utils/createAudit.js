import AuditLog from '../models/audit.js';

export const createAudit = async (req, userId, action, description) => {
  await AuditLog.create({
    user: userId,
    action,
    entity: 'User',
    entityId: userId,
    ipAddress: req.ip,
    userAgent: req.headers['user-agent'],
    method: req.method,
    path: req.originalUrl,
    description,
  });
};
