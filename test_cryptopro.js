/*global CryptoPro */

function CryptoPro_Test() {
    "use strict";
    
    var cryptoPro = new CryptoPro();
    
    function write(message) {
        var list = document.getElementById("console"),
            item = document.createElement("li"),
            text = document.createTextNode(message);
        item.appendChild(text);
        list.appendChild(item);
    }
    
    return {
        
        Initialize: function () {
            try {
                cryptoPro.Initialize();
                write("Initialization OK");
            } catch (e) {
                write("Initialization FAILED: " + e.message);
            }
        },
        
        ListCertificates: function () {
            var list = [],
                i = 0;
            try {
                list = cryptoPro.ListCertificates();
                for (i = 0; i < list.length; i += 1) {
                    write("Certificate " + list[i].CN + " (" + list[i].Thumbprint + ")");
                }
            } catch (e) {
                write("List Certificates FAILED: " + e.message);
            }
        }
        
    };
    
}

var Test = new CryptoPro_Test();