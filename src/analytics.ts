/* eslint-disable @typescript-eslint/no-unused-expressions */
declare let ga: (...args: any[]) => void;

export interface IAnalyticsConfig {
	trackingId: string;
	debug?: boolean;
}

export interface IPageViewHitTypeData {
	// The title of the page (e.g. homepage)
	title?: string;
	// The path portion of a URL. This value should start with a slash (/) character.
	page: string;
}

export interface IEventHitTypeData {
	// Typically the object that was interacted with (e.g. 'Video')
	eventCategory: string;
	// The type of interaction (e.g. 'play')
	eventAction: string;
	// Useful for categorizing events (e.g. 'Fall Campaign')
	eventLabel?: string;
	// A numeric value associated with the event (e.g. 42)
	eventValue?: number;
	// Specifies that a hit be considered non-interactive.
	nonInteraction?: boolean;
}

export interface ISocialHitTypeData {
	// The network on which the action occurs (e.g. Facebook, Twitter)
	socialNetwork: string;
	// The type of action that happens (e.g. Like, Send, Tweet).
	socialAction: string;
	// Specifies the target of a social interaction. This value is typically a URL but can be any text. (e.g. http://mycoolpage.com)
	socialTarget: string;
}

export interface IScreenviewHitTypeData {
	// The name of the screen.
	screenName: string;
	// The name of the application.
	appName: string;
	// The Id of the application.
	appId?: string;
	// The application version.
	appVersion?: string;
	// The Id of the application installer.
	appInstallerId?: string;
}

export interface ITimingHitTypeData {
	// A string for categorizing all user timing variables into logical groups (e.g. 'JS Dependencies').
	timingCategory: string;
	// A string to identify the variable being recorded (e.g. 'load').
	timingVar: string;
	// The number of milliseconds in elapsed time to report to Google Analytics (e.g. 20).
	timingValue: number;
	// A string that can be used to add flexibility in visualizing user timings in the reports (e.g. 'Google CDN').
	timingLabel?: string;
}

export interface IExceptionHitTypeData {
	// A description of the exception.
	exDescription: string;
	// true if the exception was fatal.
	exFatal: boolean;
}

function trackException() {}

function trackTiming(data: ITimingHitTypeData) {
	if (gaNotLoaded()) return;

	const { timingCategory, timingVar, timingValue, timingLabel } = data;

	ga('send', {
		hitType: 'timing',
		timingCategory,
		timingVar,
		timingValue,
		timingLabel
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
		appInstallerId
	});
}

function trackSocial(data: ISocialHitTypeData) {
	if (gaNotLoaded()) return;

	const { socialNetwork, socialAction, socialTarget } = data;

	ga('send', {
		hitType: 'social',
		socialNetwork,
		socialAction,
		socialTarget
	});
}

function trackEvent(data: IEventHitTypeData) {
	if (gaNotLoaded()) return;

	const {
		eventCategory,
		eventAction,
		eventLabel,
		eventValue,
		nonInteraction
	} = data;

	ga('send', {
		hitType: 'event',
		eventCategory,
		eventAction,
		eventLabel,
		eventValue: eventValue || 0,
		nonInteraction: nonInteraction || false
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
		location: location.href
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
			trace: true
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
	trackException
};
