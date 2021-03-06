var netflixId = "com.metrological.app.NetflixHorizon",
    youtubeId = "com.metrological.app.YoutubeWebbridge",
    provisioned = !1,
    nfSettings = getSetting("netflix") || {},
    streamsUrls = getSetting("streamUrls") || {
        npo1: "http://video.metrological.com/npo1.mp4",
        npo2: "http://video.metrological.com/npo2.mp4",
        nasa: "http://video.metrological.com/nasa_new.mp4"
    },
    streams = [{
        title: "NPO1",
        url: streamsUrls.npo1,
        epg: [{
            s: 1,
            e: 522,
            t: "NOS Journaal"
        }, {
            s: 523,
            e: 1113,
            t: "NOS Journaal"
        }, {
            s: 1114,
            e: 1780,
            t: "NOS Journaal"
        }, {
            s: 1781,
            e: 4928,
            t: "Pauw"
        },
            {
                s: 4929,
                e: 5510,
                t: "NOS Journaal"
            }, {
                s: 5511,
                e: 8302,
                t: "Tijd voor Max"
            }, {
                s: 8303,
                e: 8712,
                t: "Politieke Partijen"
            }, {
                s: 8713,
                e: 9460,
                t: "NOS Journaal"
            }, {
                s: 9461,
                e: 10579,
                t: "1 Vandaag"
            }, {
                s: 10580,
                e: 11367,
                t: "NOS Sport"
            }, {
                s: 11368,
                e: 14060,
                t: "De wereld draait door"
            }, {
                s: 14061,
                e: 15522,
                t: "NOS Journaal"
            }, {
                s: 15523,
                e: 18738,
                t: "Opsporing verzocht"
            }, {
                s: 18739,
                e: 22279,
                t: "Opgelicht"
            }, {
                s: 22280,
                e: 24167,
                t: "De rijdende rechter"
            }
        ]
    }, {
        title: "NPO2",
        url: streamsUrls.npo2,
        epg: [{
            s: 1,
            e: 1387,
            t: "Omroep Max"
        }, {
            s: 1388,
            e: 2225,
            t: "Meterdaad"
        }, {
            s: 2226,
            e: 5178,
            t: "Planet Earth"
        }, {
            s: 5179,
            e: 7484,
            t: "Geloof/Hoop/Liefde"
        }, {
            s: 7485,
            e: 8953,
            t: "Hallo Nederland"
        }, {
            s: 5511,
            e: 8302,
            t: "Binnenstebuiten"
        }, {
            s: 8303,
            e: 8712,
            t: "De zaak metten"
        }, {
            s: 8713,
            e: 9460,
            t: "Zembla"
        }, {
            s: 9461,
            e: 10579,
            t: "Zembla"
        }, {
            s: 10580,
            e: 11367,
            t: "2Doc"
        }, {
            s: 11368,
            e: 14060,
            t: "Een andere kijk"
        }]
    }];
setSetting("stripHashOnReload", !0);
setSetting("allowKeyReload", !0);
setSetting("ws", {
    keepAlive: !0,
    reconnectRandomTime: 0,
    keepAliveInterval: 6E4,
    ignoreRandomTimer: !0
});
setSetting("background", "black");
KeyMap.defineKeys(KeyMap.NORMAL, {
    17: "channel-up",
    16: "channel-down",
    166: "back",
    9: "reload"
}, !0);
var post = function(a, b) {
        var e = new XMLHttpRequest;
        e.open("POST", "http://localhost" + a, !0);
        e.setRequestHeader("Content-Type", "application/json");
        e.send(JSON.stringify(b))
    },
    fireSilentCall2Action = function(a, b) {
        plugins.NotificationManager.addActiveC2a(a, b);
        plugins.NotificationManager.c2a()
    };

function provisionDevice() {
    if (4 == this.readyState && 200 != this.status) {
        provisioned = !1;
        var a = new XMLHttpRequest;
        a.open("PUT", "http://127.0.0.1/Service/Provisioning", !0);
        a.send()
    } else provisioned = !0
}

function isProvisionDevice() {
    var a = new XMLHttpRequest;
    a.open("GET", "http://127.0.0.1/Service/Provisioning", !0);
    a.onreadystatechange = provisionDevice.bind(a);
    a.send()
}

function getNetflixConfig(a) {
    var b = new XMLHttpRequest;
    b.open("GET", "http://127.0.0.1/Service/Controller/Configuration/Netflix", !0);
    b.onreadystatechange = function(e) {
        if (4 === b.readyState) {
            e = {};
            try {
                e = JSON.parse(b.responseText)
            } catch (h) {}
            return a(e)
        }
    };
    b.send()
}

function setNetflixConfigSync(a) {
    var b = new XMLHttpRequest;
    b.open("PUT", "http://127.0.0.1/Service/Controller/Configuration/Netflix", !1);
    b.send(JSON.stringify(a))
}
var WebbridgeWebSocket = function() {
        function a(a) {
            l = void 0;
            var c = new XMLHttpRequest;
            c.open("PUT", "http://127.0.0.1/Service/Controller/Deactivate/Netflix", a ? !1 : !0);
            c.send()
        }

        function b() {
            var a = new XMLHttpRequest;
            a.open("PUT", "http://127.0.0.1/Service/Controller/Activate/Netflix", !0);
            a.send()
        }

        function e(a) {
            for (var c = 0; c < m.length; c++) {
                var f = m[c];
                if (f.callsign === a) return f
            }
        }

        function h(a) {
            var c = new XMLHttpRequest;
            c.open("GET", "http://127.0.0.1/Service/Controller/Plugins", !0);
            c.onreadystatechange = function() {
                if (4 ==
                    c.readyState) {
                    var f = {};
                    try {
                        f = 200 == c.status && JSON.parse(c.responseText) || {}
                    } catch (n) {}
                    m = f.plugins || [];
                    a()
                }
            };
            c.send()
        }

        function d(a, c) {
            var f = new XMLHttpRequest;
            f.open(c ? "PUT" : "DELETE", "http://127.0.0.1/Service/DIALServer/Apps/" + a + "/Running", !0);
            f.send()
        }

        function g(k) {
            var c = {};
            try {
                c = k && k.data && JSON.parse(k.data)
            } catch (p) {}
            var f = c.data || {};
            switch (c.callsign) {
                case "Provisioning":
                    if (f.isProvisioned && (provisioned = !0, (c = e("Netflix")) && c.configuration)) {
                        c.configuration.language = plugins.profile.languageCode;
                        for (var g in nfSettings) c.configuration[g] = nfSettings[g];
                        g = "source_type=" + (c.configuration.startsuspended ? "22" : "2");
                        g += "&additionalDataUrl=" + encodeURIComponent("http://localhost/Service/DIALServer/Apps/Netflix/Data");
                        c.configuration.querystring = g;
                        setNetflixConfigSync(c.configuration);
                        !0 === c.configuration.startsuspended && b()
                    }
                    break;
                case "Netflix":
                    !1 === f.started && a();
                    !0 === f.suspending && (l = a.delay(5E3));
                    !0 === f.suspended && void 0 !== l && (clearTimeout(l), l = void 0);
                    !1 === f.suspended || !0 === f.started ? d("Netflix", !0) : !0 !== f.suspended && !1 !== f.started && !0 !== f.deactivated || d("Netflix", !1);
                    break;
                case "DIALServer":
                    "Netflix" == f.name && "start" == f.type && ApplicationManager.active != netflixId && (ApplicationManager.exited ? fireSilentCall2Action(netflixId) : (ApplicationManager.active !== ui && ApplicationManager.close(ApplicationManager.active), h(function() {
                        getNetflixConfig(function(a) {
                            var c;
                            c = "source_type=12&additionalDataUrl=" + encodeURIComponent("http://localhost/Service/DIALServer/Apps/Netflix/Data");
                            f.parameters && (c += "&dial=" +
                                encodeURIComponent(f.parameters));
                            a.querystring = c;
                            var b = e("Netflix");
                            b && "activated" !== b.state ? setNetflixConfigSync(a) : (a = new XMLHttpRequest, a.open("POST", "http://127.0.0.1/Service/Netflix/SystemCommand", !0), a.send(c));
                            ApplicationManager.load(netflixId);
                            ApplicationManager.open(netflixId)
                        })
                    }))), "YouTube" == f.name && ("start" == f.type ? ApplicationManager.exited ? fireSilentCall2Action(youtubeId, {
                        url: f.url
                    }) : ApplicationManager.active !== youtubeId ? (ApplicationManager.active !== ui && ApplicationManager.close(ApplicationManager.active),
                        ApplicationManager.load(youtubeId), ApplicationManager.open(youtubeId, {
                        url: f.url
                    })) : ApplicationManager.active === youtubeId && (g = new XMLHttpRequest, g.open("POST", "http://127.0.0.1/Service/YouTube/URL" + path, !0), g.setRequestHeader("Content-Type", "application/json"), g.send(JSON.stringify({
                        url: c.url
                    }))) : "stop" == f.type && ApplicationManager.active == youtubeId && ApplicationManager.close(youtubeId))
            }
        }

        function k() {
            var a = new WebSocket("ws://127.0.0.1/Service/Controller", "notification");
            a.onmessage = g;
            a.onopen = function() {
                isProvisionDevice.delay(5E3)
            };
            a.onerror = function(a) {};
            a.onclose = function() {
                k.delay(5E3)
            }
        }
        var l, m = [];
        h(function() {
            k()
        })
    }(),
    StreamManager = function() {
        var a = 0,
            b = null,
            e = 1,
            h = function(b) {
                for (var d = 0, e = streams[a].epg, g = e.length; d < g; d++)
                    if (e[d].s <= b && e[d].e >= b) return new TVProgram(e[d].t, "", e[d].s, e[d].e - e[d].s)
            },
            d = function() {
                b = h(e);
                console.log(b);
                plugins && plugins.players && plugins.players[0] && fire.call(plugins.players[0], "onChannelChange")
            };
        return {
            program: function() {
                return b
            },
            channel: function() {
                return streams[a]
            },
            number: function() {
                return a
            },
            up: function() {
                a++;
                a === streams.length && (a = 0);
                e = 1;
                d()
            },
            down: function() {
                a--;
                0 > a && (a = streams.length - 1);
                e = 1;
                d()
            },
            start: function() {
                b = h(e);
                setInterval(function() {
                    e++;
                    e > b.startTime + b.duration && d()
                }, 1E3)
            },
            getCurrentTime: function() {
                return e
            }
        }
    }(),
    MLPlayer = function() {
        function a() {
            d.element.preload = "auto";
            StreamManager.start();
            d.element.src = StreamManager.channel().url;
            d.element.play()
        }

        function b() {
            d.src || g || a()
        }

        function e() {
            g = !1
        }

        function h() {
            g = !0
        }
        var d = this,
            g = !1;
        a();
        getter(d, "channel", function() {
            return {
                number: StreamManager.number(),
                name: StreamManager.channel().title,
                description: "",
                widget: !1
            }
        });
        setter(d, "channel", function(a) {
            g || (d.src && (d.src = null), "up" !== a && "down" !== a) || (StreamManager[a](), d.src = StreamManager.channel().url, d.element.play(), fire.call(d, "onChannelChange"))
        });
        getter(d, "program", function() {
            return StreamManager.program()
        });
        getter(d, "backToLive", function() {
            return b
        });
        getter(d, "enable", function() {
            return e
        });
        getter(d, "disable", function() {
            return h
        })
    };
MLPlayer.prototype = new HTML5Player(Player.TV);
MLPlayer.prototype.constructor = MLPlayer;
plugins.players.push(new MLPlayer);
var PiProfile = function(a) {
    function b(a) {
        return !0
    }

    function e(a, b) {
        switch (b) {
            case "master":
            case "adult":
            case "youth":
            case "purchase":
                return !0;
            case "passport":
                return this.passport.has("pin")
        }
        return !1
    }
    getter(this, "name", function() {
        return a || ""
    });
    getter(this, "provisioned", function() {
        return provisioned
    });
    var h = new GenericStorage("pp", !0);
    getter(this, "passport", function() {
        return h
    });
    getter(this, "country", function() {
        return GEO && GEO.geo && GEO.geo.countryName
    });
    getter(this, "countryCode", function() {
        return getSetting("country") ||
            "en"
    });
    getter(this, "language", function() {
        return LANGUAGES[this.languageCode]
    });
    getter(this, "languageCode", function() {
        return getSetting("language") || "en"
    });
    getter(this, "ip", function() {
        return GEO && GEO.ip || "127.0.0.1"
    });
    getter(this, "mac", function() {
        return "00:00:00:00:00:00"
    });
    getter(this, "latlon", function() {
        return GEO && GEO.geo && GEO.geo.ll || []
    });
    getter(this, "locale", function() {
        return this.languageCode + "-" + this.countryCode.toUpperCase()
    });
    getter(this, "operator", function() {
        return "metrological"
    });
    getter(this,
        "hasPIN",
        function() {
            return b
        });
    getter(this, "validatePIN", function() {
        return e
    })
};
PiProfile.prototype = new Profile;
PiProfile.prototype.constructor = PiProfile;
plugins.profile = PiProfile;