# Frontend Unit Tests

We're using jest for our frontend unit tests. This will be primarily testing for component accuracy.

## Installation

For easy local runs of the test, it's recommended that you install jest globally. See the [official docs](https://jestjs.io/docs/getting-started#running-from-command-line) on how to do this.

## Running the Tests

Running from the commandline, jest will do test discovery in child folders, so make sure you run from the `frontend` directory. If you want to run a particular test file do

```bash
# you should be in frontend/

jest src/tests/<foldername>/test.module.js
```

## Future Plans

* Add snapshot/diff testing
