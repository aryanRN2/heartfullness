import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CUSTOM_DESCRIPTIONS: Record<string, string> = {
  // New images
  '16_Brighter_Minds_Cognitive_Training.png': 'A blindfolded child participating in cognitive and sensory development exercises under the Brighter Minds initiative.',
  '17_Heartfulness_Session_With_UP_Police.jpg': 'Honoring UP Police officers during a Heartfulness meditation and wellness session.',
  '18_Heartfulness_Book_Launch.png': "Presenting the Hindi edition of 'Understanding Heartfulness' (हार्टफुलनेस की समझ) to esteemed guests.",
  '19_Heartfulness_Meditation_Sanctuary.png': 'Seekers gathering in a peaceful sanctuary to practice heart-centered meditation.',
  '20_Spiritual_Gathering_And_Silence.png': 'A collective session of quiet meditation, cultivating deep silence and inner peace.',
  '21_Inner_Peace_And_Harmony.png': 'Experiencing a state of absolute calmness and emotional balance during meditation.',
  '22_Yogic_Transmission_Session.png': 'Experiencing the flow of Pranahuti (yogic transmission) during a guided session.',
  '23_Collective_Meditation_Hall.png': 'The serene atmosphere of the meditation hall, filled with collective peace.',
  '24_Mindfulness_And_Reflection.png': 'A moment of quiet contemplation, reflecting on the natural flow of spiritual energy.',
  '25_Spiritual_Wellness_Gathering.png': 'A workshop focusing on spiritual wellness, relaxation, and inner connection.',
  '26_Divine_Light_Meditation.png': 'Meditating with the gentle suggestion of divine light present in the heart.',
  '27_Heart_Based_Meditation_Practice.png': 'Connecting with the source of love and peace within our own hearts.',
  '28_Quiet_Reflective_Moments.png': 'A peaceful pause in the day, letting go of yesterday\'s heavy baggage.',
  '29_Meditation_For_World_Peace.png': 'Cultivating inner harmony to contribute to world peace and unity.',
  '30_Inner_Detox_Cleaning_Practice.png': 'An evening cleaning practice to sweep away the day\'s accumulated complexities.',
  '31_Sahaj_Marg_Spiritual_Path.png': 'Walking the natural path of Sahaj Marg for balanced spiritual progress.',
  '32_Heartfulness_Session_At_Pawar_Robertsganj.jpg': 'A collective Heartfulness meditation session held at the Gram Panchayat Secretariat in Pawar, Robertsganj, Sonbhadra.',
  
  // Existing videos/images
  '01_Meditation_Video.mp4': 'An introduction to Heartfulness meditation, opening the gateway to inner peace.',
  '02_Meditation_Video.mp4': 'A serene video guide on relaxing the body and mind before beginning meditation.',
  '03_Meditation_Video.mp4': 'Exploring the process of cleaning to sweep away daily complexity and stress.',
  '04_Meditation_Video.mp4': 'Sinking deeper into spiritual absorption and connecting with the source.',
  '05_Global_Sloka_Competition.mp4': 'Highlights from the Global Sloka Competition, showcasing traditional spiritual wisdom.',
  '06_Mere_Khuda_Tuhi_Bata.mp4': 'A soulful devotional composition invoking the divine presence within.',
  '07_Help_Program_In_College.mp4': 'Heartfulness Meditation session conducted for college students to boost focus and reduce anxiety.',
  '08_Three_Days_Of_HFN_In_Lions_Club.mp4': 'Three-day Heartfulness Meditation seminar held at the local Lions Club.',
  '09_Ekatm_Abhiyan.mp4': 'Spreading the message of unity and inner harmony through the Ekatm Abhiyan movement.',
  '10_Meditation_Video.mp4': 'A quiet meditation session illustrating the flow of yogic transmission (Pranahuti).',
  '11_Ekam_Abhiyan_In_UP.mp4': 'Moments from the Ekam Abhiyan event held across schools and colleges in Uttar Pradesh.',
  '12_Meditation_Video.mp4': 'Deep spiritual absorption and aligning the mind with the master of our system.',
  '13_HFN_In_District_Jail.mp4': 'Spiritual outreach and meditation guidance provided for inmates at the District Jail.',
  '14_PAC_Jawans_Meditation.mp4': 'Heartfulness meditation and stress management program conducted for PAC police jawans.',
  '15_Inspire_Teachers_Training.mp4': 'Meditation and core values training session for school and college teachers under the Inspire program.'
};

export async function GET() {
  try {
    const galleryDir = path.join(process.cwd(), 'public', 'gallary');
    
    // Ensure directory exists
    if (!fs.existsSync(galleryDir)) {
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(galleryDir);
    
    // Filter for image and video extensions
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.mp4', '.webm', '.mov'];
    const mediaFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return allowedExtensions.includes(ext);
    });

    // Sort files alphabetically to keep order consistent
    mediaFiles.sort();

    // Map to API-served source paths and clean titles
    const images = mediaFiles.map((file, idx) => {
      const ext = path.extname(file).toLowerCase();
      const isVideo = ['.mp4', '.webm', '.mov'].includes(ext);
      
      // Get title by stripping leading ordering numbers/underscores
      const nameWithoutExt = path.basename(file, ext);
      const cleanName = nameWithoutExt.replace(/^\d+[-_]+/, '');
      const title = cleanName
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());

      // Get description (either custom or generic fallback)
      const defaultDesc = isVideo
        ? 'An immersive spiritual video showcasing moments of stillness and deep yogic transmission.'
        : 'A quiet moment of deep meditation, collective harmony, and inner stillness.';
      const desc = CUSTOM_DESCRIPTIONS[file] || defaultDesc;

      return {
        src: `/gallary/${encodeURIComponent(file)}`,
        title: title || `${isVideo ? 'Meditation Video' : 'Meditation Image'} ${idx + 1}`,
        desc: desc,
        type: isVideo ? 'video' : 'image'
      };
    });

    return NextResponse.json(images);
  } catch (error: any) {
    console.error('Error reading gallery:', error);
    return NextResponse.json({ error: 'Failed to read gallery' }, { status: 500 });
  }
}
