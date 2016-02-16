### 0.2.0

Added CHANGELOG file.
Changed "build" to "release" word when bumping package.json.
Added integration for library moment.js(2.11.*) when working with dates:
* Use of moment.js is configurable via config. By default it's true if library was loaded before Vivaz, otherwise,  it won't be loaded.
* Methods "whereDate", "whereNotDate", "orWhereDate" & "orWhereNotDate" now supports to receive a moment object.
* Methods "get", "first", "last", "paginate", "collect" & "toModel" now return moment objects where fields match to valid dates.
Added "Config.platform" config var. Defines the platform where Vivaz is running under. Browser(default) or Node.
Added "Vivaz._env" global var. Defines the environment where Vivaz is executed( "production", only for releases or "development").


### 0.1.2

Update Vivaz main file version on new release.

### 0.1.1

Release to fix issues with publishing package on NPM under version 0.1.0.

### 0.1.0

Initial release.