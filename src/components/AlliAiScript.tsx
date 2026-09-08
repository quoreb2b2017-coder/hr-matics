import Script from "next/script";

/**
 * Alli AI SEO automation widget (www.hrmatics.net).
 * Loads in <head> on every page via beforeInteractive.
 * Only applies pre-approved recommendations from the Alli dashboard.
 */
export default function AlliAiScript() {
  return (
    <Script id="alli-ai-widget" strategy="beforeInteractive">
      {`(function (w,d,s,o,f,js,fjs) {
  w['AlliJSWidget']=o;
  w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
  js=d.createElement(s);
  fjs=d.getElementsByTagName(s)[0];
  js.id=o;
  js.src=f;
  js.async=1;
  fjs.parentNode.insertBefore(js,fjs);
})(window,document,'script','alli','https://static.alliai.com/widget/v1.js');
alli('init','site_wPntN34gRXgYTArY');
alli('optimize','all');`}
    </Script>
  );
}
