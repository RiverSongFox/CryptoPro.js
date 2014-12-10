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

        Sign: function () {
            var
                task = {
                    data: document.getElementById("text").innerHTML,
                    thumbprint: document.getElementById("thumbprint").value,
                    cadesType: document.getElementById("type").value === "CADESCOM_CADES_X_LONG_TYPE_1" ? cryptoPro.CadesType.CADESCOM_CADES_X_LONG_TYPE_1 : cryptoPro.CadesType.CADESCOM_CADES_BES,
                    detached: document.getElementById("detached").checked,
                    documentName: document.getElementById("signedAttribute_Name").value === "" ? null : document.getElementById("signedAttribute_Name").value,
                    signingTime: new Date(),
                    tsp: document.getElementById("tsp").value === "" ? null : document.getElementById("tsp").value
                };
            try {
				document.getElementById("signature").innerHTML = cryptoPro.Sign(task);
				write("Sign OK");
            } catch (e) {
                write("Sign FAILED: " + e.message);
            }
        },
        
        Verify: function () {
        },
        
        UI: {
            UpdateTSPField: function () {
                if (document.getElementById("type").value === "CADESCOM_CADES_X_LONG_TYPE_1") {
                    document.getElementById("tsp").removeAttribute("disabled");
                } else {
                    document.getElementById("tsp").setAttribute("disabled", "");
                }
            }
        }
        
    };
    
}

var Test = new CryptoPro_Test();