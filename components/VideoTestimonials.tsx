import { absoluteUrl, siteConfig } from "@/site.config";

/**
 * Three short video testimonials: Ethan (in hi-vis) interviewing homeowners after
 * their roof replacement. Subtitles are burned into the MP4s and also supplied as
 * WebVTT tracks for screen readers and search engines. Portrait phone videos, so
 * they sit three across on desktop and swipe horizontally on a phone.
 */
export type VideoTestimonial = {
  src: string;
  poster: string;
  captions: string;
  name: string;
  title: string;
  description: string;
  /** ISO 8601 duration for schema.org, e.g. "PT21S". */
  duration: string;
  uploadDate: string;
};

export const videoTestimonials: VideoTestimonial[] = [
  {
    src: "/videos/testimonial-3.mp4",
    poster: "/videos/testimonial-3-poster.jpg",
    captions: "/videos/testimonial-3.vtt",
    name: "Brett, insurance roof replacement",
    title: "Brett on his insurance roof replacement by Top Tin Roofing",
    description: "On the finished roof, Brett explains how Top Tin Roofing helped with his insurance claim, worked in with the solar installers and delivered a fantastic finish.",
    duration: "PT60S",
    uploadDate: "2026-10-23",
  },
  {
    src: "/videos/testimonial-2.mp4",
    poster: "/videos/testimonial-2-poster.jpg",
    captions: "/videos/testimonial-2.vtt",
    name: "Henry, large roof replacement",
    title: "Henry on his roof replacement by Top Tin Roofing",
    description: "Henry tells Ethan the crew put in an awesome effort from start to finish, the job was cost effective and the process was streamlined.",
    duration: "PT23S",
    uploadDate: "2026-10-23",
  },
  {
    src: "/videos/testimonial-1.mp4",
    poster: "/videos/testimonial-1-poster.jpg",
    captions: "/videos/testimonial-1.vtt",
    name: "Adrian, Clear Island Waters",
    title: "Adrian on his new Colorbond roof, Clear Island Waters",
    description: "Adrian tells Ethan from Top Tin Roofing the crew were quick with the demolition on day one and the house is already cooler.",
    duration: "PT21S",
    uploadDate: "2026-10-23",
  },
];

function videoSchema(v: VideoTestimonial) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.title,
    description: v.description,
    thumbnailUrl: [absoluteUrl(v.poster)],
    contentUrl: absoluteUrl(v.src),
    duration: v.duration,
    uploadDate: v.uploadDate,
    inLanguage: "en-AU",
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };
}

export function VideoTestimonials() {
  return (
    <div>
      <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0">
        {videoTestimonials.map((v) => (
          <li key={v.src} className="w-[72vw] shrink-0 snap-center sm:w-[300px] md:w-auto">
            <figure className="card overflow-hidden p-0">
              <div className="relative aspect-[9/16] bg-navy">
                {/* eslint-disable-next-line jsx-a11y/media-has-caption -- captions supplied via <track> */}
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  controls
                  playsInline
                  preload="none"
                  poster={v.poster}
                  aria-label={v.title}
                >
                  <source src={v.src} type="video/mp4" />
                  <track kind="captions" src={v.captions} srcLang="en" label="English" default />
                  Your browser does not support video. <a href={v.src}>Download the video</a>.
                </video>
              </div>
              <figcaption className="px-5 py-4 text-[14.5px] text-mute">
                <b className="text-navy">{v.name}</b> · Interviewed by Ethan after the job
              </figcaption>
            </figure>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema(v)) }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
