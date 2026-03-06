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
    ],
  };

  const BODY_WORDS = {
    flawed:       ['thin and harsh', 'poorly structured', 'rough and unbalanced', 'clumsy and unintegrated', 'flat and mean', 'harsh and characterless', 'graceless'],
    light:        ['light-bodied', 'thin', 'delicate', 'lean', 'easy', 'clean', 'lightly sweet', 'bright', 'airy', 'uncomplicated'],
    mid:          ['medium-bodied', 'approachable', 'balanced', 'rounded', 'solid', 'steady', 'pleasantly weighted', 'forthright', 'confident', 'well-proportioned'],
    rich:         ['full-bodied', 'rich', 'dense', 'robust', 'weighty', 'substantial', 'muscular', 'boldly structured', 'powerful', 'deeply layered'],
    exotic:       ['opulent', 'majestic', 'profoundly structured', 'extraordinarily full', 'immaculately assembled', 'lavishly composed', 'extraordinary'],
    transcendent: ['singular', 'transcendent', 'flawlessly constructed', 'unlike anything else on the shelf', 'a genuine once-in-a-generation'],
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
  // Seven bands. Openers, nose framings, palate framings, finish framings, closers.
  // Low bands are acidic and insulting. Mid is honest. Upper is enthusiastic.
  // Top tier is florid and reverential.

  const TONE = {
    // 0–1.5: a disaster
    terrible: {
      openers: [
        'A genuine failure in the glass.',
        'Avoid without exception.',
        'Difficult to recommend to any living person.',
        'A cautionary tale in bottle form.',
        'This should not exist.',
        'An embarrassment to the category.',
        'Whoever approved this release owes someone an apology.',
      ],
      nose:    ['a genuinely repellent', 'an actively hostile', 'an unacceptably broken', 'a stomach-turning'],
      palate:  ['nothing remotely redeemable', 'active hostility from the first sip to the last', 'a study in how badly wrong this can go', 'so poorly made it borders on punishing'],
      finish:  ['a finish that makes the experience worse, not better', 'a punishing close that is the final insult', 'ends so badly it taints the memory of everything before it'],
      closers: ['Do not buy. Do not accept. Do not finish the glass.', 'Pour it down the drain and count it as a lesson.', 'There is no use case for this bottle.', 'A waste of everything involved in making it.'],
    },
    // 1.5–3.0: seriously flawed
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
      ],
      nose:    ['a thin, deeply unremarkable', 'a flat and uninspired', 'a barely-there', 'an unimpressive and forgettable', 'a characterless'],
      palate:  ['little that resembles quality', 'harsh grain and not much else', 'an unpleasant bite that never resolves', 'clumsy heat with no payoff', 'rough and characterless from front to back'],
      finish:  ['an abrupt and rough close', 'a short and unpleasant finish', 'a harsh fade with nothing to recommend it', 'a quick, ugly exit'],
      closers: ['Skip it.', 'Better options exist at half this price.', 'Not worth the shelf space.', 'A mixer, at absolute best, for people who don\'t care.', 'Nothing to seek out here.'],
    },
    // 3.0–5.0: passable but underwhelming
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
      ],
      nose:    ['a subdued', 'a modest', 'a thin but recognizable', 'a muted', 'a plain', 'a workmanlike and uninspired'],
      palate:  ['little actual depth', 'thin sweetness over flat grain', 'some bite with minimal follow-through', 'passable sweetness without ambition', 'underwhelming warmth and not much else'],
      finish:  ['a brief and forgettable finish', 'a short fade that disappears without a trace', 'a thin, uninspiring close', 'fades too quickly to matter', 'an unremarkable exit you\'ll forget immediately'],
      closers: ['A mixer at best.', 'Drinkable, but uninspiring.', 'Functional and entirely forgettable.', 'Acceptable over ice, nothing beyond that.'],
    },
    // 5.0–6.5: decent, unremarkable
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
      ],
      nose:    ['a pleasant', 'a clean', 'a straightforward', 'an approachable', 'a tidy', 'a familiar and reassuring'],
      palate:  ['balanced sweetness and grain', 'good basic drinkability', 'solid oak and vanilla doing their job', 'easy warmth', 'consistent corn sweetness', 'predictable but pleasing from start to finish', 'a steady mid-palate without ambition or fault'],
      finish:  ['a clean, satisfying close', 'a pleasant medium-length finish', 'a warm, tidy fade', 'an honest and unremarkable close that ends when it should'],
      closers: ['Worth keeping on the shelf.', 'A solid daily drinker.', 'Will satisfy without wowing anyone.', 'Honest and unpretentious.'],
    },
    // 6.5–8.0: genuinely good
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
      ],
      nose:    ['a rich and inviting', 'a complex and rewarding', 'a beautifully layered', 'an elegant and developed', 'a confident and deeply appealing', 'a genuinely compelling'],
      palate:  ['excellent depth and balance', 'a rewarding interplay of sweetness and oak', 'complex fruit and spice working in harmony', 'remarkable texture for its tier', 'impressive layering that keeps revealing itself', 'well-integrated heat and sweetness from start to finish', 'a mid-palate that earns the price of admission on its own'],
      finish:  ['a long and satisfying finish', 'a beautifully sustained close', 'a complex lingering fade that evolves', 'a finish that rewards patience — give it time', 'a warm and deeply rewarding exit'],
      closers: ['Highly recommended.', 'A bottle worth returning to.', 'A genuinely rewarding pour.', 'This one delivers.'],
    },
    // 8.0–9.25: a genuine gem
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
      ],
      nose:    ['an extraordinary', 'a breathtaking', 'a profound and deeply complex', 'an awe-inspiring', 'a stunning and revelatory', 'a genuinely moving'],
      palate:  ['an unparalleled depth that justifies every dollar', 'a masterclass in balance and complexity', 'transcendent layering that keeps giving', 'unforgettable richness that sits with you', 'a once-in-many-bottles experience that changes the benchmark', 'everything working in perfect concert — nothing wasted, nothing missing'],
      finish:  ['an extraordinary and near-endless finish', 'a finish that evolves for long minutes after the sip', 'an exceptional close that lingers long after the glass is empty', 'a finish that pulls you back to the glass again and again', 'a sustained and deeply rewarding fade that earns genuine admiration'],
      closers: ['An extraordinary bottle by any measure.', 'A collector\'s treasure.', 'This is the one to remember.', 'One of those rare pours that justifies the obsession.'],
    },
    // 9.25–10.0: transcendent, all-time great
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
      ],
      nose:    ['an impossibly perfect and singular', 'a once-in-a-lifetime', 'an unrepeatable and otherworldly', 'an utterly transcendent'],
      palate:  [
        'the very definition of what American whiskey can be at its absolute apex',
        'something that exists entirely outside of normal frameworks of evaluation',
        'a benchmark that other distilleries will spend decades attempting to approach',
        'the absolute pinnacle of the craft — nothing wasted, nothing missing, everything extraordinary',
      ],
      finish:  [
        'a finish measured not in seconds but in memory — it simply refuses to leave',
        'the kind of finish that makes you reconsider everything that came before it in your whiskey life',
        'a close so perfect and sustained that it feels like a genuine privilege to sit with',
        'a finish you will describe to other people for years, and they will not quite believe you',
      ],
      closers: [
        'Acquire at any cost. Seriously.',
        'One of the most important bottles you will ever have the occasion to open.',
        'Do not share this with people who will not appreciate it.',
        'A testament to what patience, craft, and a little luck can achieve.',
        'If you find more of this, clear your schedule.',
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
    // Good quality + good value: full enthusiasm
    celebrate: {
      nose_intro: [
        'The nose opens with',
        'On the nose, there is',
        'Right away the nose offers',
        'The nose arrives with',
        'Opening with',
      ],
      palate_intro: [
        'The palate follows through with',
        'On the palate,',
        'The mid-palate delivers',
        'In the glass,',
        'The palate rewards with',
      ],
      finish_intro: [
        'The finish is',
        'It closes with',
        'The close brings',
        'The finish delivers',
      ],
      // How an individual simple note is framed positively
      note_positive: [
        '{note} — simple, but genuinely welcome here',
        '{note}, which lands exactly as it should',
        '{note} that earns its place without apology',
        '{note}, present and doing its job well',
        'a clean expression of {note}',
        '{note} that is honest and satisfying',
      ],
    },
    // Modest quality + good value: forgiving, warm, contextual praise
    forgiving: {
      nose_intro: [
        'For what it is, the nose offers',
        'The nose is simple but shows',
        'Unpretentiously, the nose brings',
        'The nose delivers a modest',
        'Nothing complicated — just',
      ],
      palate_intro: [
        'The palate is straightforward with',
        'Simply put, the palate offers',
        'Honestly, the palate gives you',
        'The palate keeps it basic —',
        'There is nothing fancy here, just',
      ],
      finish_intro: [
        'The finish is brief but',
        'It closes simply with',
        'The finish is modest —',
        'The close is short and',
      ],
      note_positive: [
        '{note} — simple, but welcomed at this price',
        '{note} that doesn\'t try to be more than it is',
        'a pleasant if uncomplicated {note}',
        '{note}, which is exactly what you\'d hope for here',
        '{note} — nothing more is needed',
        'straightforward {note} that satisfies without demanding',
      ],
    },
    // Good quality + bad value: quality acknowledged but price clouds everything
    tempered: {
      nose_intro: [
        'The nose, to its credit, offers',
        'Technically, the nose presents',
        'The nose shows genuine',
        'There is real quality in the nose —',
        'In the glass, the nose does offer',
      ],
      palate_intro: [
        'The palate is genuinely capable, delivering',
        'To be fair, the palate offers',
        'The whiskey itself delivers',
        'In isolation, the palate shows',
        'The quality is there on the palate —',
      ],
      finish_intro: [
        'The finish is legitimately good —',
        'The close, at least, delivers',
        'The finish does its job —',
        'To the spirit\'s credit, it finishes with',
      ],
      note_positive: [
        '{note} that is genuinely well-done, if not well-priced',
        'a capable {note} that deserves acknowledgment',
        '{note} — this part, at least, earns respect',
        'real {note} that makes the price sting more, not less',
        '{note} of legitimate quality',
        '{note} — and there is no question the quality is there',
      ],
    },
    // Modest quality + bad value: notes framed as absent, muted, or failing to appear
    muted: {
      nose_intro: [
        'What should be on the nose is mostly absent —',
        'The nose promises',
        'On paper, the nose should offer',
        'There is a suggestion of',
        'The nose gestures vaguely toward',
      ],
      palate_intro: [
        'The palate falls well short of',
        'What should be a palate of',
        'The expected',
        'There are traces of what might be',
        'The palate hints at',
      ],
      finish_intro: [
        'The finish barely registers —',
        'What passes for a finish here is',
        'The close disappoints with',
        'The finish, such as it is, offers',
      ],
      note_positive: [
        '{note} that never fully arrives',
        'a muted suggestion of {note} that doesn\'t follow through',
        '{note} in theory, but flat in practice',
        'the ghost of {note}',
        '{note} promised but not delivered',
        'traces of {note} that disappear before making an impression',
      ],
    },
    // Neutral value, mid quality: honest, no spin
    honest: {
      nose_intro: [
        'The nose offers',
        'On the nose,',
        'The nose is',
        'The nose brings',
        'Opening with',
      ],
      palate_intro: [
        'On the palate,',
        'The palate delivers',
        'The mid-palate shows',
        'In the glass,',
        'The palate brings',
      ],
      finish_intro: [
        'The finish is',
        'It closes with',
        'The finish brings',
        'The close offers',
      ],
      note_positive: [
        '{note}',
        'a recognizable {note}',
        '{note} that does what it should',
        'straightforward {note}',
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
