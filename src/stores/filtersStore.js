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
      "type": "checkbox",
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
        "10": "EURO-6e"
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
        "6": "Other"
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
    }
  }
}))
