import { FaCheckCircle, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa';

export const getStatusIcon = (status) => {
  switch (status) {
    case 'Approved':
      return <FaCheckCircle className="text-green-500" />;
    case 'Not Approved':
      return <FaTimesCircle className="text-red-500" />;
    case 'Submitted':
      return <FaHourglassHalf className="text-yellow-500" />;
    default:
      return null;
  }
};
