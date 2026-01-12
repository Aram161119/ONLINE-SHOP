import moment from 'moment';
import 'moment/locale/ru';

export const formatDate = (isoString, formatStr = 'DD MMM YYYY') => {
	if (!isoString) return '-';
	return moment(isoString).format(formatStr);
};
