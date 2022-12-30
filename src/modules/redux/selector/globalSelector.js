import _ from 'lodash';
import { createSelector } from 'reselect';
export const createLoadingSelector = (actions) => (state) => {
	return _(actions).some((action) => {
		return _.get(state, 'loading.' + action);
	});
};
