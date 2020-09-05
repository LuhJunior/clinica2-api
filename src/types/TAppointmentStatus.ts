enum TAppointmentStatus {  
  PENDENTE,
  ATENDIDO,
  CANCELADO,
};

export const types = ['PENDENTE', 'ATENDIDO', 'CANCELADO'];

export const getType = (type: string): TAppointmentStatus => types.indexOf(type);

export default TAppointmentStatus;
