/* ============================================================
   Blog content. Structured into blocks so posts can render
   headings + lists, not just flat paragraphs.
   Phase 3 may move these to markdown files; the shape stays.
   ============================================================ */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'code'; text: string };

export type Blog = {
  slug: string;
  title: string;
  date: string;
  dateTime: string;
  excerpt: string;
  tags: string[];
  readingMinutes: number;
  /** Pinned posts sort to the top of the index, above newest-first. */
  pinned?: boolean;
  /** Slug of the follow-up post, shown as a "Next post" link at the end. */
  next?: string;
  blocks: Block[];
};

export const blogs: Blog[] = [
  {
    slug: 'lawhook-regulatory-circulars',
    title: 'Nobody Reads Regulatory Circulars. So I Built Something That Does.',
    date: 'July 14, 2026',
    dateTime: '2026-07-14',
    excerpt:
      'Lawhook is a regulatory monitoring project built around scrapers, webhooks, reliable delivery, and practical AI where it actually adds value.',
    tags: ['Lawhook', 'RegTech', 'Scrapers', 'Webhooks'],
    readingMinutes: 5,
    pinned: true,
    next: 'demand-driven-scheduler',
    blocks: [
      { type: 'p', text: 'A few weeks ago, I was hunting for a project that would actually stand out on my portfolio.' },
      { type: 'p', text: 'Like every developer who has spent too much time on X, Reddit, and YouTube, I first started building a deep research platform called Nexus. It had cool features, fancy AI ideas, and enough buzzwords to impress a VC for at least 12 seconds.' },
      { type: 'p', text: 'Then reality hit. The space was crowded. Very crowded.' },
      { type: 'p', text: 'So I went on a quest to find a less competitive problem. After digging through dozens of ideas, I stumbled upon something surprisingly painful: regulatory updates. And that is how Lawhook was born.' },
      { type: 'p', text: 'Today is June 18th, and while writing this blog, I am also building scraper scripts for SEBI (India) and FCA (UK). So let us get into it.' },

      { type: 'h2', text: 'What is Lawhook?' },
      { type: 'p', text: 'Imagine you are running a business. One morning a regulator publishes a new circular. You do not see it. A few weeks later: fine, compliance issue, infrastructure changes, emergency meetings, and more coffee.' },
      { type: 'p', text: 'Governments are extremely good at publishing important updates. Humans are extremely good at missing them. That is the problem Lawhook tries to solve.' },
      { type: 'p', text: 'Lawhook continuously monitors regulatory sources and automatically delivers important updates to users. No endless browsing. No checking fifty websites every morning. No "Oops, we missed that circular from three months ago." Simple.' },

      { type: 'h2', text: 'Wait… is this one of those AI agent projects?' },
      { type: 'p', text: 'You know the type. "10 AI agents." "25 sub-agents." "Each agent has a role." "Each agent has a backstory." "One agent is emotionally supportive." No. At least not here.' },
      { type: 'p', text: 'Could I build a system where AI agents constantly search the web, gather information, summarize documents, and make decisions? Sure. Would it be expensive? Also sure. Very expensive.' },
      { type: 'p', text: 'The problem with regulatory information is that finding the right source matters more than generating fancy summaries. If an AI has to search, search again, find relevant documents, process them, verify them, and process them again, suddenly your token bill starts looking like a mortgage payment. As a student, I would prefer my wallet remain alive.' },

      { type: 'h2', text: 'So how does Lawhook work?' },
      { type: 'p', text: 'The answer is surprisingly boring. And boring is good. Lawhook relies heavily on:' },
      { type: 'ul', items: ['Scrapers', 'Webhooks', 'Reliable delivery systems', 'Good networking'] },
      { type: 'p', text: 'That is it. No magical AI kingdom. No army of autonomous agents. Just systems that do their job.' },
      { type: 'p', text: 'There are roughly 190+ countries in the world, many with different regulators and jurisdictions. Lawhook launches scrapers at intervals, detects changes, processes the updates, and delivers them directly to user webhooks. AI is used where it adds value, not where it looks cool in a demo. Honestly, AI is only a small percentage of the project. The interesting engineering is everything around it.' },
      { type: 'p', text: 'The whole pipeline is deliberately boring:' },
      { type: 'code', text: `Regulator sources  (RBI · SEBI · SEC · MAS · ASIC)

        │  scrape — demand-driven, cadence set by subscriber tier

        ▼

Change detection  (content hash — only real changes pass)

        │

        ▼

AI diff + severity  (added / removed / modified + plain-English summary)

        │

        ▼

Match subscriptions  (jurisdiction · industry · severity threshold)

        │

        ▼

Signed webhook  →  your endpoint` },

      { type: 'h2', text: 'The less glamorous part nobody talks about' },
      { type: 'p', text: 'The fun part isn’t scraping. The hard part starts after scraping. You have to think about:' },
      { type: 'ul', items: ['SSRF', 'XSS', 'Slowloris attacks', 'TLS validation', 'SNI handling', 'Rate limiting', 'Retry systems', 'Secure webhook delivery'] },
      { type: 'p', text: 'Every script I write goes through multiple rounds of review. My process looks something like this:' },
      { type: 'ol', items: ['I design the architecture, pressure-testing it against LLMs to find holes before writing a line', 'I write the implementation myself', 'I have an LLM try to break it, attack the auth, the validation, the edge cases', 'I fix what it finds', 'Manual review', 'Review again, because the best security vulnerability is the one you never deploy'] },

      { type: 'h2', text: 'What’s next?' },
      { type: 'p', text: 'Right now I am building jurisdiction scrapers and the infrastructure around them. The goal is simple: get regulatory updates from source to user as quickly and reliably as possible. No noise. No endless searching. No surprise fines. Just updates that matter. And hopefully fewer compliance-induced heart attacks.' },
      { type: 'p', text: 'So that is Lawhook: a project born from boredom, built because regulatory monitoring is painful, and powered mostly by scrapers, webhooks, networking, and stubbornness. Until then, it is me, a terminal window, several cups of tea, and a growing collection of scraper scripts.' },
    ],
  },
  {
    slug: 'demand-driven-scheduler',
    title: 'The Demand-Driven Scheduler — Prefrontal Cortex of Lawhook',
    date: 'July 15, 2026',
    dateTime: '2026-07-15',
    excerpt:
      'Lawhook was scraping every regulator every 15 minutes — burning money on updates nobody asked for. Here is the demand-driven scheduler that fixed it: a cheap "tick" that only scrapes what paying subscribers actually want.',
    tags: ['Lawhook', 'Scheduler', 'Celery', 'Redis', 'Architecture'],
    readingMinutes: 7,
    next: 'phantom-bug',
    blocks: [
      { type: 'p', text: `My first idea of scraping timing of government sites backfired immediately. It scraped every 15 minutes, celery dispatched every single scraper every 15 minutes, at first i was using a test-free API key, so it didn't bothered me well, and of course i am doing everything through CLI and Swagger so i didn't saw the problem at that time. But when i built my frontend and the changes feed, i saw the problem, and it made me look into my billing as well, as expected a good money wasted. And mainly the change feed is flooded with "No regulatory updates or rulemaking activities....". Yep it was scraping every 15 minute and ai is processing every 15 minute.` },
      { type: 'p', text: `As I realized the problem i began to debug. First I thought "I implemented a thing called diff, I mean every time a site is scraped, it will take snapshot of it and compare it to the previous snapshot, then why it is processing regularly?" The snapshots were changing every 15 minutes even when the regulator published absolutely nothing. That one is a story big enough for its own post, so I will come back to it. Short version: I fixed it, and the feed stopped lying to me.` },
      { type: 'p', text: `And the 15 minute interval came into my mind. I mean why should i need to scrape every 15 minute if no one wants to scrape it at that point? That's how Demand-Driven Scheduler came into my mind. The idea is like this : if a jurisdiction don't have any subscribed users currently, scraping of the Regulators won't happen, until a user subscribed too it. So it just will sit there waiting for a sub. And the scraping interval. Say RBI, some users is subscribed to it. And every 15 minute scraper is dispatched. I mean the computational cost is whooosh 🚀. So I implemented different intervals for different tiers of users. Free get scraped every day. Starter get scraped every 6 hour. Pro get scraped every hour. And enterprise get scraped every 15 minute. So saving computational cost. 💵` },

      { type: 'h2', text: 'So how does it actually work?' },
      { type: 'p', text: `Here is where I hit the actual problem. Celery beat has a schedule. You write it once, it runs forever. "Run this task every 15 minutes." Fine.` },
      { type: 'p', text: `But my cadence is not fixed. India might be free tier today — one guy, 24 hours. Tomorrow a pro user subscribes and suddenly India needs to be scraped every hour. Next week both of them leave and India should not be scraped at all.` },
      { type: 'p', text: `A static schedule cannot do that. You cannot write "scrape India every hour" in a config file when "every hour" depends on who is subscribed right now. The schedule has to be recalculated, not written down.` },
      { type: 'p', text: `So I flipped it. Instead of beat scheduling the scrapers, beat schedules **one cheap task** every 15 minutes. I call it the tick. The tick does not scrape anything. It just asks two questions:` },
      { type: 'ol', items: ['Which jurisdictions have someone watching them, and how fast do they need it?', 'When did I last scrape each one?'] },
      { type: 'p', text: `Then it does the math. \`now - last_scraped >= cadence\` means it is due. Dispatch the scrapers. Not due? Skip it, come back in 15 minutes.` },
      { type: 'code', text: `Beat fires tick every 15 min
        │
        ▼
   Who wants what?  ──────►  no subscribers → not in the list → never scraped
        │
        ▼
   Due?  now - last_scraped >= cadence
        │
        ├── no  → skip (costs nothing)
        │
        └── yes → dispatch scrapers → stamp last_scraped` },
      { type: 'p', text: `Cheap check often, expensive work rarely. The tick takes about 10 milliseconds when nothing is due. One database query and a few Redis reads. Fire that every 15 minutes forever and it costs you nothing. The expensive part — actually hitting the regulator, running the diff, calling the AI — only happens when someone is actually waiting for it.` },
      { type: 'p', text: `The "when did I last scrape" part lives in Redis. One key per jurisdiction, \`last_scraped:IN\`, value is a unix timestamp. If the key does not exist, the jurisdiction has never been scraped, so it is immediately due. New jurisdiction, first subscriber, scrape it now, do not make them wait 24 hours for nothing.` },

      { type: 'h2', text: 'The part that actually decides everything' },
      { type: 'p', text: `This is the function. It answers question 1:` },
      { type: 'code', text: `def get_jurisdiction_cadences() -> dict[str, int]:
    """
    Survey ALL active subscriptions and compute the fastest demanded
    cadence per jurisdiction.
    """
    rows = (
        db.query(Subscription.jurisdiction, User.tier)
        .join(APIKey, Subscription.api_key_id == APIKey.id)
        .join(User, APIKey.user_id == User.id)
        .filter(
            Subscription.is_active == True,
            APIKey.is_active == True,
            User.is_active == True,
        )
        .distinct()
        .all()
    )

    cadences: dict[str, int] = {}
    for jurisdiction, tier in rows:
        # Unknown tier falls back to the SLOWEST cadence, never the fastest.
        cadence = TIER_CADENCE_SECONDS.get(tier, DEFAULT_CADENCE_SECONDS)
        current = cadences.get(jurisdiction)
        if current is None or cadence < current:
            cadences[jurisdiction] = cadence
    return cadences` },
      { type: 'p', text: `Four things in there that took me longer to figure out than they look:` },
      { type: 'p', text: `**It takes no arguments.** My first instinct was to pass a user id. Wrong. This is not a request. Nobody is logged in. The scheduler is a background job looking at the entire database at once. And it has to be — scraping is shared. I scrape RBI once and every Indian subscriber gets it. So the cadence has to come from everybody's demand combined, not one person's.` },
      { type: 'p', text: `**The \`min()\` is the whole design.** For each jurisdiction I keep the smallest cadence I find. Smallest = fastest = whoever paid the most. If one free user and one pro user are both watching India, India runs at pro speed. The pro user paid for that. The free user is just standing nearby.` },
      { type: 'p', text: `**A jurisdiction with no subscribers is not a key in the dictionary.** Not zero, not null. It is simply absent. Absence means do not scrape. That is the entire demand signal and it required no extra code.` },
      { type: 'p', text: `**The unknown tier falls back to the slowest, never the fastest.** If somebody's tier is garbage or I typo a tier name later, the worst that happens is they get scraped slowly. A bug should never hand out enterprise speed for free. Fail toward doing less.` },
      { type: 'p', text: `The join is the boring part but it is where the tier actually lives. Subscription → API key → user → tier. The tier is on the user, not the key, because a person has one plan and many keys. That took me a whole rewrite to understand, but that is a different post.` },

      { type: 'h2', text: 'The clever user problem' },
      { type: 'p', text: `And one important thing. A free tier allows one active subscription. If you want US Jurisdiction along India then you have to pay. But a clever user can delete that and add a US sub. So like Monday India, Tuesday US.. like that. Rotating the one slot around and getting everything.` },
      { type: 'p', text: `Except no. Because the cadence is not attached to the slot. It is attached to whoever is watching that jurisdiction right now.` },
      { type: 'p', text: `So the free user rotates to US. If he is the only one there, US runs at 24 hours, because that is what free is. He rotated all the way to a full day of staleness. If a pro user is already watching US, then yes, US is running hourly and our free guy gets hourly data. But that is not him beating the system. That is the pro user paying for hourly and the free guy standing next to him. The pro user leaves, and the free guy is back to 24 hours immediately.` },
      { type: 'p', text: `Rotating does not manufacture speed. You can shuffle that slot forever and every jurisdiction you land on still runs at whatever the paying subscribers asked for. Never faster because *you* showed up.` },
      { type: 'p', text: `And I want to be honest about the hole here, because someone will find it. A free user riding a jurisdiction that a pro user keeps warm does get pro-speed data. That is real. I left it. What I sell is not exclusive freshness, it is *guaranteed* freshness. Pro guarantees hourly. Free guarantees daily. You cannot build a business on "maybe fast, depends who else is subscribed today" — the moment that pro user unsubscribes you are back to a day behind. If you actually need the speed, you pay for it.` },
      { type: 'p', text: `I also never wrote a single line of anti-abuse code. No rotation detection, no cooldown, no "you cannot resubscribe for 24 hours" rule. The exploit just does not exist, because the architecture made it pointless. That is the part I liked.` },

      { type: 'h2', text: 'Where it is now' },
      { type: 'p', text: `This runs in production. Jurisdictions nobody is subscribed to are not scraped at all — not slower, not throttled, just not scraped. The tick fires every 15 minutes and mostly does nothing, in 10 milliseconds, for free.` },
      { type: 'p', text: `[Lawhook is live here.](https://lawhook.dev) The [quickstart](https://lawhook.dev/docs) takes you from zero to a verified webhook in a few minutes.` },
    ],
  },
  {
    slug: 'phantom-bug',
    title: 'The Phantom Bug — The One Bug That Was Sucking Out My Credits',
    date: 'July 22, 2026',
    dateTime: '2026-07-22',
    excerpt:
      'A single line of "helpful" debug output — my own timestamp, sitting inside the hashed content — made Lawhook detect its own clock as a regulatory change and burn AI credits summarizing phantom updates. Here is the hunt for it.',
    tags: ['Lawhook', 'Debugging', 'Hashing', 'RegTech'],
    readingMinutes: 5,
    blocks: [
      { type: 'p', text: `So as a solo developer who just started his journey obviously needs to learn from his mistakes. And this was a big one. As i built my Lawhook and it's UI, after 2 days when i took a look at my feed page, it was cluttered. SEBI (India) has 5 records, but SEC has 377. SEC (USA) and MAS (Singapore) they are updating their regulations every 15 minute, i was like whaaat?? That can't be right. Regulators don't publish 75 times more often in one country than another. The number itself was the clue — something was wrong before i even opened the code. So i began my surgery... I don't know if it is the right word, but it is cool. And i found it. **I was hashing my own clock**. ⌚` },
      { type: 'p', text: `Hashing your own clock? What are you telling, Shakespeare? So here is the thing. How diffing works is that after scraping, the backend turns the scraped content into snapshots which have headers and content, and it varies for different scraper classes. Each snapshot is compared to the previous one, and if there is a change, it is stored as a new change. But SEC making changes every 15 minute? No way. The diff was working — that's why changes were coming to the feed. The real question was *what* was changing. So i checked my snapshots. 📷` },
      { type: 'p', text: `I diffed two consecutive snapshots. Everything was identical except one line:` },
      { type: 'code', text: `Sources active: 2/2 | Scraped: 2026-07-09 12:38 UTC` },
      { type: 'p', text: `A timestamp. My own. Some of my scrapers pulled from multiple sources, so i had added a little header at the top of the content — how many sources were active, and when it was scraped. Helpful for debugging. Except that header went *into the content that gets hashed*. And the timestamp changed every 15 minutes. So every single scrape produced a "new" hash, and the diff dutifully stored a change. The system was working perfectly. It correctly detected that the content changed — because the content genuinely did. The content was just my clock. 😑😑` },
      { type: 'p', text: `And here's the part that actually stung. Every phantom change got sent to the AI to summarize. So my Gemini credits were being spent summarizing *my own infrastructure as if it were regulation*. One change even got graded **critical** — the AI reading "Sources active: 1/3 → 3/3" and confidently reporting a major regulatory event, which was really just me adding two scrapers. My compliance tool was alerting about my own deployments. Money, burned, for nothing. 💸` },
      { type: 'p', text: `There's a lesson buried in here that i actually think is worth more than the bug itself: **the thing you hash should be exactly the thing you're watching, and nothing else.** The moment your own metadata leaks into the hashed content, you stop detecting the world and start detecting yourself. Proof — the scrapers that pulled specific fields out of JSON never had this problem. Only the ones that hashed a blob of text, including a header i wrote myself, detected their own author.` },
      { type: 'p', text: `So what i did. I edited the headers — three lines deleted, the timestamp and source-count moved to a log where they belong instead of the content. Then came the cleanup: ~1000 junk records to delete without nuking the real ones. That was a mess of its own, a lot of careful SQL and double-checking so i didn't delete an actual regulatory change hiding in the pile. (One survivor: a real ASIC record about a $10.3M penalty on a super fund — exactly the kind of thing Lawhook is supposed to catch, sitting there buried under a thousand of my own timestamps.)` },
      { type: 'p', text: `Big lesson for a solo dev: a single line of "helpful" debug output cost me an AI bill, a rate-limit ban against my own webhook endpoint, a thousand junk rows, and a feed that made my product look broken. It looked *helpful* in the code. That's the dangerous kind.` },
    ],
  },
];

export function getBlog(slug: string): Blog | undefined {
  return blogs.find((blog) => blog.slug === slug);
}
