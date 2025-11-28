import mongoose from 'mongoose';

const auditSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    action: {
      type: String,
      required: true,
      enum: [
        'CREATE',
        'UPDATE',
        'DELETE',
        'LOGIN',
        'LOGOUT',
        'READ',
        'REGISTER',
      ],
    },
    entity: {
      type: String,
      required: true,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    description: {
      type: String,
      default: '',
    },
    ipAddress: {
      type: String,
    },
  },
  { timestamps: true }
);

auditSchema.index({ user: 1, action: 1 });

export default mongoose.model('AuditLog', auditSchema);
