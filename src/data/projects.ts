// Project data sourced directly from each GitHub repo README at
// https://github.com/ScotcsDuluka/<repo>
// Repos without a README are marked explicitly — no fabricated descriptions.

export type ProjectCategory =
  | "Capture"
  | "Mobile Mod"
  | "Web"
  | "Media"
  | "Minecraft"
  | "Data"
  | "Profile";

export interface ProjectRepo {
  slug: string;
  name: string;
  repo: string;
  url: string;
  homepage?: string;
  category: ProjectCategory;
  status: "Released" | "Active Dev" | "No README";
  icon: string;
  short: string; // 1 line — the only description shown on the card
  bullets: string[]; // facts pulled verbatim from the README (Features Main checklist, etc.)
  tags: string[];
  hasReadme: boolean; // if false, show "See repo on GitHub" instead of fake details
}

export const PROJECTS: ProjectRepo[] = [
  {
    slug: "nvidia-shadowplay",
    name: "NVIDIA ShadowPlay",
    repo: "ScotcsDuluka/NVIDIA-Shadowplay",
    url: "https://github.com/ScotcsDuluka/NVIDIA-Shadowplay",
    homepage: "https://scotcsduluka.github.io/NVIDIA-Shadowplay/",
    category: "Capture",
    status: "Active Dev",
    icon: "Video",
    short:
      "Screen capture utility inspired by NVIDIA ShadowPlay with overlay UI, built in VB.NET — No Hook. Record engine powered by FFmpeg.",
    bullets: [
      "UI NVIDIA Shadowplay",
      "Real-time screen recording",
      "Instant Replay (save last moments)",
      "Screenshot capture",
      "In-game overlay UI [Borderless Windowed]",
      "Encoder: NVIDIA-READY (Intel / AMD pending)",
      "API Capture: Windows.Graphics.Capture · Desktop Duplication · GDI",
      "Requires .NET 8.0 Desktop Runtime + .NET 4.8, Windows 8+",
    ],
    tags: ["VB.NET", "FFmpeg", "NVENC", ".NET 8", "MIT License"],
    hasReadme: true,
  },
  {
    slug: "always-on-display-mods",
    name: "Always-On-Display Mods",
    repo: "ScotcsDuluka/Always-On-Display-Mods",
    url: "https://github.com/ScotcsDuluka/Always-On-Display-Mods",
    homepage: "https://github.com/ScotcsDuluka/HyperOS-Mods/releases",
    category: "Mobile Mod",
    status: "Released",
    icon: "Smartphone",
    short:
      "Magisk module to customize Always On Display on HyperOS — adds new language pack and an awesome photo category.",
    bullets: [
      "Always On Display NewLang For NEXTGEN",
      "Awesome Photo Category",
      "Languages: th-TH, en-US",
      "Supports HyperOS 1.0, 2.0, 3.0 (not older MIUI)",
      "Requires root via Magisk — back up original AOD.apk before install",
      "Reboot twice after install via Magisk Manager",
    ],
    tags: ["Magisk", "HyperOS", "AOD", "Root", "th-TH", "en-US"],
    hasReadme: true,
  },
  {
    slug: "lyrics-ttml",
    name: "Lyrics-TTML",
    repo: "ScotcsDuluka/Lyrics-TTML",
    url: "https://github.com/ScotcsDuluka/Lyrics-TTML",
    category: "Media",
    status: "Released",
    icon: "Music2",
    short: "TTML lyrics created by ScotcsDuluka.",
    bullets: ["TTML Made by ScotcsDuluka"],
    tags: ["TTML", "Lyrics", "Synced Lyrics"],
    hasReadme: true,
  },
  {
    slug: "extreme-update",
    name: "Extreme-Update",
    repo: "ScotcsDuluka/Extreme-Update",
    url: "https://github.com/ScotcsDuluka/Extreme-Update",
    category: "Media",
    status: "Released",
    icon: "Zap",
    short: "App to check which month your MIDI songs are in.",
    bullets: ["Check which month your MIDI songs are in"],
    tags: ["MIDI", "Utility"],
    hasReadme: true,
  },
  {
    slug: "mcdmods-project-plus",
    name: "MCDMods-Project-Plus",
    repo: "ScotcsDuluka/MCDMods-Project-Plus",
    url: "https://github.com/ScotcsDuluka/MCDMods-Project-Plus",
    category: "Minecraft",
    status: "No README",
    icon: "Blocks",
    short: "Minecraft mods project — see repository for details.",
    bullets: ["Built-in news channel: mcd-news"],
    tags: ["Minecraft", "Mods"],
    hasReadme: false,
  },
  {
    slug: "scotcsduluka-profile",
    name: "ScotcsDuluka",
    repo: "ScotcsDuluka/ScotcsDuluka",
    url: "https://github.com/ScotcsDuluka/ScotcsDuluka",
    category: "Profile",
    status: "Released",
    icon: "User",
    short: "The ScotcsDuluka GitHub profile README — featured projects, tech stack, and links.",
    bullets: [
      "Featured: NVIDIA ShadowPlay",
      "Featured: HyperOS Mods (Magisk Module) — coming soon",
      "Tech stack: HTML5, CSS3, JavaScript, Markdown, C#, VB.NET, FFmpeg, JSON, Magisk, Windows 10/11",
      "Connect: GitHub · Discord",
    ],
    tags: ["Profile", "README", "Featured"],
    hasReadme: true,
  },
  {
    slug: "web-hyperos-launcher",
    name: "Web-HyperOS-Launcher",
    repo: "ScotcsDuluka/Web-HyperOS-Launcher",
    url: "https://github.com/ScotcsDuluka/Web-HyperOS-Launcher",
    category: "Web",
    status: "No README",
    icon: "Rocket",
    short: "Web-based HyperOS launcher — see repository for details.",
    bullets: [],
    tags: ["Web", "HyperOS"],
    hasReadme: false,
  },
  {
    slug: "web-custom",
    name: "Web-Custom",
    repo: "ScotcsDuluka/Web-Custom",
    url: "https://github.com/ScotcsDuluka/Web-Custom",
    category: "Web",
    status: "No README",
    icon: "Code2",
    short: "Custom web project — see repository for details.",
    bullets: [],
    tags: ["Web"],
    hasReadme: false,
  },
  {
    slug: "duluspect-experience",
    name: "DuluSpect-Experience",
    repo: "ScotcsDuluka/DuluSpect-Experience",
    url: "https://github.com/ScotcsDuluka/DuluSpect-Experience",
    category: "Web",
    status: "No README",
    icon: "Sparkles",
    short: "DuluSpect experience project — see repository for details.",
    bullets: [],
    tags: ["Web", "Experience"],
    hasReadme: false,
  },
  {
    slug: "student-statistics",
    name: "Student-Statistics",
    repo: "ScotcsDuluka/Student-Statistics",
    url: "https://github.com/ScotcsDuluka/Student-Statistics",
    category: "Data",
    status: "No README",
    icon: "BarChart3",
    short: "Student statistics project — see repository for details.",
    bullets: [],
    tags: ["Data"],
    hasReadme: false,
  },
];

// Server info — exactly as provided by user
export const SERVER = {
  ip: "scotcsduluka.totddns.com",
  port: "15241",
  java: "Java 1.21.11",
  bedrock: "Bedrock Latest",
  fullAddress: "scotcsduluka.totddns.com:15241",
};

export const DISCORD_INVITE = "https://discord.gg/t9yfWVFFaS";
export const GITHUB_PROFILE = "https://github.com/ScotcsDuluka";

// ===== Bilingual server rules — text is the user's, kept verbatim =====
export interface RuleItem {
  icon: string;
  titleTh: string;
  titleEn: string;
  detailTh: string;
  detailEn: string;
}

export interface RuleGroup {
  id: string;
  icon: string;
  emoji: string;
  titleTh: string;
  titleEn: string;
  rules: RuleItem[];
}

export const RULE_GROUPS: RuleGroup[] = [
  {
    id: "basic",
    icon: "Flame",
    emoji: "🔥",
    titleTh: "พื้นฐานการอยู่ร่วมกัน",
    titleEn: "Basic Conduct",
    rules: [
      {
        icon: "Heart",
        titleTh: "ให้เกียรติผู้อื่น",
        titleEn: "Respect others",
        detailTh: "พูดจาสุภาพ ไม่เหยียด ไม่บูลลี่",
        detailEn: "Be polite, no hate speech, no bullying",
      },
      {
        icon: "Ban",
        titleTh: "ห้าม Spam / ป่วนแชท",
        titleEn: "No spamming / disturbing the chat",
        detailTh: "ฟลัดข้อความ, ใช้บอทมั่ว, ส่งอีโมจิเยอะเกิน",
        detailEn: "Flooding messages, using bots recklessly, sending too many emojis",
      },
      {
        icon: "ShieldX",
        titleTh: "ห้าม NSFW",
        titleEn: "No NSFW content",
        detailTh: "รูปโป๊, คลิป 18+, เนื้อหาที่ไม่เหมาะสม - ยกเว้น r34",
        detailEn: "Pornographic images, 18+ videos, or inappropriate content — except r34",
      },
      {
        icon: "Megaphone",
        titleTh: "ห้ามโฆษณาโดยไม่ได้รับอนุญาต",
        titleEn: "No advertising without permission",
        detailTh: "จะโปรโมทอะไรต้องขอแอดมินก่อน",
        detailEn: "If you want to promote something, ask the admins first",
      },
      {
        icon: "Lock",
        titleTh: "ห้าม Leak ข้อมูล / งานของคนอื่น",
        titleEn: "No leaking others' information / work",
        detailTh: "งานใครงานมัน เคารพสิทธิ์",
        detailEn: "Respect others' work, everyone has their own rights",
      },
    ],
  },
  {
    id: "creative",
    icon: "Palette",
    emoji: "🎨",
    titleTh: "งานสร้างสรรค์ & Studio",
    titleEn: "Creative Work & Studio",
    rules: [
      {
        icon: "CopyX",
        titleTh: "ห้าม Copy / ขโมยงานคนอื่น",
        titleEn: "No copying / stealing others' work",
        detailTh: "เคารพเจ้าของผลงาน",
        detailEn: "Respect the creator's rights",
      },
      {
        icon: "BadgeCheck",
        titleTh: "ให้เครดิตเจ้าของงาน",
        titleEn: "Give credit to the original creator",
        detailTh: "",
        detailEn: "",
      },
    ],
  },
  {
    id: "games",
    icon: "Gamepad2",
    emoji: "🎮",
    titleTh: "เกม & กิจกรรม",
    titleEn: "Games & Activities",
    rules: [
      {
        icon: "Trophy",
        titleTh: "เล่นเกมให้สนุก ไม่หัวร้อน",
        titleEn: "Play games for fun, don't rage",
        detailTh: "แพ้ชนะเป็นเรื่องปกติ",
        detailEn: "Losing and winning are part of the game",
      },
    ],
  },
  {
    id: "vc",
    icon: "Mic",
    emoji: "🎤",
    titleTh: "แชทเสียง & VC",
    titleEn: "Voice Chat & VC",
    rules: [
      {
        icon: "MessageCircle",
        titleTh: "พูดคุยกันแบบสุภาพ",
        titleEn: "Be polite in conversations",
        detailTh: "",
        detailEn: "",
      },
      {
        icon: "VolumeX",
        titleTh: "อย่าตะโกน อย่าก่อกวน",
        titleEn: "Don't shout, don't disturb",
        detailTh: "ห้ามเปิดไมค์มั่ว / เปิดเพลงรบกวน — ถ้าจะเปิดเพลงให้ใช้บอทที่กำหนด",
        detailEn: "No random mic opening / playing disruptive music — use the designated bot",
      },
      {
        icon: "Users",
        titleTh: "ให้เกียรติคนในห้อง VC",
        titleEn: "Respect others in the VC room",
        detailTh: "อย่าพูดแทรกกันมั่ว",
        detailEn: "Don't interrupt or talk over others",
      },
    ],
  },
];

export interface Penalty {
  level: "warn" | "mute" | "ban";
  emoji: string;
  titleTh: string;
  titleEn: string;
  detailTh: string;
  detailEn: string;
  color: string;
  bg: string;
}

export const PENALTIES: Penalty[] = [
  {
    level: "warn",
    emoji: "🟡",
    titleTh: "เตือน 1 ครั้ง",
    titleEn: "Warning 1st",
    detailTh: "ถ้ายังทำผิดซ้ำ จะถูกลงโทษ",
    detailEn: "If the behavior continues, further action will be taken",
    color: "text-amber-300",
    bg: "from-amber-500/15 to-amber-500/5 border-amber-500/30",
  },
  {
    level: "mute",
    emoji: "🟠",
    titleTh: "Mute / Kick",
    titleEn: "Mute / Kick",
    detailTh: "ถ้าป่วนเซิร์ฟ, ใช้คำพูดไม่เหมาะสม",
    detailEn: "If causing disturbances, using inappropriate language",
    color: "text-orange-300",
    bg: "from-orange-500/15 to-orange-500/5 border-orange-500/30",
  },
  {
    level: "ban",
    emoji: "🔴",
    titleTh: "Ban ทันที",
    titleEn: "Ban immediately",
    detailTh: "ทำผิดร้ายแรง เช่น NSFW, Leak งาน",
    detailEn: "For serious offenses like NSFW, leaking work",
    color: "text-rose-300",
    bg: "from-rose-500/15 to-rose-500/5 border-rose-500/30",
  },
];
