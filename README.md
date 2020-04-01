# google-analytics-typescript
a typescript wrapper for google analytics

### Installation

npm install google-analytics-typescript --save

### Usage

#### Configuration

```javascript
import analytics from 'google-analytics-typescript';

const config = { trackingId: 'UA-xxxx', debug: false  };
analytics.initialize(config);
```

#### IdentifyVisitor

```javascript
... assumes config setup


analytics.identifyVisitor('xx-userId-xx');
```

#### Pageview

```javascript
... assumes config setup


analytics.pageView({ title: 'Main page', page: '/Main' });
```

#### TrackEvent

```javascript
... assumes config setup


analytics.trackEvent({
        // Typically the object that was interacted with (e.g. 'Video')
	eventCategory: 'Video',
	// The type of interaction (e.g. 'play')
	eventAction: 'play',
	// Useful for categorizing events (e.g. 'Fall Campaign')
	eventLabel: 'Fall Campaign',
	// A numeric value associated with the event (e.g. 42)
	eventValue: '2',
	// Specifies that a hit be considered non-interactive.
	nonInteraction: false
});
```


#### TrackSocial

```javascript
... assumes config setup


analytics.trackSocial({
        // The network on which the action occurs (e.g. Facebook, Twitter)
	socialNetwork: 'Facebook',
	// The type of action that happens (e.g. Like, Send, Tweet).
	socialAction: 'Like',
	// Specifies the target of a social interaction. This value is typically a URL but can be any text. (e.g. http://mycoolpage.com)
	socialTarget: 'http://mycoolpage.com'
});
```

#### TrackScreenview

```javascript
... assumes config setup


analytics.trackScreenview({
        // The name of the screen.
	screenName: 'Main screen',
	// The name of the application.
	appName: 'TheBestApp',
	// The Id of the application.
	appId: 'TheBestAppId',
	// The application version.
	appVersion: '1.0',
	// The Id of the application installer.
	appInstallerId: 'InstallCompany'
});
```

#### TrackTiming

```javascript
... assumes config setup


analytics.trackTiming({
	// A string for categorizing all user timing variables into logical groups (e.g. 'JS Dependencies').
	timingCategory: 'JS Dependencies',
	// A string to identify the variable being recorded (e.g. 'load').
	timingVar: 'load',
	// The number of milliseconds in elapsed time to report to Google Analytics (e.g. ).
	timingValue: 20,
	// A string that can be used to add flexibility in visualizing user timings in the reports (e.g. 'Google CDN').
	timingLabel: 'Google CDN'
});
```

#### TrackException

```javascript
... assumes config setup


analytics.trackException({
        // A description of the exception.
	exDescription: 'bad bad boy',
	// true if the exception was fatal.
	exFatal: true,
});
```
