[![Build Status](https://travis-ci.org/Aferz/vivaz.svg?branch=master)](https://travis-ci.org/Aferz/vivaz)

## Vivaz
Elegant syntax, dead-simple and yet powerful query builder for javascript.

Quick example:

```javascript
Vivaz( data ).where( 'name', 'Alex' )
             .orWhereIn( 'car.brand', [ 'Audi', 'Seat' ] )
             .orderBy( 'id', 'desc' )
             .get();
```

This is nothing compared what Vivaz.js can do for you!.

## Installation
#### Bower
```
bower install vivaz --save
```

#### Npm
```
npm install vivaz --save
```

#### Manually
Clone this repository or just download the dist/vivaz.js file and import it in your HTML
```html
<script src="path/of/my/app/assets/vivaz.js"></script>
```

## Documentation
Vivaz is well documented in the [wiki](https://github.com/Aferz/vivaz.js/wiki).

## Ideas and improvements
Feel free to open an [issue](https://github.com/Aferz/vivaz.js/issues) if something doesn't work as espected or send a [pull request](https://github.com/Aferz/vivaz.js/pulls) if you have fixed a bug.

## License
Vivaz is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)

## Special thanks
To Laravel framework and Jeffrey Way, for show me a new way of think and code.
To Evan You (VueJS creator), for show me a good aproach for building & releasing new versions.
