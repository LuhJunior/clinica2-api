enum EAppointmentStatus {  
  PENDING,
  DONE,
  CANCELED,
};

export const types = ['PENDING', 'DONE', 'CANCELED'];

export const getType = (type: string): EAppointmentStatus => types.indexOf(type);

export default EAppointmentStatus;
