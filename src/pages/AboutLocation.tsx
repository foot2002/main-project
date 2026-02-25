import Layout from "@/components/Layout";
import { MapPin, Phone, Mail } from "lucide-react";

const AboutLocation = () => (
  <Layout>

    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <p className="text-xs font-medium tracking-widest uppercase text-blue-highlight mb-4 font-display">Location</p>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-10">오시는 길</h1>

        <div className="space-y-6 mb-12">
          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-blue-highlight mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-foreground">본사 주소</p>
              <p className="text-sm text-muted-foreground mt-1">서울시 강남구 언주로309 기성빌딩 3층</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="w-5 h-5 text-blue-highlight mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-foreground">전화번호</p>
              <p className="text-sm text-muted-foreground mt-1">02-1234-5678</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="w-5 h-5 text-blue-highlight mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-foreground">이메일</p>
              <p className="text-sm text-muted-foreground mt-1">contact@wisein.co.kr</p>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="rounded-lg border border-border overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.0!2d127.0389!3d37.5045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z7ISc7Jq47Yq567OE7IucIOqwleuCqOq1rCDslrjso7zroZwzMDkg6riw7ISx67mM65Sp!5e0!3m2!1sko!2skr!4v1700000000000"
            className="w-full h-96"
            title="WiseIN 본사 위치 - Google Maps"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: 0 }}
          />
        </div>
        <div className="mt-3 text-right">
          <a
            href="https://www.google.com/maps/search/%EC%84%9C%EC%9A%B8%EC%8B%9C+%EA%B0%95%EB%82%A8%EA%B5%AC+%EC%96%B8%EC%A3%BC%EB%A1%9C309+%EA%B8%B0%EC%84%B1%EB%B9%8C%EB%94%A9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-blue-highlight hover:underline"
          >
            Google Maps에서 보기
          </a>
        </div>
      </div>
    </section>
  </Layout>
);

export default AboutLocation;
