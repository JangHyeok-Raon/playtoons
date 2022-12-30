// gets the current screen from navigation state
function getActiveRouteName(navigationState) {
	if (!navigationState) {
		return null;
	}
	const route = navigationState.routes[navigationState.index];
	// dive into nested navigators
	if (route.routes) {
		return getActiveRouteName(route);
	}
	return route.routeName;
}

export const findBottomsTabIndex = (name) => {};

const screenTracking = ({ getState }) => (next) => async (action) => {
	var state = getState();

	const result = next(action);

	return result;
};

export default screenTracking;
