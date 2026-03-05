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
    'Benjamin','Beaumont','Boone','Beauregard',
    'Calvin','Carter','Cecil','Chester','Clay','Clayton','Clyde','Cornelius',
    'Daniel','Dalton','Dawson','Denton',
    'Elias','Elijah','Emmett','Ernest','Ezekiel','Ezra',
    'Fletcher','Floyd','Ford','Franklin',
    'George','Grady','Grant','Grayson',
    'Harlan','Harrison','Harvey','Henry','Hiram','Homer','Horace',
    'Isaiah','Isaac',
    'Jacob','James','Jasper','Jefferson','Jesse','John','Josiah',
    'Lawson','Leroy','Levi','Lincoln','Lyman',
    'Marcus','Marshall','Mason','Mercer','Milton',
    'Nathan','Nelson','Noah',
    'Oliver','Orville','Oscar',
    'Patrick','Percy','Preston',
    'Randall','Raymond','Reuben','Richard','Robert','Rufus','Russell',
    'Samuel','Silas','Solomon','Sterling','Stewart',
    'Thomas','Theodore','Tillman',
    'Vernon','Victor',
    'Walter','Warren','Wesley','William','Willis','Wilson',
    'Zachary',
  ];
  const FIRST_NAME_SET = new Set(FIRST_NAMES);

  // ── INITIALS (letter only; code appends the dot) ─────────────
  const INITIALS = ['A','B','C','D','E','F','G','H','J','K','L','M',
                    'N','O','P','R','S','T','V','W'];

  // ── LAST NAMES ───────────────────────────────────────────────
  const LAST_NAMES = [
    'Aldridge','Archer','Ashford',
    'Barlow','Barton','Beaumont','Birch','Blackwell','Blaine','Blake',
    'Bowman','Bradford','Breckinridge','Bridwell','Briggs','Brooks',
    'Buchanan','Bullitt',
    'Caldwell','Callahan','Campbell','Canton','Carver','Cassidy',
    'Chandler','Chapman','Clayborn','Coltrane','Combs','Conway',
    'Cooper','Corbett','Corcoran','Covington','Crawford','Crockett',
    'Dalton','Davenport','Davidson','Davis','Dawson','Delacroix',
    'Drake','Dunbar','Duncan','Dupree',
    'Eaton','Eldridge','Ellison','Elmore',
    'Fairfax','Faulkner','Ferguson','Finley','Fitzgerald','Fletcher',
    'Ford','Forrest','Franklin','Frazier','Fulton',
    'Garrison','Gentry','Gibson','Gilmore','Goodwin','Gordon',
    'Graham','Grant','Grayson','Greene','Greer','Griffin',
    'Hamilton','Hammond','Hampton','Hancock','Hardin','Harlow',
    'Harper','Harrison','Hartley','Hawkins','Hayden','Hayes',
    'Henderson','Holloway','Holmes','Houston','Howard','Hudson',
    'Hughes','Hunter',
    'Ingram',
    'Jackson','Jefferson','Jenkins','Johnson','Jordan',
    'Keaton','Keller','Kendall','Kennedy','Kincaid','Kingsley',
    'Lamar','Langford','Lanier','Lawson','Ledbetter','Lee',
    'Leonard','Lester','Logan','Longstreet',
    'MacAllister','Macon','Madison','Manning','Marshall','Mason',
    'Massey','McAllister','McCabe','McClellan','McIntyre','McKinley',
    'Mercer','Miller','Mitchell','Monroe','Montgomery','Moore',
    'Morgan','Morris','Morrison',
    'Nash','Nelson','Nichols','Noble','Noel',
    'Ogden','Olmstead',
    'Parker','Paxton','Pearce','Pemberton','Pennington','Perkins',
    'Perry','Phelps','Pierce','Polk','Porter','Powell','Preston','Price',
    'Ramsey','Randolph','Rawlings','Reid','Reynolds','Rhodes',
    'Richardson','Ridley','Riggs','Riley','Rivers','Robinson',
    'Rockwell','Rogers','Roper','Ross','Rowe','Rutherford',
    'Saunders','Sawyer','Scott','Shelton','Sherman','Simmons',
    'Sinclair','Sloane','Smith','Spencer','Stafford','Stanfield',
    'Stanley','Stanton','Stark','Stephens','Sterling','Stevens',
    'Stewart','Stone','Sullivan',
    'Tanner','Taylor','Thatcher','Thomas','Thompson','Thornton',
    'Tillman','Todd','Tucker','Turner',
    'Underwood',
    'Vance','Vanderbilt','Vinson',
    'Wade','Walker','Wallace','Waller','Walsh','Walton','Warren',
    'Washington','Watson','Webb','Wheeler','Whitfield','Wilder',
    'Williams','Wilson','Winthrop','Wofford','Woodard','Woodson','Wright',
    'Yates','Young',
  ];

  // ── PLACE / NATURE WORDS ─────────────────────────────────────
  const PLACE_WORDS = [
    'Appalachian','Appomattox','Ashland','Augusta',
    'Bardstown','Battleground','Bayou','Belfry','Bellmont','Berea',
    'Berkshire','Blueridge','Bluewater','Boone','Bourbon','Brookside',
    'Canewood','Canebrake','Carlisle','Cascade','Cavern','Cedarwood',
    'Centennial','Chestnut','Chickasaw','Chickamauga','Clearwater',
    'Clifton','Cloverfield','Copperhead','Cornfield','Cornerstone',
    'Creekside','Cumberland',
    'Darkwater','Deepwood','Delaware','Driftwood',
    'Elkhorn','Elmwood',
    'Fairfield','Fallen','Farrow','Fieldstone','Foxfire','Frankfort',
    'Glencoe','Goldenvale','Grainfield','Greenbriar',
    'Hardwood','Harrodsburg','Hartland','Hawkridge','Hazard',
    'Heritage','Hickory','Highland','Hillcrest','Hillside','Holston',
    'Homestead',
    'Ironwood',
    'Kentucky','Kettle','Knob',
    'Lakewood','Laurel','Lawrenceburg','Licking','Limestone','Locust',
    'Magnolia','Mammoth','Maywood','Meadowbrook','Millstone',
    'Mockingbird','Muddy',
    'Narrows','Nighthawk','Northfield',
    'Oakdale','Oakfield','Oakridge','Oldham','Overton',
    'Paddock','Palmetto','Panther','Pawpaw','Pearlstone','Piedmont',
    'Pinecrest','Pineridge','Piney','Prairie',
    'Ravenwood','Redstone','Ridgemont','Ridgewood','Riverbank',
    'Riverbend','Riverside','Riverton','Rockcastle','Rockford',
    'Rockhouse','Rocky','Rosewood','Roughstock',
    'Saddlewood','Saltlick','Sawmill','Shawnee','Shelby','Shenandoah',
    'Silo','Silvergate','Silverton','Sinkhole','Smoky','Springhouse',
    'Stonefort','Stonegate','Stonewall','Summerfield','Sundown',
    'Tallgrass','Talon','Tennessee','Thistlewood','Thornberry',
    'Thunderhead','Timber','Timberline','Tobacco','Trace',
    'Underhill','Upstream',
    'Valleystone','Verdant','Vicksburg',
    'Walnut','Waterfall','Watershed','Waverly','Wayward','Westwood',
    'Wheatfield','Whitetail','Wildwood','Willowbrook','Windmill',
    'Wiregrass','Woodford','Woodland','Woodsmoke','Worthington',
    'Yellowstone',
  ];

  // ── DESCRIPTOR WORDS ─────────────────────────────────────────
  const DESCRIPTOR_WORDS = [
    'Amber','Ancient','Antique','Artisan',
    'Barrel','Bonded','Bottled',
    'Cedar','Char','Classic','Copper','Craft','Creek','Crest',
    'Dark','Deep','Double','Draft','Dram',
    'Eagle','Elder','Estate',
    'Farm','Field','Fine','Fire','First','Fort',
    'Gold','Golden','Grand','Great',
    'Hand','Hard','Harvest','Heart',
    'Iron',
    'Judge',
    'Kettle',
    'Last','Legacy','Limited','Long',
    'Master','Mellow','Mill',
    'New','Noble','North',
    'Oak','Old','Open',
    'Peated','Pioneer','Pot','Pure',
    'Quarter',
    'Rare','Raw','Reserve','Rich','Ridge','Ripe','River','Rock',
    'Rough','Round','Run',
    'Select','Single','Small','Smoke','Smooth','Sour','Special',
    'Spring','Still','Stone','Straight','Strong',
    'Three','True','Twice',
    'Union',
    'Valley','Vintage',
    'Weathered','Well','West','Wheat','White','Wild','Winter','Wood',
    'Young',
  ];

  // ── NOUN / CLOSING WORDS ─────────────────────────────────────
  const NOUN_WORDS = [
    'Barrel','Batch','Blaze','Blend','Block','Bond','Bottom','Branch',
    'Brew','Bridge',
    'Cache','Cask','Cedar','Char','Choice','Claim','Classic',
    'Collection','Courage','Craft','Creek','Crest',
    'Dram','Draft','Draw','Drop',
    'Edge','Essence','Estate','Expression',
    'Farm','Fire','Flask','Ford','Forge','Fork','Fort','Foundation',
    'Gate','Gem','Glen','Gold','Grain','Grant','Gravel','Ground',
    'Harvest','Haven','Heart','Heritage','Hill','Hollow','Home','Honor',
    'Iron',
    'Journey',
    'Keg','Knob',
    'Label','Legacy','Lot',
    'Malt','Mark','Mash','Meadow','Mill','Mist',
    'Oak','Origin',
    'Path','Peak','Point','Post','Pour','Pride','Proof',
    'Rafter','Ranch','Range','Reserve','Ridge','Rill','Rise',
    'Rock','Root','Run','Rush',
    'Select','Shade','Shelf','Sign','Silo','Smoke','Source','Spirit',
    'Spring','Stack','Stave','Still','Stock','Stone','Store','Stream',
    'Strength','Strike',
    'Timber','Toast','Top','Torch','Trace','Trail','Tun','Turn',
    'Valley','Vault','View',
    'Water','Well','Wheat','Whisper','Wood','Worth',
    'Yield',
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
      baseMsrp:     [12, 26],
      modPool:      ['Single Barrel','Small Batch','Bottled-in-Bond','Full Proof'],
      modChance:    0.50,
      ageChance:    0,
      dualChance:   0,
      sparseChance: 0,
      // name patterns available to this tier
      patterns:     ['place','name','place+noun','descriptor+noun','name+noun'],
    },
    uncommon: {
      baseMsrp:     [24, 62],
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
      baseMsrp:     [110, 600],
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
  function generateProof(processMod) {
    const isSingleBarrel  = processMod && processMod.key === 'Single Barrel';
    const isBottledInBond = processMod && processMod.key === 'Bottled-in-Bond';
    const isFullProof     = processMod && processMod.key === 'Full Proof';

    if (isBottledInBond) return 100;

    // Base proof
    let base = pct(0.12) ? randF(95.0, 104.0) : randF(80.0, 95.0);

    if (isFullProof) base += randF(21, 44);

    base = Math.min(base, 145);

    if (isSingleBarrel) {
      // Always one decimal place
      return Math.round(base * 10) / 10;
    } else if (pct(0.07)) {
      // Rare chance of decimal for non-Single-Barrel
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

  return { generateBottle };
})();
