# Redditvid

Redditvid is a lighweight Reddit client that regurgitates [www.reddit.com/r/videos](www.reddit.com/r/videos) into a responsive web app. It's made using Ember.js CLI and hosted on Node.js. 
I created it to better understand Ember, Ouath and SVG transitions.
Currently it's possible to:			

* List the top 25 trending vidoes
* Login to reddit using oauth
* Upvote or downvote a video
* View any of these videos, and view top level comments
* Leave a comment

## Screen Shots

Front Page
![Alt text](http://i.imgur.com/ASckNar.png =197x350 "Front Page")

Front Page - Menu Open

![Alt text](http://i.imgur.com/5ruUsZp.png =197x350 "Front Page - Menu Open")

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM) and [Bower](http://bower.io/)

## Installation

* `git clone https://github.com/abs2g08/redditvid.git`
* `cd redditvid`
* `npm install`
* `bower install`

## Running

Due to Reddit's lack of CORS support for its API. All requests have to be proxied through a node.js server located in /node_server.

You can still run the app using `ember server` but loggin in won't work.

Proper way:

* `./run.sh`
* Visit your app at http://localhost:5000.

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

If you have pulled this branch from openshift, deploying is as simple as `git push origin master`. 

## Further Reading / Useful Links

* ember: http://emberjs.com/
* ember-cli: http://www.ember-cli.com/
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

