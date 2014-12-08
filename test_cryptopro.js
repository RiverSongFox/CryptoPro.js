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

    function listCertificates() {
        
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

        Sign: function () {
            try {
				document.getElementById("signature").innerHTML = cryptoPro.Sign({
					data: document.getElementById("text").innerHTML,
					thumbprint: document.getElementById("thumbprint").value,
					detached: true,
					cades_type: 0x01,
					documentName: "CryptoPro.js Sample",
					signingTime: new Date()
				});
				write("Sign OK");
            } catch (e) {
                write("Sign FAILED: " + e.message);
            }
        }
        
    };
    
}

var Test = new CryptoPro_Test();