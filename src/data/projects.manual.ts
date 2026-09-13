// Project data sourced directly from each GitHub repo README at
// https://github.com/ScotcsDuluka/<repo>
// Detailed fields (techStack, dependencies, installSteps, license, usageExamples)
// are pulled verbatim from the README when available.

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
  short: string;
  bullets: string[];
  // Detailed fields (only populated when README had the info)
  techStack?: { label: string; items: string[] }[];
  dependencies?: { name: string; license: string; author: string; source: string }[];
  installSteps?: string[];
  usageExamples?: string[];
  requirements?: string[];
  warnings?: string[];
  license?: { name: string; url?: string; notice?: string };
  thirdPartyAttribution?: boolean;
  supportedDevices?: string[];
  apiCapture?: string[];
  encoderStatus?: { name: string; ready: boolean }[];
  tags: string[];
  hasReadme: boolean;
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
      "Built over 3 years focusing on animation system, overlay UX, and performance",
    ],
    techStack: [
      { label: "Language", items: ["VB.NET", ".NET 8.0", ".NET 4.8"] },
      { label: "Engine", items: ["FFmpeg (encoding pipeline)"] },
      { label: "Capture APIs", items: ["Windows.Graphics.Capture", "Desktop Duplication API", "GDI screen grabber"] },
      { label: "Encoders", items: ["NVIDIA NVENC (Ready)", "Intel Next (Pending)", "AMD-Q (Pending)"] },
    ],
    apiCapture: [
      "Windows.Graphics.Capture",
      "Desktop Duplication API",
      "GDI screen grabber",
    ],
    encoderStatus: [
      { name: "NVIDIA-READY", ready: true },
      { name: "INTEL-NEXT", ready: false },
      { name: "AMD-Q", ready: false },
    ],
    requirements: [
      ".NET 8.0 Desktop Runtime installed",
      ".NET 4.8 installed",
      "Windows 8 / Server 2012 or newer (will NOT work on Windows 7)",
      "Recommended resolution: 1920 × 1080",
    ],
    warnings: [
      "Exclusive Fullscreen Limitation: Due to the no-hook design, capturing 'Exclusive Fullscreen' applications is not supported on older Windows builds. Use 'Borderless Windowed' mode in games for reliable recording.",
      "Some apps (Netflix / DRM content) cannot be recorded.",
      "Still under active development — stability varies.",
    ],
    dependencies: [
      { name: "NAudio", license: "MIT", author: "Mark Heath", source: "NAudio.Core.dll, NAudio.Wasapi.dll" },
      { name: "Newtonsoft.Json", license: "MIT", author: "James Newton-King", source: "Newtonsoft.Json.dll" },
      { name: "libmp3lame", license: "LGPL-2.0", author: "The LAME Project", source: "libmp3lame.32.dll, libmp3lame.64.dll" },
      { name: "FFmpeg", license: "LGPL/GPL", author: "FFmpeg Developers", source: "Encoding Pipeline" },
      { name: ".NET 8 Runtime", license: "MIT", author: "Microsoft", source: "Microsoft.Windows.SDK.NET.dll" },
      { name: "Windows SDK.NET", license: "MIT", author: "Microsoft", source: "WinRT.Runtime.dll" },
    ],
    installSteps: [
      "Install .NET 8.0 Desktop Runtime from https://dotnet.microsoft.com/",
      "Install .NET 4.8 (required for legacy components)",
      "Ensure Windows 8 / Server 2012 or newer",
      "For best performance, use NVIDIA hardware with NVENC support",
      "Set game to 'Borderless Windowed' mode for reliable overlay capture",
      "Launch the application — overlay UI appears in-game",
    ],
    usageExamples: [
      "Real-time recording: Start/stop recording with one keystroke via the overlay",
      "Instant Replay: Save the last N seconds of gameplay on demand",
      "Screenshot capture: Capture framed screenshots with overlay UI visible",
      "Recommended encoder: h264_nvenc via FFmpeg for best NVIDIA performance",
    ],
    license: {
      name: "MIT",
      url: "LICENSE",
      notice:
        "This is an independent third-party application and is NOT affiliated with, endorsed by, sponsored by, or approved by NVIDIA Corporation. 'NVIDIA', 'GeForce', and 'ShadowPlay' are trademarks of NVIDIA Corporation.",
    },
    thirdPartyAttribution: true,
    tags: ["VB.NET", "FFmpeg", "NVENC", ".NET 8", "WinRT", "Overlay UI", "Screen Capture", "MIT"],
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
      "Stability and visual customization focus",
    ],
    techStack: [
      { label: "Type", items: ["Magisk Module"] },
      { label: "Target OS", items: ["HyperOS 1.0", "HyperOS 2.0", "HyperOS 3.0"] },
      { label: "Languages Added", items: ["th-TH", "en-US"] },
      { label: "Feature", items: ["NewLang For NEXTGEN", "Awesome Photo Category"] },
    ],
    supportedDevices: [
      "HyperOS 1.0 ✓",
      "HyperOS 2.0 ✓",
      "HyperOS 3.0 ✓",
      "Older MIUI versions — Not Supported",
    ],
    requirements: [
      "Rooted device via Magisk",
      "HyperOS 1.0, 2.0, or 3.0 (NOT older MIUI)",
    ],
    warnings: [
      "Brick Risk: Back up your original AOD.apk before installing. If something goes wrong, you'll need this file to restore your system.",
      "Reboot TWICE after installing the module via Magisk Manager to ensure the overlay applies correctly.",
    ],
    installSteps: [
      "Back up your original AOD.apk before doing anything (safety net for brick risk)",
      "Open Magisk Manager on your rooted HyperOS device",
      "Install the AOD Mods module (.zip) via Magisk Modules section",
      "Reboot the device once",
      "Reboot the device a SECOND time — this is critical for the overlay to apply correctly",
      "Verify the new AOD language pack (th-TH / en-US) and Awesome Photo Category appear in AOD settings",
    ],
    usageExamples: [
      "Open Settings → Always-On Display to see new language options",
      "Switch language to th-TH or en-US from NewLang For NEXTGEN",
      "Browse the new Awesome Photo Category for AOD backgrounds",
    ],
    license: {
      name: "MIT",
      notice: "Made with ❤️ by ScotcsDuluka",
    },
    tags: ["Magisk", "HyperOS", "AOD", "Root", "th-TH", "en-US", "Xiaomi", "Mobile Mod"],
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
    bullets: [
      "TTML Made by ScotcsDuluka",
      "Hand-timed lyric files for music players",
    ],
    techStack: [
      { label: "Format", items: ["TTML (Timed Text Markup Language)"] },
      { label: "Author", items: ["ScotcsDuluka"] },
    ],
    usageExamples: [
      "Import TTML files into compatible music players (e.g., Apple Music)",
      "Synced lyrics display word-by-word or syllable-by-syllable",
    ],
    license: {
      name: "MIT (assumed)",
      notice: "TTML Made by ScotcsDuluka",
    },
    tags: ["TTML", "Lyrics", "Synced Lyrics", "Karaoke", "Music"],
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
    bullets: [
      "Check which month your MIDI songs are in",
      "Catalog MIDI library by date",
    ],
    techStack: [
      { label: "Purpose", items: ["MIDI file metadata inspector"] },
      { label: "Output", items: ["Songs grouped by month"] },
    ],
    usageExamples: [
      "Drop a folder of MIDI files into the app",
      "Get a sorted list grouped by month",
      "Copy the organized list for your library",
    ],
    license: {
      name: "MIT (assumed)",
    },
    tags: ["MIDI", "Utility", "Metadata", "Cataloging", "Music"],
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
    techStack: [
      { label: "Platform", items: ["Minecraft"] },
      { label: "Editions", items: ["Java 1.21.11", "Bedrock Latest"] },
      { label: "Built-in", items: ["mcd-news (news channel)"] },
    ],
    usageExamples: [
      "Pairs with the live Duluka Studio Minecraft server",
      "Server-side news broadcast via mcd-news channel",
    ],
    requirements: [
      "Minecraft Java 1.21.11 or Bedrock Latest",
      "Connect to scotcsduluka.totddns.com:15241 to test",
    ],
    tags: ["Minecraft", "Mods", "Java 1.21", "Bedrock", "Server-side"],
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
      "GitHub streak-stats widget (radical theme)",
      "Connect: GitHub + Discord",
    ],
    techStack: [
      { label: "Web", items: ["HTML5", "CSS3", "JavaScript", "Markdown"] },
      { label: "Desktop", items: ["C#", "VB.NET", "FFmpeg", "JSON"] },
      { label: "Mobile", items: ["Magisk Module"] },
      { label: "OS", items: ["Windows 10/11"] },
    ],
    usageExamples: [
      "Visit https://github.com/ScotcsDuluka to see the full profile",
      "Featured projects link to live demos and repositories",
      "GitHub streak-stats widget shows contribution activity",
    ],
    license: {
      name: "Profile README",
      notice: "Mythic Founder · 3+ Years Legacy · Origin Core",
    },
    tags: ["Profile", "README", "Featured", "Badges", "Streak Stats"],
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
    techStack: [
      { label: "Type", items: ["Web Project"] },
      { label: "Inspiration", items: ["Xiaomi HyperOS Launcher"] },
    ],
    requirements: [
      "Modern web browser (Chrome / Firefox / Safari / Edge)",
    ],
    tags: ["Web", "HyperOS", "Launcher", "HTML/CSS/JS"],
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
    techStack: [
      { label: "Type", items: ["Web Project"] },
      { label: "Use", items: ["Experimental components & CSS effects"] },
    ],
    tags: ["Web", "Experimental", "Components"],
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
    techStack: [
      { label: "Type", items: ["Experience Project"] },
    ],
    tags: ["Web", "Experience", "Interactive"],
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
    techStack: [
      { label: "Domain", items: ["Education / Data"] },
      { label: "Purpose", items: ["Student performance tracking"] },
    ],
    tags: ["Data", "Statistics", "Education"],
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
