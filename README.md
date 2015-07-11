<img src="logo.png">

# Quanto

> An open source stock algorithm testing platform

## Team

  - James Munsch
  - Charles Harding
  - Garrett Fitzgerald

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Clicking on the right arrow on the home page will load the main view of the app. From here the user can do the following:
  
  - Search for the stocker ticker that they are interested in viewing
  - Clicking a result will load that stock's historical data into the chart
  - The user can then adjust the range slider to view a particular date range, select from the preset range buttons in the top left, or manually enter a date range in the top right
  - The user can then look over, edit, and hit graph to see how well the algorithm in the text editor performed via the equity graph that appears
  - The user also has the option to view live trade data by toggling the live feed on or off

## Requirements

On OS X or Linux?

Install the latest official Meteor release from your terminal:
```sh
curl https://install.meteor.com/ | sh
```
On Windows?

Download the official Meteor installer by following the link below.
https://install.meteor.com/windows


### Installing Dependencies

From within the root directory simply run the meteor command:

```sh
meteor
```
To reset the database locally run:
```sh
meteor reset
```
To reset the deployed version you must first delete the deployed app, then redeploy:
```sh
meteor deploy test.meteor.com --delete
meteor deploy test.meteor.com
```


## Contributing

See [CONTRIBUTING.md](https://github.com/unexpected-lion/ourglass/blob/master/contributing.md) for contribution guidelines.