import { create } from 'zustand'

export const useFiltersStore = create(() => ({
  filters: {
    "page": {
      "options": null
    },
    "discount": {
      "options": null
    },
    "vat_reclaimable": {
      "options": null
    },
    "sort": {
      "options": {
        "0": "Recommended",
        "1": "From cheap to expensive",
        "2": "From expensive to cheap",
        "3": "Date added",
        "4": "Year of graduation, in ascending order",
        "5": "Year of issue, in descending order",
        "6": "Mileage, by growth",
        "7": "Mileage, in descending order"
      }
    },
    "category": {
      "type": "select",
      "options": {
        "0": "All",
        "1": "Passenger cars",
        "2": "Moto",
        "3": "Trucks"
      }
    },
    "drive": {
      "type": "checkbox",
      "options": {
        "0": "All",
        "1": "Full",
        "2": "Front",
        "3": "Rear",
        "4": "Cardan",
        "5": "Belt",
        "6": "Chain"
      }
    },
    "body": {
      "type": "checkbox",
      "options": {
        "0": "All",
        "2": "Sedan",
        "3": "Station Wagon",
        "4": "SUV / Offroad",
        "5": "Cargo VAN",
        "6": "Coupe",
        "7": "Cabriolet",
        "8": "MPV/VAN",
        "9": "Pick-up",
        "11": "Hatchback",
        "12": "MPV"
      }
    },
    "year_from": {
      "type": "select",
      "options": null
    },
    "year_to": {
      "type": "select",
      "options": null
    },
    "price_from": {
      "type": "field",
      "options": null
    },
    "price_to": {
      "type": "field",
      "options": null
    },
    "mileage_from": {
      "type": "field",
      "options": null
    },
    "mileage_to": {
      "type": "field",
      "options": null
    },
    "fuel_type": {
      "type": "checkbox",
      "options": {
        "0": "All",
        "1": "Diesel",
        "2": "Petrol",
        "3": "Electric",
        "4": "Hybrid",
        "5": "CNG",
        "6": "Hydrogen",
        "7": "LPG",
        "8": "Other fuel type"
      }
    },
    "transmission": {
      "type": "checkbox",
      "options": {
        "0": "All",
        "1": "Manual / Mechanics",
        "2": "Automatic",
        "3": "Tiptronic",
        "4": "Robot",
        "5": "Variator"
      }
    },
    "eco": {
      "type": "checkbox",
      "options": {
        "0": "All",
        "1": "EURO-1",
        "2": "EURO-2",
        "3": "EURO-3",
        "4": "EURO-4",
        "5": "EURO-5",
        "6": "EURO-6",
        "7": "EURO-6c",
        "8": "EURO-6d",
        "9": "EURO-6d TEMP",
        "10": "EURO-6e",
      }
    },
    "engine_capacity_from": {
      "type": "field",
      "options": null
    },
    "engine_capacity_to": {
      "type": "field",
      "options": null
    },
    "state": {
      "type": "select",
      "options": {
        "0": "All",
        "1": "Used",
        "2": "New"
      }
    },
    "mileage_unit": {
      "type": "select",
      "options": {
        "1": "km",
        "2": "m"
      }
    },
    "power_unit": {
      "type": "select",
      "options": {
        "1": "hp",
        "2": "kw"
      }
    },
    "price_type": {
      "type": "select",
      "options": {
        "1": "fixed",
        "2": "negotiable"
      }
    },
    "region": {
      "type": "select",
      "child": "region",
      "options": [
        "All"
      ]
    },
    "color": {
      "type": "checkbox",
      "options": {
        "0": "All",
        "1": "Beige",
        "2": "White",
        "3": "Black",
        "4": "Red",
        "6": "Brown",
        "7": "Blue",
        "8": "Orange",
        "9": "Silver",
        "10": "Grey",
        "11": "Green",
        "13": "Yellow"
      }
    },
    "seats": {
      "type": "select",
      "options": {
        "0": "All",
        "1": "2",
        "2": "3",
        "3": "4",
        "4": "5",
        "5": "6",
        "6": "7",
        "7": "8",
        "8": "9",
        "9": "10"
      }
    },
    "interior_material": {
      "type": "checkbox",
      "options": {
        "0": "All",
        "1": "Alcantara",
        "2": "Cloth",
        "3": "Full leather",
        "4": "Part leather",
        "5": "Velour",
        "6": "Other",
      }
    },
    "doors": {
      "type": "checkbox",
      "options": {
        "0": "All",
        "1": "2/3",
        "2": "4/5",
        "3": "6/7"
      }
    },
    "features": {
      "type": "checkbox",
      "options": null
    },
    "country": {
      "type": "select",
      "child": "region",
      "options": {
        "0": "All",
        "AU": "Australia",
        "AT": "Austria",
        "AZ": "Azerbaijan",
        "AL": "Albania",
        "DZ": "Algeria",
        "AO": "Angola",
        "AG": "Antigua and Barbuda",
        "MO": "Macau",
        "AR": "Argentina",
        "BB": "Barbados",
        "BH": "Bahrain",
        "BY": "Belarus",
        "BE": "Belgium",
        "BG": "Bulgaria",
        "BO": "Bolivia",
        "BR": "Brazil",
        "GB": "England",
        "HU": "Hungary",
        "VE": "Venezuela",
        "VN": "Viet Nam",
        "GH": "Ghana",
        "GP": "Guadeloupe",
        "GT": "Guatemala",
        "DE": "Germany",
        "GI": "Gibraltar",
        "HN": "Honduras",
        "HK": "Hong Kong",
        "GR": "Greece",
        "GE": "Georgia",
        "DK": "Denmark",
        "DO": "Dominican Republic",
        "EG": "Egypt",
        "IL": "Israel",
        "IN": "India",
        "ID": "Indonesia",
        "JO": "Jordan",
        "IR": "Iran",
        "IS": "Iceland",
        "ES": "Spain",
        "IT": "Italy",
        "KZ": "Kazakhstan",
        "CA": "Canada",
        "QA": "Qatar",
        "CY": "Cyprus",
        "CN": "China",
        "CO": "Colombia",
        "CG": "Congo",
        "CD": "The Democratic Republic of Congo",
        "KR": "Korea Republic",
        "CR": "Costa Rica",
        "KW": "Kuwait",
        "LV": "Latvia",
        "LB": "Lebanon",
        "LT": "Lithuania",
        "MK": "Macedonia",
        "MY": "Malaysia",
        "MT": "Malta",
        "MA": "Morocco",
        "MX": "Mexico",
        "MD": "Moldova",
        "MM": "Myanmar",
        "NL": "Netherlands",
        "NI": "Nicaragua",
        "NZ": "New Zealand",
        "NO": "Norway",
        "AE": "United Arab Emirates",
        "OM": "Oman",
        "PK": "Pakistan",
        "PA": "Panama",
        "PY": "Paraguay",
        "PE": "Peru",
        "PL": "Poland",
        "PT": "Portugal",
        "RU": "Russian Federation",
        "RO": "Romania",
        "SV": "El Salvador",
        "SA": "Saudi Arabia",
        "SN": "Senegal",
        "RS": "Serbia",
        "SG": "Singapore",
        "SK": "Slovakia",
        "SI": "Slovenia",
        "US": "USA",
        "TH": "Thailand",
        "TW": "Taiwan",
        "TN": "Tunisia",
        "TR": "Turkey",
        "UA": "Ukraine",
        "UY": "Uruguay",
        "PH": "Philippines",
        "FI": "Finland",
        "FR": "France",
        "HR": "Croatia",
        "CZ": "Czech Republic",
        "CL": "Chile",
        "CH": "Switzerland",
        "SE": "Sweden",
        "EC": "Ecuador",
        "EE": "Estonia",
        "ZA": "South Africa",
        "JM": "Jamaica",
        "JP": "Japan",
        "IE": "Ireland",
        "NG": "Nigeria",
        "MZ": "Mozambique"
      }
    },
  }
}))
