/**
 * Area pages. One entry per suburb, each with its own copy (no find-and-replace).
 * The list is the default from the brief (Brisbane to Ipswich and the Gold Coast, owner confirmed 19 Oct 2026) and is
 * waiting on the owner to confirm (docs/content-todo.md). Add or remove entries here;
 * pages, the sitemap, footer links and redirects all follow.
 *
 * Copy rules: describe housing and roofs in general, hedged terms ("many", "often").
 * No invented job counts, prices or named customers.
 */

export type Region = "north" | "west" | "east" | "south" | "logan" | "ipswich" | "gold-coast" | "moreton-bay";

export type Area = {
  slug: string;
  name: string;
  region: Region;
  /** One line for cards and the meta description. */
  summary: string;
  /** Housing style and age. */
  homes: string;
  /** Typical roofs and what tends to wear out. */
  roofs: string;
  /** Weather and site exposure. */
  exposure: string;
  /** One suburb-specific question for the page FAQ. */
  faq: { q: string; a: string };
  neighbours: string[];
};

export const regionLabels: Record<Region, string> = {
  north: "Brisbane northside",
  west: "Brisbane west",
  east: "Brisbane east and bayside",
  south: "Brisbane southside",
  logan: "Logan",
  ipswich: "Ipswich",
  "gold-coast": "Gold Coast",
  "moreton-bay": "Moreton Bay",
};

export const areas: Area[] = [
  // ── Northside ─────────────────────────────────────────────────────────────
  {
    slug: "aspley",
    name: "Aspley",
    region: "north",
    summary: "Roof replacement and Colorbond roofing for Aspley's brick homes and family houses.",
    homes:
      "Aspley grew quickly from the 1960s onwards, so many streets are lined with lowset brick homes and larger family houses built through the 1970s and 1980s. A lot of these homes are now on their original roof.",
    roofs:
      "Concrete tile is common here. After forty or more years the tiles get porous, ridge capping mortar cracks, and the sarking underneath (if there is any) breaks down. Many owners in Aspley choose to go from tile to Colorbond when the roof is due, which takes a lot of weight off the frame.",
    exposure:
      "Aspley sits on the open northside where summer storms roll through from the west. Wind-driven rain finds its way past old flashings and lifted tiles, which is often the first sign a roof is near the end of its life.",
    faq: {
      q: "Can you replace a tile roof with Colorbond on an Aspley brick home?",
      a: "Yes. Tile to Colorbond is one of the most common jobs on homes of this age. We check the battens and frame during the quote, allow for new battens where the spacing needs to change, and explain what is included in writing before anything starts.",
    },
    neighbours: ["albany-creek", "chermside", "boondall", "stafford"],
  },
  {
    slug: "albany-creek",
    name: "Albany Creek",
    region: "north",
    summary: "Colorbond roof installation and roof replacement in Albany Creek, on the Brisbane and Moreton Bay border.",
    homes:
      "Albany Creek is mostly family homes on larger blocks, many built from the 1970s through to the 1990s, with plenty of hip and valley roof shapes and some newer two-storey builds.",
    roofs:
      "You see a mix of concrete tile and early metal roofs. Hip and valley roofs have more valleys and ridges, and those are the places where water gets in first as the roof ages. A full replacement deals with every valley and flashing at once.",
    exposure:
      "Leafy streets are lovely but leaves and debris sit in valleys and gutters, holding water against the roof. Storm season brings heavy downpours that show up any weak spots.",
    faq: {
      q: "Our Albany Creek roof has a lot of valleys. Does that change the quote?",
      a: "It can. Each valley needs new valley iron and careful flashing, so complex roofs take more time and material. We count them on site and set it out in the written quote so there are no surprises.",
    },
    neighbours: ["aspley", "strathpine", "everton-park", "mitchelton"],
  },
  {
    slug: "chermside",
    name: "Chermside",
    region: "north",
    summary: "Roof replacement in Chermside for post-war homes, brick units and family houses.",
    homes:
      "Chermside has post-war timber homes, brick houses from the 1960s and 1970s, and newer townhouses and units around the shopping centre and hospital precinct.",
    roofs:
      "Older homes often have their first or second roof, either corrugated iron or concrete tile. Rusted fixings, tired flashings and cracked tile bedding are typical by the time owners call us.",
    exposure:
      "Blocks are close together, so access and protecting neighbouring properties during the job matter. We plan the delivery and the removal of the old roof around that.",
    faq: {
      q: "How do you handle tight access on Chermside blocks?",
      a: "We look at access during the free quote and plan where materials are delivered and how the old roof comes off. The site is kept tidy each day and cleaned up properly at the end.",
    },
    neighbours: ["aspley", "stafford", "everton-park", "boondall"],
  },
  {
    slug: "boondall",
    name: "Boondall",
    region: "north",
    summary: "Roof replacement and Colorbond installation in Boondall, close to the bay.",
    homes:
      "Boondall is a quiet northside suburb of mostly lowset family homes, many from the 1970s and 1980s, with some older timber houses and newer builds mixed in.",
    roofs:
      "Concrete tile and older metal roofs are common. Being closer to the bay, metal fixings and flashings can corrode faster than they would further inland.",
    exposure:
      "Afternoon storms and salty air off Moreton Bay are hard on roofs over time. Choosing the right Colorbond product and fixings for the location matters here.",
    faq: {
      q: "Does being near the bay affect which roofing we should choose in Boondall?",
      a: "It can. Closer to the coast, salt in the air is harder on metal. We talk you through the options during the quote and recommend materials suited to how close the home is to the water.",
    },
    neighbours: ["aspley", "chermside", "stafford", "north-lakes"],
  },
  {
    slug: "stafford",
    name: "Stafford",
    region: "north",
    summary: "Roof replacement in Stafford for Queenslanders, post-war homes and renovated houses.",
    homes:
      "Stafford has a mix of older timber homes, post-war houses and plenty of renovations and raise-and-builds as families have moved into the area.",
    roofs:
      "Many older homes still have corrugated iron that has done its job for a very long time. Replacing it with new Colorbond keeps the traditional look while fixing rust, leaks and loose sheets.",
    exposure:
      "Stafford sits on undulating ground, so some homes catch more wind than others. Proper fixing and new flashings are what keep a roof quiet and dry in a storm.",
    faq: {
      q: "Can you keep the traditional look of an older Stafford home with a new roof?",
      a: "Yes. A corrugated Colorbond profile in a classic colour keeps the look of the original iron roof. We go through profiles and colours with you before the job starts.",
    },
    neighbours: ["chermside", "everton-park", "aspley", "mitchelton"],
  },
  {
    slug: "everton-park",
    name: "Everton Park",
    region: "north",
    summary: "Colorbond roofing and roof replacement in Everton Park.",
    homes:
      "Everton Park is mostly post-war and 1960s to 1970s family homes, many lowset or highset, along with newer townhouse developments.",
    roofs:
      "Tile roofs from the 1960s and 1970s and older iron roofs are both common. Owners often replace the roof as part of a wider renovation or before selling.",
    exposure:
      "Westerly storms through this part of Brisbane bring heavy rain in short bursts, which tests old gutters, valleys and flashings.",
    faq: {
      q: "Should we replace the roof before or after renovating our Everton Park home?",
      a: "It depends on the renovation. If you are adding a room or changing the roof line, it usually makes sense to plan the roof at the same time. We are happy to look at the plans during the quote.",
    },
    neighbours: ["stafford", "mitchelton", "albany-creek", "chermside"],
  },
  {
    slug: "mitchelton",
    name: "Mitchelton",
    region: "north",
    summary: "Roof replacement in Mitchelton for character homes and family houses.",
    homes:
      "Mitchelton has character homes, post-war houses and many renovated family homes, with a growing number of newer builds near the shops and train station.",
    roofs:
      "Older iron roofs and 1960s to 1970s tile roofs are typical. On character homes the roof is a big part of the street appeal, so profile and colour choice matter.",
    exposure:
      "Tall trees in many streets drop leaves into valleys and gutters. Blocked valleys overflow in heavy rain and are a common source of leaks in older roofs.",
    faq: {
      q: "Our Mitchelton home has big trees nearby. Is that a problem for a new roof?",
      a: "Not a problem, but worth planning for. We look at where leaves collect and make sure valleys and flashings are done properly. Keeping gutters clear after the job helps the roof last.",
    },
    neighbours: ["everton-park", "the-gap", "ashgrove", "stafford"],
  },

  // ── West ──────────────────────────────────────────────────────────────────
  {
    slug: "ashgrove",
    name: "Ashgrove",
    region: "west",
    summary: "Roof replacement for Ashgrove's Queenslanders, character homes and hillside houses.",
    homes:
      "Ashgrove is known for Queenslanders and character homes on hilly streets, alongside post-war houses and modern renovations.",
    roofs:
      "Many character homes still have corrugated iron roofs, often with verandah roofs at a different pitch. A new Colorbond roof can keep the character look while fixing rust and leaks.",
    exposure:
      "Hillside homes are more exposed to wind, and steep blocks make access and safety planning part of every job here.",
    faq: {
      q: "Can you work on steep Ashgrove blocks?",
      a: "Yes. We assess access and edge protection during the quote and plan the job around the block. Safety setup is part of the price, not an extra on the day.",
    },
    neighbours: ["the-gap", "mitchelton", "indooroopilly", "kenmore"],
  },
  {
    slug: "the-gap",
    name: "The Gap",
    region: "west",
    summary: "Colorbond roof installation and roof replacement in The Gap.",
    homes:
      "The Gap is mostly family homes from the 1960s onwards on sloping, leafy blocks, with many split-level and highset designs.",
    roofs:
      "Concrete tile and older metal roofs are common. Leaf litter from the surrounding bushland settles in valleys and gutters, which speeds up wear.",
    exposure:
      "Close to the D'Aguilar ranges, The Gap gets heavy storms. Some owners also ask about gutter guards and ember protection as part of the roof job.",
    faq: {
      q: "Is a metal roof a good choice for a home near bushland in The Gap?",
      a: "Many owners near bushland choose Colorbond. We can talk through the options during the quote, including how the roof and gutters are detailed. Any bushfire requirements for your property are worth checking with your local council.",
    },
    neighbours: ["ashgrove", "mitchelton", "kenmore", "indooroopilly"],
  },
  {
    slug: "kenmore",
    name: "Kenmore",
    region: "west",
    summary: "Roof replacement in Kenmore for family homes on larger, leafy blocks.",
    homes:
      "Kenmore is mostly family homes on larger blocks, many built in the 1970s and 1980s, often with brick walls and tiled roofs.",
    roofs:
      "Concrete tile roofs of that era are now reaching the age where tiles, bedding and pointing need serious work. Many owners weigh up re-roofing in Colorbond instead of patching the old tiles again.",
    exposure:
      "Sloping streets and big trees are part of the suburb's appeal, and both affect how water moves across the roof and gutters.",
    faq: {
      q: "Is it worth replacing an old tile roof in Kenmore instead of restoring it?",
      a: "It depends on the condition of the tiles and the frame. If the tiles are porous and the bedding is failing in many places, a replacement is often the longer-lasting fix. We give you an honest view after inspecting the roof.",
    },
    neighbours: ["the-gap", "indooroopilly", "ashgrove"],
  },
  {
    slug: "indooroopilly",
    name: "Indooroopilly",
    region: "west",
    summary: "Roof replacement and Colorbond roofing in Indooroopilly.",
    homes:
      "Indooroopilly has character homes, post-war houses and a lot of newer apartments and townhouses near the river and the shopping centre.",
    roofs:
      "Older iron roofs on character homes and tile roofs on 1960s to 1980s houses are both common. Renovated homes often need the roof brought up to match the rest of the house.",
    exposure:
      "Homes near the river and on the hills catch different weather. We look at the orientation and exposure of the roof when we quote.",
    faq: {
      q: "Can you replace the roof on a renovated Indooroopilly home without damaging new finishes?",
      a: "Yes. We plan the protection of the house, garden and driveway as part of the job and clean up at the end. Tell us about anything you are worried about during the quote.",
    },
    neighbours: ["kenmore", "ashgrove", "the-gap"],
  },

  // ── East and bayside ──────────────────────────────────────────────────────
  {
    slug: "belmont",
    name: "Belmont",
    region: "east",
    summary: "Roof replacement and Colorbond installation in Belmont, Brisbane's east.",
    homes:
      "Belmont is a leafy eastern suburb with acreage-style blocks, family homes of many ages and newer builds.",
    roofs:
      "Tile and metal roofs from the 1970s onwards are common. Larger homes on bigger blocks often have big, complex roofs with several sections.",
    exposure:
      "Storms coming off the bay and summer heat both take a toll. Colour choice makes a real difference to how hot the roof space gets.",
    faq: {
      q: "Which Colorbond colour keeps a Belmont home cooler?",
      a: "Lighter colours reflect more of the sun's heat. We bring colour samples to the quote and explain the trade-offs between look and heat so you can choose with confidence.",
    },
    neighbours: ["carindale", "wynnum", "capalaba"],
  },
  {
    slug: "carindale",
    name: "Carindale",
    region: "east",
    summary: "Roof replacement for Carindale's brick and tile family homes.",
    homes:
      "Much of Carindale was developed in the 1970s, 1980s and 1990s, so there are many brick homes with concrete tile roofs, plus larger two-storey houses.",
    roofs:
      "Concrete tile roofs from that era are now ageing. Owners often choose tile to Colorbond to lighten the roof and refresh the look of the house.",
    exposure:
      "Two-storey homes mean steeper, higher work. Scaffolding and edge protection are planned and priced in the quote.",
    faq: {
      q: "Do you replace roofs on two-storey Carindale homes?",
      a: "Yes. Two-storey homes need more scaffolding and edge protection, which we price into the written quote after looking at the house.",
    },
    neighbours: ["belmont", "mount-gravatt", "capalaba"],
  },
  {
    slug: "wynnum",
    name: "Wynnum",
    region: "east",
    summary: "Roof replacement and Colorbond roofing in Wynnum, on the bay.",
    homes:
      "Wynnum has older timber homes and Queenslanders, post-war houses and newer builds, many within a short distance of the water.",
    roofs:
      "Corrugated iron roofs are common on older homes. Close to the bay, rust on sheets, screws and flashings is the usual reason owners call.",
    exposure:
      "Salt air off Moreton Bay is the big factor here. The right product and fixings for a coastal location help the new roof last.",
    faq: {
      q: "How close to the water is too close for a standard Colorbond roof in Wynnum?",
      a: "Homes very close to the water may need a product made for coastal conditions. We check your location during the quote and recommend materials to suit, so the roof is right for where you live.",
    },
    neighbours: ["belmont", "birkdale", "capalaba"],
  },
  {
    slug: "birkdale",
    name: "Birkdale",
    region: "east",
    summary: "Colorbond roof installation and roof replacement in Birkdale, Redlands.",
    homes:
      "Birkdale is mostly family homes from the 1970s onwards, with lowset brick houses and some larger newer homes.",
    roofs:
      "Concrete tile roofs of that era are common and many are due for replacement. Tile to Colorbond is a popular choice here.",
    exposure:
      "Bay breezes bring salt and storms bring heavy rain. Good flashings and the right fixings matter on the bayside.",
    faq: {
      q: "Do you work in the Redlands as well as Brisbane?",
      a: "Yes. Birkdale and the nearby bayside suburbs are part of the area we cover. Call or send the form and we will arrange the free quote.",
    },
    neighbours: ["wynnum", "capalaba", "belmont"],
  },
  {
    slug: "capalaba",
    name: "Capalaba",
    region: "east",
    summary: "Roof replacement and Colorbond roofing in Capalaba.",
    homes:
      "Capalaba has family homes from the 1970s through to recent estates, along with acreage properties on the edges of the suburb.",
    roofs:
      "Older tile roofs and early metal roofs are common on established homes. Acreage properties often have sheds and outbuildings that owners re-roof at the same time.",
    exposure:
      "Open blocks catch the wind. Correct fixing patterns and new flashings are what keep a metal roof secure in storm season.",
    faq: {
      q: "Can you re-roof a shed or patio at the same time as the house in Capalaba?",
      a: "Ask us during the quote. If it is roofing work we can do, we will price it separately in the written quote so you can decide.",
    },
    neighbours: ["birkdale", "belmont", "wynnum", "carindale"],
  },

  // ── Southside ─────────────────────────────────────────────────────────────
  {
    slug: "mount-gravatt",
    name: "Mount Gravatt",
    region: "south",
    summary: "Roof replacement in Mount Gravatt for post-war and family homes.",
    homes:
      "Mount Gravatt has post-war timber homes, brick houses from the 1960s and 1970s and a growing number of renovations and new builds.",
    roofs:
      "Older iron and tile roofs are both common. Many post-war homes have had patch repairs over the years and are now ready for a full replacement.",
    exposure:
      "Homes on the slopes around the mountain catch more wind. We take exposure into account when we plan fixings and flashings.",
    faq: {
      q: "Our Mount Gravatt roof has had lots of patch repairs. Is replacement the answer?",
      a: "Often, yes. When a roof has been patched many times, a replacement usually costs less over the long run than continuing to chase leaks. We will tell you honestly what we see.",
    },
    neighbours: ["sunnybank", "carindale", "acacia-ridge"],
  },
  {
    slug: "sunnybank",
    name: "Sunnybank",
    region: "south",
    summary: "Roof replacement and Colorbond installation in Sunnybank.",
    homes:
      "Sunnybank is mostly brick family homes from the 1970s and 1980s, along with many newer homes and rebuilds.",
    roofs:
      "Concrete tile roofs from that period are common and are reaching the age where a replacement makes sense. Owners often choose Colorbond for a cleaner, modern look.",
    exposure:
      "Southside storms can bring hail. A new metal roof is a good time to check gutters, downpipes and how water drains from the roof.",
    faq: {
      q: "Is Colorbond a good choice after hail damage in Sunnybank?",
      a: "Many owners choose Colorbond when replacing a damaged tile roof. If you are claiming through insurance, we can provide a written quote for your insurer. Your insurer decides what the policy covers.",
    },
    neighbours: ["mount-gravatt", "acacia-ridge", "bethania"],
  },
  {
    slug: "acacia-ridge",
    name: "Acacia Ridge",
    region: "south",
    summary: "Roof replacement in Acacia Ridge for family homes and older houses.",
    homes:
      "Acacia Ridge has many lowset family homes from the 1960s and 1970s, including timber and brick houses, plus some newer homes.",
    roofs:
      "Older corrugated iron and early tile roofs are common. Rusted sheets and fixings and worn flashings are typical on homes of this age.",
    exposure:
      "Open, flat streets mean homes take the full force of afternoon storms. A properly fixed new roof is quieter and more secure.",
    faq: {
      q: "What does a roof replacement include on an older Acacia Ridge home?",
      a: "Usually removal of the old roof, any batten work needed, new sarking or insulation if chosen, the new Colorbond sheets, new flashings and ridge capping, and a full clean up. Everything included is listed in the written quote.",
    },
    neighbours: ["sunnybank", "mount-gravatt", "bethania", "forest-lake"],
  },
  {
    slug: "forest-lake",
    name: "Forest Lake",
    region: "south",
    summary: "Roof replacement and Colorbond roofing in Forest Lake, between Brisbane and Ipswich.",
    homes:
      "Forest Lake is a planned suburb in Brisbane's south-west, built mostly through the 1990s, with family homes set around the lake and parklands.",
    roofs:
      "Concrete tile roofs from the 1990s are common and many are now showing cracked ridge pointing, faded tiles and tired valleys.",
    exposure:
      "Storms tracking in from the west hit the south-west suburbs first, bringing strong wind and the occasional hailstorm.",
    faq: {
      q: "Our Forest Lake tile roof is about 30 years old. Is it time to replace it?",
      a: "Not always. Some tile roofs that age just need repairs, others are past it. We inspect it, show you what we find and tell you plainly whether repair or replacement makes more sense.",
    },
    neighbours: ["acacia-ridge", "browns-plains", "goodna", "springfield-lakes"],
  },

  // ── Logan ─────────────────────────────────────────────────────────────────
  {
    slug: "bethania",
    name: "Bethania",
    region: "logan",
    summary: "Roof replacement and Colorbond roofing in Bethania, Logan.",
    homes:
      "Bethania is a Logan suburb of family homes, many from the 1980s and 1990s, along with newer estates.",
    roofs:
      "Concrete tile roofs from that era are common and starting to need serious maintenance. Re-roofing in Colorbond is a popular option.",
    exposure:
      "Close to the Logan and Albert rivers, Bethania gets heavy rain in storm season, which shows up any weak points in an old roof.",
    faq: {
      q: "Do you cover Logan suburbs like Bethania?",
      a: "Yes. Bethania and nearby Logan suburbs are in our service area. The quote is free and we come to the property.",
    },
    neighbours: ["acacia-ridge", "sunnybank", "browns-plains", "loganholme"],
  },
  {
    slug: "springwood",
    name: "Springwood",
    region: "logan",
    summary: "Roof replacement and Colorbond roofing for Springwood's hillside family homes.",
    homes:
      "Springwood is an established Logan suburb on rolling hills, with many brick and timber family homes built through the 1970s and 1980s and some larger homes on the higher streets.",
    roofs:
      "Concrete tile from that era is the most common roof. Ridge pointing cracks, tiles go porous and old valleys rust through. Swapping to Colorbond also cuts the load on the frame, which matters on split-level homes.",
    exposure:
      "Homes on the ridgelines catch the full wind of summer storms, while homes lower down deal with water running off the hills. Both show up tired flashings quickly.",
    faq: {
      q: "Our Springwood home is split-level. Is that harder to re-roof?",
      a: "It takes more planning. Split-level homes have more junctions where one roof meets a wall or another roof, and each needs new flashing. We look at every junction during the quote and set the work out in writing.",
    },
    neighbours: ["loganholme", "carindale", "mount-gravatt", "shailer-park"],
  },
  {
    slug: "shailer-park",
    name: "Shailer Park",
    region: "logan",
    summary: "Colorbond roof installation and roof replacement in Shailer Park, Logan.",
    homes:
      "Shailer Park is a leafy suburb of larger family homes on generous blocks, most built from the late 1970s through the 1990s, many on sloping land.",
    roofs:
      "Hip and valley concrete tile roofs are common, often with long valleys and a lot of ridge line. As they age the valleys and ridge capping are where leaks start.",
    exposure:
      "Tall gums drop leaves and bark into valleys and gutters, which holds water against the roof. Storm season brings heavy downpours that find any weak spot.",
    faq: {
      q: "Can we get leaf guard or new gutters at the same time as a new roof in Shailer Park?",
      a: "Ask us during the quote. It is easiest to plan gutters and anything at the roof edge while the roof is being replaced, and we will list exactly what is included in the written quote.",
    },
    neighbours: ["loganholme", "springwood", "capalaba"],
  },
  {
    slug: "loganholme",
    name: "Loganholme",
    region: "logan",
    summary: "Roof replacement and Colorbond roofing in Loganholme, between Brisbane and the Gold Coast.",
    homes:
      "Loganholme sits where the Logan River meets the M1, with family homes from the 1980s and 1990s alongside newer builds and acreage on the edges.",
    roofs:
      "Tile roofs from the 1980s and 1990s are now at the age where repairs become frequent. Some acreage homes have large or complex roofs with sheds and patios attached.",
    exposure:
      "The river valley gets heavy rain and humid summers. Damp, still air under an old roof can lead to rusted fixings and sagging sarking.",
    faq: {
      q: "Can you re-roof the patio and shed at the same time as the house in Loganholme?",
      a: "Often, yes. Doing everything together means the colours match and the crew is only on site once. Tell us what you want covered and we will price each part separately in the quote.",
    },
    neighbours: ["shailer-park", "springwood", "beenleigh", "bethania"],
  },
  {
    slug: "browns-plains",
    name: "Browns Plains",
    region: "logan",
    summary: "Roof replacement in Browns Plains for 1980s and 1990s family homes.",
    homes:
      "Browns Plains grew fast in the 1980s and 1990s, so many streets are lowset brick homes from that period, with newer estates on the outskirts.",
    roofs:
      "Concrete tile roofs from that boom are common and many are now on their original tiles, ridge capping and valleys.",
    exposure:
      "Flat, open streets mean homes take the full force of afternoon storms rolling in from the west.",
    faq: {
      q: "Is it worth replacing a tile roof in Browns Plains or just repairing it?",
      a: "If the tiles are porous, the ridges keep cracking and leaks keep coming back, a replacement is often better value than repeated repairs. We will inspect it and tell you plainly which makes sense.",
    },
    neighbours: ["bethania", "acacia-ridge", "forest-lake"],
  },
  {
    slug: "beenleigh",
    name: "Beenleigh",
    region: "logan",
    summary: "Roof replacement and Colorbond roofing in Beenleigh, on the way to the Gold Coast.",
    homes:
      "Beenleigh is one of the older towns in Logan, with timber workers cottages and Queenslanders near the centre and brick family homes from the 1970s and 1980s around it.",
    roofs:
      "Older homes often still have corrugated iron that has rusted at the laps and fixings. The brick homes mostly have concrete tile that is near the end of its life.",
    exposure:
      "Beenleigh sits low near the Albert River, so humid air and heavy summer rain are hard on old iron and flashings.",
    faq: {
      q: "Can you keep the look of an older Beenleigh Queenslander with a new roof?",
      a: "Yes. A corrugated Colorbond profile in a heritage-style colour keeps the classic look while giving you a new, sealed roof. We help you choose during the quote.",
    },
    neighbours: ["loganholme", "ormeau", "bethania"],
  },

  // ── Ipswich ───────────────────────────────────────────────────────────────
  {
    slug: "ipswich",
    name: "Ipswich",
    region: "ipswich",
    summary: "Roof replacement and Colorbond roofing for Ipswich Queenslanders and family homes.",
    homes:
      "Ipswich has some of the oldest housing in Queensland, with Queenslanders and worker cottages around the centre and brick family homes in the surrounding suburbs.",
    roofs:
      "Many older homes still have original or early corrugated iron that has rusted at the laps, nail holes and gutters. Brick homes from the 1970s and 1980s mostly have concrete tile.",
    exposure:
      "Ipswich sits inland, so summers run hotter than coastal Brisbane. Roof colour and insulation make a real difference to how hot the house gets.",
    faq: {
      q: "What roof colour keeps an Ipswich home cooler?",
      a: "Lighter Colorbond colours reflect more heat, and adding insulation or a foil blanket under the new sheets helps too. We talk through colours and options during the quote.",
    },
    neighbours: ["brassall", "redbank-plains", "springfield-lakes"],
  },
  {
    slug: "brassall",
    name: "Brassall",
    region: "ipswich",
    summary: "Roof replacement and Colorbond installation in Brassall, Ipswich.",
    homes:
      "Brassall, on the northern side of Ipswich, has older timber homes near the river and plenty of brick family homes from the 1980s onwards.",
    roofs:
      "A mix of old corrugated iron and concrete tile. On the older iron roofs, rusted fixings and worn flashings are usually the first problem.",
    exposure:
      "Hot inland summers and storms that build over the ranges to the west bring strong wind and hail risk.",
    faq: {
      q: "Our Brassall roof was damaged in a hailstorm. Can you help?",
      a: "Yes. We can inspect the roof, explain what needs replacing and give you a written quote you can pass to your insurer.",
    },
    neighbours: ["ipswich", "redbank-plains"],
  },
  {
    slug: "redbank-plains",
    name: "Redbank Plains",
    region: "ipswich",
    summary: "Roof replacement in Redbank Plains for established and newer family homes.",
    homes:
      "Redbank Plains has older lowset homes from the 1970s and 1980s and a lot of newer estate housing built from the 2000s onwards.",
    roofs:
      "The older homes mostly have concrete tile or early metal roofs that are due for replacement. Newer homes are more likely to need work after storm damage.",
    exposure:
      "Open, exposed streets catch strong westerly storms in summer, which lift old tiles and test fixings.",
    faq: {
      q: "Do you work on both older and newer homes in Redbank Plains?",
      a: "Yes. Whether it is an old tile roof that is past repair or a newer roof that has been storm damaged, we inspect it and give you a written quote.",
    },
    neighbours: ["goodna", "springfield-lakes", "ipswich"],
  },
  {
    slug: "goodna",
    name: "Goodna",
    region: "ipswich",
    summary: "Roof replacement and Colorbond roofing in Goodna, between Ipswich and Brisbane.",
    homes:
      "Goodna is an older suburb near the Brisbane River, with timber homes, highset Queenslanders and brick homes from the 1960s to the 1980s.",
    roofs:
      "Old corrugated iron and early tile roofs are common. Rust at the laps, loose fixings and worn flashings are typical on homes of this age.",
    exposure:
      "Low-lying, humid conditions near the river are hard on old iron and timber battens, so we check the battens closely during the quote.",
    faq: {
      q: "Do you check the battens on older Goodna homes?",
      a: "Yes. On older timber homes the battens can be worn or rotted. We check them during the inspection and allow for any replacement in the written quote.",
    },
    neighbours: ["redbank-plains", "springfield-lakes", "forest-lake"],
  },
  {
    slug: "springfield-lakes",
    name: "Springfield Lakes",
    region: "ipswich",
    summary: "Colorbond roofing and roof replacement in Springfield Lakes.",
    homes:
      "Springfield Lakes is a planned community built from the early 2000s, with modern family homes, many two-storey, and estate covenants on some streets.",
    roofs:
      "Roofs here are newer, so replacements are usually after storm damage, ongoing leaks, or a change from tile to Colorbond for looks and weight.",
    exposure:
      "Newer estates have fewer mature trees, so homes catch strong storm winds. Two-storey homes need proper edge protection, which we plan in the quote.",
    faq: {
      q: "Does our Springfield Lakes estate allow a change of roof colour?",
      a: "Some estates have design rules, so it is worth checking your covenant. We can suggest Colorbond colours that suit the street and work with what your estate allows.",
    },
    neighbours: ["redbank-plains", "goodna", "forest-lake"],
  },

  // ── Gold Coast ────────────────────────────────────────────────────────────
  {
    slug: "ormeau",
    name: "Ormeau",
    region: "gold-coast",
    summary: "Roof replacement and Colorbond roofing in Ormeau, on the northern Gold Coast.",
    homes:
      "Ormeau and nearby Pimpama sit on the M1 between Logan and the Gold Coast, with acreage homes, 1990s family homes and large newer estates.",
    roofs:
      "Older acreage homes often have big tile or metal roofs with attached sheds and patios. Newer homes mostly need work after storm damage.",
    exposure:
      "The open corridor between the hills and the coast catches strong storm winds, so secure fixings matter.",
    faq: {
      q: "Do you cover acreage properties around Ormeau?",
      a: "Yes. Larger roofs and outbuildings are fine. We measure everything on site and price each part clearly in the quote.",
    },
    neighbours: ["beenleigh", "coomera"],
  },
  {
    slug: "coomera",
    name: "Coomera",
    region: "gold-coast",
    summary: "Colorbond roofing and roof replacement in Coomera, Gold Coast.",
    homes:
      "Coomera has grown quickly, with modern estates built mostly from the 2000s onwards and some older acreage and canal homes nearby.",
    roofs:
      "Many homes are newer, so replacement is often after storm damage or ongoing problems with the original roof. Older homes in the area have tile that is due.",
    exposure:
      "Close to the Coomera River and the Broadwater, homes get humid, salty air that is harder on metal fixings than inland suburbs.",
    faq: {
      q: "Does being close to the water change the roof we should choose in Coomera?",
      a: "It can. Salt air is harder on steel. We look at how close the home is to the water and recommend the right Colorbond product and fixings for the site.",
    },
    neighbours: ["ormeau", "helensvale"],
  },
  {
    slug: "helensvale",
    name: "Helensvale",
    region: "gold-coast",
    summary: "Roof replacement and Colorbond installation in Helensvale, Gold Coast.",
    homes:
      "Helensvale has lots of family homes from the late 1980s and 1990s, including canal-front homes and leafy streets near the hills.",
    roofs:
      "Concrete tile from that era is common and many roofs are on their original tiles, valleys and ridge capping.",
    exposure:
      "Canal homes are exposed to salt air and wind off the water, while homes near the hills deal with leaf litter in gutters and valleys.",
    faq: {
      q: "Our Helensvale canal home has a tile roof. Is Colorbond suitable near the water?",
      a: "Yes, with the right product and fixings for the site. We look at how exposed the home is during the quote and recommend accordingly.",
    },
    neighbours: ["coomera", "southport", "nerang"],
  },
  {
    slug: "southport",
    name: "Southport",
    region: "gold-coast",
    summary: "Roof replacement and Colorbond roofing in Southport, Gold Coast.",
    homes:
      "Southport is one of the Gold Coast's older suburbs, with post-war houses, Queenslanders and brick homes mixed in with newer units and townhouses.",
    roofs:
      "Older homes often have rusted iron or tired tile roofs. Salt air speeds up corrosion on fixings, flashings and old sheets.",
    exposure:
      "Close to the Broadwater, homes get salt-laden wind year round and strong storms in summer.",
    faq: {
      q: "Why does our Southport roof rust faster than inland roofs?",
      a: "Salt in the air near the coast attacks steel and fixings. On coastal homes we recommend the right Colorbond product and fixings for how close you are to the water.",
    },
    neighbours: ["helensvale", "nerang", "robina"],
  },
  {
    slug: "nerang",
    name: "Nerang",
    region: "gold-coast",
    summary: "Roof replacement in Nerang for family homes and hinterland properties.",
    homes:
      "Nerang sits at the foot of the hinterland, with older timber homes near the town centre, 1980s family homes and acreage in the hills.",
    roofs:
      "Tile and older metal roofs are common. Homes on hillsides can have tricky access, which we plan for in the quote.",
    exposure:
      "Storms often build over the hinterland and hit Nerang hard, with heavy rain and the risk of hail.",
    faq: {
      q: "Our Nerang home is on a steep block. Can you still re-roof it?",
      a: "Usually, yes. Steep blocks need careful planning for access, scaffolding and edge protection. We look at the site during the quote and include it in the price.",
    },
    neighbours: ["helensvale", "southport", "robina"],
  },
  {
    slug: "robina",
    name: "Robina",
    region: "gold-coast",
    summary: "Colorbond roofing and roof replacement in Robina, Gold Coast.",
    homes:
      "Robina is a planned suburb built mostly from the 1980s and 1990s, with family homes around lakes and parks, many with hip and valley roofs.",
    roofs:
      "Concrete tile roofs from that period are common and are now at the age where leaks and cracked ridges keep coming back.",
    exposure:
      "Coastal humidity and summer storms are hard on old pointing and flashings, and lakeside homes catch more wind.",
    faq: {
      q: "Can we change from tile to Colorbond on our Robina home?",
      a: "Yes. It is one of the most common jobs on homes of this age. We check the battens and frame and explain everything included in the written quote.",
    },
    neighbours: ["nerang", "southport", "burleigh-heads"],
  },
  {
    slug: "burleigh-heads",
    name: "Burleigh Heads",
    region: "gold-coast",
    summary: "Roof replacement and Colorbond roofing in Burleigh Heads, close to the surf.",
    homes:
      "Burleigh Heads has older beach houses, fibro and brick homes from the 1960s and 1970s, and plenty of newer renovations and rebuilds.",
    roofs:
      "Older iron roofs here often rust much faster than inland because of the salt. Tile roofs from the 1970s are common on the brick homes.",
    exposure:
      "Homes close to the surf are in a harsh marine environment. Product and fixing choice matters most here.",
    faq: {
      q: "We are a few streets from the beach in Burleigh. What roof should we use?",
      a: "Close to breaking surf, a coastal-grade Colorbond product such as Colorbond Ultra and matching fixings are usually recommended. We look at how close you are and recommend the right option in the quote.",
    },
    neighbours: ["robina", "southport"],
  },

  // ── Moreton Bay ───────────────────────────────────────────────────────────
  {
    slug: "strathpine",
    name: "Strathpine",
    region: "moreton-bay",
    summary: "Roof replacement and Colorbond installation in Strathpine, Moreton Bay.",
    homes:
      "Strathpine has many lowset family homes from the 1970s and 1980s, plus newer townhouses and homes.",
    roofs:
      "Tile and older metal roofs are common. Many original roofs are now at the stage where repairs no longer keep the water out.",
    exposure:
      "Storms moving east through Moreton Bay bring strong wind and rain. Secure fixings and new flashings are the priority on an older home.",
    faq: {
      q: "How long does a roof replacement take on a Strathpine home?",
      a: "It depends on the size of the roof, the type of roof being removed and the weather. We give you a realistic timeframe in the quote and keep you updated through the job.",
    },
    neighbours: ["albany-creek", "north-lakes"],
  },
  {
    slug: "north-lakes",
    name: "North Lakes",
    region: "moreton-bay",
    summary: "Colorbond roofing and roof replacement in North Lakes, Moreton Bay.",
    homes:
      "North Lakes is a newer suburb of modern family homes, most built from the early 2000s onwards, many two-storey.",
    roofs:
      "Homes here are newer, so the reason for a new roof is more often storm damage, a change of look, or replacing a roof that has not performed well.",
    exposure:
      "Exposed new estates catch strong winds in storms. Two-storey homes need proper scaffolding and edge protection, which we plan in the quote.",
    faq: {
      q: "Our North Lakes home is fairly new. Why would we need a new roof?",
      a: "Most newer roofs only need replacing after storm damage or if the original roof has had ongoing problems. We will inspect it and tell you honestly whether a replacement is the right call.",
    },
    neighbours: ["strathpine", "boondall"],
  },
];

export function getArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}
