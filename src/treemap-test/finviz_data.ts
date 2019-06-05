export interface TreeNode {
    name: string;
    size: number;
    children: TreeNode[];
}

export const FinvizMapData = {
    name: "Root", children: [{
        name: "Utilities",
        children: [{
            name: "Water Utilities",
            children: [{
                name: "AWK",
                description: "American Water Works Company, Inc.",
                x: 1181,
                y: 661,
                dx: 28,
                dy: 9
            }],
            x: 1180,
            y: 657,
            dx: 30,
            dy: 14
        }, {
            name: "Gas Utilities",
            children: [{
                name: "CNP",
                description: "CenterPoint Energy, Inc.",
                x: 1181,
                y: 646,
                dx: 28,
                dy: 10
            }, {name: "OKE", description: "ONEOK, Inc.", x: 1181, y: 623, dy: 23, dx: 28}],
            x: 1180,
            y: 619,
            dy: 38,
            dx: 30
        }, {
            name: "Diversified Utilities",
            children: [{name: "NI", description: "NiSource Inc.", x: 1170, y: 651, dy: 19, dx: 9}, {
                name: "NRG",
                description: "NRG Energy, Inc.",
                x: 1159,
                y: 651,
                dx: 11,
                dy: 19
            }, {name: "ES", description: "Eversource Energy", x: 1159, y: 631, dy: 20, dx: 20}, {
                name: "PEG",
                description: "Public Service Enterprise Group Incorporated",
                x: 1129,
                y: 652,
                dx: 30,
                dy: 18
            }, {name: "SRE", description: "Sempra Energy", x: 1129, y: 631, dx: 30, dy: 21}, {
                name: "EXC",
                description: "Exelon Corporation",
                x: 1107,
                y: 631,
                dx: 22,
                dy: 39
            }],
            x: 1106,
            y: 619,
            dx: 74,
            dy: 52
        }, {
            name: "Electric Utilities",
            children: [{name: "SCG", description: "SCANA Corporation", x: 1187, y: 613, dx: 22, dy: 5}, {
                name: "PNW",
                description: "Pinnacle West Capital Corporation",
                x: 1198,
                y: 592,
                dy: 21,
                dx: 11
            }, {name: "AES", description: "The AES Corporation", x: 1187, y: 592, dy: 21, dx: 11}, {
                name: "LNT",
                description: "Alliant Energy Corporation",
                x: 1187,
                y: 581,
                dy: 11,
                dx: 22
            }, {name: "CMS", description: "CMS Energy Corporation", x: 1167, y: 600, dx: 20, dy: 18}, {
                name: "AEE",
                description: "Ameren Corporation",
                x: 1167,
                y: 581,
                dx: 20,
                dy: 19
            }, {name: "ETR", description: "Entergy Corporation", x: 1189, y: 561, dy: 20, dx: 20}, {
                name: "FE",
                description: "FirstEnergy Corp.",
                x: 1167,
                y: 561,
                dy: 20,
                dx: 22
            }, {name: "DTE", description: "DTE Energy Company", x: 1140, y: 600, dx: 27, dy: 18}, {
                name: "PPL",
                description: "PPL Corporation",
                x: 1140,
                y: 581,
                dx: 27,
                dy: 19
            }, {name: "WEC", description: "WEC Energy Group, Inc.", x: 1140, y: 561, dx: 27, dy: 20}, {
                name: "EIX",
                description: "Edison International",
                x: 1186,
                y: 536,
                dy: 25,
                dx: 23
            }, {name: "PCG", description: "PG&E Corporation", x: 1164, y: 536, dy: 25, dx: 22}, {
                name: "XEL",
                description: "Xcel Energy Inc.",
                x: 1140,
                y: 536,
                dy: 25,
                dx: 24
            }, {name: "ED", description: "Consolidated Edison, Inc.", x: 1107, y: 598, dx: 33, dy: 20}, {
                name: "AEP",
                description: "American Electric Power Company, Inc.",
                x: 1107,
                y: 571,
                dx: 33,
                dy: 27
            }, {name: "D", description: "Dominion Energy, Inc.", x: 1107, y: 536, dx: 33, dy: 35}, {
                name: "SO",
                description: "The Southern Company",
                x: 1183,
                y: 490,
                dy: 46,
                dx: 26
            }, {name: "DUK", description: "Duke Energy Corporation", x: 1151, y: 490, dy: 46, dx: 32}, {
                name: "NEE",
                description: "NextEra Energy, Inc.",
                x: 1107,
                y: 490,
                dy: 46,
                dx: 44
            }],
            x: 1106,
            y: 478,
            dy: 141,
            dx: 104
        }],
        x: 1105,
        y: 463,
        dy: 209,
        dx: 106
    }, {
        name: "Industrial Goods",
        children: [{
            name: "General Contractors",
            children: [{name: "PWR", description: "Quanta Services, Inc.", x: 1095, y: 648, dy: 22, dx: 8}],
            x: 1094,
            y: 644,
            dy: 27,
            dx: 10
        }, {
            name: "Heavy Construction",
            children: [{name: "FLR", description: "Fluor Corporation", x: 1077, y: 663, dx: 16, dy: 7}],
            x: 1076,
            y: 659,
            dx: 18,
            dy: 12
        }, {
            name: "Small Tools & Accessories",
            children: [{name: "SNA", description: "Snap-on Incorporated", x: 1077, y: 648, dx: 16, dy: 10}],
            x: 1076,
            y: 644,
            dx: 18,
            dy: 15
        }, {
            name: "Machine Tools & Accessories",
            children: [{name: "SWK", description: "Stanley Black & Decker, Inc.", x: 1077, y: 626, dx: 26, dy: 17}],
            x: 1076,
            y: 622,
            dy: 22,
            dx: 28
        }, {
            name: "Lumber, Wood Production",
            children: [{name: "WY", description: "Weyerhaeuser Company", x: 1044, y: 652, dx: 31, dy: 18}],
            x: 1043,
            y: 648,
            dx: 33,
            dy: 23
        }, {
            name: "Industrial Equipment & Components",
            children: [{name: "PNR", description: "Pentair plc", x: 1067, y: 626, dy: 21, dx: 8}, {
                name: "PH",
                description: "Parker-Hannifin Corporation",
                x: 1044,
                y: 626,
                dx: 23,
                dy: 21
            }],
            x: 1043,
            y: 622,
            dx: 33,
            dy: 26
        }, {
            name: "General Building Materials",
            children: [{name: "MAS", description: "Masco Corporation", x: 1074, y: 611, dx: 29, dy: 10}, {
                name: "MLM",
                description: "Martin Marietta Materials, Inc.",
                x: 1089,
                y: 586,
                dy: 25,
                dx: 14
            }, {name: "VMC", description: "Vulcan Materials Company", x: 1074, y: 586, dy: 25, dx: 15}],
            x: 1073,
            y: 582,
            dy: 40,
            dx: 31
        }, {
            name: "Residential Construction",
            children: [{name: "PHM", description: "PulteGroup, Inc.", x: 1044, y: 614, dx: 28, dy: 7}, {
                name: "LEN",
                description: "Lennar Corporation",
                x: 1058,
                y: 586,
                dy: 28,
                dx: 14
            }, {name: "DHI", description: "D.R. Horton, Inc.", x: 1044, y: 586, dy: 28, dx: 14}],
            x: 1043,
            y: 582,
            dy: 40,
            dx: 30
        }, {
            name: "Industrial Electrical Equipment",
            children: [{
                name: "AOS",
                description: "A. O. Smith Corporation",
                x: 1035,
                y: 636,
                dy: 34,
                dx: 7
            }, {name: "EMR", description: "Emerson Electric Co.", x: 1004, y: 636, dx: 31, dy: 34}],
            x: 1003,
            y: 632,
            dx: 40,
            dy: 39
        }, {
            name: "Waste Management",
            children: [{name: "SRCL", description: "Stericycle, Inc.", x: 1034, y: 611, dy: 20, dx: 8}, {
                name: "RSG",
                description: "Republic Services, Inc.",
                x: 1004,
                y: 611,
                dx: 30,
                dy: 20
            }, {name: "WM", description: "Waste Management, Inc.", x: 1004, y: 586, dy: 25, dx: 38}],
            x: 1003,
            y: 582,
            dx: 40,
            dy: 50
        }, {
            name: "Aerospace/Defense - Major Diversified",
            children: [{name: "TXT", description: "Textron Inc.", x: 986, y: 652, dy: 18, dx: 16}, {
                name: "NOC",
                description: "Northrop Grumman Corporation",
                x: 939,
                y: 652,
                dx: 47,
                dy: 18
            }],
            x: 938,
            y: 640,
            dx: 65,
            dy: 31
        }, {
            name: "Farm & Construction Machinery",
            children: [{name: "DE", description: "Deere & Company", x: 979, y: 594, dy: 45, dx: 23}, {
                name: "CAT",
                description: "Caterpillar Inc.",
                x: 939,
                y: 594,
                dx: 40,
                dy: 45
            }],
            x: 938,
            y: 582,
            dx: 65,
            dy: 58
        }, {
            name: "Aerospace/Defense Products & Services",
            children: [{
                name: "HII",
                description: "Huntington Ingalls Industries, Inc.",
                x: 1082,
                y: 567,
                dx: 21,
                dy: 14
            }, {name: "LLL", description: "L3 Technologies, Inc.", x: 1082, y: 547, dy: 20, dx: 21}, {
                name: "TDG",
                description: "Transdigm Group Incorporated Tr",
                x: 1051,
                y: 565,
                dx: 31,
                dy: 16
            }, {name: "COL", description: "Rockwell Collins, Inc.", x: 1051, y: 547, dx: 31, dy: 18}, {
                name: "RTN",
                description: "Raytheon Company",
                x: 1051,
                y: 519,
                dy: 28,
                dx: 52
            }, {name: "GD", description: "General Dynamics Corporation", x: 1051, y: 490, dy: 29, dx: 52}, {
                name: "LMT",
                description: "Lockheed Martin Corporation",
                x: 996,
                y: 539,
                dx: 55,
                dy: 42
            }, {
                name: "UTX",
                description: "United Technologies Corporation",
                x: 996,
                y: 490,
                dx: 55,
                dy: 49
            }, {name: "BA", description: "The Boeing Company", x: 939, y: 490, dx: 57, dy: 91}],
            x: 938,
            y: 478,
            dy: 104,
            dx: 166
        }, {
            name: "Diversified Machinery",
            children: [{
                name: "FLS",
                description: "Flowserve Corporation",
                x: 925,
                y: 654,
                dy: 16,
                dx: 12
            }, {name: "DOV", description: "Dover Corporation", x: 904, y: 654, dx: 21, dy: 16}, {
                name: "XYL",
                description: "Xylem Inc.",
                x: 923,
                y: 629,
                dy: 25,
                dx: 14
            }, {name: "AME", description: "AMETEK, Inc.", x: 904, y: 629, dy: 25, dx: 19}, {
                name: "CMI",
                description: "Cummins Inc.",
                x: 874,
                y: 650,
                dx: 30,
                dy: 20
            }, {name: "ROK", description: "Rockwell Automation Inc.", x: 874, y: 629, dx: 30, dy: 21}, {
                name: "IR",
                description: "Ingersoll-Rand Plc",
                x: 910,
                y: 606,
                dy: 23,
                dx: 27
            }, {name: "ROP", description: "Roper Technologies, Inc.", x: 874, y: 606, dy: 23, dx: 36}, {
                name: "ETN",
                description: "Eaton Corporation plc",
                x: 839,
                y: 642,
                dx: 35,
                dy: 28
            }, {name: "ITW", description: "Illinois Tool Works Inc.", x: 839, y: 606, dx: 35, dy: 36}, {
                name: "DHR",
                description: "Danaher Corporation",
                x: 899,
                y: 555,
                dy: 51,
                dx: 38
            }, {name: "GE", description: "General Electric Company", x: 839, y: 555, dy: 51, dx: 60}, {
                name: "HON",
                description: "Honeywell International Inc.",
                x: 889,
                y: 490,
                dy: 65,
                dx: 48
            }, {name: "MMM", description: "3M Company", x: 839, y: 490, dy: 65, dx: 50}],
            x: 838,
            y: 478,
            dx: 100,
            dy: 193
        }],
        x: 837,
        y: 463,
        dx: 268,
        dy: 209
    }, {
        name: "Healthcare",
        children: [{
            name: "Drug Related Products",
            children: [{name: "PRGO", description: "Perrigo Company plc", x: 1191, y: 457, dx: 18, dy: 4}],
            x: 1190,
            y: 453,
            dx: 20,
            dy: 9
        }, {
            name: "Specialized Health Services",
            children: [{name: "DVA", description: "DaVita Inc.", x: 1191, y: 439, dx: 18, dy: 13}],
            x: 1190,
            y: 435,
            dy: 18,
            dx: 20
        }, {
            name: "Diagnostic Substances",
            children: [{name: "IDXX", description: "IDEXX Laboratories, Inc.", x: 1167, y: 439, dy: 22, dx: 22}],
            x: 1166,
            y: 435,
            dx: 24,
            dy: 27
        }, {
            name: "Hospitals",
            children: [{
                name: "UHS",
                description: "Universal Health Services, Inc.",
                x: 1200,
                y: 411,
                dy: 23,
                dx: 9
            }, {name: "HCA", description: "HCA Healthcare, Inc.", x: 1167, y: 411, dx: 33, dy: 23}],
            x: 1166,
            y: 399,
            dy: 36,
            dx: 44
        }, {
            name: "Drugs - Generic",
            children: [{name: "MYL", description: "Mylan N.V.", x: 1137, y: 446, dx: 28, dy: 15}, {
                name: "ZTS",
                description: "Zoetis Inc.",
                x: 1137,
                y: 411,
                dy: 35,
                dx: 28
            }, {name: "AGN", description: "Allergan plc", x: 1108, y: 411, dx: 29, dy: 50}],
            x: 1107,
            y: 399,
            dx: 59,
            dy: 63
        }, {
            name: "Medical Laboratories & Research",
            children: [{name: "PKI", description: "PerkinElmer, Inc.", x: 1201, y: 376, dy: 22, dx: 8}, {
                name: "DGX",
                description: "Quest Diagnostics Incorporated",
                x: 1186,
                y: 376,
                dx: 15,
                dy: 22
            }, {
                name: "LH",
                description: "Laboratory Corporation of America Holdings",
                x: 1186,
                y: 358,
                dy: 18,
                dx: 23
            }, {name: "A", description: "Agilent Technologies, Inc.", x: 1160, y: 380, dx: 26, dy: 18}, {
                name: "IQV",
                description: "IQVIA Holdings Inc.",
                x: 1160,
                y: 358,
                dx: 26,
                dy: 22
            }, {name: "TMO", description: "Thermo Fisher Scientific Inc.", x: 1108, y: 358, dx: 52, dy: 40}],
            x: 1107,
            y: 346,
            dy: 53,
            dx: 103
        }, {
            name: "Medical Instruments & Supplies",
            children: [{
                name: "XRAY",
                description: "DENTSPLY SIRONA Inc.",
                x: 1091,
                y: 438,
                dy: 23,
                dx: 15
            }, {
                name: "VAR",
                description: "Varian Medical Systems, Inc.",
                x: 1079,
                y: 438,
                dx: 12,
                dy: 23
            }, {name: "HOLX", description: "Hologic, Inc.", x: 1066, y: 438, dx: 13, dy: 23}, {
                name: "COO",
                description: "The Cooper Companies, Inc.",
                x: 1088,
                y: 420,
                dy: 18,
                dx: 18
            }, {name: "WAT", description: "Waters Corporation", x: 1066, y: 420, dy: 18, dx: 22}, {
                name: "MTD",
                description: "Mettler-Toledo International Inc.",
                x: 1086,
                y: 400,
                dy: 20,
                dx: 20
            }, {name: "RMD", description: "ResMed Inc.", x: 1066, y: 400, dy: 20, dx: 20}, {
                name: "BAX",
                description: "Baxter International Inc.",
                x: 1027,
                y: 433,
                dx: 39,
                dy: 28
            }, {name: "ILMN", description: "Illumina, Inc.", x: 1027, y: 400, dx: 39, dy: 33}, {
                name: "ISRG",
                description: "Intuitive Surgical, Inc.",
                x: 1069,
                y: 358,
                dy: 42,
                dx: 37
            }, {name: "BDX", description: "Becton, Dickinson and Company", x: 1027, y: 358, dy: 42, dx: 42}],
            x: 1026,
            y: 346,
            dx: 81,
            dy: 116
        }, {
            name: "Medical Appliances & Equipment",
            children: [{name: "ABMD", description: "ABIOMED, Inc.", x: 1168, y: 333, dx: 41, dy: 12}, {
                name: "ZBH",
                description: "Zimmer Biomet Holdings, Inc.",
                x: 1190,
                y: 296,
                dy: 37,
                dx: 19
            }, {name: "ALGN", description: "Align Technology, Inc.", x: 1168, y: 296, dy: 37, dx: 22}, {
                name: "EW",
                description: "Edwards Lifesciences Corporation",
                x: 1168,
                y: 275,
                dy: 21,
                dx: 41
            }, {
                name: "BSX",
                description: "Boston Scientific Corporation",
                x: 1126,
                y: 314,
                dx: 42,
                dy: 31
            }, {name: "SYK", description: "Stryker Corporation", x: 1126, y: 275, dx: 42, dy: 39}, {
                name: "ABT",
                description: "Abbott Laboratories",
                x: 1169,
                y: 199,
                dy: 76,
                dx: 40
            }, {name: "MDT", description: "Medtronic plc", x: 1126, y: 199, dy: 76, dx: 43}],
            x: 1125,
            y: 187,
            dy: 159,
            dx: 85
        }, {
            name: "Biotechnology",
            children: [{
                name: "NKTR",
                description: "Nektar Therapeutics",
                x: 1107,
                y: 332,
                dx: 17,
                dy: 13
            }, {name: "INCY", description: "Incyte Corporation", x: 1077, y: 332, dx: 30, dy: 13}, {
                name: "ALXN",
                description: "Alexion Pharmaceuticals, Inc.",
                x: 1103,
                y: 291,
                dy: 41,
                dx: 21
            }, {
                name: "REGN",
                description: "Regeneron Pharmaceuticals, Inc.",
                x: 1077,
                y: 291,
                dy: 41,
                dx: 26
            }, {
                name: "VRTX",
                description: "Vertex Pharmaceuticals Incorporated",
                x: 1077,
                y: 264,
                dy: 27,
                dx: 47
            }, {name: "CELG", description: "Celgene Corporation", x: 1027, y: 308, dx: 50, dy: 37}, {
                name: "BIIB",
                description: "Biogen Inc.",
                x: 1027,
                y: 264,
                dx: 50,
                dy: 44
            }, {name: "GILD", description: "Gilead Sciences, Inc.", x: 1081, y: 199, dy: 65, dx: 43}, {
                name: "AMGN",
                description: "Amgen Inc.",
                x: 1027,
                y: 199,
                dy: 65,
                dx: 54
            }],
            x: 1026,
            y: 187,
            dy: 159,
            dx: 99
        }, {
            name: "Health Care Plans",
            children: [{name: "CNC", description: "Centene Corporation", x: 985, y: 447, dx: 40, dy: 14}, {
                name: "ESRX",
                description: "Express Scripts Holding Company",
                x: 985,
                y: 420,
                dy: 27,
                dx: 40
            }, {name: "HUM", description: "Humana Inc.", x: 957, y: 420, dx: 28, dy: 41}, {
                name: "CI",
                description: "Cigna Corporation",
                x: 996,
                y: 380,
                dy: 40,
                dx: 29
            }, {name: "AET", description: "Aetna Inc.", x: 957, y: 380, dy: 40, dx: 39}, {
                name: "ANTM",
                description: "Anthem, Inc.",
                x: 916,
                y: 421,
                dx: 41,
                dy: 40
            }, {name: "CVS", description: "CVS Health Corporation", x: 916, y: 380, dx: 41, dy: 41}, {
                name: "UNH",
                description: "UnitedHealth Group Incorporated",
                x: 839,
                y: 380,
                dx: 77,
                dy: 81
            }],
            x: 838,
            y: 368,
            dx: 188,
            dy: 94
        }, {
            name: "Drug Manufacturers - Major",
            children: [{
                name: "BMY",
                description: "Bristol-Myers Squibb Company",
                x: 983,
                y: 303,
                dy: 64,
                dx: 42
            }, {name: "LLY", description: "Eli Lilly and Company", x: 937, y: 303, dx: 46, dy: 64}, {
                name: "ABBV",
                description: "AbbVie Inc.",
                x: 937,
                y: 255,
                dy: 48,
                dx: 88
            }, {name: "MRK", description: "Merck & Co., Inc.", x: 937, y: 199, dy: 56, dx: 88}, {
                name: "PFE",
                description: "Pfizer Inc.",
                x: 839,
                y: 299,
                dx: 98,
                dy: 68
            }, {name: "JNJ", description: "Johnson & Johnson", x: 839, y: 199, dx: 98, dy: 100}],
            x: 838,
            y: 187,
            dx: 188,
            dy: 181
        }],
        x: 837,
        y: 172,
        dy: 291,
        dx: 374
    }, {
        name: "Basic Materials",
        children: [{
            name: "Aluminum",
            children: [{name: "AA", description: "Alcoa Corporation", x: 1190, y: 164, dx: 19, dy: 6}],
            x: 1189,
            y: 160,
            dx: 21,
            dy: 11
        }, {
            name: "Gold",
            children: [{name: "NEM", description: "Newmont Mining Corporation", x: 1190, y: 137, dy: 22, dx: 19}],
            x: 1189,
            y: 133,
            dy: 27,
            dx: 21
        }, {
            name: "Steel & Iron",
            children: [{name: "NUE", description: "Nucor Corporation", x: 1158, y: 156, dx: 30, dy: 14}],
            x: 1157,
            y: 152,
            dx: 32,
            dy: 19
        }, {
            name: "Agricultural Chemicals",
            children: [{
                name: "CF",
                description: "CF Industries Holdings, Inc.",
                x: 1174,
                y: 137,
                dy: 14,
                dx: 14
            }, {name: "MOS", description: "The Mosaic Company", x: 1158, y: 137, dx: 16, dy: 14}],
            x: 1157,
            y: 133,
            dx: 32,
            dy: 19
        }, {
            name: "Copper",
            children: [{name: "FCX", description: "Freeport-McMoRan Inc.", x: 1188, y: 108, dy: 24, dx: 21}],
            x: 1187,
            y: 104,
            dy: 29,
            dx: 23
        }, {
            name: "Oil & Gas Drilling & Exploration",
            children: [{
                name: "DO",
                description: "Diamond Offshore Drilling, Inc.",
                x: 1178,
                y: 126,
                dx: 8,
                dy: 6
            }, {name: "HP", description: "Helmerich & Payne, Inc.", x: 1178, y: 108, dy: 18, dx: 8}, {
                name: "CXO",
                description: "Concho Resources Inc.",
                x: 1158,
                y: 108,
                dx: 20,
                dy: 24
            }],
            x: 1157,
            y: 104,
            dy: 29,
            dx: 30
        }, {
            name: "Oil & Gas Pipelines",
            children: [{
                name: "WMB",
                description: "The Williams Companies, Inc.",
                x: 1189,
                y: 81,
                dy: 22,
                dx: 20
            }, {name: "KMI", description: "Kinder Morgan, Inc.", x: 1158, y: 81, dx: 31, dy: 22}],
            x: 1157,
            y: 69,
            dy: 35,
            dx: 53
        }, {
            name: "Oil & Gas Refining & Marketing",
            children: [{
                name: "HFC",
                description: "HollyFrontier Corporation",
                x: 1133,
                y: 158,
                dx: 23,
                dy: 12
            }, {name: "ANDV", description: "Andeavor", x: 1133, y: 134, dy: 24, dx: 23}, {
                name: "MPC",
                description: "Marathon Petroleum Corporation",
                x: 1107,
                y: 134,
                dx: 26,
                dy: 36
            }, {name: "VLO", description: "Valero Energy Corporation", x: 1107, y: 109, dy: 25, dx: 49}, {
                name: "PSX",
                description: "Phillips 66",
                x: 1107,
                y: 81,
                dy: 28,
                dx: 49
            }],
            x: 1106,
            y: 69,
            dx: 51,
            dy: 102
        }, {
            name: "Oil & Gas Equipment & Services",
            children: [{name: "FTI", description: "TechnipFMC plc", x: 1192, y: 48, dy: 20, dx: 17}, {
                name: "NOV",
                description: "National Oilwell Varco, Inc.",
                x: 1192,
                y: 27,
                dy: 21,
                dx: 17
            }, {name: "BHGE", description: "Baker Hughes, a GE company", x: 1154, y: 48, dx: 38, dy: 20}, {
                name: "HAL",
                description: "Halliburton Company",
                x: 1154,
                y: 27,
                dx: 38,
                dy: 21
            }, {name: "SLB", description: "Schlumberger Limited", x: 1107, y: 27, dx: 47, dy: 41}],
            x: 1106,
            y: 15,
            dy: 54,
            dx: 104
        }, {
            name: "Chemicals - Major Diversified",
            children: [{name: "FMC", description: "FMC Corporation", x: 1083, y: 159, dx: 22, dy: 11}, {
                name: "EMN",
                description: "Eastman Chemical Company",
                x: 1083,
                y: 143,
                dy: 16,
                dx: 22
            }, {
                name: "APD",
                description: "Air Products and Chemicals, Inc.",
                x: 1083,
                y: 105,
                dy: 38,
                dx: 22
            }, {name: "DWDP", description: "DowDuPont Inc.", x: 1026, y: 105, dx: 57, dy: 65}],
            x: 1025,
            y: 93,
            dx: 81,
            dy: 78
        }, {
            name: "Specialty Chemicals",
            children: [{
                name: "ALB",
                description: "Albemarle Corporation",
                x: 1086,
                y: 82,
                dx: 19,
                dy: 10
            }, {
                name: "IFF",
                description: "International Flavors & Fragrances Inc.",
                x: 1086,
                y: 69,
                dy: 13,
                dx: 19
            }, {name: "PPG", description: "PPG Industries, Inc.", x: 1059, y: 69, dx: 27, dy: 23}, {
                name: "SHW",
                description: "The Sherwin-Williams Company",
                x: 1082,
                y: 27,
                dy: 42,
                dx: 23
            }, {name: "ECL", description: "Ecolab Inc.", x: 1059, y: 27, dy: 42, dx: 23}, {
                name: "LYB",
                description: "LyondellBasell Industries N.V.",
                x: 1026,
                y: 61,
                dx: 33,
                dy: 31
            }, {name: "PX", description: "Praxair, Inc.", x: 1026, y: 27, dx: 33, dy: 34}],
            x: 1025,
            y: 15,
            dx: 81,
            dy: 78
        }, {
            name: "Independent Oil & Gas",
            children: [{
                name: "SWN",
                description: "Southwestern Energy Company",
                x: 1010,
                y: 165,
                dx: 14,
                dy: 5
            }, {
                name: "NFX",
                description: "Newfield Exploration Company",
                x: 1010,
                y: 154,
                dy: 11,
                dx: 14
            }, {name: "XEC", description: "Cimarex Energy Co.", x: 995, y: 154, dx: 15, dy: 16}, {
                name: "COG",
                description: "Cabot Oil & Gas Corporation",
                x: 1011,
                y: 131,
                dy: 23,
                dx: 13
            }, {name: "EQT", description: "EQT Corporation", x: 995, y: 131, dy: 23, dx: 16}, {
                name: "NBL",
                description: "Noble Energy, Inc.",
                x: 972,
                y: 150,
                dx: 23,
                dy: 20
            }, {name: "APA", description: "Apache Corporation", x: 972, y: 131, dx: 23, dy: 19}, {
                name: "MRO",
                description: "Marathon Oil Corporation",
                x: 999,
                y: 112,
                dy: 19,
                dx: 25
            }, {name: "HES", description: "Hess Corporation", x: 972, y: 112, dy: 19, dx: 27}, {
                name: "DVN",
                description: "Devon Energy Corporation",
                x: 947,
                y: 145,
                dx: 25,
                dy: 25
            }, {
                name: "PXD",
                description: "Pioneer Natural Resources Company",
                x: 947,
                y: 112,
                dx: 25,
                dy: 33
            }, {
                name: "APC",
                description: "Anadarko Petroleum Corporation",
                x: 997,
                y: 79,
                dy: 33,
                dx: 27
            }, {
                name: "OXY",
                description: "Occidental Petroleum Corporation",
                x: 947,
                y: 79,
                dy: 33,
                dx: 50
            }, {name: "EOG", description: "EOG Resources, Inc.", x: 989, y: 27, dy: 52, dx: 35}, {
                name: "COP",
                description: "ConocoPhillips",
                x: 947,
                y: 27,
                dy: 52,
                dx: 42
            }],
            x: 946,
            y: 15,
            dx: 79,
            dy: 156
        }, {
            name: "Major Integrated Oil & Gas",
            children: [{name: "CVX", description: "Chevron Corporation", x: 839, y: 112, dx: 106, dy: 58}, {
                name: "XOM",
                description: "Exxon Mobil Corporation",
                x: 839,
                y: 27,
                dy: 85,
                dx: 106
            }],
            x: 838,
            y: 15,
            dx: 108,
            dy: 156
        }],
        x: 837,
        y: 0,
        dy: 172,
        dx: 374
    }, {
        name: "Consumer Goods",
        children: [{
            name: "Rubber & Plastics",
            children: [{name: "GT", description: "The Goodyear Tire & Rubber Company", x: 819, y: 667, dx: 16, dy: 3}],
            x: 818,
            y: 663,
            dx: 18,
            dy: 8
        }, {
            name: "Recreational Vehicles",
            children: [{name: "HOG", description: "Harley-Davidson, Inc.", x: 819, y: 655, dx: 16, dy: 7}],
            x: 818,
            y: 651,
            dy: 12,
            dx: 18
        }, {
            name: "Appliances",
            children: [{name: "WHR", description: "Whirlpool Corporation", x: 806, y: 655, dy: 15, dx: 11}],
            x: 805,
            y: 651,
            dx: 13,
            dy: 20
        }, {
            name: "Business Equipment",
            children: [{name: "AVY", description: "Avery Dennison Corporation", x: 823, y: 632, dy: 18, dx: 12}],
            x: 822,
            y: 628,
            dy: 23,
            dx: 14
        }, {
            name: "Cleaning Products",
            children: [{name: "CHD", description: "Church & Dwight Co., Inc.", x: 806, y: 632, dy: 18, dx: 15}],
            x: 805,
            y: 628,
            dy: 23,
            dx: 17
        }, {
            name: "Beverages - Brewers",
            children: [{name: "TAP", description: "Molson Coors Brewing Company", x: 783, y: 656, dx: 21, dy: 14}],
            x: 782,
            y: 652,
            dx: 23,
            dy: 19
        }, {
            name: "Toys & Games",
            children: [{name: "MAT", description: "Mattel, Inc.", x: 798, y: 632, dy: 19, dx: 6}, {
                name: "HAS",
                description: "Hasbro, Inc.",
                x: 783,
                y: 632,
                dx: 15,
                dy: 19
            }],
            x: 782,
            y: 628,
            dx: 23,
            dy: 24
        }, {
            name: "Trucks & Other Vehicles",
            children: [{name: "PCAR", description: "PACCAR Inc", x: 813, y: 605, dy: 22, dx: 22}],
            x: 812,
            y: 601,
            dy: 27,
            dx: 24
        }, {
            name: "Farm Products",
            children: [{name: "ADM", description: "Archer-Daniels-Midland Company", x: 783, y: 605, dx: 28, dy: 22}],
            x: 782,
            y: 601,
            dy: 27,
            dx: 30
        }, {
            name: "Housewares & Accessories",
            children: [{name: "NWL", description: "Newell Brands Inc.", x: 757, y: 657, dx: 24, dy: 13}, {
                name: "CLX",
                description: "The Clorox Company",
                x: 757,
                y: 640,
                dy: 17,
                dx: 24
            }],
            x: 756,
            y: 636,
            dx: 26,
            dy: 35
        }, {
            name: "Home Furnishings & Fixtures",
            children: [{
                name: "LEG",
                description: "Leggett & Platt, Incorporated",
                x: 771,
                y: 622,
                dy: 13,
                dx: 10
            }, {
                name: "FBHS",
                description: "Fortune Brands Home & Security, Inc.",
                x: 757,
                y: 622,
                dx: 14,
                dy: 13
            }, {name: "MHK", description: "Mohawk Industries, Inc.", x: 757, y: 605, dy: 17, dx: 24}],
            x: 756,
            y: 601,
            dx: 26,
            dy: 35
        }, {
            name: "Meat Products",
            children: [{
                name: "HRL",
                description: "Hormel Foods Corporation",
                x: 737,
                y: 655,
                dx: 18,
                dy: 15
            }, {name: "TSN", description: "Tyson Foods, Inc.", x: 716, y: 655, dx: 21, dy: 15}],
            x: 715,
            y: 643,
            dx: 41,
            dy: 28
        }, {
            name: "Auto Parts",
            children: [{
                name: "DLPH",
                description: "Delphi Technologies PLC",
                x: 739,
                y: 636,
                dx: 16,
                dy: 6
            }, {name: "BWA", description: "BorgWarner Inc.", x: 739, y: 625, dy: 11, dx: 16}, {
                name: "LKQ",
                description: "LKQ Corporation",
                x: 739,
                y: 613,
                dy: 12,
                dx: 16
            }, {name: "JCI", description: "Johnson Controls International plc", x: 716, y: 613, dx: 23, dy: 29}],
            x: 715,
            y: 601,
            dx: 41,
            dy: 42
        }, {
            name: "Beverages - Wineries & Distillers",
            children: [{
                name: "BF-B",
                description: "Brown-Forman Corporation",
                x: 798,
                y: 582,
                dx: 37,
                dy: 18
            }, {name: "STZ", description: "Constellation Brands, Inc.", x: 798, y: 553, dy: 29, dx: 37}],
            x: 797,
            y: 549,
            dy: 52,
            dx: 39
        }, {
            name: "Food - Major Diversified",
            children: [{name: "KHC", description: "The Kraft Heinz Company", x: 757, y: 561, dy: 39, dx: 39}],
            x: 756,
            y: 549,
            dy: 52,
            dx: 41
        }, {
            name: "Packaging & Containers",
            children: [{name: "OI", description: "Owens-Illinois, Inc.", x: 743, y: 594, dx: 12, dy: 6}, {
                name: "SEE",
                description: "Sealed Air Corporation",
                x: 743,
                y: 581,
                dy: 13,
                dx: 12
            }, {
                name: "PKG",
                description: "Packaging Corporation of America",
                x: 731,
                y: 581,
                dx: 12,
                dy: 19
            }, {name: "BLL", description: "Ball Corporation", x: 716, y: 581, dx: 15, dy: 19}, {
                name: "WRK",
                description: "WestRock Company",
                x: 739,
                y: 561,
                dy: 20,
                dx: 16
            }, {name: "IP", description: "International Paper Company", x: 716, y: 561, dy: 20, dx: 23}],
            x: 715,
            y: 549,
            dy: 52,
            dx: 41
        }, {
            name: "Confectioners",
            children: [{name: "HSY", description: "The Hershey Company", x: 821, y: 520, dy: 28, dx: 14}, {
                name: "MDLZ",
                description: "Mondelez International, Inc.",
                x: 777,
                y: 520,
                dx: 44,
                dy: 28
            }],
            x: 776,
            y: 508,
            dy: 41,
            dx: 60
        }, {
            name: "Textile - Apparel Clothing",
            children: [{name: "HBI", description: "Hanesbrands Inc.", x: 768, y: 532, dy: 16, dx: 7}, {
                name: "UAA",
                description: "Under Armour, Inc.",
                x: 758,
                y: 532,
                dx: 10,
                dy: 16
            }, {
                name: "KORS",
                description: "Michael Kors Holdings Limited",
                x: 758,
                y: 520,
                dy: 12,
                dx: 17
            }, {name: "RL", description: "Ralph Lauren Corporation", x: 742, y: 535, dx: 16, dy: 13}, {
                name: "PVH",
                description: "PVH Corp.",
                x: 742,
                y: 520,
                dx: 16,
                dy: 15
            }, {name: "VFC", description: "V.F. Corporation", x: 716, y: 520, dx: 26, dy: 28}],
            x: 715,
            y: 508,
            dy: 41,
            dx: 61
        }, {
            name: "Auto Manufacturers - Major",
            children: [{name: "F", description: "Ford Motor Company", x: 687, y: 638, dy: 32, dx: 27}, {
                name: "GM",
                description: "General Motors Company",
                x: 653,
                y: 638,
                dx: 34,
                dy: 32
            }],
            x: 652,
            y: 626,
            dx: 63,
            dy: 45
        }, {
            name: "Processed & Packaged Goods",
            children: [{
                name: "CPB",
                description: "Campbell Soup Company",
                x: 698,
                y: 609,
                dy: 16,
                dx: 16
            }, {name: "SJM", description: "The J. M. Smucker Company", x: 682, y: 609, dx: 16, dy: 16}, {
                name: "CAG",
                description: "Conagra Brands, Inc.",
                x: 698,
                y: 589,
                dy: 20,
                dx: 16
            }, {
                name: "MKC",
                description: "McCormick & Company, Incorporated",
                x: 682,
                y: 589,
                dy: 20,
                dx: 16
            }, {name: "K", description: "Kellogg Company", x: 653, y: 608, dx: 29, dy: 17}, {
                name: "GIS",
                description: "General Mills, Inc.",
                x: 653,
                y: 589,
                dx: 29,
                dy: 19
            }],
            x: 652,
            y: 577,
            dx: 63,
            dy: 49
        }, {
            name: "Textile - Apparel Footwear & Accessories",
            children: [{name: "FOSL", description: "Fossil Group, Inc.", x: 705, y: 570, dx: 9, dy: 6}, {
                name: "FL",
                description: "Foot Locker, Inc.",
                x: 705,
                y: 555,
                dy: 15,
                dx: 9
            }, {name: "TPR", description: "Tapestry, Inc.", x: 705, y: 520, dy: 35, dx: 9}, {
                name: "NKE",
                description: "NIKE, Inc.",
                x: 653,
                y: 520,
                dx: 52,
                dy: 56
            }],
            x: 652,
            y: 508,
            dx: 63,
            dy: 69
        }, {
            name: "Cigarettes",
            children: [{name: "MO", description: "Altria Group, Inc.", x: 762, y: 469, dx: 73, dy: 38}, {
                name: "PM",
                description: "Philip Morris International Inc.",
                x: 762,
                y: 424,
                dy: 45,
                dx: 73
            }],
            x: 761,
            y: 412,
            dy: 96,
            dx: 75
        }, {
            name: "Personal Products",
            children: [{
                name: "KMB",
                description: "Kimberly-Clark Corporation",
                x: 715,
                y: 485,
                dx: 45,
                dy: 22
            }, {
                name: "EL",
                description: "The Estee Lauder Companies Inc.",
                x: 715,
                y: 456,
                dy: 29,
                dx: 45
            }, {name: "CL", description: "Colgate-Palmolive Company", x: 715, y: 424, dy: 32, dx: 45}, {
                name: "PG",
                description: "The Procter & Gamble Company",
                x: 653,
                y: 424,
                dx: 62,
                dy: 83
            }],
            x: 652,
            y: 412,
            dy: 96,
            dx: 109
        }, {
            name: "Beverages - Soft Drinks",
            children: [{
                name: "CCE",
                description: "Coca-Cola European Partners plc",
                x: 630,
                y: 647,
                dy: 23,
                dx: 21
            }, {
                name: "MNST",
                description: "Monster Beverage Corporation",
                x: 630,
                y: 608,
                dy: 39,
                dx: 21
            }, {name: "PEP", description: "PepsiCo, Inc.", x: 567, y: 608, dx: 63, dy: 62}, {
                name: "KO",
                description: "The Coca-Cola Company",
                x: 490,
                y: 608,
                dx: 77,
                dy: 62
            }],
            x: 489,
            y: 596,
            dx: 163,
            dy: 75
        }, {
            name: "Electronic Equipment",
            children: [{name: "AAPL", description: "Apple Inc.", x: 490, y: 424, dy: 171, dx: 161}],
            x: 489,
            y: 412,
            dx: 163,
            dy: 184
        }],
        x: 488,
        y: 397,
        dx: 349,
        dy: 275
    }, {
        name: "Services",
        children: [{
            name: "Personal Services",
            children: [{name: "HRB", description: "H&R Block, Inc.", x: 825, y: 392, dx: 10, dy: 3}],
            x: 824,
            y: 388,
            dx: 12,
            dy: 8
        }, {
            name: "Security & Protection Services",
            children: [{name: "ALLE", description: "Allegion plc", x: 825, y: 373, dy: 14, dx: 10}],
            x: 824,
            y: 369,
            dy: 19,
            dx: 12
        }, {
            name: "Broadcasting - TV",
            children: [{name: "NWSA", description: "News Corporation", x: 804, y: 387, dx: 19, dy: 8}],
            x: 803,
            y: 383,
            dx: 21,
            dy: 13
        }, {
            name: "Technical Services",
            children: [{name: "JEC", description: "Jacobs Engineering Group Inc.", x: 804, y: 373, dx: 19, dy: 9}],
            x: 803,
            y: 369,
            dx: 21,
            dy: 14
        }, {
            name: "Medical Equipment Wholesale",
            children: [{name: "HSIC", description: "Henry Schein, Inc.", x: 821, y: 351, dy: 17, dx: 14}],
            x: 820,
            y: 347,
            dy: 22,
            dx: 16
        }, {
            name: "Rental & Leasing Services",
            children: [{name: "URI", description: "United Rentals, Inc.", x: 804, y: 351, dy: 17, dx: 15}],
            x: 803,
            y: 347,
            dy: 22,
            dx: 17
        }, {
            name: "Trucking",
            children: [{
                name: "JBHT",
                description: "J.B. Hunt Transport Services, Inc.",
                x: 785,
                y: 379,
                dx: 17,
                dy: 16
            }],
            x: 784,
            y: 375,
            dx: 19,
            dy: 21
        }, {
            name: "Jewelry Stores",
            children: [{name: "TIF", description: "Tiffany & Co.", x: 785, y: 351, dy: 23, dx: 17}],
            x: 784,
            y: 347,
            dx: 19,
            dy: 28
        }, {
            name: "Electronics Stores",
            children: [{name: "BBY", description: "Best Buy Co., Inc.", x: 757, y: 377, dx: 26, dy: 18}],
            x: 756,
            y: 373,
            dx: 28,
            dy: 23
        }, {
            name: "Advertising Agencies",
            children: [{
                name: "IPG",
                description: "The Interpublic Group of Companies, Inc.",
                x: 774,
                y: 351,
                dy: 21,
                dx: 9
            }, {name: "OMC", description: "Omnicom Group Inc.", x: 757, y: 351, dx: 17, dy: 21}],
            x: 756,
            y: 347,
            dx: 28,
            dy: 26
        }, {
            name: "Grocery Stores",
            children: [{name: "KR", description: "The Kroger Co.", x: 815, y: 319, dy: 27, dx: 20}],
            x: 814,
            y: 315,
            dy: 32,
            dx: 22
        }, {
            name: "Auto Dealerships",
            children: [{name: "KMX", description: "CarMax, Inc.", x: 790, y: 333, dx: 23, dy: 13}, {
                name: "CPRT",
                description: "Copart, Inc.",
                x: 790,
                y: 319,
                dy: 14,
                dx: 23
            }],
            x: 789,
            y: 315,
            dy: 32,
            dx: 25
        }, {
            name: "Staffing & Outsourcing Services",
            children: [{
                name: "RHI",
                description: "Robert Half International Inc.",
                x: 780,
                y: 319,
                dy: 27,
                dx: 8
            }, {name: "PAYX", description: "Paychex, Inc.", x: 757, y: 319, dx: 23, dy: 27}],
            x: 756,
            y: 315,
            dy: 32,
            dx: 33
        }, {
            name: "Food Wholesale",
            children: [{name: "SYY", description: "Sysco Corporation", x: 797, y: 292, dx: 38, dy: 22}],
            x: 796,
            y: 288,
            dy: 27,
            dx: 40
        }, {
            name: "Industrial Equipment Wholesale",
            children: [{name: "FAST", description: "Fastenal Company", x: 778, y: 292, dy: 22, dx: 17}, {
                name: "GWW",
                description: "W.W. Grainger, Inc.",
                x: 757,
                y: 292,
                dx: 21,
                dy: 22
            }],
            x: 756,
            y: 288,
            dy: 27,
            dx: 40
        }, {
            name: "Regional Airlines",
            children: [{
                name: "ALK",
                description: "Alaska Air Group, Inc.",
                x: 747,
                y: 380,
                dy: 15,
                dx: 8
            }, {name: "LUV", description: "Southwest Airlines Co.", x: 713, y: 380, dx: 34, dy: 15}],
            x: 712,
            y: 368,
            dx: 44,
            dy: 28
        }, {
            name: "Auto Parts Stores",
            children: [{
                name: "AAP",
                description: "Advance Auto Parts, Inc.",
                x: 733,
                y: 358,
                dx: 22,
                dy: 9
            }, {name: "AZO", description: "AutoZone, Inc.", x: 733, y: 342, dy: 16, dx: 22}, {
                name: "ORLY",
                description: "O'Reilly Automotive, Inc.",
                x: 713,
                y: 342,
                dx: 20,
                dy: 25
            }],
            x: 712,
            y: 330,
            dx: 44,
            dy: 38
        }, {
            name: "Drugs Wholesale",
            children: [{
                name: "CAH",
                description: "Cardinal Health, Inc.",
                x: 732,
                y: 316,
                dx: 23,
                dy: 13
            }, {
                name: "ABC",
                description: "AmerisourceBergen Corporation",
                x: 732,
                y: 300,
                dy: 16,
                dx: 23
            }, {name: "MCK", description: "McKesson Corporation", x: 713, y: 300, dx: 19, dy: 29}],
            x: 712,
            y: 288,
            dx: 44,
            dy: 42
        }, {
            name: "Drug Stores",
            children: [{name: "WBA", description: "Walgreens Boots Alliance, Inc.", x: 797, y: 242, dy: 45, dx: 38}],
            x: 796,
            y: 238,
            dy: 50,
            dx: 40
        }, {
            name: "Apparel Stores",
            children: [{
                name: "URBN",
                description: "Urban Outfitters, Inc.",
                x: 775,
                y: 281,
                dx: 20,
                dy: 6
            }, {name: "JWN", description: "Nordstrom, Inc.", x: 785, y: 262, dy: 19, dx: 10}, {
                name: "LB",
                description: "L Brands, Inc.",
                x: 775,
                y: 262,
                dy: 19,
                dx: 10
            }, {name: "GPS", description: "The Gap, Inc.", x: 775, y: 250, dy: 12, dx: 20}, {
                name: "ROST",
                description: "Ross Stores, Inc.",
                x: 756,
                y: 250,
                dx: 19,
                dy: 37
            }],
            x: 755,
            y: 238,
            dy: 50,
            dx: 41
        }, {
            name: "Specialty Eateries",
            children: [{name: "SBUX", description: "Starbucks Corporation", x: 713, y: 250, dx: 41, dy: 37}],
            x: 712,
            y: 238,
            dy: 50,
            dx: 43
        }, {
            name: "Specialty Retail, Other",
            children: [{
                name: "TSCO",
                description: "Tractor Supply Company",
                x: 702,
                y: 373,
                dy: 22,
                dx: 9
            }, {name: "GPC", description: "Genuine Parts Company", x: 688, y: 373, dx: 14, dy: 22}, {
                name: "ULTA",
                description: "Ulta Beauty, Inc.",
                x: 688,
                y: 359,
                dy: 14,
                dx: 23
            }, {name: "EBAY", description: "eBay Inc.", x: 668, y: 359, dx: 20, dy: 36}],
            x: 667,
            y: 347,
            dx: 45,
            dy: 49
        }, {
            name: "Major Airlines",
            children: [{
                name: "AAL",
                description: "American Airlines Group Inc.",
                x: 689,
                y: 329,
                dx: 22,
                dy: 17
            }, {
                name: "UAL",
                description: "United Continental Holdings, Inc.",
                x: 689,
                y: 307,
                dy: 22,
                dx: 22
            }, {name: "DAL", description: "Delta Air Lines, Inc.", x: 668, y: 307, dx: 21, dy: 39}],
            x: 667,
            y: 295,
            dx: 45,
            dy: 52
        }, {
            name: "Department Stores",
            children: [{name: "M", description: "Macy's, Inc.", x: 690, y: 282, dx: 21, dy: 12}, {
                name: "KSS",
                description: "Kohl's Corporation",
                x: 668,
                y: 282,
                dx: 22,
                dy: 12
            }, {name: "TJX", description: "The TJX Companies, Inc.", x: 668, y: 250, dy: 32, dx: 43}],
            x: 667,
            y: 238,
            dx: 45,
            dy: 57
        }, {
            name: "Lodging",
            children: [{name: "EXPE", description: "Expedia Group, Inc.", x: 818, y: 207, dy: 30, dx: 17}, {
                name: "HLT",
                description: "Hilton Worldwide Holdings Inc.",
                x: 797,
                y: 207,
                dx: 21,
                dy: 30
            }, {name: "MAR", description: "Marriott International, Inc.", x: 797, y: 175, dy: 32, dx: 38}],
            x: 796,
            y: 171,
            dy: 67,
            dx: 40
        }, {
            name: "Resorts & Casinos",
            children: [{
                name: "NCLH",
                description: "Norwegian Cruise Line Holdings Ltd.",
                x: 784,
                y: 215,
                dy: 22,
                dx: 11
            }, {name: "MGM", description: "MGM Resorts International", x: 767, y: 215, dx: 17, dy: 22}, {
                name: "WYNN",
                description: "Wynn Resorts, Limited",
                x: 748,
                y: 215,
                dx: 19,
                dy: 22
            }, {name: "RCL", description: "Royal Caribbean Cruises Ltd.", x: 778, y: 183, dy: 32, dx: 17}, {
                name: "CCL",
                description: "Carnival Corporation",
                x: 748,
                y: 183,
                dy: 32,
                dx: 30
            }],
            x: 747,
            y: 171,
            dy: 67,
            dx: 49
        }, {
            name: "Restaurants",
            children: [{
                name: "CMG",
                description: "Chipotle Mexican Grill, Inc.",
                x: 723,
                y: 224,
                dx: 23,
                dy: 13
            }, {name: "DRI", description: "Darden Restaurants, Inc.", x: 723, y: 210, dy: 14, dx: 23}, {
                name: "YUM",
                description: "YUM! Brands, Inc.",
                x: 723,
                y: 183,
                dy: 27,
                dx: 23
            }, {name: "MCD", description: "McDonald's Corporation", x: 668, y: 183, dx: 55, dy: 54}],
            x: 667,
            y: 171,
            dy: 67,
            dx: 80
        }, {
            name: "Air Delivery & Freight Services",
            children: [{
                name: "CHRW",
                description: "C.H. Robinson Worldwide, Inc.",
                x: 646,
                y: 380,
                dx: 20,
                dy: 15
            }, {
                name: "EXPD",
                description: "Expeditors International of Washington, Inc.",
                x: 625,
                y: 380,
                dx: 21,
                dy: 15
            }, {name: "FDX", description: "FedEx Corporation", x: 625, y: 343, dy: 37, dx: 41}, {
                name: "UPS",
                description: "United Parcel Service, Inc.",
                x: 577,
                y: 343,
                dx: 48,
                dy: 52
            }],
            x: 576,
            y: 331,
            dx: 91,
            dy: 65
        }, {
            name: "Railroads",
            children: [{name: "KSU", description: "Kansas City Southern", x: 657, y: 298, dy: 32, dx: 9}, {
                name: "NSC",
                description: "Norfolk Southern Corporation",
                x: 620,
                y: 298,
                dx: 37,
                dy: 32
            }, {name: "CSX", description: "CSX Corporation", x: 620, y: 265, dy: 33, dx: 46}, {
                name: "UNP",
                description: "Union Pacific Corporation",
                x: 577,
                y: 265,
                dx: 43,
                dy: 65
            }],
            x: 576,
            y: 253,
            dx: 91,
            dy: 78
        }, {
            name: "CATV Systems",
            children: [{name: "DISCA", description: "Discovery, Inc.", x: 649, y: 232, dy: 20, dx: 17}, {
                name: "DISH",
                description: "DISH Network Corporation",
                x: 631,
                y: 232,
                dx: 18,
                dy: 20
            }, {
                name: "CHTR",
                description: "Charter Communications, Inc.",
                x: 631,
                y: 183,
                dy: 49,
                dx: 35
            }, {name: "NFLX", description: "Netflix, Inc.", x: 577, y: 183, dx: 54, dy: 69}],
            x: 576,
            y: 171,
            dx: 91,
            dy: 82
        }, {
            name: "Home Improvement Stores",
            children: [{
                name: "LOW",
                description: "Lowe's Companies, Inc.",
                x: 490,
                y: 370,
                dx: 85,
                dy: 25
            }, {name: "HD", description: "The Home Depot, Inc.", x: 490, y: 298, dy: 72, dx: 85}],
            x: 489,
            y: 286,
            dx: 87,
            dy: 110
        }, {
            name: "Business Services",
            children: [{
                name: "ADS",
                description: "Alliance Data Systems Corporation",
                x: 551,
                y: 270,
                dx: 24,
                dy: 15
            }, {name: "GPN", description: "Global Payments Inc.", x: 551, y: 250, dy: 20, dx: 24}, {
                name: "VRSK",
                description: "Verisk Analytics, Inc.",
                x: 521,
                y: 267,
                dx: 30,
                dy: 18
            }, {name: "FLT", description: "FleetCor Technologies, Inc.", x: 521, y: 250, dx: 30, dy: 17}, {
                name: "INFO",
                description: "IHS Markit Ltd.",
                x: 549,
                y: 229,
                dy: 21,
                dx: 26
            }, {name: "CTAS", description: "Cintas Corporation", x: 521, y: 229, dy: 21, dx: 28}, {
                name: "FISV",
                description: "Fiserv, Inc.",
                x: 490,
                y: 258,
                dx: 31,
                dy: 27
            }, {name: "MCO", description: "Moody's Corporation", x: 490, y: 229, dx: 31, dy: 29}, {
                name: "SPGI",
                description: "S&P Global Inc.",
                x: 546,
                y: 183,
                dy: 46,
                dx: 29
            }, {name: "BKNG", description: "Booking Holdings Inc.", x: 490, y: 183, dy: 46, dx: 56}],
            x: 489,
            y: 171,
            dx: 87,
            dy: 115
        }, {
            name: "Entertainment - Diversified",
            children: [{name: "VIAB", description: "Viacom, Inc.", x: 810, y: 155, dx: 25, dy: 15}, {
                name: "CBS",
                description: "CBS Corporation",
                x: 810,
                y: 132,
                dy: 23,
                dx: 25
            }, {
                name: "FOXA",
                description: "Twenty-First Century Fox, Inc.",
                x: 751,
                y: 132,
                dx: 59,
                dy: 38
            }, {name: "CMCSA", description: "Comcast Corporation", x: 751, y: 80, dy: 52, dx: 84}, {
                name: "DIS",
                description: "The Walt Disney Company",
                x: 751,
                y: 27,
                dy: 53,
                dx: 84
            }],
            x: 750,
            y: 15,
            dy: 156,
            dx: 86
        }, {
            name: "Discount, Variety Stores",
            children: [{name: "DLTR", description: "Dollar Tree, Inc.", x: 729, y: 138, dy: 32, dx: 20}, {
                name: "DG",
                description: "Dollar General Corporation",
                x: 707,
                y: 138,
                dx: 22,
                dy: 32
            }, {name: "TGT", description: "Target Corporation", x: 707, y: 110, dy: 28, dx: 42}, {
                name: "COST",
                description: "Costco Wholesale Corporation",
                x: 664,
                y: 110,
                dx: 43,
                dy: 60
            }, {name: "WMT", description: "Walmart Inc.", x: 664, y: 27, dy: 83, dx: 85}],
            x: 663,
            y: 15,
            dy: 156,
            dx: 87
        }, {
            name: "Catalog & Mail Order Houses",
            children: [{name: "AMZN", description: "Amazon.com, Inc.", x: 490, y: 27, dx: 172, dy: 143}],
            x: 489,
            y: 15,
            dy: 156,
            dx: 174
        }],
        x: 488,
        y: 0,
        dx: 349,
        dy: 397
    }, {
        name: "Financial",
        children: [{
            name: "Savings & Loans",
            children: [{name: "PBCT", description: "People's United Financial, Inc.", x: 468, y: 661, dx: 18, dy: 9}],
            x: 467,
            y: 657,
            dx: 20,
            dy: 14
        }, {
            name: "REIT - Hotel/Motel",
            children: [{name: "HST", description: "Host Hotels & Resorts, Inc.", x: 468, y: 637, dy: 19, dx: 18}],
            x: 467,
            y: 633,
            dy: 24,
            dx: 20
        }, {
            name: "Property Management",
            children: [{name: "CBRE", description: "CBRE Group, Inc.", x: 439, y: 657, dx: 27, dy: 13}],
            x: 438,
            y: 653,
            dx: 29,
            dy: 18
        }, {
            name: "Regional - Mid-Atlantic Banks", children: [{
                name: "CFG",
                description: "Citizens Financial Group, Inc.", x: 439, y: 637, dx: 27, dy: 15
            }], x: 438, y: 633, dx: 29, dy: 20
        }, {
            name: "Regional - Northeast Banks",
            children: [{name: "MTB", description: "M&T Bank Corporation", x: 419, y: 637, dy: 33, dx: 18}],
            x: 418,
            y: 633,
            dx: 20,
            dy: 38
        }, {
            name: "Regional - Pacific Banks",
            children: [{
                name: "ZION",
                description: "Zions Bancorporation",
                x: 462,
                y: 622,
                dx: 24,
                dy: 10
            }, {name: "SIVB", description: "SVB Financial Group", x: 462, y: 606, dy: 16, dx: 24}],
            x: 461,
            y: 602,
            dy: 31,
            dx: 26
        }, {
            name: "REIT - Office",
            children: [{
                name: "BXP",
                description: "Boston Properties, Inc.",
                x: 441,
                y: 614,
                dx: 19,
                dy: 18
            }, {name: "DLR", description: "Digital Realty Trust, Inc.", x: 419, y: 614, dx: 22, dy: 18}],
            x: 418,
            y: 602,
            dy: 31,
            dx: 43
        }, {
            name: "Accident & Health Insurance",
            children: [{name: "AIZ", description: "Assurant, Inc.", x: 403, y: 661, dx: 14, dy: 9}, {
                name: "UNM",
                description: "Unum Group",
                x: 403,
                y: 650,
                dy: 11,
                dx: 14
            }, {name: "AFL", description: "Aflac Incorporated", x: 371, y: 650, dx: 32, dy: 20}],
            x: 370,
            y: 638,
            dx: 48,
            dy: 33
        }, {
            name: "REIT - Healthcare Facilities",
            children: [{name: "HCP", description: "HCP, Inc.", x: 407, y: 614, dy: 23, dx: 10}, {
                name: "VTR",
                description: "Ventas, Inc.",
                x: 390,
                y: 614,
                dx: 17,
                dy: 23
            }, {name: "WELL", description: "Welltower Inc.", x: 371, y: 614, dx: 19, dy: 23}],
            x: 370,
            y: 602,
            dx: 48,
            dy: 36
        }, {
            name: "Regional - Southeast Banks",
            children: [{
                name: "RF",
                description: "Regions Financial Corporation",
                x: 454,
                y: 584,
                dx: 32,
                dy: 17
            }, {name: "BBT", description: "BB&T Corporation", x: 454, y: 552, dy: 32, dx: 32}],
            x: 453,
            y: 548,
            dy: 54,
            dx: 34
        }, {
            name: "Diversified Investments",
            children: [{
                name: "CBOE",
                description: "Cboe Global Markets, Inc.",
                x: 436,
                y: 582,
                dy: 19,
                dx: 16
            }, {name: "NDAQ", description: "Nasdaq, Inc.", x: 415, y: 582, dx: 21, dy: 19}, {
                name: "ICE",
                description: "Intercontinental Exchange, Inc.",
                x: 415,
                y: 552,
                dy: 30,
                dx: 37
            }],
            x: 414,
            y: 548,
            dy: 54,
            dx: 39
        }, {
            name: "REIT - Diversified",
            children: [{name: "VNO", description: "Vornado Realty Trust", x: 406, y: 560, dy: 41, dx: 7}, {
                name: "AMT",
                description: "American Tower Corporation (REIT)",
                x: 371,
                y: 560,
                dx: 35,
                dy: 41
            }],
            x: 370,
            y: 548,
            dy: 54,
            dx: 44
        }, {
            name: "REIT - Residential",
            children: [{
                name: "AIV",
                description: "Apartment Investment and Management Company",
                x: 478,
                y: 530,
                dy: 17,
                dx: 8
            }, {name: "UDR", description: "UDR, Inc.", x: 465, y: 530, dx: 13, dy: 17}, {
                name: "ESS",
                description: "Essex Property Trust, Inc.",
                x: 465,
                y: 514,
                dy: 16,
                dx: 21
            }, {name: "AVB", description: "AvalonBay Communities, Inc.", x: 434, y: 531, dx: 31, dy: 16}, {
                name: "EQR",
                description: "Equity Residential",
                x: 434,
                y: 514,
                dx: 31,
                dy: 17
            }],
            x: 433,
            y: 502,
            dy: 46,
            dx: 54
        }, {
            name: "REIT - Industrial",
            children: [{
                name: "DRE",
                description: "Duke Realty Corporation",
                x: 418,
                y: 532,
                dy: 15,
                dx: 14
            }, {name: "EXR", description: "Extra Space Storage Inc.", x: 418, y: 514, dy: 18, dx: 14}, {
                name: "PLD",
                description: "Prologis, Inc.",
                x: 396,
                y: 514,
                dx: 22,
                dy: 33
            }, {name: "PSA", description: "Public Storage", x: 371, y: 514, dx: 25, dy: 33}],
            x: 370,
            y: 502,
            dy: 46,
            dx: 63
        }, {
            name: "Insurance Brokers",
            children: [{
                name: "WLTW",
                description: "Willis Towers Watson Public Limited Company",
                x: 356,
                y: 638,
                dy: 32,
                dx: 13
            }, {name: "AON", description: "Aon plc", x: 333, y: 638, dx: 23, dy: 32}, {
                name: "MMC",
                description: "Marsh & McLennan Companies, Inc.",
                x: 305,
                y: 638,
                dx: 28,
                dy: 32
            }],
            x: 304,
            y: 626,
            dx: 66,
            dy: 45
        }, {
            name: "Life Insurance",
            children: [{
                name: "BHF",
                description: "Brighthouse Financial, Inc.",
                x: 361,
                y: 609,
                dy: 16,
                dx: 8
            }, {name: "TMK", description: "Torchmark Corporation", x: 347, y: 609, dx: 14, dy: 16}, {
                name: "LNC",
                description: "Lincoln National Corporation",
                x: 347,
                y: 594,
                dy: 15,
                dx: 22
            }, {
                name: "PFG",
                description: "Principal Financial Group, Inc.",
                x: 347,
                y: 577,
                dy: 17,
                dx: 22
            }, {name: "PRU", description: "Prudential Financial, Inc.", x: 305, y: 602, dx: 42, dy: 23}, {
                name: "MET",
                description: "MetLife, Inc.",
                x: 305,
                y: 577,
                dx: 42,
                dy: 25
            }],
            x: 304,
            y: 565,
            dx: 66,
            dy: 61
        }, {
            name: "REIT - Retail",
            children: [{
                name: "KIM",
                description: "Kimco Realty Corporation",
                x: 348,
                y: 556,
                dx: 21,
                dy: 8
            }, {name: "MAC", description: "Macerich Company", x: 359, y: 536, dy: 20, dx: 10}, {
                name: "SLG",
                description: "SL Green Realty Corp.",
                x: 348,
                y: 536,
                dy: 20,
                dx: 11
            }, {
                name: "FRT",
                description: "Federal Realty Investment Trust",
                x: 331,
                y: 551,
                dx: 17,
                dy: 13
            }, {name: "REG", description: "Regency Centers Corporation", x: 331, y: 536, dx: 17, dy: 15}, {
                name: "O",
                description: "Realty Income Corporation",
                x: 352,
                y: 514,
                dy: 22,
                dx: 17
            }, {name: "GGP", description: "GGP Inc.", x: 331, y: 514, dy: 22, dx: 21}, {
                name: "SPG",
                description: "Simon Property Group, Inc.",
                x: 305,
                y: 514,
                dx: 26,
                dy: 50
            }],
            x: 304,
            y: 502,
            dx: 66,
            dy: 63
        }, {
            name: "Regional - Midwest Banks",
            children: [{
                name: "HBAN",
                description: "Huntington Bancshares Incorporated",
                x: 290,
                y: 643,
                dy: 27,
                dx: 13
            }, {name: "FITB", description: "Fifth Third Bancorp", x: 273, y: 643, dx: 17, dy: 27}, {
                name: "KEY",
                description: "KeyCorp",
                x: 273,
                y: 626,
                dy: 17,
                dx: 30
            }, {name: "USB", description: "U.S. Bancorp", x: 228, y: 626, dx: 45, dy: 44}],
            x: 227,
            y: 614,
            dx: 77,
            dy: 57
        }, {
            name: "Asset Management",
            children: [{name: "LM", description: "Legg Mason, Inc.", x: 293, y: 606, dx: 10, dy: 7}, {
                name: "JEF",
                description: "Jefferies Financial Group Inc.",
                x: 293,
                y: 586,
                dy: 20,
                dx: 10
            }, {
                name: "AMG",
                description: "Affiliated Managers Group, Inc.",
                x: 275,
                y: 601,
                dx: 18,
                dy: 12
            }, {name: "IVZ", description: "Invesco Ltd.", x: 275, y: 586, dx: 18, dy: 15}, {
                name: "BEN",
                description: "Franklin Resources, Inc.",
                x: 258,
                y: 586,
                dx: 17,
                dy: 27
            }, {name: "AMP", description: "Ameriprise Financial, Inc.", x: 283, y: 560, dy: 26, dx: 20}, {
                name: "NTRS",
                description: "Northern Trust Corporation",
                x: 258,
                y: 560,
                dy: 26,
                dx: 25
            }, {name: "TROW", description: "T. Rowe Price Group, Inc.", x: 228, y: 588, dx: 30, dy: 25}, {
                name: "STT",
                description: "State Street Corporation",
                x: 228,
                y: 560,
                dx: 30,
                dy: 28
            }, {
                name: "BK",
                description: "The Bank of New York Mellon Corporation",
                x: 272,
                y: 514,
                dy: 46,
                dx: 31
            }, {name: "BLK", description: "BlackRock, Inc.", x: 228, y: 514, dy: 46, dx: 44}],
            x: 227,
            y: 502,
            dx: 77,
            dy: 112
        }, {
            name: "Investment Brokerage - National",
            children: [{
                name: "ETFC",
                description: "E*TRADE Financial Corporation",
                x: 446,
                y: 490,
                dx: 40,
                dy: 11
            }, {name: "CME", description: "CME Group Inc.", x: 446, y: 454, dy: 36, dx: 40}, {
                name: "SCHW",
                description: "The Charles Schwab Corporation",
                x: 408,
                y: 454,
                dx: 38,
                dy: 47
            }, {name: "GS", description: "The Goldman Sachs Group, Inc.", x: 447, y: 395, dy: 59, dx: 39}, {
                name: "MS",
                description: "Morgan Stanley",
                x: 408,
                y: 395,
                dy: 59,
                dx: 39
            }],
            x: 407,
            y: 383,
            dy: 119,
            dx: 80
        }, {
            name: "Property & Casualty Insurance",
            children: [{
                name: "RE",
                description: "Everest Re Group, Ltd.",
                x: 378,
                y: 492,
                dx: 28,
                dy: 9
            }, {
                name: "CINF",
                description: "Cincinnati Financial Corporation",
                x: 393,
                y: 467,
                dy: 25,
                dx: 13
            }, {name: "XL", description: "XL Group Ltd", x: 378, y: 467, dy: 25, dx: 15}, {
                name: "L",
                description: "Loews Corporation",
                x: 350,
                y: 485,
                dx: 28,
                dy: 16
            }, {
                name: "HIG",
                description: "The Hartford Financial Services Group, Inc.",
                x: 350,
                y: 467,
                dx: 28,
                dy: 18
            }, {name: "ALL", description: "The Allstate Corporation", x: 379, y: 435, dy: 32, dx: 27}, {
                name: "TRV",
                description: "The Travelers Companies, Inc.",
                x: 350,
                y: 435,
                dy: 32,
                dx: 29
            }, {name: "PGR", description: "The Progressive Corporation", x: 383, y: 395, dy: 40, dx: 23}, {
                name: "AIG",
                description: "American International Group, Inc.",
                x: 350,
                y: 395,
                dy: 40,
                dx: 33
            }, {name: "BRK-B", description: "Berkshire Hathaway Inc.", x: 228, y: 395, dx: 122, dy: 106}],
            x: 227,
            y: 383,
            dy: 119,
            dx: 180
        }, {
            name: "Credit Services",
            children: [{name: "NAVI", description: "Navient Corporation", x: 220, y: 658, dy: 12, dx: 6}, {
                name: "WU",
                description: "The Western Union Company",
                x: 199,
                y: 658,
                dx: 21,
                dy: 12
            }, {name: "EFX", description: "Equifax Inc.", x: 199, y: 643, dy: 15, dx: 27}, {
                name: "TSS",
                description: "Total System Services, Inc.",
                x: 199,
                y: 626,
                dy: 17,
                dx: 27
            }, {name: "SYF", description: "Synchrony Financial", x: 169, y: 648, dx: 30, dy: 22}, {
                name: "DFS",
                description: "Discover Financial Services",
                x: 169,
                y: 626,
                dx: 30,
                dy: 22
            }, {
                name: "COF",
                description: "Capital One Financial Corporation",
                x: 140,
                y: 626,
                dx: 29,
                dy: 44
            }, {name: "AXP", description: "American Express Company", x: 188, y: 567, dy: 59, dx: 38}, {
                name: "PYPL",
                description: "PayPal Holdings, Inc.",
                x: 140,
                y: 567,
                dy: 59,
                dx: 48
            }, {name: "MA", description: "Mastercard Incorporated", x: 83, y: 567, dx: 57, dy: 103}, {
                name: "V",
                description: "Visa Inc.",
                x: 2,
                y: 567,
                dx: 81,
                dy: 103
            }],
            x: 1,
            y: 555,
            dx: 226,
            dy: 116
        }, {
            name: "Money Center Banks",
            children: [{
                name: "CMA",
                description: "Comerica Incorporated",
                x: 214,
                y: 520,
                dy: 34,
                dx: 12
            }, {name: "STI", description: "SunTrust Banks, Inc.", x: 187, y: 520, dx: 27, dy: 34}, {
                name: "PNC",
                description: "The PNC Financial Services Group, Inc.",
                x: 187,
                y: 472,
                dy: 48,
                dx: 39
            }, {name: "C", description: "Citigroup Inc.", x: 125, y: 472, dx: 62, dy: 82}, {
                name: "WFC",
                description: "Wells Fargo & Company",
                x: 125,
                y: 395,
                dy: 77,
                dx: 101
            }, {name: "BAC", description: "Bank of America Corporation", x: 2, y: 483, dx: 123, dy: 71}, {
                name: "JPM",
                description: "JPMorgan Chase & Co.",
                x: 2,
                y: 395,
                dx: 123,
                dy: 88
            }],
            x: 1,
            y: 383,
            dx: 226,
            dy: 172
        }],
        x: 0,
        y: 368,
        dx: 488,
        dy: 304
    }, {
        name: "Technology",
        children: [{
            name: "Security Software & Services",
            children: [{name: "SYMC", description: "Symantec Corporation", x: 476, y: 334, dy: 32, dx: 10}],
            x: 475,
            y: 330,
            dy: 37,
            dx: 12
        }, {
            name: "Processing Systems & Products",
            children: [{name: "MSCI", description: "MSCI Inc.", x: 447, y: 355, dx: 27, dy: 11}],
            x: 446,
            y: 351,
            dx: 29,
            dy: 16
        }, {
            name: "Healthcare Information Services",
            children: [{name: "CERN", description: "Cerner Corporation", x: 447, y: 334, dx: 27, dy: 16}],
            x: 446,
            y: 330,
            dx: 29,
            dy: 21
        }, {
            name: "Technical & System Software",
            children: [{name: "ADSK", description: "Autodesk, Inc.", x: 423, y: 334, dy: 32, dx: 22}],
            x: 422,
            y: 330,
            dx: 24,
            dy: 37
        }, {
            name: "Information & Delivery Services",
            children: [{
                name: "DNB",
                description: "The Dun & Bradstreet Corporation",
                x: 471,
                y: 321,
                dx: 15,
                dy: 8
            }, {name: "NLSN", description: "Nielsen Holdings plc", x: 471, y: 304, dy: 17, dx: 15}, {
                name: "BR",
                description: "Broadridge Financial Solutions, Inc.",
                x: 459,
                y: 304,
                dx: 12,
                dy: 25
            }],
            x: 458,
            y: 300,
            dy: 30,
            dx: 29
        }, {
            name: "Internet Software & Services",
            children: [{name: "EQIX", description: "Equinix, Inc. (REIT)", x: 423, y: 304, dx: 34, dy: 25}],
            x: 422,
            y: 300,
            dy: 30,
            dx: 36
        }, {
            name: "Diversified Computer Systems",
            children: [{name: "HPQ", description: "HP Inc.", x: 460, y: 264, dy: 35, dx: 26}],
            x: 459,
            y: 260,
            dy: 40,
            dx: 28
        }, {
            name: "Scientific & Technical Instruments",
            children: [{name: "FLIR", description: "FLIR Systems, Inc.", x: 444, y: 284, dy: 15, dx: 14}, {
                name: "GRMN",
                description: "Garmin Ltd.",
                x: 423,
                y: 284,
                dx: 21,
                dy: 15
            }, {name: "FTV", description: "Fortive Corporation", x: 423, y: 264, dy: 20, dx: 35}],
            x: 422,
            y: 260,
            dy: 40,
            dx: 37
        }, {
            name: "Data Storage Devices",
            children: [{
                name: "STX",
                description: "Seagate Technology plc",
                x: 408,
                y: 345,
                dy: 21,
                dx: 13
            }, {name: "NTAP", description: "NetApp, Inc.", x: 390, y: 345, dx: 18, dy: 21}, {
                name: "WDC",
                description: "Western Digital Corporation",
                x: 371,
                y: 345,
                dx: 19,
                dy: 21
            }],
            x: 370,
            y: 333,
            dx: 52,
            dy: 34
        }, {
            name: "Semiconductor- Memory Chips",
            children: [{name: "MU", description: "Micron Technology, Inc.", x: 371, y: 310, dx: 50, dy: 22}],
            x: 370,
            y: 298,
            dx: 52,
            dy: 35
        }, {
            name: "Diversified Communication Services",
            children: [{
                name: "SBAC",
                description: "SBA Communications Corporation",
                x: 407,
                y: 272,
                dy: 25,
                dx: 14
            }, {name: "CCI", description: "Crown Castle International Corp. (REIT)", x: 371, y: 272, dx: 36, dy: 25}],
            x: 370,
            y: 260,
            dx: 52,
            dy: 38
        }, {
            name: "Semiconductor - Integrated Circuits",
            children: [{
                name: "SWKS",
                description: "Skyworks Solutions, Inc.",
                x: 461,
                y: 245,
                dx: 25,
                dy: 14
            }, {name: "XLNX", description: "Xilinx, Inc.", x: 461, y: 231, dy: 14, dx: 25}, {
                name: "ADI",
                description: "Analog Devices, Inc.",
                x: 436,
                y: 231,
                dx: 25,
                dy: 28
            }],
            x: 435,
            y: 219,
            dy: 41,
            dx: 52
        }, {
            name: "Diversified Electronics",
            children: [{name: "GLW", description: "Corning Incorporated", x: 414, y: 231, dy: 28, dx: 20}, {
                name: "APH",
                description: "Amphenol Corporation",
                x: 394,
                y: 231,
                dx: 20,
                dy: 28
            }, {name: "TEL", description: "TE Connectivity Ltd.", x: 371, y: 231, dx: 23, dy: 28}],
            x: 370,
            y: 219,
            dy: 41,
            dx: 65
        }, {
            name: "Multimedia & Graphics Software",
            children: [{
                name: "TTWO",
                description: "Take-Two Interactive Software, Inc.",
                x: 358,
                y: 336,
                dy: 30,
                dx: 11
            }, {name: "EA", description: "Electronic Arts Inc.", x: 323, y: 336, dx: 35, dy: 30}, {
                name: "ATVI",
                description: "Activision Blizzard, Inc.",
                x: 323,
                y: 305,
                dy: 31,
                dx: 46
            }],
            x: 322,
            y: 293,
            dx: 48,
            dy: 74
        }, {
            name: "Semiconductor Equipment & Materials",
            children: [{
                name: "IPGP",
                description: "IPG Photonics Corporation",
                x: 359,
                y: 273,
                dy: 19,
                dx: 10
            }, {name: "SNPS", description: "Synopsys, Inc.", x: 342, y: 273, dx: 17, dy: 19}, {
                name: "KLAC",
                description: "KLA-Tencor Corporation",
                x: 342,
                y: 257,
                dy: 16,
                dx: 27
            }, {name: "LRCX", description: "Lam Research Corporation", x: 323, y: 257, dx: 19, dy: 35}, {
                name: "AMAT",
                description: "Applied Materials, Inc.",
                x: 323,
                y: 231,
                dy: 26,
                dx: 46
            }],
            x: 322,
            y: 219,
            dx: 48,
            dy: 74
        }, {
            name: "Semiconductor - Specialized",
            children: [{name: "FSLR", description: "First Solar, Inc.", x: 436, y: 215, dx: 50, dy: 3}, {
                name: "NVDA",
                description: "NVIDIA Corporation",
                x: 436,
                y: 141,
                dy: 74,
                dx: 50
            }],
            x: 435,
            y: 129,
            dy: 90,
            dx: 52
        }, {
            name: "Information Technology Services",
            children: [{name: "XRX", description: "Xerox Corporation", x: 403, y: 212, dx: 31, dy: 6}, {
                name: "FIS",
                description: "Fidelity National Information Services, Inc.",
                x: 403,
                y: 183,
                dy: 29,
                dx: 31
            }, {
                name: "CTSH",
                description: "Cognizant Technology Solutions Corporation",
                x: 367,
                y: 183,
                dx: 36,
                dy: 35
            }, {name: "ACN", description: "Accenture plc", x: 367, y: 141, dy: 42, dx: 67}, {
                name: "IBM",
                description: "International Business Machines Corporation",
                x: 323,
                y: 141,
                dx: 44,
                dy: 77
            }],
            x: 322,
            y: 129,
            dy: 90,
            dx: 113
        }, {
            name: "Communication Equipment",
            children: [{
                name: "JNPR",
                description: "Juniper Networks, Inc.",
                x: 302,
                y: 352,
                dx: 19,
                dy: 14
            }, {name: "HRS", description: "Harris Corporation", x: 302, y: 326, dy: 26, dx: 19}, {
                name: "MSI",
                description: "Motorola Solutions, Inc.",
                x: 274,
                y: 348,
                dx: 28,
                dy: 18
            }, {
                name: "HPE",
                description: "Hewlett Packard Enterprise Company",
                x: 274,
                y: 326,
                dx: 28,
                dy: 22
            }, {name: "QCOM", description: "QUALCOMM Incorporated", x: 274, y: 273, dy: 53, dx: 47}, {
                name: "CSCO",
                description: "Cisco Systems, Inc.",
                x: 218,
                y: 273,
                dx: 56,
                dy: 93
            }],
            x: 217,
            y: 261,
            dx: 105,
            dy: 106
        }, {
            name: "Telecom Services - Domestic",
            children: [{
                name: "FTR",
                description: "Frontier Communications Corporation",
                x: 312,
                y: 259,
                dx: 9,
                dy: 1
            }, {name: "CTL", description: "CenturyLink, Inc.", x: 312, y: 200, dy: 59, dx: 9}, {
                name: "VZ",
                description: "Verizon Communications Inc.",
                x: 218,
                y: 200,
                dx: 94,
                dy: 60
            }, {name: "T", description: "AT&T Inc.", x: 218, y: 141, dy: 59, dx: 103}],
            x: 217,
            y: 129,
            dx: 105,
            dy: 132
        }, {
            name: "Semiconductor - Broad Line",
            children: [{name: "QRVO", description: "Qorvo, Inc.", x: 471, y: 113, dy: 15, dx: 15}, {
                name: "MCHP",
                description: "Microchip Technology Incorporated",
                x: 471,
                y: 74,
                dy: 39,
                dx: 15
            }, {name: "AVGO", description: "Broadcom Inc.", x: 424, y: 74, dx: 47, dy: 54}, {
                name: "TXN",
                description: "Texas Instruments Incorporated",
                x: 424,
                y: 27,
                dy: 47,
                dx: 62
            }, {name: "INTC", description: "Intel Corporation", x: 358, y: 27, dx: 66, dy: 101}],
            x: 357,
            y: 15,
            dy: 114,
            dx: 130
        }, {
            name: "Application Software",
            children: [{
                name: "CDNS",
                description: "Cadence Design Systems, Inc.",
                x: 333,
                y: 113,
                dx: 23,
                dy: 15
            }, {name: "ANSS", description: "ANSYS, Inc.", x: 333, y: 96, dy: 17, dx: 23}, {
                name: "RHT",
                description: "Red Hat, Inc.",
                x: 312,
                y: 96,
                dx: 21,
                dy: 32
            }, {name: "INTU", description: "Intuit Inc.", x: 268, y: 96, dx: 44, dy: 32}, {
                name: "CRM",
                description: "salesforce.com, inc.",
                x: 316,
                y: 27,
                dy: 69,
                dx: 40
            }, {name: "ADBE", description: "Adobe Systems Incorporated", x: 268, y: 27, dy: 69, dx: 48}, {
                name: "ORCL",
                description: "Oracle Corporation",
                x: 218,
                y: 27,
                dx: 50,
                dy: 101
            }],
            x: 217,
            y: 15,
            dy: 114,
            dx: 140
        }, {
            name: "Business Software & Services",
            children: [{
                name: "IRM",
                description: "Iron Mountain Incorporated",
                x: 190,
                y: 353,
                dx: 26,
                dy: 13
            }, {name: "FFIV", description: "F5 Networks, Inc.", x: 190, y: 342, dx: 26, dy: 11}, {
                name: "CTXS",
                description: "Citrix Systems, Inc.",
                x: 190,
                y: 326,
                dy: 16,
                dx: 26
            }, {name: "CA", description: "CA, Inc.", x: 190, y: 307, dy: 19, dx: 26}, {
                name: "ADP",
                description: "Automatic Data Processing, Inc.",
                x: 190,
                y: 245,
                dy: 62,
                dx: 26
            }, {name: "MSFT", description: "Microsoft Corporation", x: 2, y: 245, dx: 188, dy: 121}],
            x: 1,
            y: 233,
            dx: 216,
            dy: 134
        }, {
            name: "Internet Information Providers",
            children: [{name: "TRIP", description: "TripAdvisor, Inc.", x: 201, y: 210, dy: 22, dx: 15}, {
                name: "AKAM",
                description: "Akamai Technologies, Inc.",
                x: 185,
                y: 210,
                dx: 16,
                dy: 22
            }, {name: "VRSN", description: "VeriSign, Inc.", x: 161, y: 210, dx: 24, dy: 22}, {
                name: "TWTR",
                description: "Twitter, Inc.",
                x: 121,
                y: 210,
                dx: 40,
                dy: 22
            }, {name: "FB", description: "Facebook, Inc.", x: 121, y: 27, dy: 183, dx: 95}, {
                name: "GOOGL",
                description: "Alphabet Inc.",
                x: 2,
                y: 27,
                dx: 119,
                dy: 205
            }],
            x: 1,
            y: 15,
            dx: 216,
            dy: 218
        }],
        x: 0,
        y: 0,
        dx: 488,
        dy: 368
    }], x: 0, y: 0, dx: 1211, dy: 672
};
