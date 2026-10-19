/**
 * Area pages. One entry per suburb, each with its own copy (no find-and-replace).
 * The list is the default from the brief (Brisbane, Moreton Bay and Logan) and is
 * waiting on the owner to confirm (docs/content-todo.md). Add or remove entries here;
 * pages, the sitemap, footer links and redirects all follow.
 *
 * Copy rules: describe housing and roofs in general, hedged terms ("many", "often").
 * No invented job counts, prices or named customers.
 */

export type Region = "north" | "west" | "east" | "south" | "logan" | "moreton-bay";

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
      "Aspley grew quickly from the 1960s onwards, so many streets are lined with lowset brick homes and larger family houses built in the following decades. A lot of these homes are now on their original roof.",
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
      "Many older homes still have corrugated iron that has done its job for decades. Replacing it with new Colorbond keeps the traditional look while fixing rust, leaks and loose sheets.",
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
      "Belmont is a leafy eastern suburb with acreage-style blocks, family homes from several decades and newer builds.",
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
      "Concrete tile roofs from those decades are now ageing. Owners often choose tile to Colorbond to lighten the roof and refresh the look of the house.",
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
    neighbours: ["sunnybank", "mount-gravatt", "bethania"],
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
      "Concrete tile roofs from those decades are common and starting to need serious maintenance. Re-roofing in Colorbond is a popular option.",
    exposure:
      "Close to the Logan and Albert rivers, Bethania gets heavy rain in storm season, which shows up any weak points in an old roof.",
    faq: {
      q: "Do you cover Logan suburbs like Bethania?",
      a: "Yes. Bethania and nearby Logan suburbs are in our service area. The quote is free and we come to the property.",
    },
    neighbours: ["acacia-ridge", "sunnybank"],
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
