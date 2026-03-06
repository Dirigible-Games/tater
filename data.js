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
      'smoked plum, aged leather, and sweet oak', 'antique books and dark fruit',
      'sandalwood and saffron over caramel', 'beeswax, dark cherry, and ancient wood',
      'fig, rose petal, and charred oak', 'smoked vanilla, truffle, and dark raisin',
      'candied violet and Oloroso sherry', 'crystallized honey and black cardamom',
      'port wine, hibiscus, and old cedarwood', 'dark fruit, spice, and silk',
      'dried cherry, worn leather, and smoked vanilla', 'late-harvest wine and whiskey library',
      'caramel, incense, and dark stone fruit', 'marzipan, aged cognac, and charred oak',
      'dark honey, truffle, and floral undertones', 'dried rose, black cardamom, and tobacco',
      'dark fruit, slate, and beeswax', 'roasted grain and dark chocolate',
      'caramel made in an old library', 'smoked plum, saffron, and sweet oak',
      'ancient spice and dark fruit layers', 'tobacco, dried cherry, and ancient leather',
      'dark and sweet and smoky', 'dark fruit, wax, and time',
      'cedarwood, dark honey, and truffle', 'deep complexity and old wood',
      'dark cherry, charred wood, and spice', 'fig paste, leather, and floral',
      'dark balsamic, smoked vanilla, and dried rose', 'old sherry, espresso, and rare wood resin',
      'dark fruit, incense, and time', 'burnt sugar, tobacco flower, and ancient oak',
      'old bottle and stone fruit', 'walnut, dark cherry, and smoked vanilla',
      'cedar, dark chocolate, and saffron', 'dark rum, dried cherry, and roasted grain',
      'fig, cedar, dark honey, and ancient smoke', 'old library, dark fruit, and smoked vanilla',
      'espresso, dark walnut, and dried rose', 'charred oak and dark cherry liqueur',
      'black cardamom, smoked fruit, and aged leather', 'chocolate, dried plum, and cedarwood',
      'dark dried cherry, tobacco flower, and smoked honey', 'ancient wood and dark spice',
      'dark fruit and funeral lilies', 'smoked plum and ancient leather',
      'crystallized dark fruit and old oak', 'tobacco and dried dark cherry',
      'singular dark spice and ancient wood', 'old cognac barrel and dark dried fruit',
    ],
  };

  const PALATE = {
    flawed: [
      'harsh grain bite', 'chemical heat', 'unresolved bitterness', 'raw ethanol',
      'flat and thin', 'astringent tannin', 'solvent burn', 'off-grain sharpness',
      'metallic finish lead-in', 'sour mash character', 'rough and hollow', 'plastic heat',
      'bitter grain', 'clumsy heat', 'unpleasant bite', 'medicinal grain',
      'burning without sweetness', 'thin and caustic', 'aggressive bitterness',
      'industrial sharpness', 'rough tannin', 'stale grain', 'unintegrated heat',
      'sour and astringent', 'burning grain bite', 'flat bitterness', 'sharp ethanol',
      'hollow and unpleasant', 'raw and unfinished', 'bitter and thin',
    ],
    light: [
      'vanilla cream', 'corn sweetness', 'light caramel', 'soft grain', 'honey',
      'mild spice', 'biscuit', 'light oak', 'butterscotch', 'white sugar',
      'soft peach', 'light citrus', 'mild warmth', 'clean sweetness', 'light toffee',
      'fresh grain', 'mild vanilla', 'gentle warmth', 'soft fruit', 'light brown sugar',
      'mild honey', 'clean corn', 'light biscuit sweetness', 'faint spice',
      'soft caramel', 'mild warmth', 'light apple', 'gentle sweetness',
      'corn and vanilla', 'soft malt', 'light dried fruit', 'mild oak sweetness',
    ],
    mid: [
      'caramel', 'warming spice', 'toasted oak', 'stone fruit', 'rye spice',
      'butterscotch', 'warm honey', 'baking spice', 'dried fruit', 'roasted nuts',
      'citrus and caramel', 'chewy caramel', 'brown sugar', 'soft tannins',
      'banana and brown sugar', 'cherry and cinnamon', 'maple', 'praline',
      'light chocolate', 'toasted grain', 'apple and clove', 'honey and pepper',
      'pecan and butter', 'dried cherry', 'gingerbread', 'toasted coconut',
      'dried mango', 'molasses', 'toffee', 'hazelnut', 'pear and vanilla',
      'dried plum', 'orange marmalade', 'wildflower honey', 'caramel corn',
      'ginger', 'lemon curd', 'salted caramel', 'rye bread and cherry',
      'spiced honey', 'dried apricot', 'warm cinnamon', 'pecan brittle',
      'ripe plum', 'maple and oak', 'dark brown sugar', 'toasted walnut',
      'apple butter', 'caramel and tobacco', 'dried blueberry', 'baked pear',
      'rum raisin', 'honey oak', 'banana and spice', 'cardamom', 'warm grain',
      'black pepper and pear', 'light tobacco', 'dried fig', 'orange zest',
    ],
    rich: [
      'dark fruit', 'molasses', 'bold cinnamon', 'leather and tobacco',
      'bittersweet chocolate', 'dark cherry', 'charred oak', 'dark sugar',
      'espresso', 'dried fig', 'black walnut', 'stewed plum', 'cocoa',
      'smoked caramel', 'pipe tobacco', 'dark toffee', 'cedar',
      'blackberry preserve', 'roasted coffee', 'dried date', 'dark rye spice',
      'anise', 'licorice', 'black currant', 'burnt caramel', 'prune and chocolate',
      'toasted pecan', 'smoked dark sugar', 'old leather', 'dark honey',
      'chocolate malt', 'bitter orange', 'dried plum and smoke', 'charred grain',
      'dark cherry jam', 'charred sugar', 'black fruit', 'dark molasses',
      'smoked caramel', 'espresso and cherry', 'muscovado', 'smoked tobacco',
      'dark walnut', 'dense rye spice', 'dark chocolate', 'blackstrap molasses',
      'smoked fig', 'bitter cocoa', 'dark cherry compote', 'bold leather',
      'roasted chicory', 'dark dried fruit', 'ancient leather', 'charred maple',
      'smoky toffee', 'old oak', 'roasted espresso', 'smoked leather',
    ],
    exotic: [
      'dark fruit and ancient oak', 'tropical fruit and chocolate',
      'dark cherry and vanilla', 'smoked plum', 'roasted coffee and dark fruit',
      'spice and leather', 'fruit preserve and espresso', 'fig and espresso',
      'dark honey and tobacco', 'Oloroso sherry and fruit', 'smoked vanilla',
      'black cardamom and vanilla', 'dark spice and leather', 'marzipan and leather',
      'charred oak and dark cherry', 'deep fig and balsamic', 'roasted cacao and oak',
      'smoked dark fruit', 'caramel and smoke', 'tobacco and black cherry',
      'dark dried cherry', 'leather and dark chocolate', 'smoked sugar and wood',
      'crystallized dark sugar', 'dried cherry and bittersweet chocolate',
      'ancient oak tannin', 'opulent dark fruit', 'silky dark spice',
      'dark fruit layers', 'concentrated dried plum', 'aged leather and fruit',
      'bittersweet cocoa and spice', 'cedar and dark currant', 'smoked molasses',
      'dark rum and spice', 'roasted grain and dark cherry', 'anise and dark fruit',
      'tropical wood and spice', 'candied dark fruit', 'smoked black cherry',
      'dark treacle and tannin', 'layered dark fruit and oak', 'tobacco and dark spice',
    ],
    transcendent: [
      'dark cherry and smoked oak', 'ancient leather and dark fruit',
      'espresso and charred vanilla', 'dark chocolate and dried rose',
      'smoked plum and ancient wood', 'saffron and honeycomb',
      'fig and tobacco leaf', 'charred oak and dark honey',
      'black cardamom and dried cherry', 'roasted cacao and aged leather',
      'dark fruit and old cedarwood', 'tobacco flower and molasses',
      'candied violet and dark spice', 'smoked vanilla and dark fruit',
      'port wine reduction and dark oak', 'Oloroso sherry and dried fig',
      'ancient wood and crystallized sugar', 'dark walnut and aged leather',
      'smoked dark cherry and cedar', 'espresso and dark dried fruit',
      'dark honey and ancient oak', 'concentrated dark fruit and silk',
      'layered tobacco and dark spice', 'marzipan and aged cognac oak',
      'crystallized dark sugar and smoke', 'bittersweet chocolate and leather',
      'old oak resin and dark cherry', 'dark fruit and funeral lilies',
      'smoked leather and dark molasses', 'ancient tannin and dark cherry liqueur',
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
  // Exact ranges per user spec.
  // Returns { lo, hi, highThresh } where:
  //   rating < lo        → low value (bad)
  //   lo <= rating <= hi → expected value (neutral)
  //   rating > hi        → high value (good)
  // The global >$125 rule is checked first in getValueComment.
  function getSegmentExpectation(rarity, msrp) {
    // Common & Uncommon share the same bands
    if (rarity === 'common' || rarity === 'uncommon') {
      if (msrp < 20)  return { lo: 3.1,  hi: 4.74, highThresh: 4.75 };
      if (msrp <= 40) return { lo: 4.25, hi: 5.49, highThresh: 5.5  };
      return           { lo: 5.25, hi: 6.74, highThresh: 6.75 };
    }
    if (rarity === 'rare') {
      if (msrp < 20)  return { lo: 4.5,  hi: 6.74, highThresh: 6.75 };
      if (msrp <= 40) return { lo: 5.25, hi: 7.24, highThresh: 7.25 };
      return           { lo: 6.25, hi: 7.74, highThresh: 7.75 };
    }
    if (rarity === 'epic') {
      if (msrp < 20)  return { lo: 6.5,  hi: 7.74, highThresh: 7.75 };
      if (msrp <= 40) return { lo: 7.25, hi: 7.74, highThresh: 7.75 };
      return           { lo: 7.25, hi: 8.74, highThresh: 8.75 };
    }
    // legendary — any MSRP
    return { lo: 7.75, hi: 9.24, highThresh: 9.25 };
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
    // Global: any rarity, MSRP > $125 — special handling
    if (msrp > 125) {
      if (rating >= 9.1)  return { text: pick(VALUE_PHRASES.all_time_great),                                    sentiment: 'positive' };
      if (rating >= 7.75) return { text: '',                                                                     sentiment: 'neutral'  };
      return               { text: pick(VALUE_PHRASES.bad_value).replace('${msrp}', msrp),                      sentiment: 'negative' };
    }
    const seg = getSegmentExpectation(rarity, msrp);
    if (rating >= seg.highThresh) {
      // High value — price-tiered overperform language
      const pool = msrp < 25  ? VALUE_PHRASES.overperform_budget
                 : msrp < 70  ? VALUE_PHRASES.overperform_value
                 :               VALUE_PHRASES.overperform_premium;
      return { text: pick(pool).replace('${msrp}', msrp), sentiment: 'positive' };
    }
    if (rating < seg.lo) {
      // Low value
      return { text: pick(VALUE_PHRASES.bad_value).replace('${msrp}', msrp), sentiment: 'negative' };
    }
    // Expected range — neutral, no value comment
    return { text: '', sentiment: 'neutral' };
  }

  // ── RATING TIER ───────────────────────────────────────────────
  function getRatingTier(rating) {
    if (rating < 4.0)  return 'low';
    if (rating < 7.0)  return 'mid';
    return 'high';
  }

  // ── QUALIFIER WORDS BY TIER ───────────────────────────────────
  // Low: prefixed to descriptors to signal problems
  // Mid: optional mild positives, occasional negatives
  // High: prefixed to descriptors to elevate them
  const QUALIFIERS = {
    low: {
      negative: [
        'harsh', 'faint', 'muted', 'flat', 'thin', 'sharp', 'rough',
        'hollow', 'stale', 'bitter', 'astringent', 'acrid', 'raw',
        'off', 'unpleasant', 'weak', 'watery', 'lifeless', 'chemical',
        'aggressive', 'empty', 'sour',
      ],
    },
    mid: {
      positive: [
        'strong', 'clean', 'steady', 'solid', 'honest', 'good',
        'noticeable', 'rounded', 'balanced', 'present',
      ],
      negative: [
        'thin', 'faint', 'muted', 'mild', 'subdued', 'flat',
      ],
    },
    high: {
      positive: [
        'luxurious', 'deep', 'velvety', 'rich', 'complex', 'layered',
        'bold', 'elegant', 'refined', 'vibrant', 'lush', 'silky',
        'powerful', 'extraordinary', 'profound', 'exceptional',
        'immaculate', 'opulent', 'breathtaking', 'magnificent',
      ],
    },
  };

  // ── OVERALL QUALITY SENTENCES ─────────────────────────────────
  const QUALITY_SENTENCES = {
    low: [
      'Difficult to recommend.',
      'Falls well short of the mark.',
      'A bottle without a compelling reason to revisit.',
      'Not a successful pour by any measure.',
      'Struggles to justify a second glass.',
      'A significant disappointment from start to finish.',
      'Hard to find a reason to seek this out.',
      'A bottle that raises more questions than it answers.',
      'Does not deliver on the basics.',
      'Among the less compelling options in its class.',
    ],
    mid: [
      'A serviceable everyday pour.',
      'Gets the job done without distinction.',
      'Dependable if unremarkable.',
      'Solid enough to keep around.',
      'A competent bottle at its level.',
      'An honest pour with no real surprises.',
      'Nothing to seek out, nothing to avoid.',
      'Does what it promises and stops there.',
      'A reliable if unexciting choice.',
      'A functional daily drinker.',
      'Consistent and unpretentious.',
      'Earns its place on the shelf without demanding attention.',
    ],
    high: [
      'A genuinely impressive bottle.',
      'Well worth seeking out.',
      'A serious whiskey that earns every bit of praise.',
      'Stands well above the median.',
      'A bottle worth returning to.',
      'Among the better things available at this tier.',
      'Hard to put down once it is open.',
      'A rewarding pour from start to finish.',
      'One of the more compelling bottles in its class.',
      'Delivers at a high level throughout.',
      'An excellent representative of the category.',
      'A pour that rewards the attention given to it.',
      'This one earns the hype.',
    ],
  };

  // ── DESCRIPTOR TIER MAPPING ───────────────────────────────────
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

  // ── GENERATE DESCRIPTION ──────────────────────────────────────
  function generateDescription(rarity, proof, processMod, ageMod, rating, msrp) {
    const valueResult = getValueComment(rating, rarity, msrp);
    const tier        = getRatingTier(rating);
    const flavorTier  = getTier(rarity, proof, rating);
    const nTier       = (proof >= 110 && flavorTier === 'mid') ? 'rich' : flavorTier;

    // How many descriptors to show: 1–4, weighted toward 2–3
    function descriptorCount() {
      const r = Math.random();
      if (r < 0.10) return 1;
      if (r < 0.45) return 2;
      if (r < 0.85) return 3;
      return 4;
    }

    // Pick N unique items from an array
    function pickN(arr, n) {
      const shuffled = [...arr].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, Math.min(n, shuffled.length));
    }

    // Build a descriptor list for one section (nose or palate)
    // Returns an array of display strings
    function buildDescriptors(pool) {
      const count = descriptorCount();
      const base  = pickN(pool, count);

      if (tier === 'low') {
        // Always prepend a negative qualifier to at least one, sometimes more
        const negs = QUALIFIERS.low.negative;
        return base.map((d, i) => {
          // First descriptor always gets a negative qualifier
          // Additional ones get one ~50% of the time
          if (i === 0 || Math.random() < 0.5) {
            return pick(negs) + ' ' + d;
          }
          return d;
        });
      }

      if (tier === 'mid') {
        // Apply qualifier to at most one descriptor, ~40% of the time
        const useQual = Math.random() < 0.40;
        const qualIdx = useQual ? Math.floor(Math.random() * base.length) : -1;
        return base.map((d, i) => {
          if (i !== qualIdx) return d;
          // 30% chance of a negative qualifier, 70% positive
          if (Math.random() < 0.30) return pick(QUALIFIERS.mid.negative) + ' ' + d;
          return pick(QUALIFIERS.mid.positive) + ' ' + d;
        });
      }

      // High tier: prepend positive qualifier to all descriptors
      return base.map(d => pick(QUALIFIERS.high.positive) + ' ' + d);
    }

    const noseDescriptors   = buildDescriptors(NOSE[nTier]);
    const palateDescriptors = buildDescriptors(PALATE[flavorTier]);

    // Format as comma-separated lists
    const noseStr   = noseDescriptors.join(', ');
    const palateStr = palateDescriptors.join(', ');

    // Quality sentence
    const qualitySentence = pick(QUALITY_SENTENCES[tier]);

    // Value sentence (may be empty string for neutral)
    const valueSentence = valueResult.text || '';

    // Compose final string
    const tagLine  = `NOSE: ${noseStr} · PALATE: ${palateStr}`;
    const trailing = [qualitySentence, valueSentence].filter(Boolean).join(' ');

    return `${tagLine}\n${trailing}`;
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
