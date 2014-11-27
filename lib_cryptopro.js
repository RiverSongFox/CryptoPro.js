/*global ActiveXObject */
/*global call_ru_cryptopro_npcades_10_native_bridge */

function CryptoPro() {
    "use strict";
    
    var i18n = null,             // Internationalization
        about = null,            // CADESCOM.About → CRYPTO-PRO Information
        certificateStore = null; // CAPICOM.Store  → Certificate Store
    
    i18n = (function (language) {
        switch (language) {
        case "00":
            return {};
        default:
            return {
                Init_PluginNotFound: "CRYPTO-PRO Browser Extension was not installed or has been disabled",
                Init_PluginVersion: "Installed version of CRYPTO-PRO Browser Extension is too old",
                Init_NotPerformed: "Initialization has not been performed, see CryptoPro.Initialize()",
                Store_Generic: "Certificate Store Error: ",
                Store_NotFound: "No valid certificates found"
            };
        }
    }("en"));

    function CreateObject(name) {
        var pluginObject = null,
            objCertEnrollClassFactory = null;
        if (navigator.userAgent.match(/ipod/i) || navigator.userAgent.match(/ipad/i) || navigator.userAgent.match(/iphone/i)) {
            // A function call_ru_cryptopro_npcades_10_native_bridge from NativeBridge.js is used to create objects in iOS
            return call_ru_cryptopro_npcades_10_native_bridge("CreateObject", [name]);
        } else {
            if (!(("Microsoft Internet Explorer" === navigator.appName) || navigator.userAgent.match(/Trident/i))) {
                // NPAPI objects for Firefox, Opera, Chrome and Safari
                pluginObject = document.getElementById("cadesplugin");
                return pluginObject.CreateObject(name);
            } else {
                // COM objects for Internet Explorer
                if (name.match(/X509Enrollment/i)) {
                    // CertEnroll objects are created via CX509EnrollmentWebClassFactory
                    objCertEnrollClassFactory = document.getElementById("certEnrollClassFactory");
                    return objCertEnrollClassFactory.CreateObject(name);
                }
                // CAPICOM and CAdESCOM objects are created standard way
                return new ActiveXObject(name);
            }
        }
    }
    
    return {
        
        CertificateListItem: function (thumbprint, subject) {
            var certificateInfo = {},
                fields = null,
                pair = null,
                i = 0;
                
            fields = subject.split(", ");
            for (i = 0; i < fields.length; i += 1) {
                pair = fields[i].split("=");
                certificateInfo[pair[0]] = pair[1];
            }

            certificateInfo.Thumbprint = thumbprint;
            return certificateInfo;
        },
        
        Initialize: function () {
            try {
                var about = new CreateObject("CADESCOM.About");
                if (about.Version < "1.15.1500") {
                    throw new Error(i18n.Init_PluginVersion);
                }
                certificateStore = new CreateObject("CAPICOM.STORE");
            } catch (e) {
                throw new Error(i18n.Init_PluginNotFound);
            }
        },
        
        ListCertificates: function () {
            var i = 0,
                certificate = null,
                list = [];
            if (certificateStore !== null) {
                try {
                    certificateStore.Open();
                    for (i = certificateStore.Certificates.Count; i > 0; i -= 1) {
                        certificate = certificateStore.Certificates.Item(i);
                        if (certificate.IsValid()) {
                            list.push(new this.CertificateListItem(certificate.Thumbprint, certificate.SubjectName));
                        }
                    }
                    certificateStore.Close();
                    if (list.length > 0) {
                        return list;
                    } else {
                        throw new Error(i18n.Store_NotFound);
                    }
                } catch (e) {
                    throw new Error(i18n.Store_Generic + e.message);
                }
            } else {
                throw new Error(i18n.Init_NotPerformed);
            }
        }
        
    };

}