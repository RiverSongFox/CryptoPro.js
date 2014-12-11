# CryptoPro.js

CRYPTO-PRO Browser plug-in Wrapper written in pure JavaScript.

The project aim is to create simple interface for CRYPTO-PRO Browser plug-in objects. Note that it's currently under development and may not be suitable for production use yet.

![Development](http://s24.postimg.org/mzfsjch7l/development.png) ![CC0](https://licensebuttons.net/l/zero/1.0/80x15.png) ![Vanilla JS](http://s9.postimg.org/q47euzz6j/vanilla_js.png)

CRYPTO-PRO EDS Browser plug-in enables user to digitally sign and verify documents in any web page using CRYPTO-PRO CSP. It supports all major web browsers: Internet Explorer, Mozilla Firefox, Opera, Google Chrome and Apple Safari. Microsoft Windows, Linux, FreeBSD, Apple iOS and Apple OS X are supported as well.

Please visit https://www.cryptopro.ru/products/cades/plugin for more information regarding the product.

## Installation

First of all, include JavaScript sources `cryptopro.js` and `lib_nativebridge.js` into HTML code of your page.

```html
<script src="lib_cryptopro.js"></script>
<script src="lib_nativebridge.js"></script>
```

`lib_cryptopro.js` is a core of this project and contains wrapper implementation. `lib_nativebridge.js` is needed by iOS devices to utilize functionality of CRYPTO-PRO Browser plug-in.

Then, put `object` tags into body of your page as shown below. Be sure to keep their IDs, because these names are referenced by library.

```html
<object id="cadesplugin" type="application/x-cades"></object>
<object id="certEnrollClassFactory" classid="clsid:884e2049-217d-11da-b2a4-000e7bbb2b09"></object>
```

Finally, create an instance of `CryptoPro()` class in your code:

```js
var cryptoPro = new CryptoPro();
```

Now you should be able to use all functions of **CryptoPro.js** library!

## Usage

Actually, before you can sign and verify documents, you should invoke `Initialize()` method to ensure that CRYPTO-PRO Browser plug-in is installed and activated correctly. Please refer the following example:

```js
var cryptoPro = new CryptoPro();
try {
  cryptoPro.Initialize();
  window.alert("Initialization OK");
} catch (e) {
  window.alert("Initialization FAILED: " + e.message);
}
```

### Sign
### Verify
