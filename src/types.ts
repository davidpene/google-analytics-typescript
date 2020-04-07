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
	exFatal?: boolean;
}
