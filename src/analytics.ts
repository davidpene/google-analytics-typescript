import {
	IExceptionHitTypeData,
	IAnalyticsConfig,
	IEventHitTypeData,
	IPageViewHitTypeData,
	IScreenviewHitTypeData,
	ISocialHitTypeData,
	ITimingHitTypeData,
} from './types';

/* eslint-disable @typescript-eslint/no-unused-expressions */
declare let ga: (...args: any[]) => void;

function trackException(error: IExceptionHitTypeData) {
	const { exDescription, exFatal } = error;
	ga('send', 'exception', {
		exDescription,
		exFatal: exFatal || false,
	});
}

function trackTiming(data: ITimingHitTypeData) {
	if (gaNotLoaded()) return;

	const { timingCategory, timingVar, timingValue, timingLabel } = data;

	ga('send', {
		hitType: 'timing',
		timingCategory,
		timingVar,
		timingValue,
		timingLabel,
	});
}

function trackScreenview(data: IScreenviewHitTypeData) {
	if (gaNotLoaded()) return;

	const { screenName, appName, appId, appVersion, appInstallerId } = data;

	ga('set', 'appName', appName);

	// The `appName` field is now set, so
	// screenview hits don't need to include it.
	ga('send', {
		hitType: 'screenview',
		screenName,
		appId,
		appVersion,
		appInstallerId,
	});
}

function trackSocial(data: ISocialHitTypeData) {
	if (gaNotLoaded()) return;

	const { socialNetwork, socialAction, socialTarget } = data;

	ga('send', {
		hitType: 'social',
		socialNetwork,
		socialAction,
		socialTarget,
	});
}

function trackEvent(data: IEventHitTypeData) {
	if (gaNotLoaded()) return;

	const {
		eventCategory,
		eventAction,
		eventLabel,
		eventValue,
		nonInteraction,
	} = data;

	ga('send', {
		hitType: 'event',
		eventCategory,
		eventAction,
		eventLabel,
		eventValue: eventValue || 0,
		nonInteraction: nonInteraction || false,
	});
}

function identifyVisitor(userId: string) {
	if (gaNotLoaded()) return;
	if (userId) ga('set', 'userId', userId);
}

function pageView(data?: IPageViewHitTypeData) {
	if (gaNotLoaded()) return;
	const location = document.location;
	const path = (data && data.page) || location.pathname;
	const title = data && data.title ? data.title : path;

	// Sets the page value on the tracker.
	ga('set', 'page', path);

	// Sending the pageview no longer requires passing the page
	// value since it's now stored on the tracker object.
	ga('send', 'pageview', {
		title,
		location: location.href,
	});
}

function gaNotLoaded() {
	return typeof ga === 'undefined';
}

function initialize(config: IAnalyticsConfig) {
	if (!config.trackingId)
		throw new Error('No google analytics trackingId defined');

	if (!gaNotLoaded()) {
		return;
	}

	if (config.debug) {
		(function (i, s, o, g, r, a, m) {
			i['GoogleAnalyticsObject'] = r;
			i[r] =
				i[r] ||
				function () {
					(i[r].q = i[r].q || []).push(arguments);
				};
			i[r].l = 1 * (new Date() as any);
			(a as any) = s.createElement(o);
			(m as any) = s.getElementsByTagName(o)[0];
			(a as any).async = 1;
			(a as any).src = g;
			(m as any).parentNode.insertBefore(a, m);
		})(
			window,
			document,
			'script',
			'https://www.google-analytics.com/analytics_debug.js',
			'ga'
		);
	} else {
		(function (i, s, o, g, r, a, m) {
			i['GoogleAnalyticsObject'] = r;
			i[r] =
				i[r] ||
				function () {
					(i[r].q = i[r].q || []).push(arguments);
				};
			i[r].l = 1 * (new Date() as any);
			(a as any) = s.createElement(o);
			(m as any) = s.getElementsByTagName(o)[0];
			(a as any).async = 1;
			(a as any).src = g;
			(m as any).parentNode.insertBefore(a, m);
		})(
			window,
			document,
			'script',
			'https://www.google-analytics.com/analytics.js',
			'ga'
		);
	}

	ga('create', config.trackingId, 'auto');

	if (config.debug) {
		// Disable sends to GA http://bit.ly/2Ro0vTR
		ga('set', 'sendHitTask', null);
		(window as any).ga_debug = {
			trace: true,
		};
	}
}

export default {
	initialize,
	identifyVisitor,
	pageView,
	trackEvent,
	trackSocial,
	trackScreenview,
	trackTiming,
	trackException,
};
