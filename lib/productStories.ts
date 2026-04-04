import type { ProductProvenance } from "./productProvenanceTypes";

export type ProductStoryFields = {
  provenance: ProductProvenance;
  storyBody?: string;
};

/** Per-piece provenance keyed by product id — merged into catalog in data.ts */
export const STORY_DATA: Record<string, ProductStoryFields> = {
  "1": {
    provenance: {
      headline: "Aditi's Birkin — five years of maybes, then one quiet yes",
      acquired:
        "Purchased new in 2021 after a promotion I’d worked toward for years.",
      worn: "Boardrooms, anniversaries, and one unforgettable trip to Lisbon.",
      memory:
        "I always carried the orange box home on the day it arrived — a ritual before storing it properly.",
      sentiment:
        "Letting it go feels like passing a milestone to someone ready for theirs.",
      voice: "first-person",
    },
    storyBody:
      "This Birkin was never an impulse. It marked a chapter I had fought for. The leather softened where my hand rested; the hardware still catches light like the day I unboxed it. I’m moving toward a quieter wardrobe, and I hope it carries your own wins with the same grace.",
  },
  "2": {
    provenance: {
      headline: "Meera's Neverfull — the year freelance finally paid the rent",
      acquired: "Bought for myself in 2019 when freelance work finally felt real.",
      worn: "Daily — coffee runs, client meetings, weekend markets.",
      memory:
        "The rose interior still makes me smile; I lined it with a scarf from my mother.",
      sentiment: "A loyal workhorse that deserves a new commute.",
      voice: "first-person",
    },
    storyBody:
      "The Neverfull carried contracts, lunch boxes, and once an entire birthday cake intact across town. The corners show honest life — not neglect. I’m upgrading to a smaller silhouette; I hope it keeps organizing someone else’s busy, happy life.",
  },
  "3": {
    provenance: {
      headline: "Shreya's gift to herself (the navy chapter)",
      acquired: "A milestone gift to myself after finishing grad school abroad.",
      worn: "Ceremonies, dinners, and quiet evenings when I needed confidence.",
      memory:
        "The first click of the turn-lock still feels like closing a good day.",
      sentiment: "Pristine because I was careful — and a little in awe of it.",
      voice: "first-person",
    },
    storyBody:
      "I treated this bag like a talisman. The caviar barely shows age because I rotated it with intention. I’m simplifying to one black bag; this navy deserves someone who will still whisper thank you when they pick it up.",
  },
  "4": {
    provenance: {
      headline: "Rohan's Marmont — Florence after midnight, espresso still on the mind",
      acquired: "Souvenir from a trip I’d promised myself since university.",
      worn: "Dinners, concerts, and too many late taxis.",
      memory: "The GG on the back faced outward in every crowded room — my little shield.",
      sentiment: "Bold, soft, and ready for another chapter.",
      voice: "first-person",
    },
    storyBody:
      "The Marmont came home with me from a trip where I finally felt brave alone in a new city. The leather smells faintly of espresso and optimism. I’m curating a smaller rotation; take it somewhere loud and lovely.",
  },
  "5": {
    provenance: {
      headline: "The caramel Galleria that survived three desk plants and three jobs",
      acquired: "Bought when I switched industries and needed to look the part.",
      worn: "Trains, airport floors, and one memorable rainy sprint to a pitch.",
      memory: "The Saffiano survived coffee, rain, and one leaky pen — barely.",
      sentiment: "Structured on the outside; sentimental on the inside.",
      voice: "first-person",
    },
    storyBody:
      "This Galleria held laptops, heels, and once a friend’s wedding shoes. The caramel warmed with time like good news. I work from home now; it should return to a hallway that hears heels again.",
  },
  "6": {
    provenance: {
      headline: "Kiara's Saddle — bonus money, zero regrets, one crooked smile",
      acquired: "A careful purchase after my first bonus — not the whole bonus, but close.",
      worn: "Gallery openings, date nights, and one very long art fair.",
      memory: "I adjusted the strap a hundred times until it sat exactly right.",
      sentiment: "Romantic, a little impractical, and worth it.",
      voice: "first-person",
    },
    storyBody:
      "The Saddle was my reward for staying in a job that didn’t always love me back. The CD clasp became a nervous habit before big meetings. I’ve moved toward softer silhouettes; I hope it still makes someone’s heart race at the clasp.",
  },
  "7": {
    provenance: {
      headline: "Vikram's Tracks — one summer, three cities, too many bad photos",
      acquired: "Bought for travel — then worn into the ground anyway.",
      worn: "Concrete, cobblestones, and one regrettable festival field.",
      memory: "The layered sole reminds me of a skyline I chased on foot.",
      sentiment: "Heavy in hand, light in memory.",
      voice: "first-person",
    },
    storyBody:
      "Tracks were my uniform when I thought fashion had to be loud to be seen. They’re still comfortable truth-tellers. My style turned quieter; let them run for you.",
  },
  "8": {
    provenance: {
      headline: "Nikita's Tributes — for the talk she almost bailed on",
      acquired: "Bought for a conference talk I was terrified to deliver.",
      worn: "Twice — both times when I needed height and nerve.",
      memory: "The satin still holds the shape of standing very still backstage.",
      sentiment: "Elegant fear, then relief.",
      voice: "first-person",
    },
    storyBody:
      "These Tributes lived in my closet like courage in shoe form. I wore them when I had to be visible. They deserve another stage — maybe yours.",
  },
  "9": {
    provenance: {
      headline: "Karima's first reversible — the day the suit stopped feeling borrowed",
      acquired: "A practical splurge when dress codes suddenly mattered.",
      worn: "Most weekdays for two seasons — then weekends too.",
      memory: "Reversible felt like two personalities; I liked both.",
      sentiment: "Small piece, big confidence.",
      voice: "first-person",
    },
    storyBody:
      "This belt cinched outfits when I was still learning what fit felt like. The buckle has hairline love marks. Pass it to someone tightening their own story.",
  },
  "10": {
    provenance: {
      headline: "Arjun's double-G — the belt that outlasted the love story",
      acquired: "Gift from a partner who knew I’d wear it more than jewellery.",
      worn: "Jeans, trousers, one linen dress on repeat.",
      memory: "The buckle clicked a rhythm when I walked fast to make trains.",
      sentiment: "We parted kindly; the belt shouldn’t stay in a drawer.",
      voice: "first-person",
    },
    storyBody:
      "It was a thoughtful gift that outlasted the relationship. I hope it circles someone who walks with purpose — fast or slow.",
  },
  "11": {
    provenance: {
      headline: "Ananya's Gold Kelly — joy she refused to postpone",
      acquired: "Ordered after a health scare reminded me not to postpone joy.",
      worn: "Rarely — special lunches and the best version of my calendar.",
      memory: "The clochette still makes a sound that feels expensive and gentle.",
      sentiment: "Grateful, careful, ready to let someone else cherish it.",
      voice: "first-person",
    },
    storyBody:
      "This Kelly was never about status for strangers; it was about marking time I almost didn’t get. It stayed mostly in dust unless the day deserved gold. If it sits on your arm, carry it on days that matter — even quiet ones.",
  },
  "12": {
    provenance: {
      headline: "Isha's blush Re-Edition — the year she wore pink on purpose",
      acquired: "Bought on a whim that turned out to be a good habit.",
      worn: "Farmers markets, flights, and friends’ birthdays.",
      memory: "The re-nylon felt lighter after I stopped overpacking.",
      sentiment: "Playful, practical, surprisingly tough.",
      voice: "first-person",
    },
    storyBody:
      "The Re-Edition held sunscreen, a paperback, and once a friend’s disposable camera. Blush was my rebellion against an all-black phase. I’m editing my closet; keep it cheerful.",
  },
  "13": {
    provenance: {
      headline: "Devika's Orans — sun on her feet, stubborn tan lines",
      acquired: "Summer bonus treat — rationalised by cost-per-wear math.",
      worn: "Balconies, brunches, and one beach town with uneven stones.",
      memory: "The leather molded after a week of stubborn wear.",
      sentiment: "Warm metal mood in shoe form.",
      voice: "first-person",
    },
    storyBody:
      "Orans were my uniform when the city felt too hot for ambition. They scuffed honestly. I moved somewhere colder; let them keep walking in sunlight.",
  },
  "14": {
    provenance: {
      headline: "Sara's Clic H — enamel for an anniversary she almost didn't plan",
      acquired: "Anniversary gift — the kind you’re afraid to scratch.",
      worn: "Stacked with a watch; removed carefully before cooking.",
      memory: "The enamel caught kitchen light like a small moon.",
      sentiment: "Precious in daily life, not only on holidays.",
      voice: "first-person",
    },
    storyBody:
      "The Clic H was a gentle ritual on my wrist — on, off, on again. I’m allergic to fuss now; it should live on someone who still likes a little ceremony.",
  },
  "15": {
    provenance: {
      headline: "Lea's Speedy — the monogram her mother knew in one glance",
      acquired: "Found pre-loved when I wanted heritage without the wait.",
      worn: "Everywhere until handles honeyed like tea.",
      memory: "She said, ‘That’s the one,’ and I believed her.",
      sentiment: "Nostalgic speed — still moving.",
      voice: "first-person",
    },
    storyBody:
      "This Speedy carried my life when I was impatient for the next version of myself. The patina is family history in leather. I hope it rides shotgun on your errands too.",
  },
  "16": {
    provenance: {
      headline: "Noah's Keepall — packed for a job that never came",
      acquired: "Bought for a partner’s job that never happened — kept it anyway.",
      worn: "Carry-on only for two years straight.",
      memory: "Eclipse monogram felt stealthy in bright airports.",
      sentiment: "Travel optimism in canvas.",
      voice: "first-person",
    },
    storyBody:
      "The Keepall was my promise that I’d leave town often enough to justify it. It did its job. I’m staying put for a while; pack yours and go.",
  },
  "17": {
    provenance: {
      headline: "Tara's espadrilles — outlet luck that tasted like Paris",
      acquired: "Outlet find that felt like cheating — in a good way.",
      worn: "Warm cities, cool evenings, one wedding dance floor.",
      memory: "The cap toe scuffed first; I liked the asymmetry.",
      sentiment: "Easy glamour without trying.",
      voice: "first-person",
    },
    storyBody:
      "Chanel espadrilles were my compromise between pretty and practical. They’re worn where life actually happens. If your summers are social, they’ll serve you.",
  },
  "18": {
    provenance: {
      headline: "Priya's WOC — nights when the bag was lighter than the day",
      acquired: "Bought when I started going out with less and listening more.",
      worn: "Dinners where phones stayed in bags.",
      memory: "The chain doubled as a nervous fiddle before good news.",
      sentiment: "Small bag, big nights.",
      voice: "first-person",
    },
    storyBody:
      "This WOC taught me I didn’t need to carry the whole day on my shoulder. It fits essentials and a little mystery. I’m carrying totes again for work; let this be your light evenings.",
  },
  "19": {
    provenance: {
      headline: "Sameer's Aces — white leather, honest scuffs, no regrets",
      acquired: "Trend purchase that became a weekend default.",
      worn: "Pavement, parks, and one paint-splattered studio floor.",
      memory: "The web stripe stayed cleaner than my intentions.",
      sentiment: "Honest wear; still handsome.",
      voice: "first-person",
    },
    storyBody:
      "Aces were my bridge between sneakers and ‘real shoes.’ They show mileage without apology. Perfect if you live on your feet.",
  },
  "20": {
    provenance: {
      headline: "Ria's Cahier — brass for the manuscript she actually finished",
      acquired: "Bought when I thought I’d journal in cafés more.",
      worn: "Meetings, museums, and one rainy manuscript weekend.",
      memory: "The brass hardware warmed in my palm before hard conversations.",
      sentiment: "Serious on the outside; softer in use.",
      voice: "first-person",
    },
    storyBody:
      "The Cahier held my laptop and my dignity on days I needed both. Saffiano forgave rain. I’ve gone digital; write your own margins with it.",
  },
  "21": {
    provenance: {
      headline: "Manav's America's Cup — forward motion, messy soles",
      acquired: "Bought for a fitness phase that became a walking phase.",
      worn: "City loops, weekend errands, one half-marathon training lie.",
      memory: "Mesh breathed better than my excuses.",
      sentiment: "Sporty optimism.",
      voice: "first-person",
    },
    storyBody:
      "America’s Cup felt futuristic when I needed forward motion. They’re scuffed where honesty lives. Still plenty of life for city miles.",
  },
  "22": {
    provenance: {
      headline: "Zara's B23 — oblique when heels felt like the wrong script",
      acquired: "Splurge when sneakers became acceptable almost everywhere.",
      worn: "Art openings, travel days, long queues.",
      memory: "The canvas held creases like a map of standing still in lines.",
      sentiment: "Designer comfort with a wink.",
      voice: "first-person",
    },
    storyBody:
      "B23s were my compromise between statement and sneaker. They pair with trousers better than I expected. My ankles want loafers now; yours might want Dior.",
  },
  "23": {
    provenance: {
      headline: "Aisha's Tribales — pearls for the poem she read aloud",
      acquired: "Gift from a friend who believed in louder accessories than I did.",
      worn: "Often enough that the posts feel familiar.",
      memory: "They caught stage lights when I finally read my poem aloud.",
      sentiment: "Gentle drama.",
      voice: "first-person",
    },
    storyBody:
      "Tribales made me feel dressed when I was only half ready. I’m simplifying jewellery; let them catch your light.",
  },
  "24": {
    provenance: {
      headline: "Neha's City — Balenciaga for nights that wouldn't end",
      acquired: "Bought in a phase of oversized everything.",
      worn: "Nights out, overstuffed with optimism.",
      memory: "The mirror survived; my patience for heavy bags did not.",
      sentiment: "Rock-and-roll nostalgia.",
      voice: "first-person",
    },
    storyBody:
      "The City was my uniform when nights ran late. Leather softened where life rubbed. I carry smaller now; take this to loud places.",
  },
  "25": {
    provenance: {
      headline: "Karan's hoodie — warmth for cold news and volunteer Sundays",
      acquired: "Impulse that became a uniform for volunteer weekends.",
      worn: "Layered under coats, over tees, in drafty halls.",
      memory: "The logo started conversations I didn’t expect.",
      sentiment: "Opinionated comfort.",
      voice: "first-person",
    },
    storyBody:
      "This hoodie saw protests, packing boxes, and lazy Sundays. Fleece pills like any honest sweater. Wear it if you like clothes that talk.",
  },
  "26": {
    provenance: {
      headline: "Ira's Loulou — a chain that hummed in quiet rooms",
      acquired: "Bought when chains felt powerful, not noisy.",
      worn: "Dinners, dates, and one solo trip where I dressed up for myself.",
      memory: "The matelassé puffed back after rain dried.",
      sentiment: "Soft power.",
      voice: "first-person",
    },
    storyBody:
      "The Loulou sat high on my shoulder like a small engine. YSL hardware still feels assertive in the best way. I’m downsizing; let it swing on your walks.",
  },
  "27": {
    provenance: {
      headline: "Yash's biker jacket — leather, risk, and almost a motorcycle",
      acquired: "Serious purchase for a motorcycle phase that lasted one season.",
      worn: "Mostly city — the bike was mostly metaphor.",
      memory: "Lambskin creased at the elbows like honesty.",
      sentiment: "Coolness with a cost — worth it once.",
      voice: "first-person",
    },
    storyBody:
      "This jacket smelled like leather and risk even standing still. It’s broken in, not broken. If you want edge without the engine, it still delivers.",
  },
  "28": {
    provenance: {
      headline: "Mira's Constance Slim — the H she clicked in every queue",
      acquired: "Mini luxury when big bags felt heavy.",
      worn: "Inside every bag rotation for two years.",
      memory: "Étoupe matched more than I expected — even my doubt.",
      sentiment: "Small, exact, Hermès-quiet.",
      voice: "first-person",
    },
    storyBody:
      "The Constance Slim made me feel organised even when I wasn’t. It’s a tactile pleasure — click, tuck, go. I went card-only; pass the ritual on.",
  },
  "29": {
    provenance: {
      headline: "Pooja's bandeau — colour when words wouldn't come",
      acquired: "Bought to save outfits I already owned.",
      worn: "Bag handles, ponytails, once as a belt.",
      memory: "Monogram silk felt like a private joke in plain sight.",
      sentiment: "Versatile joy.",
      voice: "first-person",
    },
    storyBody:
      "This bandeau rescued bad hair days and plain tees. Still crisp because I saved it for ‘good’ days too often. Use it recklessly.",
  },
  "30": {
    provenance: {
      headline: "Shreya's Chanel 19 — soft structure for a harder year",
      acquired: "Bought when I needed something beautiful to hold onto literally.",
      worn: "Carefully — then more casually when life softened.",
      memory: "The mixed metals felt like compromise made chic.",
      sentiment: "Hope stitched into goatskin.",
      voice: "first-person",
    },
    storyBody:
      "The 19 saw me through a year I don’t need to explain here. The leather relaxed as I did. I’m ready for a different silhouette; carry this through your own soft seasons.",
  },
  "31": {
    provenance: {
      headline: "Anika's Dionysus — tiny bag, tiger nerve, big nights",
      acquired: "Bought when mini bags were a personality.",
      worn: "Nights out, weddings, one rooftop where wind tested the chain.",
      memory: "Suede panels darkened where my thumb rested — habit.",
      sentiment: "Romantic hardware.",
      voice: "first-person",
    },
    storyBody:
      "The Dionysus felt mythic in crowded rooms. GG Supreme aged with my social life. I’m carrying less literally and figuratively; let it swing for you.",
  },
  "32": {
    provenance: {
      headline: "Rahul's Symbole — shade for harsh light and harsh ideas",
      acquired: "Splurge when my optometrist said protect your eyes like skin.",
      worn: "Driving, reading outdoors, pretending to be incognito.",
      memory: "Acetate warmed on the bridge of my nose like patience.",
      sentiment: "Sharp lines, soft light.",
      voice: "first-person",
    },
    storyBody:
      "These sunglasses made me feel edited — in a good way. Case kept them honest. My prescription changed; your vision might love them.",
  },
  "33": {
    provenance: {
      headline: "Divya's Book Tote — heavier than every novel she carried",
      acquired: "Bought for a job that required visible effort.",
      worn: "Offices, flights, and one beach read that never finished.",
      memory: "Embroidery snagged once on a door; I liked the tiny scar.",
      sentiment: "Statement carryall.",
      voice: "first-person",
    },
    storyBody:
      "The Book Tote carried laptops, gifts, and once a friend’s kitten (briefly). Toile feels like a painting you live with. I use backpacks now; display yours.",
  },
  "34": {
    provenance: {
      headline: "Rehan's H belt — reversible moods on the same waist",
      acquired: "Classic purchase when belts became interesting again.",
      worn: "Most trousers I respected.",
      memory: "Gold side for brave days; noir for negotiation days.",
      sentiment: "Quiet authority.",
      voice: "first-person",
    },
    storyBody:
      "This Hermès belt was my answer to ‘what makes this outfit finished?’ The buckle has micro-scratches from living. Size your ambition; it’ll hold.",
  },
  "35": {
    provenance: {
      headline: "Siddharth's LV Trainers — chunky when meetings went street",
      acquired: "Bought when streetwear invaded my meetings.",
      worn: "Concrete, marble lobbies, one festival mud mistake.",
      memory: "Monogram panels stayed cleaner than my calendar.",
      sentiment: "Loud comfort.",
      voice: "first-person",
    },
    storyBody:
      "Trainers were my bridge between sneakers and adulthood-as-costume. Soles tell truths. I’ve gone minimal; stomp for me.",
  },
  "36": {
    provenance: {
      headline: "Kavya's slingbacks — the cap toe that whispered you're hired",
      acquired: "Bought for interviews that turned into offers.",
      worn: "Rarely enough to keep the grosgrain proud.",
      memory: "The heel height was exactly ‘capable,’ not ‘uncomfortable.’",
      sentiment: "Polished nerves.",
      voice: "first-person",
    },
    storyBody:
      "Chanel slingbacks were my compromise between flats and stilettos. They whispered competence. My office is sneakers-only now; yours might still need a whisper.",
  },
  "37": {
    provenance: {
      headline: "Nisha's Ophidia — GG in her smallest pocket",
      acquired: "Small treat when I stopped carrying cash philosophy.",
      worn: "Front pocket, smallest bags, travel days.",
      memory: "Web stripe aligned with my keys by accident — satisfying.",
      sentiment: "Compact loyalty.",
      voice: "first-person",
    },
    storyBody:
      "This card case made minimalism feel luxurious. GG canvas ages honestly. I went digital-wallet heavy; keep cards classy.",
  },
  "38": {
    provenance: {
      headline: "Aditya's Cloudbust — sculpture for the month that felt loud",
      acquired: "Bold purchase for a bold month that ended quietly.",
      worn: "Streets, galleries, one rainy run to a train.",
      memory: "The sole wore where I pivoted often — literally.",
      sentiment: "Futuristic fatigue.",
      voice: "first-person",
    },
    storyBody:
      "Cloudbust felt like wearing architecture. They’re worn where life is uneven — honestly. If you like statement over subtlety, they’re ready.",
  },
  "39": {
    provenance: {
      headline: "Meera's Hourglass — curves that sat like punctuation",
      acquired: "Bought when silhouettes mattered more than logos.",
      worn: "Dinners, openings, and one photoshoot I didn’t hate.",
      memory: "The B clasp clicked like punctuation.",
      sentiment: "Sharp romance.",
      voice: "first-person",
    },
    storyBody:
      "The Hourglass sat on tables like a small sculpture. Calfskin held structure through seasons. I’m curating softer lines; carry the edge.",
  },
  "40": {
    provenance: {
      headline: "Riya's card case — quiet flex in the smallest pocket",
      acquired: "Gift to myself when I stopped losing cards.",
      worn: "Rarely left my jacket — a good habit.",
      memory: "Grain de poudre felt like suede’s responsible cousin.",
      sentiment: "Tiny luxury, daily.",
      voice: "first-person",
    },
    storyBody:
      "This card holder was my proof that small things can feel complete. Unused is a shame; I’m consolidating. Slip it in and go.",
  },
  "41": {
    provenance: {
      headline: "Aarav's Capucines — grown-up LV without the shout",
      acquired: "Careful purchase when I wanted LV without monogram shout.",
      worn: "Client days, family events, once to a funeral where dignity mattered.",
      memory: "The top handle felt steady when my hands weren’t.",
      sentiment: "Understated gravity.",
      voice: "first-person",
    },
    storyBody:
      "Capucines was my grown-up bag — not loud, just exact. Taurillon softened where I carried it most. I’m simplifying to one black bag; this Galet deserves a new quiet life.",
  },
  "42": {
    provenance: {
      headline: "Tanya's cardigan — gold buttons on ordinary Tuesdays",
      acquired: "Treat when autumn felt shorter every year.",
      worn: "Layered, misbuttoned once on purpose.",
      memory: "The double G caught light in office hallways.",
      sentiment: "Academic cosplay, cozy edition.",
      voice: "first-person",
    },
    storyBody:
      "This cardigan made Zoom tops feel intentional. Wool pills where arms rest — that’s life. I sized up my style; warm someone else’s Tuesdays.",
  },
  "43": {
    provenance: {
      headline: "Jia's J’Adior — words on skin when love was loud",
      acquired: "Gift from a romantic chapter that ended kindly.",
      worn: "Rarely — special collars and brave necklines.",
      memory: "The logo sat where a voice caught when I was nervous.",
      sentiment: "Romantic residue.",
      voice: "first-person",
    },
    storyBody:
      "The choker felt like wearing a sentence you meant. I’m wearing quieter jewellery now; say something bold with yours.",
  },
  "44": {
    provenance: {
      headline: "Sonali's Niki — crinkled leather for overloaded shoulders",
      acquired: "Bought when shoulder pain met fashion anyway.",
      worn: "Commutes, concerts, overstuffed weekends.",
      memory: "Crinkled leather hid scuffs that would’ve bothered me on smoother bags.",
      sentiment: "Rockstar fatigue in the best way.",
      voice: "first-person",
    },
    storyBody:
      "The Niki carried what I needed when I thought I needed everything. Chain straps sang when I walked fast. I’m carrying lighter; sling this for your heavy weeks.",
  },
  "45": {
    provenance: {
      headline: "Vedant's Lindy — slow walks in a fast world",
      acquired: "Painstaking hunt — worth the wait when it finally arrived.",
      worn: "Weekends, airports, long walks with no destination.",
      memory: "Clemence relaxed faster than my schedule did.",
      sentiment: "Calm luxury — rare and real.",
      voice: "first-person",
    },
    storyBody:
      "The Lindy taught me that some bags feel kind in the hand. Étoupe matched sidewalks and good coffee. I’m rotating toward smaller crossbodies; let this swing at your pace, not the world’s.",
  },
};
