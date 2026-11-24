<template>
  <div>
    <VitePwaManifest />
    <NuxtLayout></NuxtLayout>
  </div>
</template>

<script setup lang="ts">


const route = useRoute();
const canonicalUrl = computed(() => `https://www.gccschool.com${route.path}`);

// Home page only: the four trackers (Meta Pixel, Google Analytics, Google Tag Manager,
// Microsoft Clarity) are downloaded on the visitor's first interaction, or 4 seconds
// after the page has loaded, whichever comes first. They were responsible for more
// than half of the main-thread blocking during page load.
// The fbq / gtag / dataLayer / clarity functions exist immediately and queue their
// calls, so no event is lost - it is only sent a little later.
// Evaluated once for the page the visit starts on (not reactive on purpose); visits
// that start on any other page use the original snippets below, unchanged.
const delayTrackers = route.path === '/';
const delayedTrackersScript = {
  key: 'delayed-trackers',
  innerHTML: `(function(w,d){
  w.dataLayer=w.dataLayer||[];
  w.gtag=function(){w.dataLayer.push(arguments);};
  w.gtag('js',new Date());
  w.gtag('config','G-B2ETHYM6MN');
  if(!w.fbq){var n=w.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!w._fbq)w._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];}
  w.fbq('init','1308129784468579');
  w.fbq('track','PageView');
  w.clarity=w.clarity||function(){(w.clarity.q=w.clarity.q||[]).push(arguments)};
  var done=false,events=['scroll','pointerdown','touchstart','keydown','mousemove'],opts={passive:true};
  function add(src){var s=d.createElement('script');s.async=true;s.src=src;d.head.appendChild(s);}
  function load(){
    if(done)return;done=true;
    events.forEach(function(e){w.removeEventListener(e,load,opts);});
    add('https://connect.facebook.net/en_US/fbevents.js');
    add('https://www.googletagmanager.com/gtag/js?id=G-B2ETHYM6MN');
    w.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
    add('https://www.googletagmanager.com/gtm.js?id=GTM-5NVDGXLR');
    add('https://www.clarity.ms/tag/wtdnppatos');
  }
  events.forEach(function(e){w.addEventListener(e,load,opts);});
  function arm(){setTimeout(load,4000);}
  if(d.readyState==='complete')arm();else w.addEventListener('load',arm);
})(window,document);`,
  tagPosition: 'bodyClose' as const
};

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  title: "GCC School",
  meta: [
    { name: "description", content: "GCC School" }
  ],
  link: [
    { rel: 'canonical', href: canonicalUrl }
  ],
  script: [
    ...(delayTrackers ? [delayedTrackersScript] : [
    // Meta Pixel Code — deferred to body close for faster FCP
    {
      innerHTML: `!function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ?
          n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
      'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1308129784468579');
    fbq('track', 'PageView');`,
      tagPosition: 'bodyClose'
    },
    // Google Analytics Code
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-B2ETHYM6MN',
      async: true
    },
    {
      innerHTML: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-B2ETHYM6MN');`
    },
    // Google Tag Manager Code — deferred to body close
    {
      innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5NVDGXLR');`,
      tagPosition: 'bodyClose'
    },
    // Microsoft Clarity Code — deferred to body close
    {
      'data-hid': 'clarity-script',
      innerHTML: `(function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "wtdnppatos");`,
      tagPosition: 'bodyClose'
    },
    ]),
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://gccschool.com/#organization",
        "name": "GCC School",
        "url": "https://gccschool.com/",
        // Permanent address (public/gcc-school-logo.jpeg). The previous value was a
        // build-generated /_nuxt/ file name that changes whenever the logo file does.
        "logo": "https://gccschool.com/gcc-school-logo.jpeg",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+918796880189",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": ["en", "Hindi"]
        },
        "sameAs": [
          "https://www.facebook.com/share/187jgT5gev/", 
          "https://x.com/gccschool2026",
          "https://www.instagram.com/gccschool?igsh=MXQxc2JhazAwcG55cQ==",
          "https://www.youtube.com/@GCCSchool",
          "https://www.linkedin.com/company/gccschool/"
        ]
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "GCC School",
        // The previous image address (a /_nuxt/ build file) no longer existed (404).
        "image": "https://gccschool.com/gcc-school-logo.jpeg",
        "@id": "https://gccschool.com/#localbusiness",
        "url": "https://gccschool.com/",
        "telephone": "+918796880189",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "16th Floor, Tower-B, DLF Building No. 09",
          "addressLocality": "Gurugram",
          "postalCode": "122002",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.4950679,
          "longitude": 77.0892303
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "09:30",
          "closes": "18:30"
        }
      })
    },
    // WebSite: tells Google the site's official name and home address.
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://gccschool.com/#website",
        "url": "https://gccschool.com/",
        "name": "GCC School",
        "publisher": { "@id": "https://gccschool.com/#organization" }
      })
    }
  ],
  noscript: [
    // Google Tag Manager (noscript)
    {
      innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5NVDGXLR" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      tagPosition: 'bodyOpen'
    },
    // Meta Pixel Code (noscript)
    {
      innerHTML: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1308129784468579&ev=PageView&noscript=1" />`,
      tagPosition: 'bodyOpen'
    }
  ]
});
// BreadcrumbList schema: tells Google where a page sits in the site
// (for example Home > About Us). Hidden structured data only - nothing is displayed.
// The home page needs none. Blog posts add their own in pages/blogs/[slug].vue,
// because the post title is only known there.
// "Programs" is not a level yet because /programs is not a real page (it redirects).
const breadcrumbLabels: Record<string, string> = {
  '/about-overview': 'About Us',
  '/programs/acca': 'AEIAP – International Accounting',
  '/programs/cpa': 'AEUAP – US Accounting',
  '/programs/ea': 'AEUTP – US Taxation',
  '/nfet-exam': 'NFET Exam',
  '/campus-life': 'Campus Life',
  '/career': 'Careers',
  '/blogs': 'Blogs',
  '/partner-with-us': 'Corporate Partner',
  '/campus-ceo/student': 'Student Ambassador',
  '/campus-ceo/faculty': 'Faculty Ambassador',
  '/terms-conditions': 'Terms & Conditions',
  '/privacy-policy': 'Privacy Policy',
  '/refund-policy': 'Payment & Refund Policy',
};
useHead(() => {
  const path = route.path.replace(/\/+$/, '') || '/';
  const label = breadcrumbLabels[path];
  if (!label) return {};
  return {
    script: [{
      key: 'breadcrumb-schema',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://gccschool.com/" },
          { "@type": "ListItem", "position": 2, "name": label, "item": `https://gccschool.com${path}` },
        ],
      }),
    }],
  };
});

// app.vue
onMounted(() => {
  const { init } = useAuth()
  init()
})
</script>
