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

  // ── PRIMARY EXPORT: generateBottle ──────────────────────────
  function generateBottle(rarity) {
    const cfg     = RARITY_CONFIG[rarity];
    const pattern = pick(cfg.patterns);
    const baseName = applyPattern(pattern);

    const { processMod, ageMod } = selectModifiers(rarity);

    const proof = generateProof(processMod);

    // Build display name
    let displayName = baseName;
    if (processMod) displayName += ' ' + processMod.key;
    if (ageMod)     displayName += ' ' + ageMod.years + ' Year';

    // MSRP
    let msrp = rand(cfg.baseMsrp[0], cfg.baseMsrp[1]);
    if (processMod) msrp += processMod.bonus;
    if (ageMod)     msrp += ageMod.bonus;

    // Visual style
    const style = pick(BOTTLE_STYLES[rarity]);

    // Short label text (for SVG)
    const short = makeShort(baseName);
    // Tag line: first ~16 chars of base name
    const tag = baseName.length > 16 ? baseName.slice(0, 15) + '…' : baseName;

    // Unique ID for this pull (not for deduplication)
    const id = rarity[0] + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);

    return {
      id,
      name: displayName,
      baseName,
      rarity,
      msrp,
      proof,
      processMod,
      ageMod,
      // merged style object so makeBottleSVG gets what it needs
      svgStyle: { ...style, short, tag },
    };
  }

  // ── TASTING NOTE DESCRIPTORS ─────────────────────────────────

  const NOSE = {
    light:  ['light vanilla', 'fresh grain', 'mild caramel', 'young oak', 'soft corn', 'faint honey', 'light citrus peel', 'dried hay', 'mild biscuit'],
    mid:    ['caramel apple', 'toasted oak', 'brown sugar', 'butterscotch', 'cinnamon spice', 'dried cherry', 'baked bread', 'clove', 'orange zest', 'roasted corn', 'leather', 'toffee', 'peach preserve'],
    rich:   ['dark chocolate', 'tobacco leaf', 'charred oak', 'molasses', 'dried fig', 'espresso', 'black walnut', 'cedar', 'licorice root', 'prune', 'aged leather', 'toasted coconut', 'dark cherry'],
    exotic: ['Oloroso sherry', 'candied violet', 'sandalwood', 'smoked plum', 'truffle', 'saffron', 'aged balsamic', 'burnt caramel', 'marzipan', 'wet slate', 'ancient oak resin', 'rum-soaked raisin'],
  };

  const PALATE = {
    light:  ['gentle sweetness', 'light grain', 'mild vanilla cream', 'soft caramel', 'clean corn finish', 'thin body', 'biscuit and honey', 'mild warmth'],
    mid:    ['caramel and spice', 'toasted oak tannins', 'ripe stone fruit', 'peppery rye bite', 'butterscotch richness', 'warm honey', 'baking spice', 'roasted nuts', 'mild citrus', 'chewy caramel'],
    rich:   ['full-bodied oak', 'dark fruit complexity', 'deep molasses', 'bold cinnamon heat', 'leather and tobacco', 'rich chocolate', 'long spice build', 'dense caramel', 'dried fruit layers', 'cracked black pepper'],
    exotic: ['extraordinary depth', 'multi-layered complexity', 'rare tropical fruit', 'ancient oak structure', 'waves of dark spice', 'opulent fruit preserve', 'lingering floral notes', 'profound sweetness balanced by oak', 'silky texture with explosive finish'],
  };

  const FINISH = {
    light:  ['short and clean', 'quick and mild', 'brief sweetness', 'light and easy', 'thin but pleasant', 'fades quickly'],
    mid:    ['medium-length warmth', 'lingering caramel', 'pleasant spice fade', 'dry oak close', 'moderate heat', 'sweet with a dry close', 'warming finish'],
    rich:   ['long spiced finish', 'persistent oak tannins', 'extended dark fruit', 'slow fade with heat', 'rich and lasting', 'complex fade', 'deep warming close', 'finish builds over minutes'],
    exotic: ['exceptionally long finish', 'finish that evolves for minutes', 'extraordinary persistence', 'waves that return long after the sip', 'near-infinite fade', 'a finish that redefines patience'],
  };

  const BODY_WORDS = {
    light:  ['light-bodied', 'thin', 'delicate', 'lean'],
    mid:    ['medium-bodied', 'approachable', 'balanced', 'rounded'],
    rich:   ['full-bodied', 'rich', 'dense', 'robust', 'weighty'],
    exotic: ['opulent', 'majestic', 'profoundly structured', 'extraordinarily full'],
  };

  // ── TASTING NOTE TONE LAYERS ──────────────────────────────────
  // Framing phrases that wrap the descriptor content based on rating band

  const TONE = {
    // rating < 1.5
    poor: {
      openers:  ['Weak effort.', 'Struggles to impress.', 'Not recommended.', 'A disappointment.', 'Hard to defend at any price.'],
      nose:     ['a thin, unremarkable', 'an underwhelming', 'a flat, uninspired', 'a barely-there'],
      palate:   ['little complexity', 'watery texture', 'harsh grain with little else', 'an unpleasant bite that doesn\'t resolve', 'clumsy heat'],
      finish:   ['an abrupt, rough close', 'a short and unpleasant finish', 'a harsh chemical fade', 'little to no finish worth noting'],
      closers:  ['Skip it.', 'Better options exist at this price.', 'Not worth the shelf space.'],
    },
    // 1.5–2.5
    below: {
      openers:  ['A forgettable entry.', 'Falls short of expectations.', 'Unremarkable but drinkable.', 'Gets the job done, barely.'],
      nose:     ['a subdued', 'a modest', 'a thin but recognizable', 'a muted'],
      palate:   ['little depth', 'thin sweetness', 'some grain bite with minimal follow-through', 'passable sweetness', 'underwhelming warmth'],
      finish:   ['a brief, forgettable finish', 'a short fade', 'a thin close', 'fades too quickly'],
      closers:  ['A mixer at best.', 'Drinkable but uninspiring.', 'Nothing to seek out.'],
    },
    // 2.5–3.5
    average: {
      openers:  ['A decent everyday pour.', 'Solid and unpretentious.', 'Does what it says on the label.', 'A reliable sipper.'],
      nose:     ['a pleasant', 'a clean', 'a straightforward', 'an approachable'],
      palate:   ['balanced sweetness', 'good drinkability', 'solid oak and vanilla', 'easy warmth', 'consistent corn sweetness'],
      finish:   ['a clean, satisfying close', 'a pleasant medium-length finish', 'a warm, tidy fade'],
      closers:  ['Worth keeping on the shelf.', 'A solid daily drinker.', 'Good value for the category.'],
    },
    // 3.5–4.3
    good: {
      openers:  ['An impressive bottle.', 'Well worth seeking out.', 'Stands above the crowd.', 'A genuinely enjoyable pour.'],
      nose:     ['a rich, inviting', 'a complex and rewarding', 'a beautifully layered', 'an elegant'],
      palate:   ['excellent depth and balance', 'a rewarding interplay of sweetness and oak', 'complex fruit and spice', 'remarkable texture', 'impressive layering'],
      finish:   ['a long, satisfying finish', 'a beautifully sustained close', 'a complex lingering fade', 'a finish that rewards patience'],
      closers:  ['Highly recommended.', 'A bottle worth buying again.', 'Earns its place on any shelf.'],
    },
    // 4.3–5.0
    exceptional: {
      openers:  ['Exceptional.', 'A genuine standout.', 'Rare and remarkable.', 'Among the finest available.', 'Do not hesitate.'],
      nose:     ['an extraordinary, multi-dimensional', 'a breathtaking', 'a profound and complex', 'an awe-inspiring'],
      palate:   ['unparalleled depth', 'a masterclass in balance and complexity', 'transcendent layering', 'unforgettable richness', 'a once-in-a-bottle experience'],
      finish:   ['an extraordinary, near-endless finish', 'a finish that evolves for minutes', 'an exceptional close that lingers long after the glass is empty'],
      closers:  ['Buy every bottle you can find.', 'A collector\'s treasure.', 'The benchmark others are measured against.'],
    },
  };

  function getToneKey(rating) {
    if (rating < 1.5)  return 'poor';
    if (rating < 2.5)  return 'below';
    if (rating < 3.5)  return 'average';
    if (rating < 4.3)  return 'good';
    return 'exceptional';
  }

  // Map rarity + proof to descriptor tier (for flavor word pools)
  function getTier(rarity, proof) {
    const rarityScore = { common:0, uncommon:1, rare:2, epic:3, legendary:4 }[rarity];
    const proofScore  = proof >= 120 ? 2 : proof >= 100 ? 1 : 0;
    const total = rarityScore + proofScore;
    if (total <= 1) return 'light';
    if (total <= 3) return 'mid';
    if (total <= 5) return 'rich';
    return 'exotic';
  }

  const DETAIL_DEPTH = { common:1, uncommon:2, rare:2, epic:3, legendary:3 };

  function generateDescription(rarity, proof, processMod, ageMod, rating) {
    const tier     = getTier(rarity, proof);
    const depth    = DETAIL_DEPTH[rarity];
    const toneKey  = getToneKey(rating);
    const tone     = TONE[toneKey];

    // Flavor tier — for poor/below ratings, cap the descriptor tier to avoid
    // language that sounds too complimentary (e.g. "extraordinary depth" on a 1-star)
    const flavorTier = (toneKey === 'poor' || toneKey === 'below') ? 'light'
                     : (toneKey === 'average') ? (tier === 'exotic' ? 'rich' : tier)
                     : tier;
    const nTier = (proof >= 110 && flavorTier === 'mid') ? 'rich' : flavorTier;

    const nose    = pick(NOSE[nTier]);
    const palate  = pick(PALATE[flavorTier]);
    const finish  = pick(FINISH[flavorTier]);
    const body    = pick(BODY_WORDS[flavorTier]);

    let palate2 = pick(PALATE[flavorTier]);
    let attempts = 0;
    while (palate2 === palate && attempts++ < 6) palate2 = pick(PALATE[flavorTier]);

    let nose2 = pick(NOSE[nTier]);
    attempts = 0;
    while (nose2 === nose && attempts++ < 6) nose2 = pick(NOSE[nTier]);

    const opener  = pick(tone.openers);
    const tNose   = pick(tone.nose);
    const tPalate = pick(tone.palate);
    const tFinish = pick(tone.finish);
    const closer  = pick(tone.closers);

    // Modifier notes — tone-adjusted
    let modNote = '';
    if (processMod) {
      const k = processMod.key;
      const good = toneKey === 'good' || toneKey === 'exceptional';
      const bad  = toneKey === 'poor' || toneKey === 'below';
      if (k === 'Single Barrel')   modNote = good ? 'Single barrel character shines through distinctly. '   : bad ? 'Single barrel variance works against it here. ' : 'Single barrel character lends a unique edge. ';
      if (k === 'Small Batch')     modNote = good ? 'Small batch blending achieves impressive harmony. '     : bad ? 'The small batch blend doesn\'t find its footing. ' : 'Small batch blending adds consistency. ';
      if (k === 'Bottled-in-Bond') modNote = good ? 'Bottled-in-bond standards are well-served here. '      : bad ? 'Even bonded bottling can\'t rescue the base distillate. ' : 'Bottled-in-bond integrity is evident. ';
      if (k === 'Full Proof')      modNote = good ? 'The full barrel proof delivers with authority. '        : bad ? 'The uncut proof amplifies its flaws rather than its virtues. ' : 'Bottled at full barrel proof — nothing held back. ';
      if (k === 'Double Oaked')    modNote = good ? 'Double oaking has added remarkable depth and structure. ' : bad ? 'The extra oak time feels over-extracted and bitter. ' : 'A second barrel maturation doubles the oak influence. ';
      if (k === 'French Oaked')    modNote = good ? 'French oak finishing adds a sophisticated elegance. '   : bad ? 'The French oak influence feels awkward and out of place. ' : 'French oak finishing lends subtle elegance. ';
    }
    let ageNote = '';
    if (ageMod) {
      const good = toneKey === 'good' || toneKey === 'exceptional';
      const bad  = toneKey === 'poor' || toneKey === 'below';
      ageNote = good
        ? (ageMod.years >= 12 ? `${ageMod.years} years of careful aging have paid off beautifully. ` : `${ageMod.years} years has given this spirit admirable polish. `)
        : bad
        ? (ageMod.years >= 12 ? `Despite ${ageMod.years} years, time hasn't fully tamed its rough edges. ` : `${ageMod.years} years wasn't enough to smooth this one out. `)
        : (ageMod.years >= 12 ? `${ageMod.years} years of patience show in every sip. ` : `${ageMod.years} years of oak integration have mellowed the spirit. `);
    }

    // Assemble by depth
    if (depth === 1) {
      return `${opener} ${toneKey === 'poor' || toneKey === 'below' ? 'A ' + body + ' pour with ' + tNose + ' ' + nose + ' and ' + tFinish + '.' : 'A ' + body + ' pour with ' + tNose + ' ' + nose + ' on the nose and ' + tFinish + '.'}`;
    }
    if (depth === 2) {
      return `${opener} ${modNote}${ageNote}Opens with ${tNose} ${nose}, leading to ${tPalate} on the palate. ${(tFinish[0].toUpperCase() + tFinish.slice(1))}. ${closer}`;
    }
    // depth 3
    return `${opener} ${modNote}${ageNote}On the nose: ${tNose} ${nose} and ${nose2}. The palate delivers ${tPalate}, with ${palate} and ${palate2} in the mix. ${(tFinish[0].toUpperCase() + tFinish.slice(1))}. ${closer}`;
  }

  // ── STAR RATING GENERATOR ─────────────────────────────────────
  const RARITY_BASE = { common:1.8, uncommon:2.6, rare:3.4, epic:4.1, legendary:4.6 };

  // Modifier rating bonuses: weighted random draw biased heavily toward the low end
  // Returns 0 for Small Batch or no modifier, 0.5–1.5 for others (1.5 very rare)
  function modifierRatingBonus(processMod) {
    if (!processMod || processMod.key === 'Small Batch') return 0;
    // Draw from an exponential-ish distribution: mostly 0.5–0.9, rarely up to 1.5
    const r = Math.random();
    if (r < 0.55) return randF(0.50, 0.75);   // 55% → 0.50–0.75
    if (r < 0.85) return randF(0.75, 1.10);   // 30% → 0.75–1.10
    if (r < 0.97) return randF(1.10, 1.40);   // 12% → 1.10–1.40
    return randF(1.40, 1.50);                  //  3% → 1.40–1.50 (the rare max)
  }

  function generateRating(rarity, proof, msrp, processMod) {
    let base = RARITY_BASE[rarity];

    // Proof bonus
    if (proof >= 120)      base += 0.25;
    else if (proof >= 100) base += 0.12;
    else if (proof < 86)   base -= 0.12;

    // MSRP bonus within rarity
    const cfg = RARITY_CONFIG[rarity];
    const msrpRange = cfg.baseMsrp[1] - cfg.baseMsrp[0];
    const msrpPos   = Math.min(1, Math.max(0, (msrp - cfg.baseMsrp[0]) / (msrpRange || 1)));
    base += msrpPos * 0.3;

    // Modifier bonus (0 for Small Batch / none, 0.5–1.5 for others)
    base += modifierRatingBonus(processMod);

    // Random variance
    const variance = { common:0.6, uncommon:0.5, rare:0.5, epic:0.45, legendary:0.4 }[rarity];
    base += (Math.random() * 2 - 1) * variance;

    // Sleeper common
    if (rarity === 'common' && pct(0.07)) base += randF(0.8, 1.4);

    // Disappointment at rare+
    if ((rarity === 'rare' || rarity === 'epic' || rarity === 'legendary') && pct(0.08)) {
      base -= randF(0.8, 1.6);
    }

    base = Math.max(0.5, Math.min(5.0, base));
    return Math.round(base * 20) / 20;
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

    const description = generateDescription(rarity, proof, processMod, ageMod, rating);

    // Build display name
    let displayName = baseName;
    if (processMod) displayName += ' ' + processMod.key;
    if (ageMod)     displayName += ' ' + ageMod.years + ' Year';

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
