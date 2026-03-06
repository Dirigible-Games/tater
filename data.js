// ═══════════════════════════════════════════════════════════════
//  BARREL ROLL — BOTTLE NAME DATABASE & GENERATOR
//  Exposes global window.DB
// ═══════════════════════════════════════════════════════════════
window.DB = (function () {

  // ── helpers ─────────────────────────────────────────────────
  const pick  = a => a[Math.floor(Math.random() * a.length)];
  const rand  = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
  const randF = (lo, hi) => Math.random() * (hi - lo) + lo;
  const pct   = p => Math.random() < p; // p = 0..1

  // ── FIRST NAMES ──────────────────────────────────────────────
  const FIRST_NAMES = [
    'Abraham','Amos','Angus','Archibald','Augustus',
    'Baldwin','Benjamin','Beaumont','Boone','Beauregard','Birch','Bishop',
    'Calvin','Carter','Cecil','Chester','Clay','Clayton','Clyde','Cornelius','Conrad','Calhoun',
    'Daniel','Dalton','Dawson','Denton','Devlin','Doyle',
    'Elias','Elijah','Emmett','Ernest','Ezekiel','Ezra','Edison','Edmund','Ellsworth',
    'Fletcher','Floyd','Ford','Franklin','Forrest','Foster',
    'George','Grady','Grant','Grayson','Garland','Garrison',
    'Harlan','Harrison','Harvey','Henry','Hiram','Homer','Horace','Hatcher','Hayward','Hudson',
    'Isaiah','Isaac','Irwin','Ira',
    'Jacob','James','Jasper','Jefferson','Jesse','John','Josiah','Jedediah','Jonah','Junior',
    'Knox','Kennard',
    'Lawson','Leroy','Levi','Lincoln','Lyman','Landon','Lafayette','Lemuel',
    'Marcus','Marshall','Mason','Mercer','Milton','Macon','Monroe','Matthias',
    'Nathan','Nelson','Noah','Nathaniel','Nestor',
    'Oliver','Orville','Oscar','Obadiah','Otis',
    'Patrick','Percy','Preston','Prescott','Phineas',
    'Quincy',
    'Randall','Raymond','Reuben','Richard','Robert','Rufus','Russell','Raleigh','Roscoe',
    'Samuel','Silas','Solomon','Sterling','Stewart','Sylvester','Shelby',
    'Thomas','Theodore','Tillman','Thaddeus','Travis',
    'Vernon','Victor','Virgil','Vance',
    'Walter','Warren','Wesley','William','Willis','Wilson','Weston','Woodrow',
    'Zachary','Zebediah',
  ];
  const FIRST_NAME_SET = new Set(FIRST_NAMES);

  // ── INITIALS (letter only; code appends the dot) ─────────────
  const INITIALS = ['A','B','C','D','E','F','G','H','J','K','L','M',
                    'N','O','P','R','S','T','V','W'];

  // ── LAST NAMES ───────────────────────────────────────────────
  const LAST_NAMES = [
    'Adair','Aldridge','Archer','Ashford','Ashby','Alcott',
    'Barlow','Barton','Beaumont','Birch','Blackwell','Blaine','Blake',
    'Bowman','Bradford','Breckinridge','Bridwell','Briggs','Brooks',
    'Buchanan','Bullitt','Burkett','Burnham','Burroughs',
    'Caldwell','Callahan','Campbell','Canton','Carver','Cassidy',
    'Chandler','Chapman','Clayborn','Coltrane','Combs','Conway',
    'Cooper','Corbett','Corcoran','Covington','Crawford','Crockett','Crosby','Culpepper',
    'Dalton','Davenport','Davidson','Davis','Dawson','Delacroix',
    'Dillard','Dobbins','Dockery','Donovan','Drake','Dunbar','Duncan','Dupree',
    'Eaton','Eldridge','Ellison','Elmore','Embry','Emerson',
    'Fairfax','Faulkner','Ferguson','Finley','Fitzgerald','Fletcher',
    'Ford','Forrest','Franklin','Frazier','Fulton','Foard','Fontaine',
    'Garrison','Gentry','Gibson','Gilmore','Goodwin','Gordon',
    'Graham','Grant','Grayson','Greene','Greer','Griffin','Greenfield','Grimes',
    'Hamilton','Hammond','Hampton','Hancock','Hardin','Harlow',
    'Harper','Harrison','Hartley','Hawkins','Hayden','Hayes',
    'Henderson','Holloway','Holmes','Houston','Howard','Hudson',
    'Hughes','Hunter','Halcomb','Hardesty','Hargrave',
    'Ingram','Irons',
    'Jackson','Jefferson','Jenkins','Johnson','Jordan','Jarvis','Jett',
    'Keaton','Keller','Kendall','Kennedy','Kincaid','Kingsley','Kirby','Knott',
    'Lamar','Langford','Lanier','Lawson','Ledbetter','Lee',
    'Leonard','Lester','Logan','Longstreet','Lacey','Lattimore','Loftis',
    'MacAllister','Macon','Madison','Manning','Marshall','Mason',
    'Massey','McAllister','McCabe','McClellan','McIntyre','McKinley',
    'Mercer','Miller','Mitchell','Monroe','Montgomery','Moore',
    'Morgan','Morris','Morrison','Mobley','Munford',
    'Nash','Nelson','Nichols','Noble','Noel','Nance','Needham',
    'Ogden','Olmstead','Owens','Oglesby',
    'Parker','Paxton','Pearce','Pemberton','Pennington','Perkins',
    'Perry','Phelps','Pierce','Polk','Porter','Powell','Preston','Price',
    'Patton','Pickett','Plunkett','Pruitt',
    'Ramsey','Randolph','Rawlings','Reid','Reynolds','Rhodes',
    'Richardson','Ridley','Riggs','Riley','Rivers','Robinson',
    'Rockwell','Rogers','Roper','Ross','Rowe','Rutherford',
    'Ragland','Renfroe','Revell',
    'Saunders','Sawyer','Scott','Shelton','Sherman','Simmons',
    'Sinclair','Sloane','Smith','Spencer','Stafford','Stanfield',
    'Stanley','Stanton','Stark','Stephens','Sterling','Stevens',
    'Stewart','Stone','Sullivan','Sevier','Slade','Stroud','Swann',
    'Tanner','Taylor','Thatcher','Thomas','Thompson','Thornton',
    'Tillman','Todd','Tucker','Turner','Tabor','Tarrant','Tatum',
    'Underwood','Utterback',
    'Vance','Vanderbilt','Vinson','Venable',
    'Wade','Walker','Wallace','Waller','Walsh','Walton','Warren',
    'Washington','Watson','Webb','Wheeler','Whitfield','Wilder',
    'Williams','Wilson','Winthrop','Wofford','Woodard','Woodson','Wright',
    'Waddell','Warwick','Welch','Westbrook',
    'Yates','Young','Yancey',
    'Zachary','Ziegler',
  ];

  // ── PLACE / NATURE WORDS ─────────────────────────────────────
  const PLACE_WORDS = [
    'Appalachian','Appomattox','Ashland','Augusta','Allegheny','Arrowhead',
    'Bardstown','Battleground','Bayou','Belfry','Bellmont','Berea',
    'Berkshire','Blueridge','Bluewater','Boone','Bourbon','Brookside','Bramble','Branchwater',
    'Canewood','Canebrake','Carlisle','Cascade','Cavern','Cedarwood',
    'Centennial','Chestnut','Chickasaw','Chickamauga','Clearwater',
    'Clifton','Cloverfield','Copperhead','Cornfield','Cornerstone',
    'Creekside','Cumberland','Copperline','Coldwater','Crossroads',
    'Darkwater','Deepwood','Delaware','Driftwood','Duskwood','Dustyroad',
    'Elkhorn','Elmwood','Edgewood','Etowah',
    'Fairfield','Fallen','Farrow','Fieldstone','Foxfire','Frankfort','Fernwood','Flintlock',
    'Glencoe','Goldenvale','Grainfield','Greenbriar','Gravelly','Greenvale',
    'Hardwood','Harrodsburg','Hartland','Hawkridge','Hazard',
    'Heritage','Hickory','Highland','Hillcrest','Hillside','Holston',
    'Homestead','Hemlock','Horseshoe','Hogback',
    'Ironwood','Ironclad','Ivystone',
    'Kentucky','Kettle','Knob','Kingsport',
    'Lakewood','Laurel','Lawrenceburg','Licking','Limestone','Locust','Lonesome','Lowlands',
    'Magnolia','Mammoth','Maywood','Meadowbrook','Millstone',
    'Mockingbird','Muddy','Morehead','Mossy','Millrun',
    'Narrows','Nighthawk','Northfield','Natchez','Needmore',
    'Oakdale','Oakfield','Oakridge','Oldham','Overton','Oxbow',
    'Paddock','Palmetto','Panther','Pawpaw','Pearlstone','Piedmont',
    'Pinecrest','Pineridge','Piney','Prairie','Possum','Puncheon',
    'Ravenwood','Redstone','Ridgemont','Ridgewood','Riverbank',
    'Riverbend','Riverside','Riverton','Rockcastle','Rockford',
    'Rockhouse','Rocky','Rosewood','Roughstock','Ridgetop','Rimrock',
    'Saddlewood','Saltlick','Sawmill','Shawnee','Shelby','Shenandoah',
    'Silo','Silvergate','Silverton','Sinkhole','Smoky','Springhouse',
    'Stonefort','Stonegate','Stonewall','Summerfield','Sundown',
    'Sandstone','Sawgrass','Shadywood',
    'Tallgrass','Talon','Tennessee','Thistlewood','Thornberry',
    'Thunderhead','Timber','Timberline','Tobacco','Trace',
    'Tuckahoe','Thornfield','Tullahoma',
    'Underhill','Upstream','Uppercreek',
    'Valleystone','Verdant','Vicksburg','Vinemont',
    'Walnut','Waterfall','Watershed','Waverly','Wayward','Westwood',
    'Wheatfield','Whitetail','Wildwood','Willowbrook','Windmill',
    'Wiregrass','Woodford','Woodland','Woodsmoke','Worthington','Wolfpen',
    'Yellowstone','Yucca',
  ];

  // ── DESCRIPTOR WORDS ─────────────────────────────────────────
  const DESCRIPTOR_WORDS = [
    'Aged','Amber','Ancient','Antique','Artisan','Ashen',
    'Barrel','Bonded','Bottled','Browned','Burnished',
    'Cedar','Char','Classic','Copper','Craft','Creek','Crest','Cured',
    'Dark','Deep','Double','Draft','Dram','Distilled','Drawn','Dried',
    'Eagle','Elder','Estate','Enduring',
    'Farm','Field','Fine','Fire','First','Fort','Fired','Flat','Forged',
    'Gold','Golden','Grand','Great','Grained',
    'Hand','Hard','Harvest','Heart','Heirloom','Hewn','High',
    'Iron',
    'Judge','Joint',
    'Kettle','Kilned',
    'Last','Legacy','Limited','Long','Lush','Laid',
    'Master','Mellow','Mill','Malted','Marked',
    'New','Noble','North','Neat',
    'Oak','Old','Open','Oaken',
    'Peated','Pioneer','Pot','Pure','Pressed','Primed',
    'Quarter','Quartered',
    'Rare','Raw','Reserve','Rich','Ridge','Ripe','River','Rock',
    'Rough','Round','Run','Roasted','Rustic',
    'Select','Single','Small','Smoke','Smooth','Sour','Special',
    'Spring','Still','Stone','Straight','Strong','Scorched','Steeped','Struck',
    'Three','True','Twice','Tested','Timber','Toasted',
    'Union','Uncut','Unfiltered',
    'Valley','Vintage','Vaulted',
    'Weathered','Well','West','Wheat','White','Wild','Winter','Wood','Worn','Whispered',
    'Young','Yielded',
  ];

  // ── NOUN / CLOSING WORDS ─────────────────────────────────────
  const NOUN_WORDS = [
    'Barrel','Batch','Blaze','Blend','Block','Bond','Bottom','Branch',
    'Brew','Bridge','Brine','Brook',
    'Cache','Cask','Cedar','Char','Choice','Claim','Classic',
    'Collection','Courage','Craft','Creek','Crest','Char','Cord',
    'Dram','Draft','Draw','Drop','Dust',
    'Edge','Essence','Estate','Expression','Ember',
    'Farm','Fire','Flask','Ford','Forge','Fork','Fort','Foundation','Flint',
    'Gate','Gem','Glen','Gold','Grain','Grant','Gravel','Ground','Gulch',
    'Harvest','Haven','Heart','Heritage','Hill','Hollow','Home','Honor','Haze',
    'Iron','Inlet',
    'Journey','Jug',
    'Keg','Knob','Keep',
    'Label','Legacy','Lot','Ledge',
    'Malt','Mark','Mash','Meadow','Mill','Mist','Mash','Mane',
    'Oak','Origin','Oath',
    'Path','Peak','Point','Post','Pour','Pride','Proof','Porch',
    'Rafter','Ranch','Range','Reserve','Ridge','Rill','Rise',
    'Rock','Root','Run','Rush','Rack','Rye',
    'Select','Shade','Shelf','Sign','Silo','Smoke','Source','Spirit',
    'Spring','Stack','Stave','Still','Stock','Stone','Store','Stream',
    'Strength','Strike','Sip','Slate',
    'Timber','Toast','Top','Torch','Trace','Trail','Tun','Turn','Tide',
    'Valley','Vault','View','Veil',
    'Water','Well','Wheat','Whisper','Wood','Worth','Wisp',
    'Yield','Yoke',
  ];

  // ── MODIFIER DEFINITIONS ─────────────────────────────────────
  // proofEffect: null | 'lock100' | 'fullproof'
  const MODIFIERS = {
    'Single Barrel':   { minBonus:8,  maxBonus:60, proofEffect: null,        minRarity:'common',   tier:'process' },
    'Small Batch':     { minBonus:0,  maxBonus:0,  proofEffect: null,        minRarity:'common',   tier:'process' },
    'Bottled-in-Bond': { minBonus:8,  maxBonus:17, proofEffect: 'lock100',   minRarity:'common',   tier:'process' },
    'Full Proof':      { minBonus:12, maxBonus:45, proofEffect: 'fullproof', minRarity:'common',   tier:'process' },
    'Double Oaked':    { minBonus:25, maxBonus:55, proofEffect: null,        minRarity:'uncommon', tier:'process' },
    'French Oaked':    { minBonus:10, maxBonus:33, proofEffect: null,        minRarity:'uncommon', tier:'process' },
  };

  // ── RARITY CONFIG ─────────────────────────────────────────────
  const RARITY_CONFIG = {
    common: {
      baseMsrp:     [12, 40],
      modPool:      ['Single Barrel','Small Batch','Bottled-in-Bond','Full Proof'],
      modChance:    0.50,
      ageChance:    0,
      dualChance:   0,
      sparseChance: 0,
      // name patterns available to this tier
      patterns:     ['place','name','place+noun','descriptor+noun','name+noun'],
    },
    uncommon: {
      baseMsrp:     [38, 70],
      modPool:      ['Single Barrel','Small Batch','Bottled-in-Bond','Full Proof',
                     'Double Oaked','French Oaked'],
      modChance:    0.60,
      ageChance:    0,
      dualChance:   0,
      sparseChance: 0,
      patterns:     ['place','name','place+noun','descriptor+noun','name+noun',
                     'place+descriptor+noun'],
    },
    rare: {
      baseMsrp:     [65, 92],
      modPool:      ['Single Barrel','Small Batch','Bottled-in-Bond','Full Proof',
                     'Double Oaked','French Oaked'],
      // Rare: age XOR process — handled in selectModifiers
      modChance:    0.50,
      ageChance:    0.45,
      dualChance:   0,
      sparseChance: 0,
      patterns:     ['place+noun','descriptor+noun','name+noun',
                     'place+descriptor+noun','name+descriptor+noun'],
    },
    epic: {
      baseMsrp:     [88, 115],
      modPool:      ['Single Barrel','Small Batch','Bottled-in-Bond','Full Proof',
                     'Double Oaked','French Oaked'],
      modChance:    0.70,
      ageChance:    0.60,
      dualChance:   0.45,   // both age AND process
      sparseChance: 0,
      patterns:     ['place+descriptor+noun','name+descriptor+noun',
                     'place+place+noun','name+noun','place+noun'],
    },
    legendary: {
      baseMsrp:     [110, 185],
      modPool:      ['Single Barrel','Small Batch','Bottled-in-Bond','Full Proof',
                     'Double Oaked','French Oaked'],
      modChance:    0.72,
      ageChance:    0.68,
      dualChance:   0.55,
      sparseChance: 0.15,   // chance of *no* modifier at all
      patterns:     ['place+descriptor+noun','name+descriptor+noun',
                     'place+place+noun','name+noun'],
    },
  };

  // ── BOTTLE VISUAL STYLES (per rarity) ───────────────────────
  const BOTTLE_STYLES = {
    common: [
      { shape:'standard',    glass:'#4a2800', label:'#1a0f00', accent:'#c8a050', cap:'#2a1500' },
      { shape:'cylindrical', glass:'#3d2010', label:'#0f0800', accent:'#b89040', cap:'#1a0a00' },
      { shape:'squat',       glass:'#5a3015', label:'#1e1005', accent:'#d4a848', cap:'#2e1808' },
      { shape:'flask',       glass:'#6B3A2A', label:'#1a1a1a', accent:'#c8a04a', cap:'#333'   },
    ],
    uncommon: [
      { shape:'tall',        glass:'#3a4820', label:'#141e08', accent:'#90b840', cap:'#202c10' },
      { shape:'standard',    glass:'#284030', label:'#0e1810', accent:'#60c880', cap:'#182818' },
      { shape:'flask',       glass:'#483820', label:'#1c1408', accent:'#c0902a', cap:'#281c0a' },
      { shape:'cylindrical', glass:'#3a3a10', label:'#181808', accent:'#c8c048', cap:'#202008' },
    ],
    rare: [
      { shape:'tall',        glass:'#203850', label:'#080e1c', accent:'#4090d8', cap:'#101e30' },
      { shape:'decanter',    glass:'#182840', label:'#080e18', accent:'#5080c0', cap:'#0e1828' },
      { shape:'flared',      glass:'#283060', label:'#0c1020', accent:'#6070e0', cap:'#141828' },
      { shape:'round',       glass:'#2a3850', label:'#0a1020', accent:'#50a0d0', cap:'#101828' },
    ],
    epic: [
      { shape:'decanter',    glass:'#381848', label:'#140818', accent:'#b050e0', cap:'#1e0c28' },
      { shape:'flared',      glass:'#401060', label:'#180820', accent:'#c060f0', cap:'#200a30' },
      { shape:'round',       glass:'#302050', label:'#101020', accent:'#9040c8', cap:'#181028' },
      { shape:'tall',        glass:'#482858', label:'#181028', accent:'#d070f8', cap:'#241038' },
    ],
    legendary: [
      { shape:'decanter',    glass:'#3a3000', label:'#140e00', accent:'#ffd700', cap:'#1e1800' },
      { shape:'round',       glass:'#2a2800', label:'#0e0e00', accent:'#f0c000', cap:'#181600' },
      { shape:'flared',      glass:'#483800', label:'#180e00', accent:'#ffe040', cap:'#221400' },
      { shape:'tall',        glass:'#404000', label:'#181800', accent:'#ffd040', cap:'#201e00' },
    ],
  };

  // ── NAME GENERATION ──────────────────────────────────────────
  function makeInitial() { return pick(INITIALS) + '.'; }

  // Builds a human name: FirstName [Initial.] LastName  OR  Initial. [Initial.] LastName
  function makePersonName() {
    if (pct(0.30)) {
      // Initial-led: "E. H. Taylor" style
      let parts = [makeInitial()];
      if (pct(0.40)) parts.push(makeInitial());
      parts.push(pick(LAST_NAMES));
      return parts.join(' ');
    } else {
      // First-name-led: "John J. Bowman" style
      let parts = [pick(FIRST_NAMES)];
      if (pct(0.35)) parts.push(makeInitial());
      parts.push(pick(LAST_NAMES));
      return parts.join(' ');
    }
  }

  function applyPattern(pattern) {
    switch (pattern) {
      case 'name':                  return makePersonName();
      case 'place':                 return pick(PLACE_WORDS);
      case 'place+noun':            return pick(PLACE_WORDS)      + ' ' + pick(NOUN_WORDS);
      case 'descriptor+noun':       return pick(DESCRIPTOR_WORDS) + ' ' + pick(NOUN_WORDS);
      case 'name+noun':             return makePersonName()        + ' ' + pick(NOUN_WORDS);
      case 'place+descriptor+noun': return pick(PLACE_WORDS) + ' ' + pick(DESCRIPTOR_WORDS) + ' ' + pick(NOUN_WORDS);
      case 'name+descriptor+noun':  return makePersonName()  + ' ' + pick(DESCRIPTOR_WORDS) + ' ' + pick(NOUN_WORDS);
      case 'place+place+noun':      return pick(PLACE_WORDS) + ' ' + pick(PLACE_WORDS)      + ' ' + pick(NOUN_WORDS);
      default:                      return pick(PLACE_WORDS) + ' ' + pick(NOUN_WORDS);
    }
  }

  // ── MODIFIER SELECTION ───────────────────────────────────────
  function selectModifiers(rarity) {
    const cfg = RARITY_CONFIG[rarity];
    let processMod = null;
    let ageMod = null;

    // Legendary sparse roll — no modifiers
    if (cfg.sparseChance > 0 && pct(cfg.sparseChance)) {
      return { processMod, ageMod };
    }

    // Age statement eligibility (rare+)
    const rollAge     = cfg.ageChance > 0 && pct(cfg.ageChance);
    const rollProcess = pct(cfg.modChance);

    if (rarity === 'rare') {
      // Rare: age XOR process, not both
      if (rollAge) {
        ageMod = buildAgeMod();
      } else if (rollProcess) {
        processMod = buildProcessMod(cfg.modPool);
      }
    } else if (rarity === 'epic' || rarity === 'legendary') {
      // Epic/Legendary: both possible
      if (rollAge)     ageMod     = buildAgeMod();
      if (rollProcess) processMod = buildProcessMod(cfg.modPool);
      // If only one fired, chance to also give the other
      if (ageMod && !processMod && pct(cfg.dualChance)) processMod = buildProcessMod(cfg.modPool);
      if (processMod && !ageMod && pct(cfg.dualChance)) ageMod     = buildAgeMod();
    } else {
      // Common / Uncommon: process only
      if (rollProcess) processMod = buildProcessMod(cfg.modPool);
    }

    return { processMod, ageMod };
  }

  function buildAgeMod() {
    const years = rand(7, 20);
    const bonusPerYear = randF(10, 17);
    return { years, bonus: Math.round(years * bonusPerYear) };
  }

  function buildProcessMod(pool) {
    const key = pick(pool);
    const def = MODIFIERS[key];
    const bonus = rand(def.minBonus, def.maxBonus);
    return { key, bonus, proofEffect: def.proofEffect };
  }

  // ── PROOF GENERATION ─────────────────────────────────────────
  function generateProof(processMod, msrp) {
    const isSingleBarrel  = processMod && processMod.key === 'Single Barrel';
    const isBottledInBond = processMod && processMod.key === 'Bottled-in-Bond';
    const isFullProof     = processMod && processMod.key === 'Full Proof';

    if (isBottledInBond) return 100;

    let base;
    if (msrp > 25) {
      // Expensive bottles: floor at 94, skew toward higher end (88–104 range biased up)
      // Blend two samples and take the higher one to bias upward
      const lo = randF(94.0, 104.0);
      const hi = randF(96.0, 115.0);
      // Weight toward hi more as price rises, capped influence at $120
      const t = Math.min(1, (msrp - 25) / 95);
      base = lo + (hi - lo) * t * 0.65;
      base = Math.max(94.0, base);
    } else {
      // Standard range: mostly 80–95, 12% chance of 95–104
      base = pct(0.12) ? randF(95.0, 104.0) : randF(80.0, 95.0);
    }

    if (isFullProof) base += randF(21, 44);

    base = Math.min(base, 145);

    if (isSingleBarrel) {
      return Math.round(base * 10) / 10;
    } else if (pct(0.07)) {
      return Math.round(base * 10) / 10;
    } else {
      return Math.round(base);
    }
  }

  // ── ABBREVIATION FOR LABEL ───────────────────────────────────
  function makeShort(baseName) {
    const words = baseName.split(' ').filter(w => w.length > 1 && !w.endsWith('.'));
    if (words.length === 0) return baseName.slice(0, 4).toUpperCase();
    if (words.length === 1) return words[0].slice(0, 5).toUpperCase();
    return words.map(w => w[0]).join('').slice(0, 5).toUpperCase();
  }

  // ── TASTING NOTE DESCRIPTORS ─────────────────────────────────

  const NOSE = {
    flawed: [
      'rubber tires', 'sawdust', 'pencil shavings', 'machine oil', 'harsh solvent',
      'wet cardboard', 'stale grain sacks', 'turpentine', 'nail polish remover',
      'burning plastic', 'musty attic', 'cheap rubbing alcohol', 'sulfur',
      'acetone', 'paint thinner', 'overcooked cabbage', 'damp newspaper',
      'motor grease', 'scorched rubber', 'industrial cleaning fluid',
      'hot asphalt', 'band-aids and grain alcohol', 'raw ammonia', 'lighter fluid',
      'singed carpet', 'stale gym bag', 'metallic rust', 'acrid smoke',
      'burnt matchsticks', 'canned vegetables left open', 'rubber cement',
      'old mop water', 'stagnant grain', 'cheap plastic packaging',
      'vinegar-soaked wood', 'bitter artificial sweetener', 'latex gloves',
      'overheated electronics', 'rancid cooking oil', 'flat, lifeless grain',
      'chlorine and stale yeast', 'burnt hair', 'bleach and raw spirit',
      'cheap air freshener over grain alcohol', 'musty basement and wet stone',
      'methylated spirits', 'nail salon and bad decisions', 'spoiled grain mash',
      'diesel exhaust and wood pulp', 'rust and dry rot', 'cat litter and ethanol',
      'synthetic fruit flavoring', 'industrial solvent and nothing else',
      'burnt rubber and bad yeast', 'hospital corridor', 'sour mash gone wrong',
      'unfinished particle board', 'chemical fertilizer', 'fermentation gone wrong',
      'overripe and rotten grain', 'paint stripper and corn mash',
      'an old radiator', 'cheap cologne over ethanol', 'scorched plastic and flat grain',
      'varnish remover', 'damp concrete and raw spirit', 'industrial floor cleaner',
      'battery acid and stale ferment', 'something that should have been discarded earlier',
      'warm solvent over nothing pleasant', 'burnt wood and raw grain spirit',
      'formaldehyde and flat sweetness', 'stale acetone and corn chaff',
      'sour dishwater and ethanol', 'mildewed barrel with no redemptive character',
      'burnt copper and sulfurous grain', 'engine degreaser',
      'something gone wrong at the distillery level',
    ],
    light: [
      'light vanilla', 'fresh grain', 'mild caramel', 'young oak', 'soft corn',
      'faint honey', 'light citrus peel', 'dried hay', 'mild biscuit',
      'powdered sugar', 'light apple', 'green wood', 'fresh straw', 'soft peach',
      'cornbread', 'light butterscotch', 'faint cinnamon', 'white sugar',
      'sweet cream', 'gentle malt', 'light pear', 'apricot skin', 'marshmallow',
      'fresh-cut wood', 'light lemon zest', 'gentle wildflower honey',
      'rice pudding', 'soft brioche', 'faint almond', 'light brown butter',
      'mild clover honey', 'fresh popcorn', 'gentle peach blossom',
      'whipped cream', 'light waffle cone', 'sweet grain dust',
      'new leather on a warm day', 'faint dried chamomile', 'mild coconut',
      'soft toffee at a distance', 'clean rainwater over grain',
      'light cake frosting', 'faint nectarine', 'mild white pepper',
      'a whisper of oak sawdust', 'soft cotton candy', 'light banana',
      'barely-there cinnamon sugar', 'soft wheat bread', 'faint green apple',
      'mild cream soda', 'gentle dried grass', 'light confectioners sugar',
      'faint fresh-baked cookie', 'soft corn silk', 'mild honeydew melon',
      'a hint of dried flowers', 'light lychee', 'subtle barley sweetness',
      'gentle pineapple at a distance', 'faint jasmine and soft grain',
      'light rice cake and mild sweetness', 'soft golden raisin',
      'barely noticeable oak with sweet grain', 'light bread pudding',
      'mild peach tea', 'faint dried apple chip', 'soft yellow cake',
      'light crystallized ginger at distance', 'mild sweet cream butter',
      'faint rubber-free oak and corn', 'clean neutral spirit with light vanilla',
      'gentle summer fruit', 'mild warm custard', 'lightly perfumed grain',
      'soft caramel corn', 'faint pear drop candy', 'mild honeysuckle',
      'light tropical fruit suggestion', 'a breath of warm bakery',
      'soft dried apricot at a distance', 'mild almond milk',
    ],
    mid: [
      'caramel apple', 'toasted oak', 'brown sugar', 'butterscotch', 'cinnamon spice',
      'dried cherry', 'baked bread', 'clove', 'orange zest', 'roasted corn',
      'warm leather', 'toffee', 'peach preserve', 'dried apricot', 'nutmeg',
      'warm vanilla', 'honeyed grain', 'candied orange peel', 'light tobacco',
      'lightly charred wood', 'banana bread', 'maple syrup', 'toasted almond',
      'dried cranberry', 'black pepper', 'cherry cola', 'praline', 'ginger snap',
      'coconut husk', 'cardamom', 'rye bread', 'fig jam', 'plum skin',
      'dried peach', 'toasted marshmallow', 'brown butter', 'vanilla wafer',
      'light molasses', 'blackberry jam', 'roasted hazelnut', 'dried orange peel',
      'peanut brittle', 'pecan pie', 'warm spiced apple cider', 'dried mango',
      'toasted sesame', 'soft candied ginger', 'butter pecan', 'honey wheat',
      'mild pipe tobacco at distance', 'cotton candy corn', 'nectarine and oak',
      'dried blueberry', 'salted caramel', 'toasted wheat bread', 'light cherry wood',
      'granola and honey', 'warm rum raisin', 'baked apple with cinnamon',
      'dried apricot jam', 'toasted sunflower seeds', 'honeycomb and light grain',
      'cinnamon roll', 'warm corn tortilla', 'light molasses and vanilla',
      'roasted peanut and caramel', 'candied lemon peel', 'dried plum',
      'light hay and vanilla', 'warm beeswax', 'toasted rice and honey',
      'apricot preserves', 'spiced pear', 'amber honey and grain',
      'freshly cracked black pepper and oak', 'fig cookie', 'marzipan',
      'toasted rye and brown sugar', 'sweet corn and mild oak',
      'dried strawberry jam', 'mild clove and dried peach',
      'roasted oat and caramel', 'light pipe tobacco and vanilla',
      'brown sugar crusted pecan', 'warm caramel and mild spice',
      'dried nectarine and grain', 'toasted cornbread and honey',
      'light cherry blossom and vanilla', 'dried papaya and spice',
      'caramel sauce and cracked pepper', 'warm lemon tart',
      'apple fritter and mild oak', 'roasted grain and fig',
      'lightly smoked honey', 'toasted hazelnut and soft caramel',
      'dried elderberry and spice', 'mild chicory and brown sugar',
      'candied walnut and vanilla cream', 'spiced bread pudding',
      'soft tobacco leaf and caramel', 'coconut macaroon and light oak',
      'light dark fruit and warm grain', 'honey roasted almond',
      'toasted oat and brown sugar', 'warm dried cherry and grain',
    ],
    rich: [
      'dark chocolate', 'tobacco leaf', 'charred oak', 'deep molasses',
      'dried fig', 'espresso', 'black walnut', 'cedar', 'licorice root',
      'prune', 'aged leather', 'toasted coconut', 'dark cherry', 'dried dates',
      'cocoa powder', 'smoked caramel', 'stewed plum', 'pipe tobacco',
      'roasted coffee', 'bittersweet chocolate', 'dark toffee', 'toasted pecan',
      'tar and leather', 'candied walnut', 'anise seed', 'red fruit compote',
      'smoke and vanilla intertwined', 'old growth cedar', 'robust rye spice',
      'charred pecan shell', 'black currant', 'aged balsamic drizzle',
      'burnt orange rind', 'clove and dark sugar', 'roasted cacao nib',
      'black cherry preserve', 'toasted walnuts in dark syrup', 'woodsmoke and leather',
      'dried plum and dark oak', 'muscovado sugar', 'charred maple',
      'brandy-soaked raisin', 'dark dried blueberry', 'clove cigarette',
      'smoked jerky and sweet wood', 'strong black tea with honey',
      'roasted barley', 'singed oak stave', 'leather-bound books',
      'concentrated dark fig paste', 'bourbon barrel itself',
      'incense and dark sugar', 'cold espresso and caramel', 'dark rum undertones',
      'dried black olive and oak', 'smoked dried cherry', 'raw cacao and dark oak',
      'deep tobacco and molasses', 'charred walnut shell', 'dark dried mango',
      'coffee grounds and aged leather', 'dark plum wine reduction',
      'mahogany and dark fruit', 'roasted chicory and vanilla',
      'heavily charred wood and sweet dark fruit', 'smoked dark sugar',
      'tar-touched vanilla', 'dark caramel with smoke', 'aged rum and leather',
      'strong black coffee and brown spice', 'dried mission fig',
      'scorched caramel and deep oak', 'cracked black pepper and dark cherry',
      'charred plank and tobacco', 'dried rose hip and dark chocolate',
      'aged pu-erh and oak', 'deep anise and leather', 'smoked chocolate',
      'concentrated molasses and dried fig', 'dark walnut oil',
      'roasted grain and black cherry jam', 'ancient wood and dark spice',
      'dark caramelized onion and oak', 'singed tobacco and prune',
      'black peppercorn and dried currant', 'roasted cacao husk',
      'dried fig soaked in bourbon', 'charred cornhusk and leather',
      'dark treacle and toasted wood', 'smoked dried plum',
      'heavily toasted oak and molasses', 'concentrated dark balsamic',
      'roasted carob and dark oak', 'ancient cedarwood and dark fruit',
      'charred stave and dried prune', 'coffee-soaked dark wood',
    ],
    exotic: [
      'Oloroso sherry and dried fig', 'candied violet and warm cedar',
      'sandalwood and toasted coconut', 'smoked plum and dark cherry',
      'truffle and aged leather', 'saffron and honeycomb',
      'aged balsamic and dark chocolate', 'burnt sugar and black walnut',
      'marzipan and espresso', 'rain-soaked slate and oak resin',
      'rum-soaked golden raisin', 'black cardamom and fig preserve',
      'rose petal and smoked vanilla', 'dried hibiscus and praline',
      'smoked sea salt and butterscotch', 'toasted star anise and caramel',
      'beeswax and leather', 'old library and pipe tobacco',
      'dried lavender and charred pecan', 'wild honey and roasted grain',
      'port wine reduction and dark fruit', 'crystallized ginger and cocoa nib',
      'dark honey and funeral lilies', 'smoked pineapple and cedar',
      'Madeira wine and dried apricot', 'muscatel grape and toasted oak',
      'black truffle shavings over caramel', 'Persian rose water and dark chocolate',
      'aged cognac barrel and dried cherry', 'smoked paprika and molasses',
      'juniper berry and aged leather', 'dried tamarind and brown sugar',
      'toasted cardamom pods and vanilla bean', 'walnut oil and dark caramel',
      'pu-erh tea and smoked cedar', 'bitter orange marmalade and tobacco',
      'fig newton and whiskey-soaked oak', 'cherry blossom and dark rum',
      'clove-studded orange and dark honey', 'charred rosemary and toffee',
      'dried lychee and smoked wood', 'vetiver and aged cedar',
      'Amontillado sherry and toasted walnut', 'dried mango and dark spice',
      'smoked black cherry and old leather', 'leather and Darjeeling tea',
      'dark plum jam and charred vanilla', 'chestnut honey and toasted oak',
      'roasted chicory and dried fig', 'smoked orange peel and dark caramel',
      'anise-soaked raisin and cedar', 'dried persimmon and smoked oak',
      'cassis and old wood smoke', 'incense and dried stone fruit',
      'lapsang souchong and dark honey', 'prune eau de vie and vanilla',
      'tobacco flower and dark chocolate', 'black cardamom smoke and dried cherry',
      'aged tawny port and walnut', 'mezcal smoke and dark fruit',
      'dried pomegranate and old oak', 'rare wood resin and dark caramel',
      'smoked coconut and vanilla bean', 'amaro bitters and dark fig',
      'cognac-soaked oak and dried rose', 'dried date and smoked leather',
      'cardamom-spiced molasses', 'fig liqueur and charred wood',
      'black sesame and dark honey', 'dried Meyer lemon and smoked oak',
      'roasted hazelnut paste and dark fruit', 'rum raisin and tobacco leaf',
      'camphor wood and dark spice', 'vanilla pod and old cask resin',
      'black cherry liqueur and aged leather', 'fennel pollen and dark caramel',
      'smoked plum wine and old wood', 'dried bergamot and dark oak',
      'charred bamboo and sweet smoke', 'Rum-finished dark fruit and cedar',
      'ancho chili and dark chocolate', 'dried apricot soaked in cognac',
      'smoked fig and dark walnut', 'toasted black walnut and old leather',
      'dried currant and warm tobacco', 'coconut water and smoked oak',
      'wax-sealed old bottle nose', 'roasted pimento and dark grain',
      'black olive and smoked vanilla', 'bitter chocolate and old library',
      'smoked dried citrus and dark honey', 'dried violet and dark rum',
      'roasted cocoa nib and aged wood', 'dark raisin and tobacco flower',
      'miso caramel and smoked wood', 'salted dark chocolate and cedar',
    ],
    transcendent: [
      'an almost impossible convergence of smoked plum, aged leather, and sweet oak',
      'layers that unfold like a room full of antique books and dark fruit',
      'sandalwood and saffron drifting over a foundation of caramel and tobacco',
      'a whisper of beeswax, dark cherry, and something ancient in the wood',
      'fig, rose petal, and charred oak woven together with extraordinary delicacy',
      'the kind of nose that stops conversation — smoked vanilla, truffle, and dark raisin',
      'candied violet and Oloroso sherry over a deep bed of toasted coconut and spice',
      'crystallized honey, roasted pecan, and just a thread of black cardamom',
      'port wine, dried hibiscus, and old cedarwood in a harmony that defies easy description',
      'a nose so complex and alive it changes with every breath — dark fruit, spice, and silk',
      'deep dried cherry, worn leather, and smoked vanilla arriving all at once and making perfect sense',
      'something between a late-harvest wine and an old whiskey library — neither and both simultaneously',
      'caramel, incense, and dark stone fruit drifting together like smoke from a rare wood fire',
      'marzipan, aged cognac, and charred oak — each note impossibly distinct, impossibly unified',
      'the nose alone is worth the price of admission: dark honey, truffle, and something almost floral',
      'dried rose, black cardamom, and tobacco leaf over a bed of caramel that never quite resolves',
      'a convergence of notes that shouldn\'t work together and are somehow perfect — dark fruit, slate, and beeswax',
      'roasted grain and dark chocolate so well integrated they read as a single, extraordinary note',
      'the air above the glass smells like someone made caramel in an old library during a thunderstorm',
      'smoked plum, saffron, and sweet oak drifting in layers that reward a full minute of attention',
      'a nose that keeps unfolding long after the glass is raised — dark spice, old wood, and something ineffable',
      'tobacco, dried cherry, and ancient leather arriving in a sequence that feels both inevitable and rare',
      'a nose of such density and grace it seems to exist outside of normal tasting language',
      'something dark and sweet and smoky braided together so tightly the individual notes resist separation',
      'the ghost of a great barrel made real — dark fruit, wax, and time in equal measure',
      'cedarwood, dark honey, and truffle so seamlessly layered they feel like a single composed note',
      'a nose that rewards patience in a way few whiskeys in any category ever manage to do',
      'the kind of complexity that makes you wonder how a grain spirit ever got here — dark cherry, charred wood, and spice in perfect repose',
      'fig paste, aged leather, and something faintly floral refusing to be separated or fully identified',
      'a nose so complete it functions as its own tasting experience before a sip is taken',
      'dark balsamic, smoked vanilla, and dried rose that arrive slowly and build without haste',
      'old sherry, espresso, and rare wood resin layered in a way that feels composed rather than accidental',
      'the kind of nose that belongs in memory — deeply complex, unmistakably great, impossible to replicate',
      'burnt sugar, tobacco flower, and ancient oak arriving together in a harmony of almost uncomfortable beauty',
      'a nose like opening a very old, very extraordinary bottle in a room full of wood smoke and stone fruit',
      'walnut, dark cherry, and smoked vanilla presenting themselves with the confidence of something already legendary',
      'a nose so fine that describing it feels reductive — dark fruit, incense, and time doing things words can\'t',
      'extraordinary layering of cedar, dark chocolate, and saffron that shifts with every deliberate inhale',
      'a whiskey that announces itself on the nose as something categorically different from what came before',
      'the nose of something that had no business being this good and clearly didn\'t care about the odds',
      'dried rose, old leather, and concentrated dark fruit forming a chord rather than individual notes',
      'sandalwood, honeycomb, and deeply aged oak arriving like something from another era of distilling',
      'a nose that exists in its own category — profoundly complex, deeply beautiful, completely its own thing',
      'dark rum, dried cherry, and roasted grain layered with a precision that suggests decades of care',
      'a nose so dense with interest it could sustain twenty minutes of quiet attention without repetition',
      'the rarest kind of whiskey nose — one that changes what you thought the spirit was capable of',
      'fig, cedar, dark honey, and ancient smoke woven into something that feels less made than discovered',
      'old library, dark fruit compote, and smoked vanilla layered in a harmony that is simply extraordinary',
      'a nose so well-constructed that calling it a nose feels insufficient — it is a complete olfactory statement',
      'espresso, dark walnut, and dried rose in a unity so complete they may as well be one note',
      'a nose that earns reverence — not because it is impressive, but because it is genuinely extraordinary',
      'charred oak and dark cherry liqueur so intertwined you cannot find where one ends and the other begins',
      'black cardamom, smoked dark fruit, and aged leather arriving in an order that feels predetermined',
      'a nose that justifies the wait, the price, and whatever story brought this glass to your hand',
      'the kind of nose that quietly resets your internal reference point for what great whiskey smells like',
      'ancient wood, dark spice, and something almost savory arriving in waves that never become repetitive',
      'a nose of impossible grace — layered, intricate, deeply scented, and completely its own thing',
      'chocolate, dried plum, and bourbon-soaked cedarwood in a harmony that seems to have always existed',
      'a nose that stops you mid-pour and makes you hold the glass for a long time before doing anything else',
      'dark dried cherry, tobacco flower, and smoked honey arriving all at once and resolving into something beautiful',
      'a nose that has no right to be this complete, this complex, or this beautiful — and is all three',
    ],
  };

  const PALATE = {
    flawed: [
      'harsh and thoroughly unpleasant', 'aggressive unintegrated grain bite',
      'chemical burn with no resolution', 'thin and watery with a stinging exit',
      'bitter from start to finish', 'sharp raw ethanol over nothing',
      'astringent and rough with no redeeming sweetness',
      'rubbing alcohol warmth and little else', 'clumsy heat and flat grain',
      'a texture like diluted turpentine', 'off-putting bitterness throughout',
      'industrial sharpness with no softening', 'metallic and thin',
      'burning plastic heat that never integrates', 'cardboard soaked in grain alcohol',
      'harsh tannin with no fruit to balance it', 'a punishing rawness front to back',
      'solvent bite that outlasts any sweetness', 'rough and hollow throughout',
      'a flat grain note that burns and disappears without grace',
      'a mid-palate of sheer unpleasantness', 'bitter grain with no resolution at any stage',
      'hot and characterless from the first sip', 'nothing that resembles a balanced spirit',
      'a punishing heat that reveals only more heat beneath it',
      'rough grain and something chemical that never integrates',
      'a palate that actively discourages the next sip',
      'thin, medicinal, and persistently unpleasant',
      'a bitterness that starts immediately and never lets go',
      'raw and unfinished, as though bottled too early by several years',
      'an aggressive and graceless roughness from front to back',
      'sharp chemical note layered over nothing worth salvaging',
      'a palate that would benefit from being a different bottle entirely',
      'burning without complexity, bitter without structure',
      'a full-palate assault with no pleasant note anywhere in it',
      'hot, flat, and deeply unrewarding from start to finish',
      'a palate that punishes rather than rewards the act of drinking',
      'sour mash gone wrong at every stage',
      'a mid-palate that confirms every concern raised on the nose',
      'thin heat and bitter grain presenting themselves as a finished product',
      'a bitter, unresolved, and deeply unsatisfying drinking experience',
      'the kind of palate that makes you put the glass down and walk away',
      'a palate that was not ready and clearly never will be',
      'angular heat and sour grain with no sweetness to soften either',
      'a complete failure of flavor integration at every level',
      'the palate equivalent of a door slamming — abrupt, harsh, and unpleasant',
      'burning, flat, and inexcusably rough for a finished spirit',
    ],
    light: [
      'gentle sweetness', 'light grain', 'mild vanilla cream', 'soft caramel',
      'clean corn sweetness', 'biscuit and honey', 'mild warmth',
      'easy-drinking sweetness', 'soft and unchallenging', 'lightly sweet grain',
      'a pleasant if thin mid-palate', 'white sugar and mild oak',
      'soft fruit and cream', 'simple corn and vanilla', 'light brown sugar',
      'soft peach and mild spice', 'honeyed grain with no edge',
      'light toffee and fresh wood', 'clean sweetness without complexity',
      'a gentle wash of vanilla and cornbread', 'simple and agreeable throughout',
      'faint citrus and soft grain', 'mild butterscotch and light oak',
      'clean and undemanding from start to finish', 'light apple and cream',
      'thin-bodied but pleasant vanilla', 'easy sweetness over neutral grain',
      'mild honey with a clean exit', 'soft biscuit and light caramel',
      'gentle warmth with no real bite', 'lightly sweet with a grain backbone',
      'a clean and unchallenging mid-palate', 'mild sweetness over fresh oak',
      'light vanilla and easy grain', 'a thin but pleasant sweetness throughout',
      'soft honeyed grain and mild warmth', 'pleasant and light, nothing more',
      'a simple clean sweetness from start to finish',
      'mild caramel over light grain', 'soft and easy throughout',
      'a gentle, approachable mid-palate with light vanilla',
      'lightly sweet and undemanding', 'clean grain and soft sweetness',
      'mild biscuity sweetness and light warmth',
      'a soft and easy drinking experience with mild oak at the back',
      'fresh grain and light honey', 'a pleasant thin sweetness',
      'vanilla cream and mild spice, nothing complicated',
      'a mid-palate that asks nothing and offers a modest light sweetness',
      'easy corn sweetness with a soft finish leading in',
      'thin but clean — light vanilla and grain',
      'mild butterscotch and clean grain throughout',
      'a simple, pleasant, and entirely unchallenging mid-palate',
      'light sweetness that never becomes interesting but never becomes unpleasant',
      'a clean easy-drinking profile with soft grain character',
      'modest vanilla and corn with no rough edges',
      'a gentle mid-palate that comforts without engaging',
      'light caramel and grain in easy proportion',
      'mild and pleasant throughout — nothing to complain about, nothing to write home about',
      'a thin but honest sweetness with light grain supporting it',
      'faint dried fruit and light vanilla cream',
      'soft honey and mild corn sweetness without complexity',
      'a gentle and agreeable mid-palate with light oak',
      'simple biscuit sweetness over clean grain',
    ],
    mid: [
      'caramel and warming spice', 'toasted oak tannins', 'ripe stone fruit',
      'peppery rye bite', 'butterscotch richness', 'warm honey',
      'baking spice and dried fruit', 'roasted nuts', 'mild citrus and caramel',
      'chewy caramel', 'brown sugar and corn', 'gentle wood influence',
      'pleasant fruit and spice interplay', 'satisfying mid-palate weight',
      'dried fruit and oak', 'soft tannins and vanilla', 'banana and brown sugar',
      'cherry and cinnamon', 'maple and dried apricot', 'praline and light oak',
      'rye spice balanced with sweetness', 'light chocolate and caramel',
      'toasted grain and peach', 'apple and clove', 'honey and black pepper',
      'pecan and brown butter', 'dried cherry and cinnamon stick',
      'warm gingerbread and caramel', 'toasted coconut and vanilla',
      'butterscotch and a hint of tobacco', 'dried mango and spice',
      'light molasses and cracked pepper', 'toffee and roasted hazelnut',
      'pear and vanilla cream', 'fig and warming rye', 'dried plum and baking spice',
      'soft citrus peel and honey oak', 'orange marmalade and mild pepper',
      'toasted grain and wildflower honey', 'warm caramel corn and nutmeg',
      'ginger and dried stone fruit', 'lemon curd and light oak tannin',
      'light chocolate malt and cinnamon', 'caramel-dipped apple slice',
      'roasted almond and dried apricot', 'warm biscuit and light berry jam',
      'salted caramel and rye spice', 'brown sugar and light clove',
      'toasted hazelnut and dried cherry', 'caramelized peach and warm oak',
      'spiced honey and mild tannin', 'dried apricot and vanilla bean',
      'warm cinnamon roll and grain', 'pecan brittle and caramel',
      'ripe plum and baking spice', 'maple syrup and light oak tannin',
      'honeyed rye and dried fruit', 'dark brown sugar and warm spice',
      'soft cherry and grain tannin', 'toasted walnut and vanilla cream',
      'apple butter and mild pepper', 'warm cornbread and honey',
      'cinnamon-dusted stone fruit', 'caramel sauce and light tobacco',
      'dried blueberry and brown sugar', 'rye bread and dried cherry',
      'baked pear and light caramel', 'toasted grain and fig preserve',
      'spiced rum raisin and oak', 'mild molasses and dried orange',
      'warm caramel and light leather', 'dried apricot jam and spice',
      'roasted grain and mild dark fruit', 'honey oak and mild rye bite',
      'warm dried cherry and cinnamon', 'toasted sesame and caramel',
      'banana foster and light spice', 'butterscotch and dried plum',
      'cardamom and brown butter', 'praline and warming rye',
      'caramelized apple and light oak tannin', 'dried peach and baking spice',
      'mild clove and dark honey', 'roasted nut and caramel apple',
      'vanilla bean and mild pepper', 'dried currant and warming grain',
      'black pepper and caramelized pear', 'soft cherry cola and tannin',
      'light tobacco and warm vanilla', 'dried fig and mild rye spice',
      'toasted coconut and caramel apple', 'honey wheat and light spice',
      'warm spiced cider and dried fruit', 'roasted almond and maple',
      'light chocolate and dried apricot', 'orange zest and caramel',
    ],
    rich: [
      'full-bodied oak and dark fruit', 'deep molasses', 'bold cinnamon heat',
      'leather and tobacco', 'rich bittersweet chocolate', 'a long spice build',
      'dense caramel and dried fruit', 'cracked black pepper and dark cherry',
      'toasted oak and dark sugar', 'powerful but balanced heat',
      'deeply integrated tannins', 'waves of baking spice and dark fruit',
      'muscular grain and fruit complexity', 'espresso and charred oak',
      'prune and dark chocolate', 'licorice and tobacco leaf',
      'black walnut and molasses', 'stewed fig and leather',
      'smoked caramel and rye spice', 'old oak and dried stone fruit',
      'cocoa and charred pecan', 'dark fruit layers and long warmth',
      'burnt caramel and clove', 'charred oak and blackberry preserve',
      'roasted coffee and dark muscovado', 'dried date and rye pepper',
      'tobacco and black cherry in perfect proportion', 'mole-like dark complexity',
      'dark toffee and singed wood', 'cedar and black currant',
      'deep molasses and warming allspice', 'leather and espresso at high proof',
      'toasted pecan and dark fruit preserve', 'bittersweet cocoa and charred grain',
      'anise and stewed cherry', 'bold oak with a dark fruit backbone',
      'smoked dark sugar and black pepper', 'old leather and dark honey',
      'rich chocolate malt and spiced oak', 'bitter orange and tobacco leaf',
      'concentrated dried plum and woodsmoke', 'vanilla bean buried in dark oak',
      'dark cherry jam and warming rye', 'charred sugar and leather',
      'deep oak tannin and black fruit', 'roasted cocoa and dark molasses',
      'black pepper and dried fig over old oak', 'smoked caramel and dark walnut',
      'concentrated dark fruit and wood resin', 'espresso and dark cherry preserves',
      'charred oak and prune', 'muscovado and smoked tobacco',
      'dark chocolate and black walnut oil', 'dense rye spice and dark fruit',
      'singed stave and dried plum', 'deep molasses and black pepper',
      'chocolate-covered cherry and old wood', 'robust coffee and dark spice',
      'blackstrap molasses and leather', 'dried currant and bold tannin',
      'smoked fig and dark caramel', 'bitter cocoa and old oak',
      'roasted grain and concentrated dark fruit', 'cedar and dried dark cherry',
      'dark muscovado and wood smoke', 'charred walnut and molasses',
      'bitter orange peel and dark oak tannin', 'tobacco and stewed black fruit',
      'concentrated prune and smoked wood', 'dark rye spice and dried cherry',
      'ancient leather and black walnut', 'charred maple and dark fruit jam',
      'dark honey and roasted grain', 'smoky toffee and charred pecan',
      'deep baking spice and concentrated dark fruit', 'old oak and dark chocolate',
      'roasted espresso and dark dried fruit', 'smoked dark sugar and leather',
      'dense oak and dark cherry compote', 'molasses and charred grain',
      'bitter chocolate and singed wood', 'black currant and spiced oak',
      'dark rum and old leather', 'concentrated dark fruit and tobacco',
      'roasted chicory and dark caramel', 'charred barrel and dried black fruit',
      'dense dark fruit and old oak resin', 'bold leather and dark spice',
    ],
    exotic: [
      'extraordinary depth anchored by dark fruit and ancient oak',
      'rare tropical fruit and dark chocolate in a seamless integration',
      'waves of baking spice with an almost savory leather finish',
      'opulent fruit preserve and roasted coffee at perfect tension',
      'lingering floral notes over a deeply spiced foundation',
      'profound sweetness perfectly balanced by oak and leather',
      'silky texture with an explosive mid-palate of dark fruit and spice',
      'transcendent integration — wood, fruit, and heat as one',
      'an impossibly long mid-palate that shifts from caramel to smoke to dried fruit',
      'perfect tension between heat and sweetness, neither winning',
      'kaleidoscopic fruit and spice that keeps revealing new layers',
      'masterful balance at high proof — power and elegance at once',
      'seamless layering with no rough edges, every note earning its place',
      'dark cherry and smoked vanilla braided through toasted oak',
      'a mid-palate that feels almost architectural in its structure',
      'dried fig and espresso over a floor of ancient oak tannin',
      'dark honey and tobacco drifting through waves of dark fruit',
      'smoked plum and Oloroso sherry in perfect harmony',
      'rare and sustained complexity that builds for a full minute',
      'black cardamom and vanilla bean at the center of something profound',
      'a palate like a well-worn library — leather, wood, fruit, and time',
      'roasted coffee and dark caramel layered over brooding oak',
      'silky heat that transforms into dark fruit and then spice in sequence',
      'marzipan and aged leather with waves of smoked vanilla',
      'an almost savory mid-palate giving way to deep, sweet dark fruit',
      'fruit, spice, and wood cycling through in distinct and rewarding waves',
      'a mid-palate so complete it almost doesn\'t need a finish',
      'dense and extraordinarily structured — every layer reveals another',
      'crystallized dark sugar and smoked wood united at the center',
      'dried cherry and bittersweet chocolate woven through ancient tannin',
      'a palate of rare complexity where no note outcompetes the others',
      'smoked plum and dark honey arriving with extraordinary elegance',
      'an expansive mid-palate that builds and builds without losing control',
      'dark fruit layers arriving in sequence like movements in a composition',
      'old leather and dark chocolate coexisting in effortless harmony',
      'a profound sweetness underpinned by ancient wood and dark spice',
      'an opulent and deeply layered mid-palate of genuine distinction',
      'rare integration of heat, fruit, and wood at the highest level',
      'a wide and complex palate that rewards every sip slightly differently',
      'deep dark fruit and smoked vanilla anchored in something ancient',
      'a texture and complexity that places this in rarified company',
      'remarkable fruit-forward depth followed by wave after wave of dark spice',
      'an almost musical mid-palate — notes arriving in perfect sequence and proportion',
      'extraordinary balance between heat and dark fruit at every moment',
      'dense, layered, and completely satisfying from the first sip forward',
      'old world depth in a mid-palate of stunning cohesion and length',
      'a palate that seems to expand rather than fade as it develops',
      'dark cherry, ancient wood, and something floral in perfect balance',
      'a deeply textured mid-palate with complexity that earns the word exceptional',
      'smoked dark fruit and leather arriving in waves of extraordinary quality',
      'tobacco, chocolate, and old oak occupying the same elevated space',
      'a palate that doesn\'t reveal everything at once — and is better for it',
      'dark fruit, roasted grain, and aged wood in seamless and memorable unity',
      'an almost impossibly structured mid-palate that holds at every level',
      'rare and sustained dark spice over a foundation of extraordinary oak',
      'a complexity here that most distilleries spend decades chasing',
      'silky, dark, and deeply satisfying — a mid-palate of genuine consequence',
      'concentrated fruit and wood complexity at a level that earns real respect',
      'dark dried fruit and smoked spice arriving in a sequence worth attending to',
      'a mid-palate that announces itself as something genuinely different',
    ],
    transcendent: [
      'something so seamlessly integrated it defies description — dark fruit, oak, and caramel as a single perfect idea',
      'the kind of palate that makes you set down the glass and just sit with it — waves of spice, chocolate, and dried fruit',
      'extraordinary: the sweetness, heat, and tannin have negotiated a peace that most distilleries never achieve',
      'an experience more than a taste — dark cherry, leather, espresso, and ancient oak arriving together',
      'perfect at every turn: the fruit, the spice, the wood — all present, all balanced, all remarkable',
      'a palate so complex and sustained it is almost unfair to describe it in words',
      'layers upon layers — smoked fruit, dark chocolate, roasted grain — each one revealing another beneath it',
      'the kind of mid-palate that collectors trade for: full, structured, endlessly nuanced',
      'a rare harmony of heat and sweetness that makes you wonder what took everyone else so long',
      'every note arrives in exactly the right order, at exactly the right time, at exactly the right intensity',
      'dark fruit, leather, smoke, and spice cycling through in waves that never quite repeat themselves',
      'a mid-palate of almost architectural precision — nothing is wasted, nothing is missing, everything is earned',
      'the sweetness and the heat are so perfectly matched they seem to have been designed for each other',
      'smoked plum, dark chocolate, ancient oak, and something floral — all of it at once, none of it too much',
      'a palate that makes you reconsider what this spirit is actually capable of when everything goes right',
      'dense, extraordinarily rich, and somehow still delicate — the rarest combination in American whiskey',
      'dark cherry, roasted grain, leather, and vanilla occupying the same perfect moment',
      'the kind of complexity that only reveals itself fully on the fifth or sixth sip',
      'a palate so complete and unified it refuses to be broken down into individual components',
      'the texture of something much older, the depth of something much rarer, the balance of something miraculous',
      'dark fruit, heat, and ancient wood arriving simultaneously and staying simultaneously — nothing leaves before the others',
      'a mid-palate that shifts, builds, and deepens over the course of a full minute without ever losing its center',
      'an experience that cannot be adequately conveyed in writing — it must be tasted to be understood',
      'a palate that makes the preceding glass seem like a rehearsal for this one',
      'the best argument for patience, craft, and not settling — everything this spirit is supposed to be',
      'a depth that feels geological — layers upon layers, each as interesting as the last, none as complete as all of them together',
      'something beyond good, beyond excellent, beyond almost any frame of reference available to describe it',
      'fruit and wood and heat coexisting in a balance so perfect it seems to have been engineered rather than made',
      'a palate that justifies every superlative ever written about American whiskey',
      'the kind of mid-palate that makes collectors understand exactly why they collect',
      'a drinking experience so complete that putting the glass down feels like an interruption',
      'dark cherry, smoked caramel, and ancient oak arriving in a sequence of absolute clarity',
      'a palate of legendary quality that earns the word without self-consciousness',
      'everything in its right place at its right intensity — the definition of perfection in a glass',
      'a mid-palate that will establish its own reference point in the memory of everyone lucky enough to taste it',
      'the kind of depth that makes you wonder how long the distiller knew this was different before releasing it',
      'a palate so complete it answers questions about the category you didn\'t know you had',
      'dark fruit, leather, smoke, spice, and time in a proportion so perfect it seems inevitable',
      'a mid-palate that arrives fully formed, sustains completely, and resolves beautifully — a complete experience',
      'something that earns the word transcendent without requiring a dictionary to justify it',
      'the palate equivalent of a standing ovation — long, complete, and deserved at every level',
      'a depth and integration that makes every other bottle in the collection feel like it\'s still trying',
    ],
  };

  const FINISH = {
    flawed: [
      'an abrupt and harsh chemical cut', 'a bitter, unresolved close',
      'a thin finish with a sting that outstays its welcome',
      'a hot and hollow exit with nothing behind it',
      'a sharp astringent fade that lingers unpleasantly',
      'a short, rough finish that confirms the worst',
      'a metallic close that fades slowly into nothing good',
      'burns out fast and leaves bitterness behind',
      'ends like a mistake, not a whiskey',
      'a caustic fade that leaves no pleasant memory',
      'a sharp exit that somehow manages to get worse as it fades',
      'a thin, burning close with no sweetness to soften it',
      'ends in a jolt of heat and flat grain',
      'a bitter medicinal finish that lingers far too long',
      'a harsh and graceless exit that undoes anything that came before',
      'a finish like drinking near the fumes rather than the spirit',
      'a raw ethanol burn that just sits there, uninvited',
      'no finish worth describing — just heat and a bad memory',
      'a finish that turns actively worse as it fades',
      'a sharp, unpleasant close that leaves a lasting bad impression',
      'a bitter finish that discourages the second sip',
      'an aggressive and graceless exit with no pleasant note',
      'a finish so harsh it makes the palate seem tolerable by comparison',
      'a thin and punishing close that refuses to leave gracefully',
      'a finish that lingers badly and does so with no redeeming character',
      'an exit that confirms this bottle was never finished properly',
      'a bitter, flat close that settles into a lasting disappointment',
      'a chemical burn that passes for a finish and does a poor job of it',
      'the finish arrives as a final insult rather than a conclusion',
      'a sharp hot close that leaves nothing you\'d want to revisit',
      'a close that summarizes everything wrong with this bottle',
      'a thin acrid fade that should never have been allowed out of the barrel',
      'a finish without grace, without character, and without end',
      'a medicinal and bitter close that poisons the memory of anything before it',
      'an abrupt ugly exit that confirms the palate\'s worst assessments',
      'a finish that makes you wish you\'d stopped at the nose',
      'a raw and burning close with nothing pleasant behind it',
      'ends bitterly and stays bitter — no redemption at any stage',
      'a graceless, poorly structured close with a sting that doesn\'t improve',
      'the worst finish for an already very poor bottle',
      'a close that lingers in the worst possible way for far too long',
      'an exit so underdeveloped it raises questions about the entire production process',
      'a finish that speaks only of heat and poor grain quality',
      'thin, hot, and unforgivably rough at the close',
      'a finish that ends badly and then gets worse before it finally leaves',
      'a punishing and unpleasant close that no one asked for',
    ],
    light: [
      'short and clean', 'quick and mild', 'brief sweetness', 'light and easy',
      'thin but inoffensive', 'fades quietly', 'a short soft close',
      'a gentle uncomplicated fade', 'clean and brief', 'pleasantly short',
      'sweet and quick', 'a tidy, simple exit',
      'a light vanilla close', 'fades with a whisper of corn sweetness',
      'a gentle honey note on the way out', 'clean and uncomplicated',
      'a brief warm close', 'light and forgettable in the best way',
      'ends softly with a hint of grain', 'a quick caramel note and then nothing',
      'fades cleanly without asking anything of you',
      'a simple, honest close with light sweetness',
      'a whisper of biscuit before it disappears', 'quick and pleasant enough',
      'a clean, brief finish with a light vanilla note',
      'a short and inoffensive exit', 'fades gently with nothing to complain about',
      'a quick warm close that doesn\'t overstay',
      'a light and pleasant fade with a mild honey note',
      'a brief clean exit with a whisper of oak',
      'fades cleanly and simply', 'a short but pleasant close',
      'a light, tidy finish with minimal oak',
      'ends with a gentle grain sweetness and nothing more',
      'a clean and easy exit', 'a brief finish that knows its limits',
      'a light caramel close that vanishes quickly',
      'a short warm finish — pleasant enough while it lasts',
      'fades with a soft sweetness', 'a clean and quick exit without drama',
      'a light and uncomplicated close with mild vanilla',
      'a brief finish with a clean grain note',
      'a gentle fade with a light whisper of corn',
      'a mild and easy close, nothing remarkable',
      'a clean, thin finish that ends pleasantly if quickly',
      'a light warmth that fades without incident',
      'a simple close with light honey and grain',
      'a brief exit with a mild sweet note',
      'a short, pleasant, and entirely forgettable close',
      'fades cleanly with a light sweetness',
      'a gentle close that exits before outstaying its welcome',
      'a quick, pleasant fade with no rough edges',
      'a light and blameless finish',
    ],
    mid: [
      'medium-length warmth', 'lingering caramel', 'pleasant spice fade',
      'a dry oak close', 'moderate heat that fades cleanly', 'sweet with a dry close',
      'a warming finish', 'a tidy medium fade', 'pleasant and lasting',
      'a clean oak-driven close', 'caramel and a hint of pepper at the back',
      'a medium fade with light spice', 'finishes with brown sugar and oak',
      'a clean warm exit', 'moderate length with a honey note at the close',
      'a pleasant rye spice fade', 'dried fruit on the way out',
      'a medium-length caramel and vanilla close', 'warming and satisfying without overstaying',
      'a tidy exit with a light cinnamon note', 'brown sugar and mild pepper fading together',
      'a medium warm finish with a touch of toasted grain',
      'moderate but rewarding — caramel leading to a dry oak close',
      'a clean fade with hints of honey and light spice',
      'pleasant warmth that lingers a little longer than expected',
      'a solid medium finish with dried fruit at the back',
      'finishes with apple and a dry spice note',
      'a satisfying if unspectacular exit — warm and clean',
      'a gentle cinnamon and caramel fade', 'toasted nuts on the close',
      'a pleasant medium close with mild vanilla and grain',
      'a warm and lasting finish with light spice throughout',
      'a medium fade with caramel and light dried fruit',
      'a tidy rye-spiced close', 'a clean and rewarding medium finish',
      'moderate length with a warm oak and brown sugar close',
      'finishes with a light toasted grain note',
      'a caramel and vanilla close of solid medium length',
      'a warm and clean medium finish with a light pepper note',
      'a medium-length close with light fruit and mild warmth',
      'a pleasant fade with dried cherry and light oak',
      'finishes cleanly with a light rye spice note',
      'a medium warm close with vanilla and mild spice',
      'a clean and honest medium finish',
      'finishes with a mild caramel and light grain note',
      'a satisfying medium fade — clean, warm, and complete',
      'a pleasant medium-length close with a touch of toasted oak',
      'a warm medium exit with light dried fruit',
      'finishes with brown sugar and a dry, clean close',
      'a mild but pleasant medium-length finish',
      'a clean warm fade with light baking spice',
      'a medium close with a pleasant dried fruit note',
      'finishes honestly with a warm grain and caramel note',
      'a dry and satisfying medium close',
      'a pleasant, moderate-length finish with mild spice',
      'a clean medium exit with light vanilla and grain',
      'a warming close that fades at a comfortable pace',
      'a medium-length fade with a mild caramel and oak note',
      'finishes with mild warmth and a clean dry close',
      'a pleasant moderate exit with light toffee at the back',
      'a tidy, warm medium-length close',
      'medium warmth and a clean dry grain close',
      'a satisfying medium finish with a light spice fade',
      'finishes with honey and a dry oak note',
      'a clean and warm medium close — honest and uncomplicated',
    ],
    rich: [
      'a long spiced finish', 'persistent oak tannins', 'extended dark fruit',
      'a slow warm fade', 'rich and lasting', 'a complex multi-stage fade',
      'a deep warming close', 'a finish that builds over minutes',
      'a sustained and rewarding fade', 'dark fruit and spice that linger',
      'long and warming with oak throughout', 'a long close that shifts from spice to chocolate',
      'dark cherry and tobacco that persist', 'a finish as long as it is good',
      'slowly fading waves of cinnamon and dark fruit',
      'a long and complex exit that moves through dark fruit, spice, and dried oak',
      'a finish that earns its length — deep, warming, and multi-layered',
      'persistent dark chocolate and clove long after the sip',
      'a slow-fading warmth anchored in charred oak and dried fruit',
      'molasses and black pepper that linger with purpose',
      'a long close that starts sweet and ends dry and spiced',
      'sustained dark fruit layers that refuse to leave quickly',
      'a deeply satisfying finish — long, warm, and complex throughout',
      'a bold close of dark sugar and smoked wood that fades slowly',
      'finishing tannins and dried cherry that persist through several breaths',
      'a long and rewarding exit — tobacco, caramel, and dark oak in sequence',
      'the finish alone earns the repeat pour — rich, complex, and lasting',
      'a deep warming fade with persistent rye spice and dried dark fruit',
      'a finish of genuine length and dark spice complexity',
      'a long close with dark cherry and old oak persisting well past the sip',
      'a deeply warming and sustained finish worth sitting with',
      'persistent leather and dark fruit that fade slowly and gracefully',
      'a long and complex close with tobacco and dark spice throughout',
      'a finish of real length — dark fruit, spice, and wood in sequence',
      'dark chocolate and old oak that linger through several minutes',
      'a multi-stage finish that builds rather than simply fades',
      'a rich and sustained close with dark dried fruit leading',
      'a deep, slow-fading warmth with charred wood and dark spice',
      'a finish that takes its time and rewards the patience',
      'long waves of dark fruit and spice that continue to develop',
      'a bold and warming close with persistent dark fruit and tannin',
      'a long exit with molasses and dark cherry continuing well after the sip',
      'a deeply satisfying and sustained finish — this earns its length',
      'a complex close that shifts through spice, fruit, and old wood',
      'a finish of real depth and duration with dark spice throughout',
      'a long and warming fade with rich dried fruit and tobacco',
      'a bold close with persistent charred oak and dark fruit',
      'an extended and rewarding finish with dark spice and old leather',
      'a deep and complex fade that moves through dark fruit and old wood',
      'a long close of genuine quality with tobacco and dark molasses',
      'a sustained finish that delivers on the palate\'s dark complexity',
      'a finish of real length and character with dark fruit and spice',
      'a long, warm fade with old oak and dark cherry persisting throughout',
      'a deeply complex close that continues to develop with each breath',
      'dark sugar and charred wood fading in long, satisfying waves',
      'a finish that improves the memory of everything that came before it',
      'a rich, sustained close with dark dried fruit and warming spice',
    ],
    exotic: [
      'an exceptionally long and layered finish',
      'a finish that evolves and deepens for several minutes',
      'extraordinary persistence — notes still arriving long after the sip',
      'waves that return long after the glass is empty',
      'a near-infinite fade that rewards patience',
      'successive waves of spice, dried fruit, and oak that never quite resolve',
      'an endless close that shifts and deepens with every breath',
      'a finish worth sitting with — give it five minutes before you pour another',
      'a finish that other bottles openly aspire to and rarely approach',
      'long, complex, and quietly triumphant',
      'a finish that moves through dark fruit, smoke, leather, and spice — in that order',
      'an extraordinary fade that transitions through four or five distinct notes',
      'a close so long and complex it functions almost as a second tasting experience',
      'waves of dried cherry, chocolate, and old oak returning in cycles',
      'a finish that commands attention — nothing about it is passive',
      'a long fade that reveals notes the nose and palate only hinted at',
      'extraordinary persistence with new complexity emerging well past the sip',
      'dark spice and ancient oak cycling through long after the glass is empty',
      'a close that makes a strong argument for sitting still and doing nothing else',
      'a finish where each exhale brings something slightly different and equally rewarding',
      'a finish of exceptional length and layered dark complexity',
      'an extraordinary close that deepens rather than fades with time',
      'a sustained and complex finish that rewards attention across several minutes',
      'waves of dark fruit and old oak returning in unhurried sequence',
      'a finish of rare length and quality that justifies the entire pour',
      'dark spice, leather, and aged wood arriving in succession long after the sip',
      'a close so complete it recalibrates expectations for what a finish can be',
      'a finish that presents itself in distinct and rewarding stages',
      'extraordinary persistence anchored in dark fruit and ancient wood',
      'a near-endless close where complexity keeps arriving without invitation',
      'a finish that builds rather than merely sustains — a rare thing',
      'an extended and extraordinary fade with dark fruit and smoked spice throughout',
      'a finish that moves deliberately through multiple stages of genuine complexity',
      'dark cherry and smoked vanilla fading in waves that return before the last wave fully ends',
      'a close of exceptional length where no note outstays its welcome',
      'a finish that earns the long sit — dark, complex, and continuously evolving',
      'old oak and dark fruit cycling through in waves that last well past any reasonable expectation',
      'a sustained finish of real quality that justifies every moment of the experience',
      'a close that keeps presenting new facets long after the glass is empty',
      'a finish of extraordinary length and dark complexity that simply does not settle',
      'a close that arrives fully formed and refuses to leave on schedule',
      'dark spice, leather, chocolate, and old wood fading in long rewarding waves',
      'an extraordinarily layered close where the complexity deepens as it fades',
      'a finish that makes you glad you poured the glass and reluctant to put it down',
      'a long and layered exit where every breath after the sip brings something new',
      'a close of genuine rare quality — dark, sustained, and deeply rewarding throughout',
      'a finish that earns and sustains attention for minutes without any effort',
      'waves of dark complexity returning in a rhythm that feels almost composed',
      'an extraordinary close that functions as a final statement rather than a conclusion',
      'a finish of such length and complexity it deserves its own paragraph',
      'dark dried fruit and smoked wood fading in waves that keep returning',
      'a close that sets a new personal benchmark for what a finish is supposed to do',
      'an exceptional finish that improves every memory of the pour that preceded it',
      'a sustained and extraordinary fade that makes the stop feel almost reluctant',
      'a finish that doesn\'t know when to stop — in exactly the right way',
      'a close of such quality it makes the concept of finishing feel insufficient',
      'an extraordinary and near-endless fade that rewards the last sip as much as the first',
      'dark spice, ancient oak, and dried dark fruit returning long after any finish has the right to',
      'a close that could stand on its own as a recommendation for the entire bottle',
    ],
    transcendent: [
      'a finish measured not in seconds but in memory — it simply does not leave',
      'the kind of close that makes you reconsider everything that preceded it',
      'a finish so perfect and sustained it feels like a privilege to experience',
      'a finish you will describe to others for years — long, complex, and completely unresolved in the best way',
      'waves of dark spice, fruit, and smoke returning again and again long after the glass is empty',
      'a close that earns the word infinite — still present an hour later if you pay attention',
      'everything you wanted the finish to be, and then more than that',
      'the finish alone justifies the hunt for a second bottle',
      'a close so long and layered it constitutes its own separate experience',
      'dark fruit, leather, smoke, and spice arriving and departing in slow, perfect rotation',
      'a finish that changes on every exhale for the better part of ten minutes',
      'the kind of close that makes you hold the empty glass because putting it down feels wrong',
      'a sustained and extraordinary fade that makes the preceding palate feel like an introduction',
      'a finish so complete and complex it requires a second pour just to begin understanding it',
      'waves of spice and dark fruit returning on a rhythm that feels almost intentional',
      'a close that lingers with such grace and persistence you genuinely lose track of time',
      'a finish that earns reverence — not through volume but through extraordinary sustained complexity',
      'a close of such rare quality it redefines what you expect from a finish',
      'dark fruit, old wood, and ancient spice cycling through long after any other bottle would have stopped',
      'a finish that settles into something permanent rather than fading — it becomes part of the memory',
      'the kind of close that makes you unwilling to eat or drink anything else for a while',
      'an infinite-feeling finish where every breath after the sip brings something new and worthy of attention',
      'a finish of complete perfection — nothing added, nothing missing, nothing wasted',
      'a close so sustained and complex that other bottles begin to seem incomplete by comparison',
      'a finish that proves the palate was only part of the story',
      'dark spice, ancient leather, and smoked fruit persisting through the hour after the last sip',
      'a close that will be described, years later, to someone who will not quite believe it',
      'the finish of a genuinely historic pour — one that resets every reference point you had',
      'a sustained and extraordinary close where complexity builds rather than fades',
      'a finish so graceful in its departure that not departing feels like the appropriate description',
      'the kind of close that makes people become collectors — searching for this experience again',
      'a finish that cannot be adequately described and should simply be experienced',
      'dark fruit, smoked spice, and ancient wood cycling through in waves that refuse a final count',
      'a close of such length and quality it makes every other bottle in the cellar seem like it\'s still learning',
      'a finish that arrives at its peak and simply stays — no diminishment, no hurry, no resolution',
      'an extraordinary sustained close that makes the empty glass feel occupied',
      'the kind of finish that separates legendary bottles from merely excellent ones',
      'a close so complete, complex, and sustained it effectively ends the tasting session — nothing follows it well',
      'a finish that makes you understand why people spend years and serious money on a single bottle',
      'a close that arrives as something inevitable and stays as something irreplaceable',
      'a finish that earns the word transcendent at every level of its extraordinary and seemingly endless duration',
      'dark spice, leather, dried fruit, and ancient wood fading in layers that return before the previous one fully resolves',
      'a close that makes time feel negotiable — you lose track, willingly, in the best possible way',
      'a finish that does not so much end as transform — still present, still evolving, long after the glass is empty',
      'the most extraordinary finish a bourbon or rye can produce — and this is it',
      'a close so complete and so persistent it earns the last word on what great American whiskey can do',
    ],
  };

  const BODY_WORDS = {
    flawed: [
      'thin and harsh', 'poorly structured', 'rough and unbalanced',
      'clumsy and unintegrated', 'flat and mean', 'harsh and characterless',
      'graceless', 'aggressively rough', 'unpleasantly thin',
      'broken and undrinkable', 'offensively raw', 'chemically wrong',
    ],
    light: [
      'light-bodied', 'thin', 'delicate', 'lean', 'easy', 'clean',
      'lightly sweet', 'bright', 'airy', 'uncomplicated', 'gentle',
      'soft', 'featherweight', 'breezy', 'undemanding', 'approachable',
      'easygoing', 'simple and honest', 'quietly pleasant',
    ],
    mid: [
      'medium-bodied', 'approachable', 'balanced', 'rounded', 'solid',
      'steady', 'pleasantly weighted', 'forthright', 'confident',
      'well-proportioned', 'honest', 'consistent', 'agreeable',
      'dependable', 'capable', 'well-structured', 'satisfying',
      'competent', 'grounded', 'reliable',
    ],
    rich: [
      'full-bodied', 'rich', 'dense', 'robust', 'weighty', 'substantial',
      'muscular', 'boldly structured', 'powerful', 'deeply layered',
      'commanding', 'expansive', 'generously built', 'bold and confident',
      'impressively full', 'deeply weighted', 'seriously structured',
      'assertive', 'magnificently proportioned',
    ],
    exotic: [
      'opulent', 'majestic', 'profoundly structured', 'extraordinarily full',
      'immaculately assembled', 'lavishly composed', 'extraordinary',
      'remarkably complete', 'exceptionally balanced', 'grandly proportioned',
      'exceptionally textured', 'superbly constructed', 'magnificently dense',
    ],
    transcendent: [
      'singular', 'transcendent', 'flawlessly constructed',
      'unlike anything else on the shelf', 'a genuine once-in-a-generation',
      'beyond category', 'incomparably structured', 'perfectly assembled',
      'a monument of the craft', 'historically significant in the glass',
      'the platonic ideal of', 'categorically its own thing',
    ],
  };

  // ── SEGMENT-BASED VALUE SYSTEM ────────────────────────────────
  // Returns { expectedLow, expectedHigh, overperformThreshold, noteOverValue }
  // noteOverValue: true = also call out price-is-no-object if rating > 9.25
  function getSegmentExpectation(rarity, msrp) {
    const isLow = rarity === 'common' || rarity === 'uncommon';
    if (rarity === 'common' && msrp < 20) return { lo: 3.0, hi: 4.0,  overThresh: 4.0,  badThresh: 3.0, priceTag: true  };
    if (isLow && msrp < 30)  return { lo: 3.0, hi: 5.25, overThresh: 5.5,  badThresh: 3.0, priceTag: true  };
    if (isLow && msrp <= 45) return { lo: 4.0, hi: 6.25, overThresh: 6.5,  badThresh: 4.0, priceTag: true  };
    if (isLow)               return { lo: 5.0, hi: 6.75, overThresh: 7.0,  badThresh: 5.0, priceTag: true  };
    if (rarity === 'rare' && msrp < 50)  return { lo: 4.0, hi: 6.5,  overThresh: 6.75, badThresh: 4.0, priceTag: true  };
    if (rarity === 'rare')               return { lo: 6.0, hi: 7.5,  overThresh: 7.75, badThresh: 6.0, priceTag: true  };
    if (rarity === 'epic')               return { lo: 6.0, hi: 8.0,  overThresh: 8.25, badThresh: 6.0, priceTag: msrp < 125 };
    // legendary
    return { lo: 7.75, hi: 9.0, overThresh: 9.0, badThresh: 7.75, priceTag: msrp < 180 };
  }

  // ── VALUE COMMENT POOLS ───────────────────────────────────────
  const VALUE_PHRASES = {
    // Seriously underperforming its segment — bad value, price called out
    bad_value: [
      `At $\${msrp}, this is a seriously bad value.`,
      `This underperforms its $\${msrp} price tag by a considerable margin.`,
      `$\${msrp} buys significantly better whiskey than this almost anywhere else.`,
      `Hard to justify spending $\${msrp} on a bottle this far below expectations.`,
      `At $\${msrp}, this is one of the worst values in its segment.`,
      `The asking price of $\${msrp} significantly overstates what is in this bottle.`,
      `You are getting far less than what $\${msrp} should deliver in this category.`,
    ],
    underperform_strong: [
      'Hard to justify at this price.',
      'A serious disappointment given what it costs.',
      'Does not deliver on its positioning.',
      'You are paying for the label, not the liquid.',
      'Expected far more at this price point.',
      'Fails to earn its place on the shelf at this price.',
      'A premium price attached to a discount experience.',
    ],
    underperform_mild: [
      'Slightly underwhelms for the asking price.',
      'Falls just short of earning its shelf price.',
      'A modest step below where it should be at this tier.',
      'The price overstates what is actually in the glass.',
      'Competent, but the price promises more than it delivers.',
    ],
    // Overperforming — price-tiered so the language matches the actual price context
    // Budget: under ~$25 — tempered praise, acknowledges the ceiling
    overperform_budget: [
      `For $\${msrp}, this is genuinely good — just don't expect it to move mountains.`,
      `At $\${msrp}, it earns its place. More than you'd reasonably hope for at this price.`,
      `A legitimate overachiever for $\${msrp}. The quality ceiling is still there, but it's pushing it.`,
      `For the money, this is hard to beat. It's not going to change your life, but it will surprise you.`,
      `$\${msrp} doesn't buy greatness, but this comes closer than most things at this price.`,
      `Punches above its weight for $\${msrp}. Good for what it is, and it knows what it is.`,
      `At $\${msrp}, you're not expecting much — which makes how good this is a genuine surprise.`,
    ],
    // Mid-range: $25–$70 — genuine enthusiasm, value-forward
    overperform_value: [
      `At $\${msrp}, this is a serious find.`,
      `Remarkable value at $\${msrp}. Drinks well above its price class.`,
      `One of the better values in the category at $\${msrp}. Don't overlook it.`,
      `Defies its $\${msrp} price point. More whiskey here than the shelf tag suggests.`,
      `At $\${msrp}, this makes you question why you'd spend more for incremental gains.`,
      `A hidden gem at $\${msrp}. Worth stocking up on.`,
      `$\${msrp} for this is genuinely good value — it drinks like it costs more.`,
    ],
    // Premium overperformer: $70+ — framed around category excellence and investment
    overperform_premium: [
      `At $\${msrp}, this delivers the kind of quality that justifies every dollar.`,
      `$\${msrp} is a fair price for something this good. Possibly even generous.`,
      `Among the strongest values at this price point. This earns its $\${msrp} without apology.`,
      `For $\${msrp}, this is exactly what it should be and then some.`,
      `At $\${msrp}, this stands up to bottles that cost considerably more. A smart buy.`,
      `Well worth the $\${msrp} ask. This rewards careful attention in a way that most bottles at this price do not.`,
    ],
    overperform_mild: [
      'Modestly overperforms its price point.',
      'A touch better than you\'d expect at this tier.',
      'Offers more than the price tag suggests.',
      'Quietly beats everything around it on the shelf.',
    ],
    all_time_great: [
      'This belongs in any serious conversation about the greatest American whiskeys ever produced.',
      'A once-in-a-career pour. Price is not a relevant consideration.',
      'One of the all-time greats. Acquire it by any means necessary.',
      'Whiskeys like this are the reason people become collectors. Price is irrelevant.',
      'If you find this at any price, the answer is yes. No further thought required.',
      'This is the kind of bottle that defines a collection and a palate. Irreplaceable.',
    ],
  };

  function getValueComment(rating, rarity, msrp) {
    if (rating > 9.25) {
      return { text: pick(VALUE_PHRASES.all_time_great), sentiment: 'positive' };
    }
    if (msrp > 175 && rating < 8.0) {
      return { text: pick(VALUE_PHRASES.bad_value).replace('${msrp}', msrp), sentiment: 'negative' };
    }
    const seg = getSegmentExpectation(rarity, msrp);
    if (rating < seg.badThresh) {
      return { text: pick(VALUE_PHRASES.bad_value).replace('${msrp}', msrp), sentiment: 'negative' };
    }
    if (rating >= seg.overThresh) {
      if (!seg.priceTag) {
        return { text: pick(VALUE_PHRASES.overperform_mild), sentiment: 'positive' };
      }
      const pool = msrp < 25  ? VALUE_PHRASES.overperform_budget
                 : msrp < 70  ? VALUE_PHRASES.overperform_value
                 :               VALUE_PHRASES.overperform_premium;
      return { text: pick(pool).replace('${msrp}', msrp), sentiment: 'positive' };
    }
    if (rating < seg.lo) {
      return { text: pick(VALUE_PHRASES.underperform_strong), sentiment: 'negative' };
    }
    const midpoint = (seg.lo + seg.hi) / 2;
    if (rating < midpoint - 0.5) {
      return { text: pick(VALUE_PHRASES.underperform_mild), sentiment: 'negative' };
    }
    return { text: '', sentiment: 'neutral' };
  }

  // ── TONE BANDS ────────────────────────────────────────────────

  const TONE = {
    terrible: {
      openers: [
        'A genuine failure in the glass.',
        'Avoid without exception.',
        'Difficult to recommend to any living person.',
        'A cautionary tale in bottle form.',
        'This should not exist.',
        'An embarrassment to the category.',
        'Whoever approved this release owes someone an apology.',
        'Not a whiskey so much as a warning.',
        'One of the most unpleasant things to arrive in a bottle.',
        'A remarkable achievement in the wrong direction.',
        'There is no charitable reading of what is happening here.',
        'This bottle is not a product. It is an incident.',
        'The kind of pour that ends evenings and friendships.',
        'An insult to the grain, the barrel, and the person holding the glass.',
        'Objectively, demonstrably, a failure.',
        'Whatever this is, it is not bourbon.',
        'A bottle that raises serious questions about quality control.',
        'Whoever made this should consider a different career.',
        'There is not a single redeemable moment in this glass.',
        'A complete and total breakdown from start to finish.',
      ],
      nose:   [
        'a genuinely repellent', 'an actively hostile', 'an unacceptably broken',
        'a stomach-turning', 'an eye-watering', 'a chemically aggressive',
        'a deeply offensive', 'an assault-level', 'an outright alarming',
        'a completely off',
      ],
      palate: [
        'nothing remotely redeemable',
        'active hostility from the first sip to the last',
        'a study in how badly wrong this can go',
        'so poorly made it borders on punishing',
        'chaos without structure or mercy',
        'a relentless and graceless unpleasantness',
        'heat and bitterness fighting each other with no winner and one loser — the drinker',
        'something that should have been stopped far earlier in the process',
        'the kind of palate that makes you question your life choices',
        'an education in what fermented grain should never taste like',
        'a hostile and confusing mid-palate with no redemptive arc',
        'nothing that belongs in a finished whiskey',
      ],
      finish: [
        'a finish that makes the experience worse, not better',
        'a punishing close that is the final insult',
        'ends so badly it taints the memory of everything before it',
        'a close that lingers in the worst possible way',
        'a finish that makes you reach for water and reconsider your choices',
        'an exit so unpleasant it becomes the dominant memory of the entire pour',
        'ends badly and stays that way for far too long',
        'a finish that should be a crime',
        'closes with something that can only be described as a threat',
        'a finish with no saving grace whatsoever',
      ],
      closers: [
        'Do not buy. Do not accept. Do not finish the glass.',
        'Pour it down the drain and count it as a lesson.',
        'There is no use case for this bottle.',
        'A waste of everything involved in making it.',
        'A hard no under any circumstances.',
        'Do not let this near your good glasses.',
        'Some things exist so you know what to avoid. This is one of them.',
        'Unopened, it has more value.',
        'The only appropriate response is to pour it out immediately.',
        'An object lesson in what goes wrong when nobody says stop.',
        'Return it if you can. Forget it if you can\'t.',
        'Life is too short for this bottle.',
      ],
    },
    poor: {
      openers: [
        'A weak and unconvincing effort.',
        'Struggles to find any identity in the glass.',
        'Not recommended under any circumstances.',
        'A disappointment from the first pour.',
        'Hard to defend at any price.',
        'Lacks the basic fundamentals of a drinkable whiskey.',
        'A bottle that should have stayed at the distillery.',
        'Put this one back.',
        'Underwhelming does not begin to cover it.',
        'A bottle without a reason for being.',
        'Falls short in every meaningful way.',
        'The definition of a missed opportunity.',
        'This is what happens when ambition is absent entirely.',
        'Not offensive enough to be interesting, not good enough to be worthwhile.',
        'A thoroughly uninspired effort from start to finish.',
        'Something went wrong early and nothing corrected it.',
        'A bottle that asks questions it cannot answer.',
        'Forgettable in the most permanent sense.',
        'Drinkable, technically. Recommendable, no.',
        'A whiskey that exists without distinction or purpose.',
        'The kind of bottle that ends up forgotten at the back of a shelf.',
        'Would not survive a blind tasting against anything better than itself.',
        'Checked a box somewhere. Just not the quality one.',
        'A cautionary addition to any collection.',
        'Hard to say what this is trying to accomplish.',
      ],
      nose:   [
        'a thin, deeply unremarkable', 'a flat and uninspired', 'a barely-there',
        'an unimpressive and forgettable', 'a characterless', 'a hollow and uninviting',
        'a disappointingly thin', 'a wan, lifeless', 'a flat and unresolved',
        'an airless', 'a stale and lifeless', 'a muted and joyless',
        'a barely perceptible',
      ],
      palate: [
        'little that resembles quality',
        'harsh grain and not much else',
        'an unpleasant bite that never resolves',
        'clumsy heat with no payoff',
        'rough and characterless from front to back',
        'nothing that earns a second sip',
        'thin and graceless throughout',
        'a grain-forward bitterness with no sweetness to balance it',
        'flat heat and very little else',
        'an unresolved and unpleasant mid-palate',
        'a palate that gives up quickly and without grace',
        'a rough and forgettable drinking experience',
        'nothing that develops or improves',
        'a palate that makes the case against this purchase',
        'dull grain bite with no depth to speak of',
      ],
      finish: [
        'an abrupt and rough close',
        'a short and unpleasant finish',
        'a harsh fade with nothing to recommend it',
        'a quick, ugly exit',
        'a thin and bitter finish',
        'nothing worth waiting for',
        'a finish that cuts off before delivering anything',
        'an unresolved close that lingers badly',
        'a short harsh exit with no sweetness',
        'a finish that confirms all concerns',
        'a close that ends the conversation badly',
        'a brief, uncomfortable fade',
        'ends without dignity',
      ],
      closers: [
        'Skip it.',
        'Better options exist at half this price.',
        'Not worth the shelf space.',
        'A mixer, at absolute best, for people who don\'t care.',
        'Nothing to seek out here.',
        'Pass without hesitation.',
        'A bottle for people with no alternatives.',
        'Nothing here justifies a second pour.',
        'A mixer at best — and even then, consider your options.',
        'Pour it over ice and ignore it.',
        'One glass is too many.',
        'An easy pass.',
        'Leave it for someone else.',
        'Not worth your time or your money.',
        'There are better options at every price point.',
      ],
    },
    below: {
      openers: [
        'A forgettable entry.',
        'Falls meaningfully short of expectations.',
        'Unremarkable but technically drinkable.',
        'Gets the job done, and that is the kindest thing to say.',
        'Serviceable. Nothing more.',
        'Will not offend. Will not impress.',
        'A bottle that exists, which is about all that can be said for it.',
        'Not a disaster, but not a reason to pour either.',
        'Technically whiskey. Not much beyond that.',
        'A pour that asks nothing and gives little.',
        'Adequate in the way that something can be adequate without being good.',
        'Uninspired but drinkable — that\'s the ceiling.',
        'A bottle that makes no promises and keeps none of the ones it implies.',
        'Passes the test and fails the conversation.',
        'The kind of whiskey you reach for when everything better is gone.',
        'Drinkable, which is apparently the best available word here.',
        'A pour that neither rewards attention nor punishes inattention.',
        'Not a failure, but not a success either.',
        'Does the minimum and stops there.',
        'A whiskey that goes down easily and leaves nothing behind.',
        'The floor of acceptable — and only just.',
        'Somewhere between inoffensive and irrelevant.',
        'A predictable and entirely unchallenging pour.',
        'Nothing wrong with it. Nothing particularly right either.',
      ],
      nose:   [
        'a subdued', 'a modest', 'a thin but recognizable', 'a muted', 'a plain',
        'a workmanlike and uninspired', 'a flat but inoffensive', 'a quiet',
        'a one-dimensional', 'an unremarkable', 'a forgettable', 'a baseline',
        'a thin and largely undeveloped', 'a routine', 'a colorless',
        'a barely-there but functional',
      ],
      palate: [
        'little actual depth',
        'thin sweetness over flat grain',
        'some bite with minimal follow-through',
        'passable sweetness without ambition',
        'underwhelming warmth and not much else',
        'a flat and uncomplicated drinking experience',
        'corn sweetness without complexity',
        'predictable and thin throughout',
        'a one-note mid-palate that never develops',
        'basic grain and sweetness, nothing more',
        'a palate that tells you what it is immediately and nothing further',
        'acceptable drinkability with no depth beneath it',
        'a flat sweetness that fades before it resolves',
        'thin and undemanding in equal measure',
        'the palate equivalent of a shrug',
      ],
      finish: [
        'a brief and forgettable finish',
        'a short fade that disappears without a trace',
        'a thin, uninspiring close',
        'fades too quickly to matter',
        'an unremarkable exit you\'ll forget immediately',
        'a finish that ends before it has anything to say',
        'a thin warmth that vanishes quickly',
        'a short, dry close with no character',
        'a finish that confirms the lack of depth',
        'a brief exit with no lasting impression',
        'ends cleanly but emptily',
        'a quick fade with nothing to hold onto',
        'a thin and inoffensive close',
        'gone before you notice it left',
      ],
      closers: [
        'A mixer at best.',
        'Drinkable, but uninspiring.',
        'Functional and entirely forgettable.',
        'Acceptable over ice, nothing beyond that.',
        'A pour for occasions when nothing better is available.',
        'Fine for what it is. Not much is what it is.',
        'Serviceable in the most literal sense.',
        'A background whiskey.',
        'Gets the job done and nothing else.',
        'Acceptable but easily forgotten.',
        'Not the bottle you reach for on purpose.',
        'A mixer or a last resort.',
      ],
    },
    average: {
      openers: [
        'A decent everyday pour.',
        'Solid and unpretentious.',
        'Does exactly what it says on the label.',
        'A reliable sipper with no surprises.',
        'Nothing to complain about.',
        'Inoffensive, consistent, and honest.',
        'A capable if unexciting bottle.',
        'Earns a place on the shelf without demanding attention.',
        'A workhorse pour that delivers on its modest promises.',
        'Dependable without being interesting.',
        'Competent and entirely acceptable.',
        'A steady and honest daily drinker.',
        'Gets out of its own way and lets you enjoy a glass.',
        'A reliable pour that knows its lane.',
        'No fireworks, no failures — just a decent whiskey.',
        'Clean, drinkable, and honest about what it is.',
        'The kind of bottle you finish without drama.',
        'A capable workhorse with no delusions of grandeur.',
        'Solid enough to keep around.',
        'A pour that earns its keep on the shelf.',
        'Consistently pleasant in a way that doesn\'t demand praise.',
        'Hits the expected notes and exits cleanly.',
        'A bottle that does its job without calling attention to itself.',
        'Honest whiskey at an honest level.',
        'A reliable option for the nights when you just want a decent pour.',
        'A comfortable, predictable, and pleasant glass.',
        'Not memorable — but not everything needs to be.',
      ],
      nose:   [
        'a pleasant', 'a clean', 'a straightforward', 'an approachable', 'a tidy',
        'a familiar and reassuring', 'a decent', 'a balanced', 'a consistent',
        'an agreeable', 'a reliable', 'a competent', 'a no-nonsense',
        'a workmanlike but honest', 'a predictable but not unpleasant',
        'a simple and functional',
      ],
      palate: [
        'balanced sweetness and grain',
        'good basic drinkability',
        'solid oak and vanilla doing their job',
        'easy warmth',
        'consistent corn sweetness',
        'predictable but pleasing from start to finish',
        'a steady mid-palate without ambition or fault',
        'clean and agreeable throughout',
        'a reliable sweetness with mild spice',
        'a pleasant mid-palate that doesn\'t surprise but doesn\'t disappoint',
        'approachable warmth and decent balance',
        'a competent sweetness over light oak',
        'solid corn and vanilla that hold together well',
        'a mid-palate that delivers exactly what the nose promises',
        'comfortable warmth and familiar flavors',
        'unchallenging but honestly pleasant',
        'a tidy balance of grain and sweetness',
        'nothing remarkable, nothing offensive — just a decent glass',
        'good basic character without complexity',
        'an agreeable mid-palate with mild spice and easy sweetness',
      ],
      finish: [
        'a clean, satisfying close',
        'a pleasant medium-length finish',
        'a warm, tidy fade',
        'an honest and unremarkable close that ends when it should',
        'a brief warm finish with a light sweetness',
        'a clean and inoffensive exit',
        'a moderate fade with mild oak',
        'finishes neatly and without drama',
        'a warm and predictable close',
        'a short to medium finish that doesn\'t overstay',
        'a tidy, grain-forward exit',
        'a clean, mild finish with a faint caramel note',
        'a finish that wraps things up tidily',
      ],
      closers: [
        'Worth keeping on the shelf.',
        'A solid daily drinker.',
        'Will satisfy without wowing anyone.',
        'Honest and unpretentious.',
        'A dependable option.',
        'Gets the job done.',
        'A solid regular pour.',
        'Reliable enough to keep around.',
        'An honest glass at an honest level.',
        'Good for what it is.',
        'Suitable for any occasion that doesn\'t call for something special.',
        'A steady, trustworthy pour.',
      ],
    },
    good: {
      openers: [
        'An impressive bottle.',
        'Well worth seeking out.',
        'Stands clearly above the crowd.',
        'A genuinely enjoyable pour that earns its praise.',
        'Hard to put down once it is open.',
        'Makes its case confidently and backs it up.',
        'Better than most of what surrounds it on the shelf.',
        'A real find — this delivers.',
        'This is what good bourbon is supposed to taste like.',
        'A bottle that rewards every sip.',
        'Genuinely above average in every meaningful way.',
        'This one earns its reputation.',
        'A well-made whiskey that announces itself clearly.',
        'The kind of bottle that reminds you why you got into this.',
        'An easy recommendation with nothing to apologize for.',
        'This is a proper bottle.',
        'More than the label promises — in a good way.',
        'A confident and capable pour from start to finish.',
        'A whiskey that holds your attention throughout.',
        'One of the better things to come across at this tier.',
        'A bottle with real quality behind it.',
        'This one justifies the interest.',
        'A serious sipper that delivers on every front.',
        'Well above the median and knows it.',
        'A bottle worth making room for.',
        'A genuinely satisfying experience from first pour to last.',
        'This is exactly what it should be.',
      ],
      nose:   [
        'a rich and inviting', 'a complex and rewarding', 'a beautifully layered',
        'an elegant and developed', 'a confident and deeply appealing', 'a genuinely compelling',
        'a well-developed', 'an impressively layered', 'a characterful and inviting',
        'a satisfyingly complex', 'a richly expressive', 'a well-structured',
        'a notably fine', 'a full and inviting', 'a seriously good',
        'an engaging and well-rounded', 'a polished and expressive',
        'a well-integrated and appealing',
      ],
      palate: [
        'excellent depth and balance',
        'a rewarding interplay of sweetness and oak',
        'complex fruit and spice working in harmony',
        'remarkable texture for its tier',
        'impressive layering that keeps revealing itself',
        'well-integrated heat and sweetness from start to finish',
        'a mid-palate that earns the price of admission on its own',
        'a genuine complexity that builds with every sip',
        'a beautifully balanced sweetness and spice',
        'a confident and full mid-palate',
        'layers that reward slow sipping',
        'depth that becomes more apparent with attention',
        'a well-constructed balance of oak, fruit, and grain',
        'a palate that keeps giving throughout',
        'a broad and satisfying complexity',
        'a compelling interplay of sweetness, spice, and wood',
        'a rich and rewarding drinking experience',
        'a full mid-palate with real character',
        'a textbook example of what this category can do',
        'fruit, spice, and oak in genuine and satisfying harmony',
        'a mid-palate that earns and keeps attention',
      ],
      finish: [
        'a long and satisfying finish',
        'a beautifully sustained close',
        'a complex lingering fade that evolves',
        'a finish that rewards patience — give it time',
        'a warm and deeply rewarding exit',
        'a finish that builds rather than fades',
        'a long warm close with genuine complexity',
        'a sustained and rewarding fade',
        'a finish worth slowing down for',
        'an extended and pleasantly complex close',
        'a finish that leaves something to think about',
        'a warm and lasting exit with real character',
        'a finish that stays long after the glass is empty',
        'a rewarding close that earns its length',
        'a confident and satisfying exit',
      ],
      closers: [
        'Highly recommended.',
        'A bottle worth returning to.',
        'A genuinely rewarding pour.',
        'This one delivers.',
        'A serious whiskey that earns its place.',
        'Don\'t hesitate.',
        'A bottle worth keeping stocked.',
        'A reliable pour at a high level.',
        'One of the better options in its class.',
        'Buy it. You\'ll be glad you did.',
        'A standout for the tier.',
        'Earns and deserves its reputation.',
      ],
    },
    excellent: {
      openers: [
        'A remarkable and significant find.',
        'Among the very best in its class.',
        'An exceptional whiskey by any serious measure.',
        'Genuinely, meaningfully outstanding.',
        'This is what the entire category aspires to be.',
        'Unforgettable — one of those bottles.',
        'One of the finest pours you are likely to encounter this year.',
        'This is the one. The bottle you tell people about.',
        'Exceptional quality that needs no qualification.',
        'A bottle that raises the bar for everything around it.',
        'Exceptional from the first nosing to the final sip.',
        'The kind of whiskey that makes you want to call someone.',
        'A serious, significant, extraordinary bottle.',
        'There are very few things better than this.',
        'Every element of this is working at the highest level.',
        'This bottle is not a surprise. It is a revelation.',
        'One of those pours where everything comes together.',
        'The category at its very best — no qualifier needed.',
        'An experience, not just a drink.',
        'Exceptional in ways that only become clearer with the second glass.',
        'This is what the good stuff is supposed to taste like.',
        'A bottle that demands and rewards full attention.',
        'Among the top tier by any standard.',
        'An exceptional pour that speaks for itself.',
        'One of the most impressive things to come across in this category.',
        'A whiskey of genuine distinction.',
        'The kind of bottle that changes a person\'s reference point.',
      ],
      nose:   [
        'an extraordinary', 'a breathtaking', 'a profound and deeply complex',
        'an awe-inspiring', 'a stunning and revelatory', 'a genuinely moving',
        'an exceptional', 'a magnificent', 'an uncommonly beautiful',
        'a remarkable and fully developed', 'a singularly impressive',
        'a layered and breathtaking', 'an exceptional and deeply expressive',
        'an outstanding', 'a profoundly satisfying', 'a genuinely rare',
        'a near-perfect', 'an immaculately constructed',
      ],
      palate: [
        'an unparalleled depth that justifies every dollar',
        'a masterclass in balance and complexity',
        'transcendent layering that keeps giving',
        'unforgettable richness that sits with you',
        'a once-in-many-bottles experience that changes the benchmark',
        'everything working in perfect concert — nothing wasted, nothing missing',
        'a depth of complexity that rewards every sip differently',
        'a richness and balance that places this in rare company',
        'an extraordinary mid-palate that feels almost architectural',
        'a palate of exceptional quality at every level',
        'complexity that unfolds deliberately and rewards patience',
        'a palate that belongs in the conversation about the category\'s finest',
        'a once-in-a-shelf-visit depth that stays with you',
        'outstanding integration of fruit, wood, and heat',
        'a palate that earns every superlative directed at it',
        'a depth and balance that is genuinely exceptional',
        'one of the finest mid-palates in its class',
        'remarkable in ways that only become more apparent with time',
      ],
      finish: [
        'an extraordinary and near-endless finish',
        'a finish that evolves for long minutes after the sip',
        'an exceptional close that lingers long after the glass is empty',
        'a finish that pulls you back to the glass again and again',
        'a sustained and deeply rewarding fade that earns genuine admiration',
        'a finish of extraordinary length and quality',
        'a close that develops and shifts for minutes afterward',
        'a finish that makes every preceding sip worth it',
        'an exceptional fade that gives and gives',
        'a finish so good it reframes the entire tasting experience',
        'a long and deeply satisfying close',
        'a finish that demands a second pour simply to confirm it',
        'a close of near-perfect length and character',
        'a finish that raises the stakes for everything else on the shelf',
      ],
      closers: [
        'An extraordinary bottle by any measure.',
        'A collector\'s treasure.',
        'This is the one to remember.',
        'One of those rare pours that justifies the obsession.',
        'Do not let this pass by.',
        'An essential bottle.',
        'One of the finest things available at this tier.',
        'A bottle that earns the word exceptional.',
        'The kind of pour that defines a year.',
        'Buy it. Protect it. Share it carefully.',
        'A whiskey that sets a new personal benchmark.',
        'The serious whiskey drinker\'s serious whiskey.',
      ],
    },
    perfect: {
      openers: [
        'A once-in-a-generation pour.',
        'Transcendent. No other word applies.',
        'There are genuinely no adequate words for this.',
        'A whiskey that redefines what the spirit is capable of.',
        'Perfection, or near enough that the difference is philosophical.',
        'The kind of bottle people build entire cellars around the dream of finding.',
        'This does not drink like a whiskey. It drinks like an argument that everything else needs to try harder.',
        'You may not encounter this again. Act accordingly.',
        'The summit. Nothing else comes this close.',
        'The kind of bottle people describe years later with perfect recall.',
        'There is before this pour and there is after it.',
        'A whiskey that makes the entire category feel aspirational again.',
        'This is why people collect. This is why patience matters. This is why.',
        'An impossibly good whiskey.',
        'A whiskey so complete it feels like a final statement.',
        'Nothing in this category prepares you for this bottle.',
        'The ceiling. Everything else is beneath it.',
        'A pour that changes what you believe is possible from American whiskey.',
        'There are no qualifications necessary and none possible.',
        'The kind of bottle that ends the search — at least for a while.',
        'A whiskey that does not negotiate. It simply is what it is, and what it is is perfect.',
        'A singular experience that few drinkers will ever have.',
        'This is what every distillery is trying to make.',
        'Unrepeatable. Irreplaceable. Extraordinary.',
      ],
      nose:   [
        'an impossibly perfect and singular', 'a once-in-a-lifetime',
        'an unrepeatable and otherworldly', 'an utterly transcendent',
        'a staggeringly beautiful', 'an absolutely flawless',
        'a genuinely historic', 'a once-in-a-career',
        'an incomprehensibly layered', 'a beyond-category',
        'a peerless and singular', 'a truly and completely extraordinary',
      ],
      palate: [
        'the very definition of what American whiskey can be at its absolute apex',
        'something that exists entirely outside of normal frameworks of evaluation',
        'a benchmark that other distilleries will spend decades attempting to approach',
        'the absolute pinnacle of the craft — nothing wasted, nothing missing, everything extraordinary',
        'a palate that redefines what the word complexity is allowed to mean',
        'a depth and harmony so complete it feels like it was inevitable',
        'a mid-palate that should be taught in schools and tasted in silence',
        'a palate so perfect it makes everything else feel like practice',
        'a drinking experience so complete it renders adjectives inadequate',
        'the kind of palate that makes a person stop mid-sip and recalibrate their entire reference point',
        'a convergence of quality so rare it borders on the miraculous',
        'a palate of absolute and undeniable perfection',
      ],
      finish: [
        'a finish measured not in seconds but in memory — it simply refuses to leave',
        'the kind of finish that makes you reconsider everything that came before it in your whiskey life',
        'a close so perfect and sustained that it feels like a genuine privilege to sit with',
        'a finish you will describe to other people for years, and they will not quite believe you',
        'a finish that seems to improve with every breath taken afterward',
        'the kind of close that makes you hold the empty glass because setting it down feels wrong',
        'a finish so sustained and so complex it constitutes its own separate experience',
        'a close that other bottles gesture toward and never reach',
        'a finish that still has something to say an hour later',
        'a close that earns the word infinite without exaggeration',
        'a finish that makes a strong argument for sitting still and doing nothing else for a long time',
        'a close so extraordinary that finishing the glass feels both inevitable and like a loss',
      ],
      closers: [
        'Acquire at any cost. Seriously.',
        'One of the most important bottles you will ever have the occasion to open.',
        'Do not share this with people who will not appreciate it.',
        'A testament to what patience, craft, and a little luck can achieve.',
        'If you find more of this, clear your schedule.',
        'The most important bottle in the cellar, by definition.',
        'Open it on a night worthy of it.',
        'A bottle that earns and rewards every bit of reverence directed at it.',
        'There is no better use for a glass.',
        'The whiskey that other whiskeys are trying to be.',
        'Document it. Remember it. Find another one.',
        'If this is the best thing in your collection, your collection is exceptional.',
        'The rarest kind of bottle — one that actually lives up to itself.',
        'A whiskey worth arranging your evening around.',
        'Nothing else needs to be said.',
      ],
    },
  };

  function getToneKey(rating) {
    if (rating < 1.5) return 'terrible';
    if (rating < 3.0) return 'poor';
    if (rating < 5.0) return 'below';
    if (rating < 6.5) return 'average';
    if (rating < 8.0) return 'good';
    if (rating < 9.25) return 'excellent';
    return 'perfect';
  }

  // ── FRAME SYSTEM ─────────────────────────────────────────────
  // frameKey is derived from rating quality × value sentiment.
  // It drives HOW notes are expressed in sentences — separately from
  // which flavor words are picked (that is still rating/rarity driven).
  //
  // Four frames:
  //   'celebrate'  — good quality, good value: enthusiastic, earned praise
  //   'forgiving'  — modest quality, good value: charitable, "for what it is"
  //   'tempered'   — good quality, bad value: honest about quality, disappointed by price
  //   'muted'      — modest quality, bad value: notes described as absent/flat/missing

  function getFrameKey(toneKey, valueSentiment) {
    const qualityGood = toneKey === 'good' || toneKey === 'excellent' || toneKey === 'perfect';
    const qualityMid  = toneKey === 'average' || toneKey === 'below';
    const qualityBad  = toneKey === 'terrible' || toneKey === 'poor';
    // Very bad quality always gets muted/negative framing regardless of value
    if (qualityBad) return 'muted';
    if (valueSentiment === 'positive') return qualityGood ? 'celebrate' : 'forgiving';
    if (valueSentiment === 'negative') return qualityGood ? 'tempered'  : 'muted';
    // neutral value: good quality speaks for itself, mid quality gets honest framing
    return qualityGood ? 'celebrate' : 'honest';
  }

  // FRAME phrase banks — used to wrap flavor notes in sentences
  // Each has: nose_intro, palate_intro, finish_intro, note_wrapper (how a single note is contextualized)
  const FRAME = {
    celebrate: {
      nose_intro: [
        'The nose opens with', 'On the nose, there is', 'Right away the nose offers',
        'The nose arrives with', 'Opening with', 'The nose leads confidently with',
        'Immediately on the nose,', 'The nose presents', 'The nose announces itself with',
        'On nosing, there is a clear', 'First impression from the nose is',
        'The nose comes forward with', 'Step into the glass and the nose delivers',
        'The nose is alive with', 'Right out of the glass, the nose brings',
      ],
      palate_intro: [
        'The palate follows through with', 'On the palate,', 'The mid-palate delivers',
        'In the glass,', 'The palate rewards with', 'The palate confirms what the nose promises —',
        'On the palate, the delivery is', 'The mid-palate opens up with',
        'The palate carries it forward beautifully with', 'The palate builds from there with',
        'What follows on the palate is', 'The palate picks up and runs with',
        'The drinking experience centers on', 'The palate steps up with',
        'In the mouth, the palate delivers',
      ],
      finish_intro: [
        'The finish is', 'It closes with', 'The close brings', 'The finish delivers',
        'The finish rounds things out with', 'The exit is', 'Closing with',
        'The finish wraps everything up with', 'The long close offers',
        'The finish earns its length with', 'On the way out,',
        'The finish opens into', 'Things wrap up beautifully with',
        'Closing notes bring', 'The finish settles into',
      ],
      note_positive: [
        '{note} — simple, but genuinely welcome here',
        '{note}, which lands exactly as it should',
        '{note} that earns its place without apology',
        '{note}, present and doing its job well',
        'a clean expression of {note}',
        '{note} that is honest and satisfying',
        '{note} that arrives and delivers fully',
        '{note} that rewards the attention paid to it',
        'a well-executed {note} that anchors the experience',
        '{note} doing exactly what it is supposed to do',
        '{note} — present, purposeful, and genuinely good',
        'a confident {note} that belongs exactly where it is',
        '{note}, precisely as it should be',
        'a genuine and satisfying {note}',
        '{note} that earns repeated sipping',
        '{note} — the kind of note that justifies the pour',
        'a beautifully integrated {note}',
        'an honest and well-developed {note}',
      ],
    },
    forgiving: {
      nose_intro: [
        'For what it is, the nose offers', 'The nose is simple but shows',
        'Unpretentiously, the nose brings', 'The nose delivers a modest',
        'Nothing complicated — just', 'The nose keeps things simple with',
        'In a low-key way, the nose offers', 'The nose doesn\'t overreach — just',
        'Appropriately modest, the nose presents', 'A simple but genuine nose with',
        'The nose is what it is — honest and uncomplicated with',
        'At this price, the nose delivers a genuine', 'The nose is direct:',
        'Without pretense, the nose opens with', 'Simply and honestly, the nose shows',
      ],
      palate_intro: [
        'The palate is straightforward with', 'Simply put, the palate offers',
        'Honestly, the palate gives you', 'The palate keeps it basic —',
        'There is nothing fancy here, just', 'The palate is what the price suggests:',
        'Unpretentiously, the palate delivers', 'The palate is honest and simple with',
        'Nothing more than expected, but genuinely,', 'The palate stays in its lane with',
        'The palate does not overreach — just', 'In a simple and honest way, the palate shows',
        'The palate delivers its modest promise of', 'For the money, the palate gives a genuine',
        'A down-to-earth palate with',
      ],
      finish_intro: [
        'The finish is brief but', 'It closes simply with', 'The finish is modest —',
        'The close is short and', 'The finish wraps up simply with',
        'The exit is brief and honest with', 'It doesn\'t linger, but closes with',
        'The finish is appropriately short with', 'A clean and simple close with',
        'The finish knows its limits — a brief', 'Modestly, it finishes with',
        'The close is simple and honest:', 'It wraps up without fuss with',
        'The finish, brief as it is, offers', 'Closes simply but genuinely with',
      ],
      note_positive: [
        '{note} — simple, but welcomed at this price',
        '{note} that doesn\'t try to be more than it is',
        'a pleasant if uncomplicated {note}',
        '{note}, which is exactly what you\'d hope for here',
        '{note} — nothing more is needed',
        'straightforward {note} that satisfies without demanding',
        '{note} — honest, present, and appreciated',
        'a modest but genuine {note}',
        '{note} that punches above the price in a quiet way',
        '{note} that is simple and entirely welcome',
        'a no-nonsense {note} that does its job',
        '{note} that earns more credit than the price would suggest',
        'an unassuming but real {note}',
        '{note} — exactly as expected and appreciated for it',
        'a solid if simple {note} that belongs here',
        '{note} that delivers more than it promises',
        'a clean and genuine {note} at a fair price',
        'a pleasant {note} that outperforms the asking price',
      ],
    },
    tempered: {
      nose_intro: [
        'The nose, to its credit, offers', 'Technically, the nose presents',
        'The nose shows genuine', 'There is real quality in the nose —',
        'In the glass, the nose does offer', 'The nose, it must be said, is genuinely good with',
        'Whatever the price problems, the nose delivers', 'To be fair, the nose is genuinely capable:',
        'Putting the price aside for a moment, the nose brings',
        'The nose — and this part earns its praise —', 'In isolation, the nose shows real quality with',
        'The nose performs well, offering', 'On its own terms, the nose presents',
        'The nose has no problems — it offers', 'To the nose\'s considerable credit,',
      ],
      palate_intro: [
        'The palate is genuinely capable, delivering', 'To be fair, the palate offers',
        'The whiskey itself delivers', 'In isolation, the palate shows',
        'The quality is there on the palate —', 'The palate does its job genuinely well with',
        'Setting aside the price, the palate gives', 'The spirit itself earns credit for',
        'In the glass, the quality is undeniable —', 'Whatever the value case, the palate brings',
        'The palate, to its credit, offers', 'On the palate at least,',
        'The whiskey itself is doing everything right with', 'Honestly, the palate delivers genuine',
        'The quality on the palate is hard to argue with —',
      ],
      finish_intro: [
        'The finish is legitimately good —', 'The close, at least, delivers',
        'The finish does its job —', 'To the spirit\'s credit, it finishes with',
        'The finish earns real praise —', 'In terms of finish, this delivers genuine',
        'The close is one area where this earns its price — a', 'The finish is not the problem — it offers',
        'The exit is genuinely well-done with', 'The finish performs at a high level:',
        'Whatever else is true, the finish offers', 'The close, which is legitimately impressive,',
        'The finish is good — credit where it\'s due —', 'At the close, the quality shows:',
        'The finish earns honest admiration with',
      ],
      note_positive: [
        '{note} that is genuinely well-done, if not well-priced',
        'a capable {note} that deserves acknowledgment',
        '{note} — this part, at least, earns respect',
        'real {note} that makes the price sting more, not less',
        '{note} of legitimate quality',
        '{note} — and there is no question the quality is there',
        'a genuinely impressive {note} that the price doesn\'t reflect',
        '{note} that earns credit even when the price doesn\'t',
        'an undeniably good {note}',
        '{note} — this is the part that makes the price so frustrating',
        'real quality in the {note}',
        '{note} that is better than the value proposition suggests',
        'a well-executed {note} that deserves better pricing',
        '{note} that delivers — it\'s the price that doesn\'t',
        'a genuinely good {note} that makes the overall case harder to dismiss',
        '{note} of real quality — the price is the only problem',
        'a fine {note} that raises the stakes on the pricing argument',
        '{note} that confirms the quality and sharpens the value frustration',
      ],
    },
    muted: {
      nose_intro: [
        'What should be on the nose is mostly absent —',
        'The nose promises', 'On paper, the nose should offer',
        'There is a suggestion of', 'The nose gestures vaguely toward',
        'The nose hints weakly at', 'What passes for a nose here is a thin gesture toward',
        'In theory, the nose should present', 'The nose reaches for',
        'A faint and unconvincing nose suggests', 'The nose barely registers',
        'One might expect the nose to offer — but what actually appears is a pale shadow of',
        'The nose is present in name only, showing',
        'A reluctant nose offers little more than a suggestion of',
        'Whatever the nose is reaching for, it only partly finds',
      ],
      palate_intro: [
        'The palate falls well short of', 'What should be a palate of',
        'The expected', 'There are traces of what might be',
        'The palate hints at', 'What arrives on the palate is a flat version of',
        'The palate reaches for but doesn\'t quite find',
        'In place of a real palate, there is only a faint trace of',
        'The palate offers a muted and unconvincing version of',
        'What should open up on the palate is mostly absent —',
        'The expected complexity fails to arrive, leaving only',
        'A mid-palate that barely registers — just traces of',
        'The palate promises and underdelivers with',
        'Where depth should be, there is instead a flat suggestion of',
        'The palate struggles to produce what should be',
      ],
      finish_intro: [
        'The finish barely registers —', 'What passes for a finish here is',
        'The close disappoints with', 'The finish, such as it is, offers',
        'The finish fades quickly into', 'The close is thin and unconvincing —',
        'What should be a finish is instead', 'The finish barely arrives before disappearing into',
        'The exit is brief and forgettable:', 'The finish, to put it charitably, offers',
        'A thin and unsatisfying finish brings', 'The close fails to arrive with anything better than',
        'The finish gives up early with only', 'What little finish exists offers',
        'The close underperforms, offering little more than',
      ],
      note_positive: [
        '{note} that never fully arrives',
        'a muted suggestion of {note} that doesn\'t follow through',
        '{note} in theory, but flat in practice',
        'the ghost of {note}',
        '{note} promised but not delivered',
        'traces of {note} that disappear before making an impression',
        'a faint and unconvincing {note}',
        '{note} that shows up briefly and contributes nothing',
        'something that wants to be {note} but isn\'t quite',
        'a pale and underdeveloped {note}',
        '{note} at a fraction of the expected intensity',
        'the idea of {note} without the reality',
        'a thin and unsatisfying {note}',
        '{note} so muted it barely qualifies',
        'an absent {note} — present on the label, missing in the glass',
        '{note} that flickers and fades before registering',
        'a weak and forgettable {note}',
        'a halfhearted {note} that disappoints on contact',
      ],
    },
    honest: {
      nose_intro: [
        'The nose offers', 'On the nose,', 'The nose is', 'The nose brings',
        'Opening with', 'The nose presents', 'On nosing,', 'The nose shows',
        'The nose comes with', 'There is', 'First, the nose:',
        'The nose opens on', 'The nose is characterized by',
        'A nose of', 'On the nose, the primary note is',
      ],
      palate_intro: [
        'On the palate,', 'The palate delivers', 'The mid-palate shows',
        'In the glass,', 'The palate brings', 'The palate gives',
        'The mid-palate offers', 'Palate-wise,', 'In the mouth,',
        'The drinking experience brings', 'The palate is characterized by',
        'The palate centers on', 'The mid-palate is defined by',
        'On the palate, the main note is', 'What the palate delivers is',
      ],
      finish_intro: [
        'The finish is', 'It closes with', 'The finish brings',
        'The close offers', 'The exit is', 'Closing with',
        'The finish wraps up with', 'On the way out,',
        'The finish delivers', 'The close is', 'It finishes with',
        'The exit brings', 'Finishing with', 'The close centers on',
        'The finish comes down to',
      ],
      note_positive: [
        '{note}',
        'a recognizable {note}',
        '{note} that does what it should',
        'straightforward {note}',
        'a clear {note}',
        '{note}, present and accounted for',
        'an honest {note}',
        '{note} — nothing more, nothing less',
        'a functional {note}',
        '{note} as expected',
        'a workmanlike {note}',
        '{note} that delivers without fanfare',
      ],
    },
  };

  // Map rarity + proof + rating to flavor descriptor tier
  function getTier(rarity, proof, rating) {
    if (rating < 3.0) return 'flawed';
    if (rating >= 9.25) return 'transcendent';
    const rarityScore = { common:0, uncommon:1, rare:2, epic:3, legendary:4 }[rarity];
    const proofScore  = proof >= 120 ? 2 : proof >= 100 ? 1 : 0;
    const ratingBoost = rating >= 8.0 ? 1 : 0;
    const total = rarityScore + proofScore + ratingBoost;
    if (total <= 1) return 'light';
    if (total <= 3) return 'mid';
    if (total <= 5) return 'rich';
    return 'exotic';
  }

  const DETAIL_DEPTH = { common:1, uncommon:2, rare:2, epic:3, legendary:3 };

  function generateDescription(rarity, proof, processMod, ageMod, rating, msrp) {
    // ── Step 1: resolve value first — it drives framing ──────────
    const valueResult   = getValueComment(rating, rarity, msrp);
    const valueSuffix   = valueResult.text ? ' ' + valueResult.text : '';
    const isNegativeValue = valueResult.sentiment === 'negative';

    // ── Step 2: derive structural keys ───────────────────────────
    const flavorTier = getTier(rarity, proof, rating);
    const depth      = DETAIL_DEPTH[rarity];
    const toneKey    = getToneKey(rating);
    const tone       = TONE[toneKey];
    const frameKey   = getFrameKey(toneKey, valueResult.sentiment);
    const frame      = FRAME[frameKey];

    // Nose tier: allow a bump at high proof in mid tier
    const nTier = (proof >= 110 && flavorTier === 'mid') ? 'rich' : flavorTier;

    // ── Step 3: pick flavor words ─────────────────────────────────
    const nose   = pick(NOSE[nTier]);
    const palate = pick(PALATE[flavorTier]);
    const finish = pick(FINISH[flavorTier]);
    const body   = pick(BODY_WORDS[flavorTier] || BODY_WORDS.mid);

    let palate2 = pick(PALATE[flavorTier]);
    let att = 0;
    while (palate2 === palate && att++ < 10) palate2 = pick(PALATE[flavorTier]);

    let nose2 = pick(NOSE[nTier]);
    att = 0;
    while (nose2 === nose && att++ < 10) nose2 = pick(NOSE[nTier]);

    // ── Step 4: build framed note sentences ──────────────────────
    // For terrible/poor tones the TONE nose/palate/finish framings are used directly
    // (they're already harsh enough). For everything else, FRAME drives the sentence.
    const useToneFraming = toneKey === 'terrible' || toneKey === 'poor';

    const noseIntro   = useToneFraming ? pick(tone.nose)   : pick(frame.nose_intro);
    const palateIntro = useToneFraming ? pick(tone.palate) : pick(frame.palate_intro);
    const finishIntro = useToneFraming ? pick(tone.finish) : pick(frame.finish_intro);

    // Wrap individual notes through the frame's note_positive template
    function wrapNote(n) {
      if (useToneFraming) return n;
      return pick(frame.note_positive).replace('{note}', n);
    }

    const noseWrapped   = wrapNote(nose);
    const nose2Wrapped  = wrapNote(nose2);
    const palateWrapped = wrapNote(palate);
    const palate2Wrapped = wrapNote(palate2);

    // ── Step 5: tone opener and closer ───────────────────────────
    const opener = pick(tone.openers);
    const closer = pick(tone.closers);

    const good    = toneKey === 'good' || toneKey === 'excellent' || toneKey === 'perfect';
    const bad     = toneKey === 'terrible' || toneKey === 'poor';
    const mediocre = toneKey === 'below' || toneKey === 'average';

    // ── Step 6: modifier notes ────────────────────────────────────
    let modNote = '';
    if (processMod) {
      const k = processMod.key;
      if (k === 'Single Barrel') {
        modNote = good     ? 'Single barrel character shines through with real distinction here. '
                : bad      ? 'The single barrel variance exposes flaws rather than flattering them. '
                : frameKey === 'forgiving' ? pick([
                    'Single barrel individuality comes through — modest, but genuinely its own. ',
                    'This barrel has a character of its own, for better and for worse. ',
                    'Single barrel variation is part of the charm here, even if the results are simple. ',
                  ])
                : frameKey === 'muted' ? pick([
                    'Single barrel bottling does nothing to distinguish this one. ',
                    'Whatever made this barrel individual, it doesn\'t show up as quality. ',
                    'The single barrel variance is evident — unfortunately, not in a useful direction. ',
                  ])
                : frameKey === 'tempered' ? pick([
                    'Single barrel character is present and real — just not at the right price. ',
                    'The individual barrel character is genuinely good. The price is not. ',
                  ])
                : 'Single barrel character gives this a distinctive edge. ';
      }
      if (k === 'Small Batch') {
        modNote = good     ? 'Small batch blending achieves an impressive and cohesive harmony. '
                : bad      ? 'The small batch blend never finds its footing. '
                : frameKey === 'forgiving' ? pick([
                    'Small batch blending keeps things consistent and easy. ',
                    'The blend is tidy and agreeable for the price. ',
                  ])
                : frameKey === 'muted' ? pick([
                    'Small batch blending evens things out without improving them. ',
                    'The blend is consistent, though consistently underwhelming. ',
                    'Whatever the batching achieved, it didn\'t achieve enough. ',
                  ])
                : frameKey === 'tempered' ? pick([
                    'The small batch harmony is real — the value case is not. ',
                    'A well-blended small batch that costs more than it should. ',
                  ])
                : 'Small batch blending adds a layer of consistency. ';
      }
      if (k === 'Bottled-in-Bond') {
        modNote = good     ? 'The bonded bottling lends this honest, well-structured authority. '
                : bad      ? 'Even the bonded bottling standard cannot rescue the base distillate. '
                : frameKey === 'forgiving' ? pick([
                    'Bottled-in-bond standards provide a reliable foundation here. ',
                    'The bonded credential means something, and it shows at this price. ',
                  ])
                : frameKey === 'muted' ? pick([
                    'Bonded credentials on paper, middling results in the glass. ',
                    'Meeting the bonded standard is the most interesting thing about this bottle. ',
                    'The bonded process is respected; the base spirit did not return the favor. ',
                  ])
                : frameKey === 'tempered' ? pick([
                    'Bonded integrity is present and real — the price just isn\'t justified by what surrounds it. ',
                    'The bonded structure is legitimately good. The shelf price is not. ',
                  ])
                : 'Bottled-in-bond discipline is evident throughout. ';
      }
      if (k === 'Full Proof') {
        modNote = good     ? 'Bottled at full barrel proof, this rewards with undiluted authority and honesty. '
                : bad      ? 'The uncut proof amplifies every flaw rather than hiding them. '
                : frameKey === 'forgiving' ? pick([
                    'Full proof bottling adds honesty and a bit of extra heat for the price. ',
                    'At barrel strength, you get everything this has to offer — it\'s a fair deal. ',
                  ])
                : frameKey === 'muted' ? pick([
                    'Full proof bottling means nothing is hidden — including the shortcomings. ',
                    'At barrel strength, there is nowhere to hide, and this has too much to hide. ',
                    'The uncut proof reveals more problems than it solves. ',
                  ])
                : frameKey === 'tempered' ? pick([
                    'At full proof, the quality is undeniable — the price is harder to forgive. ',
                    'Full proof honesty reveals a genuinely good spirit asking too much for it. ',
                  ])
                : 'Bottled at full barrel proof — nothing held back. ';
      }
      if (k === 'Double Oaked') {
        modNote = good     ? 'The double oaking has contributed remarkable structural depth and complexity. '
                : bad      ? 'The second barrel has over-extracted badly, leaving bitterness in place of depth. '
                : frameKey === 'forgiving' ? pick([
                    'Double oaking adds a pleasant extra layer of oak for the money. ',
                    'The second barrel brings a little more wood influence, and at this price, that\'s welcome. ',
                  ])
                : frameKey === 'muted' ? pick([
                    'Double oaking doesn\'t seem to add much that the base spirit couldn\'t have done without. ',
                    'A second barrel, though the added oak influence is underwhelming at best. ',
                    'The double oak treatment is detectable but doesn\'t lift this meaningfully. ',
                  ])
                : frameKey === 'tempered' ? pick([
                    'The double oak complexity is real and genuinely impressive — the price just isn\'t. ',
                    'Second barrel depth is present and earned; second-tier pricing is not. ',
                  ])
                : 'A second barrel maturation doubles the oak influence throughout. ';
      }
      if (k === 'French Oaked') {
        modNote = good     ? 'French oak finishing has introduced a quietly sophisticated, exotic elegance. '
                : bad      ? 'The French oak influence feels mismatched and out of place here. '
                : frameKey === 'forgiving' ? pick([
                    'French oak finishing adds a subtle twist that makes this a bit more interesting for the price. ',
                    'The French oak touch is a pleasant surprise at this price point. ',
                  ])
                : frameKey === 'muted' ? pick([
                    'French oak finishing is listed on the label; finding it in the glass is another matter. ',
                    'The French oak influence is subtle to the point of being nearly undetectable. ',
                    'An interesting finishing choice that doesn\'t justify itself in the glass or on the price tag. ',
                  ])
                : frameKey === 'tempered' ? pick([
                    'The French oak elegance is legitimately present — but legitimacy costs extra here. ',
                    'A genuinely distinctive French oak character undermined by a price that asks too much. ',
                  ])
                : 'French oak finishing contributes a subtle and distinct elegance. ';
      }
    }

    // ── Step 7: age notes ─────────────────────────────────────────
    let ageNote = '';
    if (ageMod) {
      const y = ageMod.years;
      if (toneKey === 'perfect' || toneKey === 'excellent') {
        ageNote = y >= 12
          ? `${y} years of patient maturation have rewarded this spirit with extraordinary depth. `
          : `${y} years has given this spirit a genuine and admirable polish. `;
      } else if (toneKey === 'good') {
        ageNote = y >= 12
          ? `${y} years of careful aging have clearly paid off. `
          : `${y} years of oak integration have rounded this out nicely. `;
      } else if (bad) {
        ageNote = y >= 12
          ? `Despite ${y} years in barrel, time has not tamed its considerable rough edges. `
          : `${y} years was not enough to bring this into proper shape. `;
      } else if (frameKey === 'forgiving') {
        ageNote = pick(y >= 12 ? [
          `${y} years of aging that show in the glass — honestly more than expected at this price. `,
          `${y} years of patience, and you can taste it. Simple, but earned. `,
          `${y} years of maturation that genuinely contribute something at this price point. `,
        ] : [
          `${y} years of aging add a touch of character that punches above the price. `,
          `${y} years in wood that does exactly what you'd hope for the money. `,
        ]);
      } else if (frameKey === 'muted') {
        ageNote = pick(y >= 12 ? [
          `${y} years of aging are largely invisible here. `,
          `${y} years in barrel and the results are surprisingly modest. `,
          `Time has been spent — ${y} years of it — without much to show for it in the glass. `,
          `${y} years of maturation that neither elevates nor defines this spirit. `,
        ] : [
          `${y} years of aging doesn't seem to have done this any particular favors. `,
          `${y} years in wood, though the oak influence is unremarkable at best. `,
          `${y} years that mellowed things without adding much of interest. `,
        ]);
      } else if (frameKey === 'tempered') {
        ageNote = pick(y >= 12 ? [
          `${y} years of maturation that genuinely show — this is not where the value problem lies. `,
          `The ${y} years are evident in the glass. The price tag is where the argument falls apart. `,
        ] : [
          `${y} years that contribute real character, even if the price overstates it overall. `,
          `Oak integration from ${y} years of aging is one of the better things going on here. `,
        ]);
      } else {
        ageNote = y >= 12
          ? `${y} years of patience are evident in every sip. `
          : `${y} years of oak integration have mellowed the spirit. `;
      }
    }

    // ── Step 8: opener / closer — suppress on negative value ─────
    const NEUTRAL_OPENERS_BAD_VALUE = [
      'Decent enough in the glass.',
      'The whiskey itself is drinkable.',
      'Not without merit as a spirit.',
      'There is something here, just not enough.',
      'Competent at what it does.',
      'Technically a functional pour.',
    ];
    const effectiveOpener = isNegativeValue ? pick(NEUTRAL_OPENERS_BAD_VALUE) : opener;
    const effectiveCloser = isNegativeValue ? '' : closer + ' ';

    // ── Step 9: assemble by depth ─────────────────────────────────
    const finishCap = finishIntro[0].toUpperCase() + finishIntro.slice(1);

    if (depth === 1) {
      return `${effectiveOpener} A ${body} pour. ${noseIntro} ${noseWrapped}. ${finishCap} ${finish}.${valueSuffix}`;
    }
    if (depth === 2) {
      return `${effectiveOpener} ${modNote}${ageNote}${noseIntro} ${noseWrapped}. ${palateIntro} ${palateWrapped}. ${finishCap} ${finish}. ${effectiveCloser}${valueSuffix}`.trimEnd().replace(/\s{2,}/g, ' ');
    }
    // depth 3
    return `${effectiveOpener} ${modNote}${ageNote}${noseIntro} ${noseWrapped} and ${nose2Wrapped}. ${palateIntro} ${palateWrapped} and ${palate2Wrapped}. ${finishCap} ${finish}. ${effectiveCloser}${valueSuffix}`.trimEnd().replace(/\s{2,}/g, ' ');
  }

  // ── STAR RATING GENERATOR (0–10 scale) ───────────────────────
  // Center points on 0–10 scale per rarity
  const RARITY_BASE = { common: 3.5, uncommon: 5.0, rare: 6.5, epic: 7.8, legendary: 8.6 };

  function modifierRatingBonus(processMod) {
    if (!processMod || processMod.key === 'Small Batch') return 0;
    // Scale 0–10: mostly 0.8–1.4, rarely up to 2.5
    const r = Math.random();
    if (r < 0.55) return randF(0.8, 1.4);
    if (r < 0.85) return randF(1.4, 2.0);
    if (r < 0.97) return randF(2.0, 2.4);
    return randF(2.4, 2.5);
  }

  function generateRating(rarity, proof, msrp, processMod) {
    let base = RARITY_BASE[rarity];

    // Proof influence
    if (proof >= 120)      base += 0.4;
    else if (proof >= 100) base += 0.2;
    else if (proof < 86)   base -= 0.2;

    // MSRP position within rarity tier
    const cfg = RARITY_CONFIG[rarity];
    const msrpRange = cfg.baseMsrp[1] - cfg.baseMsrp[0];
    const msrpPos   = Math.min(1, Math.max(0, (msrp - cfg.baseMsrp[0]) / (msrpRange || 1)));
    base += msrpPos * 0.6;

    // Modifier bonus
    base += modifierRatingBonus(processMod);

    // Random variance — wider at lower rarities
    const variance = { common: 1.4, uncommon: 1.2, rare: 1.1, epic: 1.0, legendary: 0.9 }[rarity];
    base += (Math.random() * 2 - 1) * variance;

    // Sleeper common: rare chance to spike high (~7% chance)
    if (rarity === 'common' && pct(0.07)) base += randF(1.5, 2.8);

    // Disappointment at rare+: rare chance to sink badly
    if ((rarity === 'rare' || rarity === 'epic' || rarity === 'legendary') && pct(0.08)) {
      base -= randF(1.5, 3.0);
    }

    // Perfect 10 is extremely rare — only legendary with near-perfect roll can reach it,
    // and even then it's capped behind a probability gate
    if (base >= 9.8) {
      // ~0.1% of all rolls will be legendary and in this range; gate it further
      if (rarity === 'legendary' && Math.random() < 0.04) {
        base = 10.0;
      } else {
        base = Math.min(9.75, base); // everyone else caps at 9.75
      }
    }

    base = Math.max(0.0, Math.min(10.0, base));
    // Round to nearest 0.1
    return Math.round(base * 10) / 10;
  }

  // ── PRIMARY EXPORT: generateBottle ──────────────────────────
  function generateBottle(rarity) {
    const cfg      = RARITY_CONFIG[rarity];
    const pattern  = pick(cfg.patterns);
    const baseName = applyPattern(pattern);

    const { processMod, ageMod } = selectModifiers(rarity);

    // MSRP must come before proof (proof now depends on msrp)
    let msrp = rand(cfg.baseMsrp[0], cfg.baseMsrp[1]);
    if (processMod) msrp += processMod.bonus;
    if (ageMod)     msrp += ageMod.bonus;

    const proof = generateProof(processMod, msrp);

    // Rating before description (description tone depends on rating)
    const rating = generateRating(rarity, proof, msrp, processMod);

    const description = generateDescription(rarity, proof, processMod, ageMod, rating, msrp);

    // Spirit type: 80% Bourbon, 20% Rye
    const isRye      = pct(0.20);
    const spiritType = (processMod || ageMod)
      ? (isRye ? 'Rye' : 'Bourbon')
      : (isRye ? 'Straight Rye Whiskey' : 'Straight Bourbon Whiskey');

    // Build display name
    let displayName = baseName;
    if (processMod) displayName += ' ' + processMod.key;
    if (ageMod)     displayName += ' ' + ageMod.years + ' Year';
    displayName += ' ' + spiritType;

    const style = pick(BOTTLE_STYLES[rarity]);
    const short = makeShort(baseName);
    const tag   = baseName.length > 16 ? baseName.slice(0, 15) + '…' : baseName;
    const id    = rarity[0] + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);

    return {
      id,
      name: displayName,
      baseName,
      rarity,
      msrp,
      proof,
      processMod,
      ageMod,
      description,
      rating,
      svgStyle: { ...style, short, tag },
    };
  }

  return { generateBottle };
})();
