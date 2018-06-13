function ValidateFile() {
    var value = $("#ImportXMLfile").val();
    if (value == '') {
        ShowMessage('Please select any XML file.', "Alert", "warning", true);
        return false;
    }
    if (value != '') {
        if (!value.match(/\.xml|XML$/)) {
            ShowMessage('Please select only XML file!', "Alert", "warning", true);
            return false;
        }
    }
    var isValid = jQuery(".validateUploadExcel").validationEngine({ returnIsValid: true });
    //if (isValid == true) {
    //    }
    //else {
    //    return true;
    //}
}

$(function () {
    jQuery(".validateUploadExcel").validationEngine();
    ShowXmlResponse();


    if ($("#btnUpload").length > 0) {
        $("#btnUpload").click(function (evt) {
            //var fileUpload = $("#ImportXMLfile").get(0);
            //var files = fileUpload.files;
            var url = '/FileUploader/UploadFile';
            var photo = document.getElementById("ImportXMLfile");
            var file = photo.files[0];
            var data = new FormData();
            data.append('file', file);
            //for (var i = 0; i < files.length; i++) {
            //    data.append(files[i].name, files[i]);
            //}

            //$.ajax({
            //    url: url,
            //    type: "POST",
            //    enctype: "multipart/form-data",
            //    data: data,
            //    contentType: false,
            //    processData: false,
            //    success: function(result) {
            //        alert(result);
            //        $("#hdMessage").val(result);
            //        ShowXmlResponse();
            //    },
            //    error: function (err) {
            //        alert(err.statusText);
            //    }
            //});

            $.ajax({
                type: "POST",
                url: url,
                enctype: "multipart/form-data",
                async: false,
                contentType: false,
                processData: false,
                cache: false,
                beforeSend: function (jqXHR, settings) {
                    //writeToFile("SENDING REQUEST", settings.data);
                },
                ajaxSend: function (event, jqxhr, settings) {
                    //writeToFile("SENDING REQUEST in ajaxSend", settings.data);

                },
                data: data,
                success: function (response) {
                    //writeToFile("RESPONSE in SUCCESS", data);
                    $("#ImportXMLfile").val('');

                    $("#hdMessage").val(response);
                    ShowXmlResponse();

                    location.reload();
                },
                complete: function (response) {
                    //writeToFile("RESPONSE in complete", response);
                },
                ajaxComplete: function (response) {
                    //writeToFile("RESPONSE in ajaxComplete", response);
                },
                error: function (msg) {
                    $("#ImportFile").val('');
                    $("#hdMessage").val("-1");
                    ShowXmlResponse();
                }
            });
            //evt.preventDefault();
        });
    }
});

function ViewXMLFile(id) {
    var jsonData = JSON.stringify({
        id: id
    });
    $.ajax({
        type: "POST",
        url: '/FileUploader/ViewFile',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        data: jsonData,
        success: function (data) {
            if (data != '') {
                $('#txtXmlBillingView').val('');
                $('#txtXmlBillingView').val(data);
                $('#divhidepopup').show();
            } else {
                ShowMessage('Something went wrong in the xml. Please try again later!', "", "warning", true);
            }
        },
        error: function (response) {
        }
    });
}


function ViewParsedData(id) {
    $('#hidTPFileHeaderID').val(id);
    if (!$('#collapseXmlParsedData').hasClass('in'))
        $('#collapseXmlParsedData').addClass('in').attr('style', 'height:auto;');
    var jsonData = JSON.stringify({
        id: id
    });
    $.ajax({
        type: "POST",
        url: '/FileUploader/ViewParsedData',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            $('#RemittanceXMLParsedView').empty().html(data);
        },
        error: function (response) {
        }
    });
}

var ExportToExcel = function () {
    var fileheaderVal = $('#hidTPFileHeaderID').val();
    if (fileheaderVal !== null) {
        var item = $('#btnExportXMLData');
        var hrefString = item.attr("href");
        var controllerAction = hrefString;
        var hrefNew = controllerAction + "&FileHeaderId=" + $('#hidTPFileHeaderID').val();
        item.removeAttr('href');
        item.attr('href', hrefNew);
        return true;
    }
    return false;
}

function UploadFile() {
    var url = '/FileUploader/UploadFile';
    var photo = document.getElementById("ImportXMLfile");
    var file = photo.files[0];
    var data = new FormData();
    data.append('file', file);
    //console.log(
    //    'OS: ' + jscd.os + ' ' + jscd.osVersion + '\n' +
    //    'Browser: ' + jscd.browser + ' ' + jscd.browserMajorVersion +
    //    ' (' + jscd.browserVersion + ')\n' +
    //    'Mobile: ' + jscd.mobile + '\n' +
    //    'Flash: ' + jscd.flashVersion + '\n' +
    //    'Cookies: ' + jscd.cookies + '\n' +
    //    'Screen Size: ' + jscd.screen + '\n\n' +
    //    'Full User Agent: ' + navigator.userAgent
    //);

    $.ajax({
        type: "POST",
        url: url,
        enctype: "multipart/form-data",
        async: false,
        contentType: false,
        processData: false,
        cache: false,
        beforeSend: function (jqXHR, settings) {
            //writeToFile("SENDING REQUEST", settings.data);
        },
        ajaxSend: function (event, jqxhr, settings) {
            //writeToFile("SENDING REQUEST in ajaxSend", settings.data);

        },
        data: data,
        success: function (response) {
            //writeToFile("RESPONSE in SUCCESS", data);
            $("#ImportXMLfile").val('');
        },
        complete: function (response) {
            //writeToFile("RESPONSE in complete", response);

            $("#hdMessage").val(response);
            ShowXmlResponse();
        },
        ajaxComplete: function (response) {
            //writeToFile("RESPONSE in ajaxComplete", response);
        },
        error: function (msg) {
            $("#ImportFile").val('');
        }
    });
}

function writeToFile(title, data) {
    //var fso = new ActiveXObject("Scripting.FileSystemObject");
    //var fh = fso.OpenTextFile("C:\\aj\\data.txt", 8, false, 0);
    //fh.WriteLine(title);
    //fh.WriteLine("\n");
    //var currentDate = new Date();
    //fh.WriteLine(currentDate);
    //fh.WriteLine("\n");
    //fh.WriteLine(data);
    //fh.WriteLine("\n");
    //fh.Close();

    console.log(title + "\n" + data);
}

function ShowXmlResponse() {
    var hd = $("#hdMessage");
    if (hd != null) {
        if (hd.val() == -1) {
            ShowMessage("Error while parsing the file! Record Count and Claims in XML File does not match.", "Error", "warning", true);
        } else if (hd.val() == 1) {
            ShowMessage("File Upload Succefully!", "Success", "success", true);
        } else if (hd.val() == 2) {
            ShowMessage("File with the same Sender Id, Receiver Id and Transaction date already exist!!!", "Duplicate File", "warning", true);
        } else if (hd.val() == 3) {
            ShowMessage("Invalid XML File.", "Error", "warning", true);
        }
        else if (hd.val() == "-1")
            ShowMessage("Ohh!! Error while uploading file. Try again later", "Error", "error", true);
    }
    $("#hdMessage").val('');
}

/**
 * JavaScript Client Detection
 * (C) viazenetti GmbH (Christian Ludwig)
 */
(function (window) {
    {
        var unknown = '-';

        // screen
        var screenSize = '';
        if (screen.width) {
            width = (screen.width) ? screen.width : '';
            height = (screen.height) ? screen.height : '';
            screenSize += '' + width + " x " + height;
        }

        // browser
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browser = navigator.appName;
        var version = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // Opera
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Opera Next
        if ((verOffset = nAgt.indexOf('OPR')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 4);
        }
            // MSIE
        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
        }
            // Chrome
        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
            browser = 'Chrome';
            version = nAgt.substring(verOffset + 7);
        }
            // Safari
        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
            browser = 'Safari';
            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
            // Firefox
        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
            browser = 'Firefox';
            version = nAgt.substring(verOffset + 8);
        }
            // MSIE 11+
        else if (nAgt.indexOf('Trident/') != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(nAgt.indexOf('rv:') + 3);
        }
            // Other browsers
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browser = nAgt.substring(nameOffset, verOffset);
            version = nAgt.substring(verOffset + 1);
            if (browser.toLowerCase() == browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }
        // trim the version string
        if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

        majorVersion = parseInt('' + version, 10);
        if (isNaN(majorVersion)) {
            version = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        // mobile version
        var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

        // cookie
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
            document.cookie = 'testcookie';
            cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
        }

        // system
        var os = unknown;
        var clientStrings = [
            { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
            { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
            { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
            { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
            { s: 'Windows Vista', r: /Windows NT 6.0/ },
            { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
            { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
            { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
            { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
            { s: 'Windows 98', r: /(Windows 98|Win98)/ },
            { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
            { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
            { s: 'Windows CE', r: /Windows CE/ },
            { s: 'Windows 3.11', r: /Win16/ },
            { s: 'Android', r: /Android/ },
            { s: 'Open BSD', r: /OpenBSD/ },
            { s: 'Sun OS', r: /SunOS/ },
            { s: 'Linux', r: /(Linux|X11)/ },
            { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
            { s: 'Mac OS X', r: /Mac OS X/ },
            { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
            { s: 'QNX', r: /QNX/ },
            { s: 'UNIX', r: /UNIX/ },
            { s: 'BeOS', r: /BeOS/ },
            { s: 'OS/2', r: /OS\/2/ },
            { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = unknown;

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS X':
                osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'Android':
                osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;
        }

        // flash (you'll need to include swfobject)
        /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
        var flashVersion = 'no check';
        if (typeof swfobject != 'undefined') {
            var fv = swfobject.getFlashPlayerVersion();
            if (fv.major > 0) {
                flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
            }
            else {
                flashVersion = unknown;
            }
        }
    }

    window.jscd = {
        screen: screenSize,
        browser: browser,
        browserVersion: version,
        browserMajorVersion: majorVersion,
        mobile: mobile,
        os: os,
        osVersion: osVersion,
        cookies: cookieEnabled,
        flashVersion: flashVersion
    };
}(this));

function DeleteXmlFileData() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        $.ajax({
            type: "POST",
            url: '/FileUploader/DeleteByFileIdAndGetXmlData',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: JSON.stringify({ fileId: $("#hfGlobalConfirmId").val() }),
            success: function (data) {
                $('#XMLFilesView').empty().html(data);
            },
            error: function (response) {
            }
        });
    }
}


function ExecuteXmlParseDetails(id) {
    if ($("#hfGlobalConfirmId").val() > 0) {
        $.ajax({
            type: "POST",
            url: '/FileUploader/ExecuteXmlDetails',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ fileId: $("#hfGlobalConfirmId").val() }),
            success: function (data) {
                if (data) {
                    ShowMessage("File Upload Succefully!", "Success", "success", true);
                }
                else {
                    ShowMessage('Something went wrong while parsing the XML Data. Please try again later!', "", "warning", true);
                }
            },
            error: function (response) {
            }
        });
    }
}
