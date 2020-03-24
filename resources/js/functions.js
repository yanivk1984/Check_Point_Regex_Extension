
function search(value) {
    let objects = value.response.objects;

    if (searchType === "Contains")
        contains(objects);

    else if (searchType === "Start With")
        startWith(objects);

    else if (searchType === "End With")
        endWith(objects);

    else if (searchType === "Regex")
        regex(objects);

    else if (searchType === "Full Match")
        fullMatch(objects);
}

function contains(objects) {
    for (let i = 0 ; i < objects.length ; i++){
        if (caseSensitive === true){
            if (objects[i].name.includes(name)){
                found.push(objects[i]);
                insertRow(objects[i]);
            }
        }

        else if (caseSensitive === false){
            if (objects[i].name.toLowerCase().includes(name.toLowerCase())){
                found.push(objects[i]);
                insertRow(objects[i]);
            }
        }
    }
}

function startWith(objects) {
    for (let i = 0 ; i < objects.length ; i++){
        if (caseSensitive === true){
            if (objects[i].name.startsWith(name)){
                found.push(objects[i]);
                insertRow(objects[i]);
            }
        }

        else if (caseSensitive === false){
            if (objects[i].name.toLowerCase().startsWith(name.toLowerCase())){
                found.push(objects[i]);
                insertRow(objects[i]);
            }
        }
    }
}

function endWith(objects) {
    for (let i = 0; i < objects.length ; i++){
        if (caseSensitive === true){
            if (objects[i].name.endsWith(name)){
                found.push(objects[i]);
                insertRow(objects[i]);
            }
        }

        else if (caseSensitive === false){
            if (objects[i].name.toLowerCase().endsWith(name.toLowerCase())){
                found.push(objects[i]);
                insertRow(objects[i]);
            }
        }
    }
}

function fullMatch(objects) {
    for (let i = 0; i < objects.length ; i++){
        if (caseSensitive === true){
            if (objects[i].name === name){
                found.push(objects[i]);
                insertRow(objects[i]);
            }
        }

        else if (caseSensitive === false){
            if (objects[i].name.toLowerCase() === name.toLowerCase()){
                found.push(objects[i]);
                insertRow(objects[i]);
            }
        }
    }
}

function regex(objects) {
    for (let i = 0 ; i < objects.length ; i++){

        if (caseSensitive === true){
            let regex = new RegExp(name);
            if (regex.test(objects[i].name)){
                found.push(objects[i]);
                insertRow(objects[i]);
            }
        }

        else if (caseSensitive === false){
            let regex = new RegExp(name.toLowerCase());
            if (regex.test(objects[i].name.toLowerCase())){
                found.push(objects[i]);
                insertRow(objects[i]);
            }
        }
    }
}

function insertRow (object) {
        let name = object.name;
        let type = object.type;
        let ip = object["ipv4-address"];
        let network = object.subnet4;
        let ipNetwork;

        if (ip !== undefined)
            ipNetwork = ip;
        else
            ipNetwork = network;

        let row = window.table.insertRow(window.tableCounter);

        row.insertCell(0).innerHTML = window.tableCounter.toString();
        row.insertCell(1).innerHTML = name;
        row.insertCell(2).innerHTML = type;
        row.insertCell(3).innerHTML = ipNetwork;
        row.insertCell(4);

        window.tableCounter = window.tableCounter + 1;
}

function getTotal(type) {
        console.log(type);
        sendApiCommand(type, 0, "setTotal");
}

//run readonly command
function sendApiCommand (type, offset, callback) {
    let command = {"command": "show " + type, "parameters": {"offset": offset, "limit": 500, "details-level": "full"}};
    smxProxy.sendRequest("run-readonly-command", command, callback)
}

function fetchObjects(){
    for (let offset = 0 ; offset < window.total ; offset += 500){
        sendApiCommand(window.type, offset, "search");
    }
}

function setTotal(value) {
    window.total = value.response.total;
}

function onSubmit () {
    window.tableCounter = 1;
    window.found = [];
    window.table = document.getElementsByClassName("table")[0];
    table.getElementsByTagName("thead")[0].innerHTML = table.rows[0].innerHTML;

    window.table.style.display = "inline";
    window.name = document.getElementsByName('name')[0].value.trim();
    window.type = document.getElementsByName('type')[0].innerHTML.toLowerCase().trim();
    window.searchType = document.querySelectorAll('input[name=searchType]:checked')[0].id.trim();
    window.caseSensitive = document.getElementsByName('caseSensitive')[0].checked;
    fetchObjects()
}

function changeLabel(name) {
    document.getElementsByName('type')[0].innerHTML = name;
    getTotal(name.toLowerCase().trim())
}



// function tests() {
//     //run readonly command
//     smxProxy.sendRequest("run-readonly-command",
//         {"command" : "show networks","parameters" : {"offset": 0, "limit": 500, "details-level":"full"}},
//         "tests2");
// }
//
// tests();
//
// function tests2(val) {
//     document.write(JSON.stringify(val));
//     console.log(JSON.stringify(val))
// }



// for testing
form = {
    name: "Remote-\w+-gw",
    searchType: "Regex",
    type: "simple-gateway",
    caseSensitive: false
};

test = {
    "response": {
        "objects": [{
            "uid": "453ea708-cb36-4ca1-8c51-831e86c7a5d3",
            "name": "BranchOffice",
            "type": "simple-gateway",
            "domain": {
                "uid": "41e821a0-3720-11e3-aa6e-0800200c9fde",
                "name": "SMC User",
                "domain-type": "domain"
            },
            "policy": {},
            "operating-system": "Gaia",
            "hardware": "3000 Appliances",
            "version": "R80.20",
            "ipv4-address": "198.51.100.7",
            "interfaces": [{
                "interface-name": "eth0",
                "ipv4-address": "198.51.100.7",
                "ipv4-network-mask": "255.255.255.0",
                "ipv4-mask-length": 24,
                "dynamic-ip": false,
                "topology": {
                    "leads-to-internet": true,
                    "security-zone": {
                        "uid": "237a4cbc-7fb6-4d50-872a-4904468271c4",
                        "name": "ExternalZone",
                        "type": "security-zone",
                        "domain": {
                            "uid": "a0bbbc99-adef-4ef8-bb6d-defdefdefdef",
                            "name": "Check Point Data",
                            "domain-type": "data domain"
                        }
                    }
                }
            }, {
                "interface-name": "eth1",
                "ipv4-address": "145.80.110.7",
                "ipv4-network-mask": "255.255.255.0",
                "ipv4-mask-length": 24,
                "dynamic-ip": false,
                "topology": {
                    "leads-to-internet": false,
                    "ip-address-behind-this-interface": "network defined by the interface ip and net mask",
                    "leads-to-dmz": false
                }
            }],
            "network-security-blades": {
                "firewall": true,
                "site-to-site-vpn": true,
                "application-control": true,
                "url-filtering": true,
                "anti-bot": true,
                "anti-virus": true,
                "ips": true,
                "threat-emulation": true
            },
            "management-blades": {},
            "vpn-encryption-domain": "addresses_behind_gw",
            "sic-status": "uninitialized",
            "tags": [],
            "icon": "NetworkObjects/gateway",
            "groups": [],
            "comments": "Second office gateway",
            "color": "black",
            "meta-info": {
                "lock": "unlocked",
                "validation-state": "ok",
                "last-modify-time": {
                    "posix": 1564475516724,
                    "iso-8601": "2019-07-30T08:31+0000"
                },
                "last-modifier": "admin",
                "creation-time": {
                    "posix": 1564475461098,
                    "iso-8601": "2019-07-30T08:31+0000"
                },
                "creator": "admin"
            },
            "read-only": true
        }, {
            "uid": "7f994e69-f997-47bd-9f80-621cf622941e",
            "name": "Corporate-GW",
            "type": "simple-gateway",
            "domain": {
                "uid": "41e821a0-3720-11e3-aa6e-0800200c9fde",
                "name": "SMC User",
                "domain-type": "domain"
            },
            "policy": {},
            "operating-system": "Gaia",
            "hardware": "23000 Appliances",
            "version": "R80.20",
            "ipv4-address": "198.51.100.5",
            "interfaces": [{
                "interface-name": "eth0",
                "ipv4-address": "198.51.100.5",
                "ipv4-network-mask": "255.255.255.0",
                "ipv4-mask-length": 24,
                "dynamic-ip": false,
                "topology": {
                    "leads-to-internet": true,
                    "security-zone": {
                        "uid": "237a4cbc-7fb6-4d50-872a-4904468271c4",
                        "name": "ExternalZone",
                        "type": "security-zone",
                        "domain": {
                            "uid": "a0bbbc99-adef-4ef8-bb6d-defdefdefdef",
                            "name": "Check Point Data",
                            "domain-type": "data domain"
                        }
                    }
                }
            }, {
                "interface-name": "eth1",
                "ipv4-address": "22.20.105.5",
                "ipv4-network-mask": "255.255.255.0",
                "ipv4-mask-length": 24,
                "dynamic-ip": false,
                "topology": {
                    "leads-to-internet": false,
                    "ip-address-behind-this-interface": "network defined by the interface ip and net mask",
                    "leads-to-dmz": false,
                    "security-zone": {
                        "uid": "e8131db2-8388-42a5-924a-82de32db20f7",
                        "name": "InternalZone",
                        "type": "security-zone",
                        "domain": {
                            "uid": "a0bbbc99-adef-4ef8-bb6d-defdefdefdef",
                            "name": "Check Point Data",
                            "domain-type": "data domain"
                        }
                    }
                }
            }, {
                "interface-name": "eth2",
                "ipv4-address": "151.20.4.5",
                "ipv4-network-mask": "255.255.255.0",
                "ipv4-mask-length": 24,
                "dynamic-ip": false,
                "topology": {
                    "leads-to-internet": false,
                    "ip-address-behind-this-interface": "network defined by the interface ip and net mask",
                    "leads-to-dmz": false,
                    "security-zone": {
                        "uid": "8c4041ea-ff14-4e4b-a9d9-4183d18c790a",
                        "name": "DMZZone",
                        "type": "security-zone",
                        "domain": {
                            "uid": "a0bbbc99-adef-4ef8-bb6d-defdefdefdef",
                            "name": "Check Point Data",
                            "domain-type": "data domain"
                        }
                    }
                }
            }, {
                "interface-name": "eth3",
                "ipv4-address": "183.82.0.5",
                "ipv4-network-mask": "255.255.255.0",
                "ipv4-mask-length": 24,
                "dynamic-ip": false,
                "topology": {
                    "leads-to-internet": false,
                    "ip-address-behind-this-interface": "network defined by the interface ip and net mask",
                    "leads-to-dmz": false,
                    "security-zone": {
                        "uid": "8c4041ea-ff14-4e4b-a9d9-4183d18c790a",
                        "name": "DMZZone",
                        "type": "security-zone",
                        "domain": {
                            "uid": "a0bbbc99-adef-4ef8-bb6d-defdefdefdef",
                            "name": "Check Point Data",
                            "domain-type": "data domain"
                        }
                    }
                }
            }],
            "network-security-blades": {
                "firewall": true,
                "site-to-site-vpn": true,
                "application-control": true,
                "content-awareness": true,
                "identity-awareness": true,
                "url-filtering": true,
                "anti-bot": true,
                "anti-virus": true,
                "ips": true,
                "threat-emulation": true
            },
            "management-blades": {},
            "vpn-encryption-domain": "addresses_behind_gw",
            "sic-status": "uninitialized",
            "tags": [],
            "icon": "NetworkObjects/gateway",
            "groups": [],
            "comments": "First Office gateway",
            "color": "black",
            "meta-info": {
                "lock": "unlocked",
                "validation-state": "ok",
                "last-modify-time": {
                    "posix": 1564475517927,
                    "iso-8601": "2019-07-30T08:31+0000"
                },
                "last-modifier": "admin",
                "creation-time": {
                    "posix": 1564475456466,
                    "iso-8601": "2019-07-30T08:30+0000"
                },
                "creator": "admin"
            },
            "read-only": true
        }, {
            "uid": "a9f2d9bd-35e4-4571-bebb-4aeec04730df",
            "name": "EuropeBranchGw",
            "type": "simple-gateway",
            "domain": {
                "uid": "41e821a0-3720-11e3-aa6e-0800200c9fde",
                "name": "SMC User",
                "domain-type": "domain"
            },
            "policy": {},
            "operating-system": "Gaia",
            "hardware": "5000 Appliances",
            "version": "R80.20",
            "ipv4-address": "192.0.2.100",
            "interfaces": [{
                "interface-name": "eth0",
                "ipv4-address": "192.0.2.100",
                "ipv4-network-mask": "255.255.255.0",
                "ipv4-mask-length": 24,
                "dynamic-ip": false,
                "topology": {
                    "leads-to-internet": true
                }
            }, {
                "interface-name": "eth1",
                "ipv4-address": "203.0.113.1",
                "ipv4-network-mask": "255.255.255.128",
                "ipv4-mask-length": 25,
                "dynamic-ip": false,
                "topology": {
                    "leads-to-internet": false,
                    "ip-address-behind-this-interface": "network defined by the interface ip and net mask",
                    "leads-to-dmz": false
                }
            }],
            "network-security-blades": {
                "firewall": true,
                "site-to-site-vpn": true,
                "application-control": true,
                "url-filtering": true,
                "anti-bot": true,
                "anti-virus": true,
                "ips": true,
                "threat-emulation": true
            },
            "management-blades": {},
            "vpn-encryption-domain": "addresses_behind_gw",
            "sic-status": "uninitialized",
            "tags": [],
            "icon": "NetworkObjects/gateway",
            "groups": [],
            "comments": "Europe Office gateway",
            "color": "black",
            "meta-info": {
                "lock": "unlocked",
                "validation-state": "ok",
                "last-modify-time": {
                    "posix": 1564475519055,
                    "iso-8601": "2019-07-30T08:31+0000"
                },
                "last-modifier": "admin",
                "creation-time": {
                    "posix": 1564475446693,
                    "iso-8601": "2019-07-30T08:30+0000"
                },
                "creator": "admin"
            },
            "read-only": true
        }, {
            "uid": "b69b4a9c-1386-4bb1-8057-926551cfcdad",
            "name": "HQgw",
            "type": "simple-gateway",
            "domain": {
                "uid": "41e821a0-3720-11e3-aa6e-0800200c9fde",
                "name": "SMC User",
                "domain-type": "domain"
            },
            "policy": {},
            "operating-system": "Gaia",
            "hardware": "15000 Appliances",
            "version": "R80.20",
            "ipv4-address": "192.0.2.200",
            "interfaces": [{
                "interface-name": "eth0",
                "ipv4-address": "192.0.2.200",
                "ipv4-network-mask": "255.255.255.0",
                "ipv4-mask-length": 24,
                "dynamic-ip": false,
                "topology": {
                    "leads-to-internet": true
                }
            }, {
                "interface-name": "eth1",
                "ipv4-address": "198.51.100.59",
                "ipv4-network-mask": "255.255.255.128",
                "ipv4-mask-length": 25,
                "dynamic-ip": false,
                "topology": {
                    "leads-to-internet": false,
                    "ip-address-behind-this-interface": "network defined by the interface ip and net mask",
                    "leads-to-dmz": false
                }
            }, {
                "interface-name": "eth2",
                "ipv4-address": "198.51.100.129",
                "ipv4-network-mask": "255.255.255.128",
                "ipv4-mask-length": 25,
                "dynamic-ip": false,
                "topology": {
                    "leads-to-internet": false,
                    "ip-address-behind-this-interface": "network defined by the interface ip and net mask",
                    "leads-to-dmz": false
                }
            }],
            "network-security-blades": {
                "firewall": true,
                "site-to-site-vpn": true,
                "application-control": true,
                "url-filtering": true,
                "anti-bot": true,
                "anti-virus": true,
                "ips": true,
                "threat-emulation": true
            },
            "management-blades": {},
            "vpn-encryption-domain": "addresses_behind_gw",
            "sic-status": "uninitialized",
            "tags": [],
            "icon": "NetworkObjects/gateway",
            "groups": [],
            "comments": "Main Office gateway",
            "color": "black",
            "meta-info": {
                "lock": "unlocked",
                "validation-state": "ok",
                "last-modify-time": {
                    "posix": 1564475520195,
                    "iso-8601": "2019-07-30T08:32+0000"
                },
                "last-modifier": "admin",
                "creation-time": {
                    "posix": 1564475451110,
                    "iso-8601": "2019-07-30T08:30+0000"
                },
                "creator": "admin"
            },
            "read-only": true
        }, {
            "uid": "e1fdc743-e9c8-df44-95bd-b842bcbac362",
            "name": "mgmt",
            "type": "CpmiHostCkp",
            "domain": {
                "uid": "41e821a0-3720-11e3-aa6e-0800200c9fde",
                "name": "SMC User",
                "domain-type": "domain"
            },
            "policy": {},
            "operating-system": "Gaia",
            "hardware": "Open server",
            "version": "R80.30",
            "ipv4-address": "10.0.47.9",
            "interfaces": [{
                "interface-name": "eth0",
                "ipv4-address": "10.0.206.200",
                "ipv4-network-mask": "255.255.0.0",
                "ipv4-mask-length": 16,
                "dynamic-ip": false,
                "topology": {
                    "leads-to-internet": true
                }
            }],
            "network-security-blades": {},
            "management-blades": {
                "network-policy-management": true,
                "endpoint-policy": true,
                "logging-and-status": true,
                "compliance": true,
                "smart-event-server": true,
                "smart-event-correlation": true
            },
            "sic-status": "communicating",
            "tags": [],
            "icon": "NetworkObjects/CheckPoint/Hosts/xHost_CP",
            "groups": [],
            "comments": "",
            "color": "black",
            "meta-info": {
                "lock": "unlocked",
                "validation-state": "ok",
                "last-modify-time": {
                    "posix": 1583533155127,
                    "iso-8601": "2020-03-06T22:19+0000"
                },
                "last-modifier": "System",
                "creation-time": {
                    "posix": 1564474330636,
                    "iso-8601": "2019-07-30T08:12+0000"
                },
                "creator": "System"
            },
            "read-only": true
        }, {
            "uid": "71ec8bfb-5924-4672-a207-0682e46285ad",
            "name": "Remote-1-gw",
            "type": "simple-gateway",
            "domain": {
                "uid": "41e821a0-3720-11e3-aa6e-0800200c9fde",
                "name": "SMC User",
                "domain-type": "domain"
            },
            "policy": {},
            "operating-system": "Gaia",
            "hardware": "5000 Appliances",
            "version": "R80.10",
            "ipv4-address": "192.0.22.1",
            "interfaces": [{
                "interface-name": "eth0",
                "ipv4-address": "192.0.22.1",
                "ipv4-network-mask": "255.255.255.0",
                "ipv4-mask-length": 24,
                "dynamic-ip": false,
                "topology": {
                    "leads-to-internet": true
                }
            }, {
                "interface-name": "eth1",
                "ipv4-address": "172.0.113.1",
                "ipv4-network-mask": "255.255.255.128",
                "ipv4-mask-length": 25,
                "dynamic-ip": false,
                "topology": {
                    "leads-to-internet": false,
                    "ip-address-behind-this-interface": "network defined by the interface ip and net mask",
                    "leads-to-dmz": false
                }
            }],
            "network-security-blades": {
                "firewall": true,
                "site-to-site-vpn": true,
                "application-control": true,
                "url-filtering": true,
                "anti-bot": true,
                "anti-virus": true,
                "ips": true,
                "threat-emulation": true
            },
            "management-blades": {},
            "vpn-encryption-domain": "addresses_behind_gw",
            "sic-status": "uninitialized",
            "tags": [],
            "icon": "NetworkObjects/gateway",
            "groups": [],
            "comments": "Remote-1-gw",
            "color": "black",
            "meta-info": {
                "lock": "unlocked",
                "validation-state": "ok",
                "last-modify-time": {
                    "posix": 1564475521156,
                    "iso-8601": "2019-07-30T08:32+0000"
                },
                "last-modifier": "admin",
                "creation-time": {
                    "posix": 1564475474542,
                    "iso-8601": "2019-07-30T08:31+0000"
                },
                "creator": "admin"
            },
            "read-only": true
        }, {
            "uid": "95201290-08b3-405f-a4ae-0785f76e8e4b",
            "name": "Remote-2-gw",
            "type": "simple-gateway",
            "domain": {
                "uid": "41e821a0-3720-11e3-aa6e-0800200c9fde",
                "name": "SMC User",
                "domain-type": "domain"
            },
            "policy": {},
            "operating-system": "SecurePlatform",
            "hardware": "5000 Appliances",
            "version": "R80.10",
            "ipv4-address": "192.0.23.1",
            "interfaces": [{
                "interface-name": "eth0",
                "ipv4-address": "192.0.3.1",
                "ipv4-network-mask": "255.255.255.0",
                "ipv4-mask-length": 24,
                "dynamic-ip": false,
                "topology": {
                    "leads-to-internet": true
                }
            }, {
                "interface-name": "eth1",
                "ipv4-address": "172.0.113.1",
                "ipv4-network-mask": "255.255.255.128",
                "ipv4-mask-length": 25,
                "dynamic-ip": false,
                "topology": {
                    "leads-to-internet": false,
                    "ip-address-behind-this-interface": "network defined by the interface ip and net mask",
                    "leads-to-dmz": false
                }
            }],
            "network-security-blades": {
                "firewall": true,
                "site-to-site-vpn": true,
                "application-control": true,
                "url-filtering": true,
                "anti-bot": true,
                "anti-virus": true,
                "ips": true,
                "threat-emulation": true
            },
            "management-blades": {},
            "vpn-encryption-domain": "addresses_behind_gw",
            "sic-status": "uninitialized",
            "tags": [],
            "icon": "NetworkObjects/gateway",
            "groups": [],
            "comments": "Remote-2-gw",
            "color": "black",
            "meta-info": {
                "lock": "unlocked",
                "validation-state": "ok",
                "last-modify-time": {
                    "posix": 1564475522660,
                    "iso-8601": "2019-07-30T08:32+0000"
                },
                "last-modifier": "admin",
                "creation-time": {
                    "posix": 1564475477515,
                    "iso-8601": "2019-07-30T08:31+0000"
                },
                "creator": "admin"
            },
            "read-only": true
        }, {
            "uid": "2c68301f-e1f9-4ce4-af46-8f4ded4a9fd2",
            "name": "Remote-3-gw",
            "type": "simple-gateway",
            "domain": {
                "uid": "41e821a0-3720-11e3-aa6e-0800200c9fde",
                "name": "SMC User",
                "domain-type": "domain"
            },
            "policy": {},
            "operating-system": "Gaia",
            "hardware": "5000 Appliances",
            "version": "R80.10",
            "ipv4-address": "192.0.24.1",
            "interfaces": [{
                "interface-name": "eth0",
                "ipv4-address": "192.0.4.1",
                "ipv4-network-mask": "255.255.255.0",
                "ipv4-mask-length": 24,
                "dynamic-ip": false,
                "topology": {
                    "leads-to-internet": true
                }
            }, {
                "interface-name": "eth1",
                "ipv4-address": "172.0.1.1",
                "ipv4-network-mask": "255.255.255.128",
                "ipv4-mask-length": 25,
                "dynamic-ip": false,
                "topology": {
                    "leads-to-internet": false,
                    "ip-address-behind-this-interface": "network defined by the interface ip and net mask",
                    "leads-to-dmz": false
                }
            }],
            "network-security-blades": {
                "firewall": true,
                "site-to-site-vpn": true,
                "application-control": true,
                "url-filtering": true,
                "anti-bot": true,
                "anti-virus": true,
                "ips": true,
                "threat-emulation": true
            },
            "management-blades": {},
            "vpn-encryption-domain": "addresses_behind_gw",
            "sic-status": "uninitialized",
            "tags": [],
            "icon": "NetworkObjects/gateway",
            "groups": [],
            "comments": "Remote-3-gw",
            "color": "black",
            "meta-info": {
                "lock": "unlocked",
                "validation-state": "ok",
                "last-modify-time": {
                    "posix": 1564475523670,
                    "iso-8601": "2019-07-30T08:32+0000"
                },
                "last-modifier": "admin",
                "creation-time": {
                    "posix": 1564475481461,
                    "iso-8601": "2019-07-30T08:31+0000"
                },
                "creator": "admin"
            },
            "read-only": true
        }, {
            "uid": "167c76ab-12d2-4e34-834a-00ea056289d3",
            "name": "Remote-4-gw",
            "type": "simple-gateway",
            "domain": {
                "uid": "41e821a0-3720-11e3-aa6e-0800200c9fde",
                "name": "SMC User",
                "domain-type": "domain"
            },
            "policy": {},
            "operating-system": "Gaia",
            "hardware": "5000 Appliances",
            "version": "R80.10",
            "ipv4-address": "192.0.25.1",
            "interfaces": [{
                "interface-name": "eth0",
                "ipv4-address": "192.0.5.1",
                "ipv4-network-mask": "255.255.255.0",
                "ipv4-mask-length": 24,
                "dynamic-ip": false,
                "topology": {
                    "leads-to-internet": true
                }
            }, {
                "interface-name": "eth1",
                "ipv4-address": "172.0.2.1",
                "ipv4-network-mask": "255.255.255.128",
                "ipv4-mask-length": 25,
                "dynamic-ip": false,
                "topology": {
                    "leads-to-internet": false,
                    "ip-address-behind-this-interface": "network defined by the interface ip and net mask",
                    "leads-to-dmz": false
                }
            }],
            "network-security-blades": {
                "firewall": true,
                "site-to-site-vpn": true,
                "application-control": true,
                "url-filtering": true,
                "anti-bot": true,
                "anti-virus": true,
                "ips": true,
                "threat-emulation": true
            },
            "management-blades": {},
            "vpn-encryption-domain": "addresses_behind_gw",
            "sic-status": "uninitialized",
            "tags": [],
            "icon": "NetworkObjects/gateway",
            "groups": [],
            "comments": "Remote-4-gw",
            "color": "black",
            "meta-info": {
                "lock": "unlocked",
                "validation-state": "ok",
                "last-modify-time": {
                    "posix": 1564475524851,
                    "iso-8601": "2019-07-30T08:32+0000"
                },
                "last-modifier": "admin",
                "creation-time": {
                    "posix": 1564475484661,
                    "iso-8601": "2019-07-30T08:31+0000"
                },
                "creator": "admin"
            },
            "read-only": true
        }, {
            "uid": "004b689b-797a-4212-b21c-8df4c8b992e3",
            "name": "Remote-5-gw",
            "type": "simple-gateway",
            "domain": {
                "uid": "41e821a0-3720-11e3-aa6e-0800200c9fde",
                "name": "SMC User",
                "domain-type": "domain"
            },
            "policy": {},
            "operating-system": "Gaia",
            "hardware": "5000 Appliances",
            "version": "R80.10",
            "ipv4-address": "192.0.26.1",
            "interfaces": [{
                "interface-name": "eth0",
                "ipv4-address": "192.0.6.1",
                "ipv4-network-mask": "255.255.255.0",
                "ipv4-mask-length": 24,
                "dynamic-ip": false,
                "topology": {
                    "leads-to-internet": true
                }
            }, {
                "interface-name": "eth1",
                "ipv4-address": "172.0.3.1",
                "ipv4-network-mask": "255.255.255.128",
                "ipv4-mask-length": 25,
                "dynamic-ip": false,
                "topology": {
                    "leads-to-internet": false,
                    "ip-address-behind-this-interface": "network defined by the interface ip and net mask",
                    "leads-to-dmz": false
                }
            }],
            "network-security-blades": {
                "firewall": true,
                "site-to-site-vpn": true,
                "application-control": true,
                "url-filtering": true,
                "anti-bot": true,
                "anti-virus": true,
                "ips": true,
                "threat-emulation": true
            },
            "management-blades": {},
            "vpn-encryption-domain": "addresses_behind_gw",
            "sic-status": "uninitialized",
            "tags": [],
            "icon": "NetworkObjects/gateway",
            "groups": [],
            "comments": "Remote-5-gw",
            "color": "black",
            "meta-info": {
                "lock": "unlocked",
                "validation-state": "ok",
                "last-modify-time": {
                    "posix": 1564475525748,
                    "iso-8601": "2019-07-30T08:32+0000"
                },
                "last-modifier": "admin",
                "creation-time": {
                    "posix": 1564475487603,
                    "iso-8601": "2019-07-30T08:31+0000"
                },
                "creator": "admin"
            },
            "read-only": true
        }, {
            "uid": "f6bb4929-a831-406a-93da-af6f95525437",
            "name": "RemoteBranchGw",
            "type": "simple-gateway",
            "domain": {
                "uid": "41e821a0-3720-11e3-aa6e-0800200c9fde",
                "name": "SMC User",
                "domain-type": "domain"
            },
            "policy": {},
            "operating-system": "Gaia",
            "hardware": "Open server",
            "version": "R77.30",
            "ipv4-address": "198.51.100.120",
            "interfaces": [{
                "interface-name": "eth0",
                "ipv4-address": "98.51.100.120",
                "ipv4-network-mask": "255.255.255.0",
                "ipv4-mask-length": 24,
                "dynamic-ip": false,
                "topology": {
                    "leads-to-internet": true
                }
            }, {
                "interface-name": "eth1",
                "ipv4-address": "172.0.113.112",
                "ipv4-network-mask": "255.255.255.128",
                "ipv4-mask-length": 25,
                "dynamic-ip": false,
                "topology": {
                    "leads-to-internet": false,
                    "ip-address-behind-this-interface": "network defined by the interface ip and net mask",
                    "leads-to-dmz": false
                }
            }],
            "network-security-blades": {
                "firewall": true,
                "ips": true
            },
            "management-blades": {},
            "vpn-encryption-domain": "addresses_behind_gw",
            "sic-status": "uninitialized",
            "tags": [],
            "icon": "NetworkObjects/gateway",
            "groups": [],
            "comments": "RemoteBranchGw",
            "color": "black",
            "meta-info": {
                "lock": "unlocked",
                "validation-state": "ok",
                "last-modify-time": {
                    "posix": 1564475526624,
                    "iso-8601": "2019-07-30T08:32+0000"
                },
                "last-modifier": "admin",
                "creation-time": {
                    "posix": 1564475466976,
                    "iso-8601": "2019-07-30T08:31+0000"
                },
                "creator": "admin"
            },
            "read-only": true
        }, {
            "uid": "37b07654-bc93-469a-9991-27a3b757e9aa",
            "name": "ThreatEmulationDevice",
            "type": "simple-gateway",
            "domain": {
                "uid": "41e821a0-3720-11e3-aa6e-0800200c9fde",
                "name": "SMC User",
                "domain-type": "domain"
            },
            "policy": {},
            "operating-system": "Gaia",
            "hardware": "TE Appliances",
            "version": "R80.20",
            "ipv4-address": "192.0.111.13",
            "interfaces": [{
                "interface-name": "eth0",
                "ipv4-address": "192.0.111.13",
                "ipv4-network-mask": "255.255.255.0",
                "ipv4-mask-length": 24,
                "dynamic-ip": false,
                "topology": {
                    "leads-to-internet": true
                }
            }, {
                "interface-name": "eth1",
                "ipv4-address": "172.0.1.113",
                "ipv4-network-mask": "255.255.255.128",
                "ipv4-mask-length": 25,
                "dynamic-ip": false,
                "topology": {
                    "leads-to-internet": false,
                    "ip-address-behind-this-interface": "network defined by the interface ip and net mask",
                    "leads-to-dmz": false
                }
            }],
            "network-security-blades": {
                "firewall": true,
                "threat-emulation": true
            },
            "management-blades": {},
            "vpn-encryption-domain": "addresses_behind_gw",
            "sic-status": "uninitialized",
            "tags": [],
            "icon": "NetworkObjects/gateway",
            "groups": [],
            "comments": "Threat Emulation",
            "color": "black",
            "meta-info": {
                "lock": "unlocked",
                "validation-state": "ok",
                "last-modify-time": {
                    "posix": 1564475528086,
                    "iso-8601": "2019-07-30T08:32+0000"
                },
                "last-modifier": "admin",
                "creation-time": {
                    "posix": 1564475470665,
                    "iso-8601": "2019-07-30T08:31+0000"
                },
                "creator": "admin"
            },
            "read-only": true
        }],
        "from": 1,
        "to": 12,
        "total": 12
    },
    "request": {
        "command": "show gateways-and-servers",
        "parameters": {
            "details-level": "full"
        }
    }
};
