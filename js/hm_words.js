var animals_pool = ['alligator', 'ant', 'bear', 'bee', 'bird', 'camel', 'cat', 'cheetah', 'chicken', 'chimpanzee', 'cow', 'crocodile', 'deer', 'dog', 'dolphin', 'duck', 'eagle', 'elephant', 'fish', 'fly', 'fox', 'frog', 'giraffe', 'goat', 'goldfish', 'hamster', 'hippopotamus', 'horse', 'kangaroo', 'kitten', 'leopard', 'lion', 'lizard', 'lobster', 'monkey', 'octopus', 'ostrich', 'otter', 'owl', 'oyster', 'panda', 'parrot', 'pelican', 'pig', 'pigeon', 'porcupine', 'puppy', 'rabbit', 'rat', 'reindeer', 'rhino', 'ceros', 'rooster', 'scorpion', 'seal', 'shark', 'sheep', 'shrimp', 'snail', 'snake', 'sparrow', 'spider', 'squid', 'squirrel', 'swallow', 'swan', 'tiger', 'toad', 'tortoise', 'turtle', 'vulture', 'walrus', 'weasel', 'whale', 'wolf', 'zebra'];
    
var body_pool = ['ankle', 'arm', 'back', 'beard', 'blood', 'body', 'bone', 'brain', 'cheek', 'chest', 'chin', 'ear', 'ears', 'elbow', 'eye', 'eyes', 'face', 'feet', 'finger', 'fingers', 'flesh', 'foot', 'hair', 'hand', 'hands', 'head', 'heart', 'hip', 'knee', 'knees', 'leg', 'legs', 'lip', 'moustache', 'mouth', 'muscle', 'nail', 'neck', 'nose', 'shoulder', 'shoulders skin', 'stomach', 'teeth', 'throat', 'thumb', 'thumbs', 'toe', 'toes', 'tongue', 'tooth', 'wrist'];
    
var buildings_pool = ["airport", "apartment", "building", "bakery", "bank", "cafe", "cathedral", "church", "cinema", "hospital", "house library", "museum", "restaurant", "shrine", "supermarket", "temple"];
    
var city_pool = ["street", "avenue", "square", "building", "parade", "park", "sidewalk", "roadway", "mailbox", "fountain", "subway", "entrance"];
    
var clothes_pool = ["belt", "blouse", "boots", "cap", "cardigan", "coat", "dress", "gloves", "hat", "jacket", "jeans", "jumper", "mini-skirt", "overalls", "overcoat", "pajamas", "pants", "pantyhose", "raincoat", "scarf shirt", "shoes", "shorts", "skirt", "slacks", "slippers", "socks", "stockings", "suit", "sweater", "sweatshirt", "tie", "trousers", "underclothes", "underpants", "undershirt", "vest"];
    
var computer_pool = ["cdrom", "close", "click", "copy", "cut", "command", "database", "digital", "file", "find", "font", "format", "graphic", "icon", "hardware", "input", "interactive", "internet", "keyboard", "help", "memory", "menu", "modem", "mouse", "multimedia", "network", "numeric", "open", "output paste", "peripheral", "printer", "processing", "replace", "save", "scanner", "search", "select", "software", "text"];
    
var cosmetics_pool = ["aftershave", "cream", "deodorant", "eyeliner", "foundation", "fragrance", "lipstick", "makeup", "mask", "perfume", "shampoo", "soap"];
    
var criminals_pool = ["arsonist", "blackmailer", "burglar", "hijacker", "kidnapper", "mugger", "murderer", "pickpocket", "robber", "shoplifter", "smuggler", "spy", "terrorist", "thief", "vandal"];
    
var family_pool = ["aunt", "brother", "cousin daughter", "father", "granddaughter", "grandmother", "grandson", "mother", "nephew", "niece", "sister", "son", "stepdaughte", "rstepmother", "stepson", "uncle"];
    
var fruits_pool = ["apple", "apricot", "banana", "blackberry", "blueberry", "cherry", "cranberry", "currant", "fig", "grape", "grape", "fruit", "grapes", "kiwi", "kumquat", "lemon", "lime", "melon", "nectarine", "orange", "peach", "pearpersimmon", "pineapple", "plum", "pomegranate", "prune", "raspberry", "strawberry", "tangerine", "watermelon"];
    
var geography_pool = ["bay", "beach", "cave", "creek", "desert", "earth", "forest", "hill", "island", "lake", "mountain", "ocean", "peak", "plain", "pond", "river", "riverbed", "sea", "stream", "swamp", "valley", "waterfall", "woods"];
    
var house_pool = ["apartment", "ashtray", "attic", "basement", "bathroom", "bathtub", "bed", "bedding", "bedroom", "blanket", "bolt", "bookcase", "brick", "carpet", "ceiling", "cellar", "cement", "chair", "chimney", "closet", "concrete", "couch", "curtain", "cushion", "desk", "door", "doorstep", "drapes", "dresser", "fan", "faucet", "fireplace", "floor", "foundation", "furnace", "furniture", "glass", "hall", "hinge", "key", "lamp", "lock", "mirror", "nail", "paint", "picture", "plaster", "plumbing", "plywood", "porch", "rafter", "roof", "room", "rug", "screw", "shelf", "sink", "sofa", "stairs", "table", "toilet", "wall", "window", "wire", "wood"];
    
var jobs_pool = ["accountant", "actor", "actress", "athlete", "author", "baker", "banker", "barber", "beautician", "broker", "burglar", "butcher", "carpenter", "chauffeur", "chef", "clerk", "coach", "craftsman", "criminal", "crook", "dentist", "doctor", "editor", "engineer", "farmer", "fisherman", "judge", "lawyer", "magician", "mechanic", "musician", "nurse", "pharmacist", "pilot", "poet", "policeman", "politician", "printer", "professor", "rabbi", "priest", "pastor", "sailor", "salesman", "shoemaker", "soldier", "tailor", "teacher", "veterinarian", "waiter", "waitress", "watchmaker"];
    
var music_pool = ["accordion", "alto", "banjo", "baritone", "bass", "bassoon", "beat", "cello", "chord", "clarinet", "clef", "composer", "composition", "cymbal", "drum", "flat", "flute", "guitar", "harmonica", "harp", "horn", "instrument", "lyrics", "mandolin", "melody", "musician", "notes", "oboe", "octave", "opera", "organ", "piano", "piccolo", "rhythm", "saxophone", "sing", "singer", "song", "soprano", "tempo", "tenor", "trombone", "trumpet", "tuba", "tune", "viola", "violin", "xylophone"];
    
var subjects_pool = ["algebra", "anatomy", "anthropology", "archeology", "architecture", "artastronomy", "biology", "botany", "calculus", "chemistry", "economics", "engineering", "English", "geography", "geology", "geometry", "health", "history", "law", "literature", "math", "medicine", "music", "philosophy", "physics", "psychology", "science", "sociology", "statistics", "trigonometry", "zoology"];
    
var sports_pool = ["athletics", "baseball", "basketball", "bowling", "cycling", "football", "golf", "gymnastics", "handball", "hockey", "jogging", "polo", "rugby", "skiing", "snowboarding", "soccer", "softball", "squash", "swimming", "tabletennis", "tennis", "volleyball"];
    
var trees_pool = ["ash", "beech", "", "birch", "conifer", "fir", "larch", "maple", "oak", "pine", "spruce", "sycamore", "willow", "yew"];
    
var vehicles_pool = ["ambulance", "bicycle", "bulldozer", "bus", "jeep", "minibus", "motorcycle", "scooter", "sidecar", "snowplow", "tank", "taxi", "taxicab", "", "tractor", "wrecker"];
    
var weather_pool = ["air", "barometer", "blizzard", "Celsius", "chill", "cirrus", "cloud", "clouds", "cloudy", "cold", "cyclone", "degree", "dew", "drizzle", "dry", "Fahrenheit", "flood", "fog", "forecast", "freeze", "frost", "hail", "heath", "hot", "humidity", "hurricane", "ice", "lightning", "meteorology", "moon", "precipitation", "pressure", "radar", "rain", "rainstorm", "rainbow", "rainy", "sky", "sleet", "snow", "snowstorm", "snowy", "storm", "sun", "sunny", "temperature", "thermometer", "thunder", "thunderstorm", "tornado", "tsunami", "typhoon", "warm", "weather", "wind", "windy"];
    
var zodiac_pool = ["aquarius", "aries", "cancer", "capricorn", "gemini", "leo", "libra", "pisces", "sagittarius", "scorpio", "taurus", "virgo"];
/*
var super_table = [animals_pool, body_pool, buildings_pool, city_pool, clothes_pool, computer_pool, cosmetics_pool, criminals_pool, family_pool, fruits_pool, geography_pool, house_pool, jobs_pool, music_pool, subjects_pool, sports_pool, trees_pool, vehicles_pool, weather_pool, zodiac_pool];

for (var i=0; i < super_table.length; i++){
    console.log(super_table[i]);
    for (var j=0; j < super_table[i].length; j++){
        console.log(super_table[i][j].length);
    }
}
*/